import { Pool } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import {
  INITIAL_MEMORIES,
  INITIAL_CHAPTERS,
  INITIAL_SITE_CONTENT,
  INITIAL_SETTINGS,
  MemoryRecord,
  StoryChapterRecord,
  SiteContentRecord,
} from './defaultData';

export interface AdminUser {
  id: number;
  email: string;
  password_hash: string;
  created_at: string;
}

class DatabaseService {
  private pool: Pool | null = null;
  private isConnectedToNeon: boolean = false;

  // In-memory fallback stores
  private memUsers: AdminUser[] = [];
  private memMemories: MemoryRecord[] = [...INITIAL_MEMORIES];
  private memChapters: StoryChapterRecord[] = [...INITIAL_CHAPTERS];
  private memContent: Map<string, SiteContentRecord> = new Map();
  private memSettings: Map<string, string> = new Map();
  private nextMemoryId: number = 10;
  private nextChapterId: number = 10;

  constructor() {
    // Populate in-memory site content & settings
    INITIAL_SITE_CONTENT.forEach((item) => {
      this.memContent.set(item.content_key, item);
    });
    Object.entries(INITIAL_SETTINGS).forEach(([key, val]) => {
      this.memSettings.set(key, val);
    });

    // Default admin in memory
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'batparss2026', salt);
    this.memUsers.push({
      id: 1,
      email: (process.env.ADMIN_EMAIL || 'admin@batparss.com').toLowerCase(),
      password_hash: hash,
      created_at: new Date().toISOString(),
    });

    this.initDatabase();
  }

  private async initDatabase() {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl || (!dbUrl.startsWith('postgres://') && !dbUrl.startsWith('postgresql://'))) {
      console.log('ℹ️ [DB] No Neon DATABASE_URL configured yet. Operating in reliable in-memory persistent mode with default bilingual data.');
      return;
    }

    try {
      this.pool = new Pool({ connectionString: dbUrl });
      // Test query
      const client = await this.pool.connect();
      client.release();
      this.isConnectedToNeon = true;
      console.log('✅ [DB] Successfully connected to Neon PostgreSQL!');

      // Run schema migrations
      await this.runMigrations();
      await this.seedNeonDefaults();
    } catch (err) {
      console.warn('⚠️ [DB] Could not connect to Neon PostgreSQL:', err);
      console.log('ℹ️ [DB] Falling back to high-fidelity in-memory database.');
      this.isConnectedToNeon = false;
    }
  }

  private async runMigrations() {
    if (!this.pool || !this.isConnectedToNeon) return;
    try {
      const migrationPath = path.join(process.cwd(), 'server', 'migrations.sql');
      if (fs.existsSync(migrationPath)) {
        const sql = fs.readFileSync(migrationPath, 'utf8');
        await this.pool.query(sql);
        console.log('✅ [DB] Neon migrations executed successfully.');
      }
    } catch (err) {
      console.warn('⚠️ [DB] Error running Neon migrations:', err);
    }
  }

  private async seedNeonDefaults() {
    if (!this.pool || !this.isConnectedToNeon) return;
    try {
      // Check admin user
      const usersRes = await this.pool.query('SELECT COUNT(*) FROM admin_users');
      if (parseInt(usersRes.rows[0].count, 10) === 0) {
        const email = (process.env.ADMIN_EMAIL || 'admin@batparss.com').toLowerCase();
        const pwd = process.env.ADMIN_PASSWORD || 'batparss2026';
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(pwd, salt);
        await this.pool.query(
          'INSERT INTO admin_users (email, password_hash) VALUES ($1, $2)',
          [email, hash]
        );
        console.log('✅ [DB] Seeded initial Admin user to Neon.');
      }

      // Check memories
      const memRes = await this.pool.query('SELECT COUNT(*) FROM memories');
      if (parseInt(memRes.rows[0].count, 10) === 0) {
        for (const m of INITIAL_MEMORIES) {
          await this.pool.query(
            `INSERT INTO memories (title_bn, title_en, caption_bn, caption_en, image_url, category, location, memory_date, is_featured, display_order, is_published)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
            [
              m.title_bn,
              m.title_en,
              m.caption_bn,
              m.caption_en,
              m.image_url,
              m.category,
              m.location,
              m.memory_date,
              m.is_featured,
              m.display_order,
              m.is_published,
            ]
          );
        }
        console.log('✅ [DB] Seeded initial memories to Neon.');
      }

      // Check chapters
      const chapRes = await this.pool.query('SELECT COUNT(*) FROM story_chapters');
      if (parseInt(chapRes.rows[0].count, 10) === 0) {
        for (const c of INITIAL_CHAPTERS) {
          await this.pool.query(
            `INSERT INTO story_chapters (title_bn, title_en, description_bn, description_en, display_order, is_published)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [c.title_bn, c.title_en, c.description_bn, c.description_en, c.display_order, c.is_published]
          );
        }
      }

      // Check site content
      const contentRes = await this.pool.query('SELECT COUNT(*) FROM site_content');
      if (parseInt(contentRes.rows[0].count, 10) === 0) {
        for (const sc of INITIAL_SITE_CONTENT) {
          await this.pool.query(
            `INSERT INTO site_content (content_key, value_bn, value_en) VALUES ($1, $2, $3)`,
            [sc.content_key, sc.value_bn, sc.value_en]
          );
        }
      }

      // Check settings
      const setRes = await this.pool.query('SELECT COUNT(*) FROM site_settings');
      if (parseInt(setRes.rows[0].count, 10) === 0) {
        for (const [k, v] of Object.entries(INITIAL_SETTINGS)) {
          await this.pool.query(
            `INSERT INTO site_settings (setting_key, setting_value) VALUES ($1, $2)`,
            [k, v]
          );
        }
      }
    } catch (e) {
      console.warn('⚠️ [DB] Seeding defaults to Neon error:', e);
    }
  }

  // --- Auth operations ---
  public async findAdminByEmail(email: string): Promise<AdminUser | null> {
    const cleanEmail = email.trim().toLowerCase();
    if (this.isConnectedToNeon && this.pool) {
      const res = await this.pool.query('SELECT * FROM admin_users WHERE email = $1 LIMIT 1', [cleanEmail]);
      return res.rows[0] || null;
    }
    return this.memUsers.find((u) => u.email.toLowerCase() === cleanEmail) || null;
  }

  // --- Memories operations ---
  public async getMemories(publishedOnly = true, category?: string): Promise<MemoryRecord[]> {
    if (this.isConnectedToNeon && this.pool) {
      let query = 'SELECT * FROM memories WHERE 1=1';
      const params: (string | boolean)[] = [];
      if (publishedOnly) {
        params.push(true);
        query += ` AND is_published = $${params.length}`;
      }
      if (category && category !== 'all') {
        params.push(category);
        query += ` AND category = $${params.length}`;
      }
      query += ' ORDER BY display_order ASC, id ASC';
      const res = await this.pool.query(query, params);
      return res.rows;
    }

    let result = [...this.memMemories];
    if (publishedOnly) {
      result = result.filter((m) => m.is_published);
    }
    if (category && category !== 'all') {
      result = result.filter((m) => m.category === category);
    }
    return result.sort((a, b) => a.display_order - b.display_order || a.id - b.id);
  }

  public async createMemory(data: Omit<MemoryRecord, 'id' | 'created_at' | 'updated_at'>): Promise<MemoryRecord> {
    if (this.isConnectedToNeon && this.pool) {
      const res = await this.pool.query(
        `INSERT INTO memories (title_bn, title_en, caption_bn, caption_en, image_url, category, location, memory_date, is_featured, display_order, is_published)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
        [
          data.title_bn,
          data.title_en,
          data.caption_bn,
          data.caption_en,
          data.image_url,
          data.category || 'general',
          data.location || '',
          data.memory_date || '',
          data.is_featured ?? false,
          data.display_order || 0,
          data.is_published ?? true,
        ]
      );
      return res.rows[0];
    }

    const newRecord: MemoryRecord = {
      id: this.nextMemoryId++,
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.memMemories.push(newRecord);
    return newRecord;
  }

  public async updateMemory(id: number, data: Partial<MemoryRecord>): Promise<MemoryRecord | null> {
    if (this.isConnectedToNeon && this.pool) {
      const fields: string[] = [];
      const values: (string | number | boolean)[] = [];
      let idx = 1;

      Object.entries(data).forEach(([key, val]) => {
        if (key !== 'id' && key !== 'created_at') {
          fields.push(`${key} = $${idx++}`);
          values.push(val as string | number | boolean);
        }
      });
      fields.push(`updated_at = CURRENT_TIMESTAMP`);
      values.push(id);

      const query = `UPDATE memories SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
      const res = await this.pool.query(query, values);
      return res.rows[0] || null;
    }

    const idx = this.memMemories.findIndex((m) => m.id === id);
    if (idx === -1) return null;
    this.memMemories[idx] = {
      ...this.memMemories[idx],
      ...data,
      updated_at: new Date().toISOString(),
    };
    return this.memMemories[idx];
  }

  public async deleteMemory(id: number): Promise<boolean> {
    if (this.isConnectedToNeon && this.pool) {
      const res = await this.pool.query('DELETE FROM memories WHERE id = $1', [id]);
      return (res.rowCount ?? 0) > 0;
    }
    const lenBefore = this.memMemories.length;
    this.memMemories = this.memMemories.filter((m) => m.id !== id);
    return this.memMemories.length < lenBefore;
  }

  // --- Story Chapters operations ---
  public async getChapters(publishedOnly = true): Promise<StoryChapterRecord[]> {
    if (this.isConnectedToNeon && this.pool) {
      let query = 'SELECT * FROM story_chapters';
      if (publishedOnly) query += ' WHERE is_published = true';
      query += ' ORDER BY display_order ASC, id ASC';
      const res = await this.pool.query(query);
      return res.rows;
    }
    let res = [...this.memChapters];
    if (publishedOnly) res = res.filter((c) => c.is_published);
    return res.sort((a, b) => a.display_order - b.display_order);
  }

  public async createChapter(data: Omit<StoryChapterRecord, 'id'>): Promise<StoryChapterRecord> {
    if (this.isConnectedToNeon && this.pool) {
      const res = await this.pool.query(
        `INSERT INTO story_chapters (title_bn, title_en, description_bn, description_en, display_order, is_published)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [data.title_bn, data.title_en, data.description_bn, data.description_en, data.display_order || 0, data.is_published ?? true]
      );
      return res.rows[0];
    }
    const record: StoryChapterRecord = {
      id: this.nextChapterId++,
      ...data,
    };
    this.memChapters.push(record);
    return record;
  }

  public async updateChapter(id: number, data: Partial<StoryChapterRecord>): Promise<StoryChapterRecord | null> {
    if (this.isConnectedToNeon && this.pool) {
      const fields: string[] = [];
      const values: (string | number | boolean)[] = [];
      let idx = 1;
      Object.entries(data).forEach(([key, val]) => {
        if (key !== 'id') {
          fields.push(`${key} = $${idx++}`);
          values.push(val as string | number | boolean);
        }
      });
      fields.push(`updated_at = CURRENT_TIMESTAMP`);
      values.push(id);
      const res = await this.pool.query(`UPDATE story_chapters SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`, values);
      return res.rows[0] || null;
    }
    const idx = this.memChapters.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    this.memChapters[idx] = { ...this.memChapters[idx], ...data };
    return this.memChapters[idx];
  }

  public async deleteChapter(id: number): Promise<boolean> {
    if (this.isConnectedToNeon && this.pool) {
      const res = await this.pool.query('DELETE FROM story_chapters WHERE id = $1', [id]);
      return (res.rowCount ?? 0) > 0;
    }
    const lenBefore = this.memChapters.length;
    this.memChapters = this.memChapters.filter((c) => c.id !== id);
    return this.memChapters.length < lenBefore;
  }

  // --- Site Content operations ---
  public async getAllContent(): Promise<Record<string, { bn: string; en: string }>> {
    const result: Record<string, { bn: string; en: string }> = {};
    if (this.isConnectedToNeon && this.pool) {
      const res = await this.pool.query('SELECT * FROM site_content');
      res.rows.forEach((r) => {
        result[r.content_key] = { bn: r.value_bn, en: r.value_en };
      });
      return result;
    }
    this.memContent.forEach((v, k) => {
      result[k] = { bn: v.value_bn, en: v.value_en };
    });
    return result;
  }

  public async updateContent(key: string, value_bn: string, value_en: string): Promise<void> {
    if (this.isConnectedToNeon && this.pool) {
      await this.pool.query(
        `INSERT INTO site_content (content_key, value_bn, value_en, updated_at)
         VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
         ON CONFLICT (content_key)
         DO UPDATE SET value_bn = $2, value_en = $3, updated_at = CURRENT_TIMESTAMP`,
        [key, value_bn, value_en]
      );
      return;
    }
    this.memContent.set(key, { content_key: key, value_bn, value_en });
  }

  // --- Site Settings operations ---
  public async getAllSettings(): Promise<Record<string, string>> {
    const result: Record<string, string> = {};
    if (this.isConnectedToNeon && this.pool) {
      const res = await this.pool.query('SELECT * FROM site_settings');
      res.rows.forEach((r) => {
        result[r.setting_key] = r.setting_value;
      });
      return result;
    }
    this.memSettings.forEach((v, k) => {
      result[k] = v;
    });
    return result;
  }

  public async updateSetting(key: string, value: string): Promise<void> {
    if (this.isConnectedToNeon && this.pool) {
      await this.pool.query(
        `INSERT INTO site_settings (setting_key, setting_value, updated_at)
         VALUES ($1, $2, CURRENT_TIMESTAMP)
         ON CONFLICT (setting_key)
         DO UPDATE SET setting_value = $2, updated_at = CURRENT_TIMESTAMP`,
        [key, value]
      );
      return;
    }
    this.memSettings.set(key, value);
  }

  // --- Stats for Admin Overview ---
  public async getStats() {
    const memories = await this.getMemories(false);
    const chapters = await this.getChapters(false);
    return {
      totalMemories: memories.length,
      publishedMemories: memories.filter((m) => m.is_published).length,
      draftMemories: memories.filter((m) => !m.is_published).length,
      birthdayMemories: memories.filter((m) => m.category === 'birthday_last_year').length,
      storyChapters: chapters.length,
      databaseType: this.isConnectedToNeon ? 'Neon Serverless PostgreSQL (Live)' : 'In-Memory Persistent Store (Awaiting Neon DATABASE_URL)',
    };
  }
}

export const dbService = new DatabaseService();
