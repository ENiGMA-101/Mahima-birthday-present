import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { dbService } from './server/db';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';
const JWT_SECRET = process.env.SESSION_SECRET || 'mahima-batparss-2026-secret-session-key';

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '15mb' }));
app.use(cookieParser());

// Static file serving from public directory
app.use(express.static(path.join(process.cwd(), 'public')));

// Configure Multer for local uploads fallback
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, 'memory-' + uniqueSuffix + ext);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Authentication Middleware
interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.admin_token || req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized. Administrator access required.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired session. Please log in again.' });
  }
};

// ==========================================
// PUBLIC API ENDPOINTS
// ==========================================

// Get published bilingual site content
app.get('/api/content', async (req: Request, res: Response) => {
  try {
    const content = await dbService.getAllContent();
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve site content' });
  }
});

// Get published memories
app.get('/api/memories', async (req: Request, res: Response) => {
  try {
    const category = typeof req.query.category === 'string' ? req.query.category : undefined;
    const memories = await dbService.getMemories(true, category);
    res.json(memories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve memories' });
  }
});

// Get published story chapters
app.get('/api/story-chapters', async (req: Request, res: Response) => {
  try {
    const chapters = await dbService.getChapters(true);
    res.json(chapters);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve story chapters' });
  }
});

// Get public settings
app.get('/api/settings', async (req: Request, res: Response) => {
  try {
    const settings = await dbService.getAllSettings();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve site settings' });
  }
});

// ==========================================
// AUTHENTICATION API ENDPOINTS
// ==========================================

// Admin Login
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const admin = await dbService.findAdminByEmail(email);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = bcrypt.compareSync(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '7d' });

    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: 'Login successful',
      user: { id: admin.id, email: admin.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal login server error' });
  }
});

// Admin Logout
app.post('/api/auth/logout', (req: Request, res: Response) => {
  res.clearCookie('admin_token');
  res.json({ message: 'Logged out successfully' });
});

// Current Admin Info
app.get('/api/auth/me', requireAuth, (req: AuthRequest, res: Response) => {
  res.json({ user: req.user });
});

// ==========================================
// ADMIN PROTECTED API ENDPOINTS
// ==========================================

// Overview stats
app.get('/api/admin/stats', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const stats = await dbService.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load stats' });
  }
});

// Admin Memories CRUD
app.get('/api/admin/memories', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const category = typeof req.query.category === 'string' ? req.query.category : undefined;
    const memories = await dbService.getMemories(false, category);
    res.json(memories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve admin memories' });
  }
});

app.post('/api/admin/memories', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { title_bn, title_en, caption_bn, caption_en, image_url, category, location, memory_date, is_featured, display_order, is_published } = req.body;
    if (!image_url) {
      return res.status(400).json({ error: 'Image URL is required' });
    }
    const created = await dbService.createMemory({
      title_bn: title_bn || 'স্মৃতি',
      title_en: title_en || 'Memory',
      caption_bn: caption_bn || '',
      caption_en: caption_en || '',
      image_url,
      category: category || 'general',
      location: location || '',
      memory_date: memory_date || '',
      is_featured: !!is_featured,
      display_order: parseInt(display_order, 10) || 0,
      is_published: is_published !== false,
    });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create memory' });
  }
});

app.put('/api/admin/memories/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const updated = await dbService.updateMemory(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Memory record not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update memory' });
  }
});

app.patch('/api/admin/memories/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const updated = await dbService.updateMemory(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Memory record not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update memory' });
  }
});

app.delete('/api/admin/memories/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const deleted = await dbService.deleteMemory(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Memory record not found' });
    }
    res.json({ message: 'Memory deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete memory' });
  }
});

// Admin Story Chapters CRUD
app.get('/api/admin/story-chapters', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const chapters = await dbService.getChapters(false);
    res.json(chapters);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve chapters' });
  }
});

app.post('/api/admin/story-chapters', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { title_bn, title_en, description_bn, description_en, display_order, is_published } = req.body;
    const created = await dbService.createChapter({
      title_bn: title_bn || '',
      title_en: title_en || '',
      description_bn: description_bn || '',
      description_en: description_en || '',
      display_order: parseInt(display_order, 10) || 0,
      is_published: is_published !== false,
    });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create story chapter' });
  }
});

app.put('/api/admin/story-chapters/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const updated = await dbService.updateChapter(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Chapter not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update chapter' });
  }
});

app.patch('/api/admin/story-chapters/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const updated = await dbService.updateChapter(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Chapter not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update chapter' });
  }
});

app.delete('/api/admin/story-chapters/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const deleted = await dbService.deleteChapter(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Chapter not found' });
    }
    res.json({ message: 'Chapter deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete chapter' });
  }
});

// Admin Content Editing
app.get('/api/admin/content', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const content = await dbService.getAllContent();
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve admin content' });
  }
});

app.put('/api/admin/content/:key', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const key = req.params.key as string;
    const { value_bn, value_en } = req.body;
    await dbService.updateContent(key, value_bn, value_en);
    res.json({ message: 'Content updated successfully', key });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update content' });
  }
});

app.patch('/api/admin/content/:key', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const key = req.params.key as string;
    const { value_bn, value_en } = req.body;
    await dbService.updateContent(key, value_bn, value_en);
    res.json({ message: 'Content updated successfully', key });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// Admin Settings
app.get('/api/admin/settings', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const settings = await dbService.getAllSettings();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve admin settings' });
  }
});

app.put('/api/admin/settings/:key', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const key = req.params.key as string;
    const { setting_value, value } = req.body;
    await dbService.updateSetting(key, String(setting_value ?? value));
    res.json({ message: 'Setting updated successfully', key });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update setting' });
  }
});

app.patch('/api/admin/settings/:key', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const key = req.params.key as string;
    const { setting_value, value } = req.body;
    await dbService.updateSetting(key, String(setting_value ?? value));
    res.json({ message: 'Setting updated successfully', key });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update setting' });
  }
});

// Admin File Uploads
app.post('/api/admin/uploads', requireAuth, upload.single('photo'), (req: AuthRequest, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({
    message: 'Image uploaded successfully',
    url: fileUrl,
    filename: req.file.filename,
    size: req.file.size,
  });
});

// ==========================================
// VITE INTEGRATION / SPA SERVING
// ==========================================

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // In dev: mount Vite dev server as middleware
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production: serve dist directory
    const distPath = path.join(process.cwd(), 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, HOST, () => {
    console.log(`✨ Server running on http://${HOST}:${PORT}`);
  });
}

startServer();
