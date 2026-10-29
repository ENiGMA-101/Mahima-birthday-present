# Mahima × Batparss — Cinematic Birthday Experience

An interactive, 3D digital gift and editorial birthday journey created for **Mahima** by her friends in **Batparss**, commemorating shared adventures including their trip to Sreemangal, Sylhet, Bangladesh.

---

## 🌟 Key Features

### 1. Minimal Interaction Budget (~4 Intuitive Actions)
- **Action 1: Unseal the Surprise** — Interactive real-time 3D Three.js gift box with realistic lid rotation and soft lighting.
- **Action 2: Extinguish Candles** — Single-action 3D porcelain pedestal tiered cake with dynamic point lights, glowing flame meshes, and rising smoke particle dissipation.
- **Action 3: Open Keepsake Letter** — Interactive wax seal envelope revealing Batparss's heartfelt birthday message.
- **Action 4: Replay Experience** — Seamless restart button at the grand finale toast.

### 2. Strict Bilingual Language System (বাংলা | English)
- **Authentic Bengali Script (`বাংলা হরফ`)**: All Bengali text is written in proper, natural Bengali script — strictly **zero** Romanized Bengali ("Banglish").
- **Real-Time Toggle**: Unobtrusive toggle in the header (**বাংলা | English**) with zero-reload dynamic rendering and `localStorage` persistence.

### 3. Continuous Moving Photo Gallery
- Seamless right-to-left marquee photo reel with dual parallax rows.
- Interactive controls: Pause on hover/click, Resume, Previous, Next.
- High-resolution modal lightbox with full metadata (date, location, bilingual captions).

### 4. Dedicated Last-Year's Birthday Memory Section
- Dedicated keepsake showcase looking back at Mahima's previous birthday celebrations with Batparss.
- Fullscreen modal viewer, location stamps, and friendship notes.

### 5. Protected Admin Dashboard (`/admin` or `#admin`)
- **Real JWT Authentication**: Secure password hashing with bcrypt, session verification, and cookie storage.
- **Live Statistics Overview**: Total memories, published vs. drafts, story chapters, and active database status.
- **Photo Memories Manager**: Add, edit, or delete photos with local file uploads via Multer (`/api/admin/uploads`) or external URLs.
- **Story Chapters & Letter Editor**: Full editing suite for bilingual greetings, letter paragraphs, and narrative arcs.
- **Appearance & Settings**: Custom scroll duration and section visibility toggles.

### 6. Neon Serverless PostgreSQL & Resilient In-Memory Fallback
- Direct connection via `@neondatabase/serverless`.
- Auto-executing SQL migrations on boot (`server/migrations.sql`).
- Graceful in-memory persistent fallback if `DATABASE_URL` is omitted, guaranteeing zero startup crashes.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Three.js, Lucide Icons, Canvas Confetti.
- **Backend**: Node.js, Express, Multer, JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, Cookie Parser.
- **Database**: Neon Serverless PostgreSQL (`@neondatabase/serverless`).
- **Media**: Custom FFmpeg-rendered 35s 1080p 30fps showcase video (`public/video/mahima-batparss-showcase.mp4`).

---

## 🚀 Quick Start & Local Development

1. **Clone and Install Dependencies**:
   ```bash
   git clone https://github.com/ENiGMA-101/Mahima-birthday-present.git
   cd Mahima-birthday-present
   npm install
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

   To connect your Neon PostgreSQL instance, paste your connection string into `DATABASE_URL`:
   ```env
   DATABASE_URL=postgres://[user]:[password]@[endpoint].neon.tech/[dbname]?sslmode=require
   ```
   *(If left empty, the application automatically uses the built-in persistent in-memory fallback.)*

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The application will be live at `http://localhost:3000`.

4. **Access the Admin Dashboard**:
   Navigate to `http://localhost:3000/#admin` or click the subtle 🔒 icon in the footer / shield in the header.
   - **Default Email**: `admin@batparss.com`
   - **Default Password**: `batparss2026`

---

## 🎬 Showcase Video

A LinkedIn-ready 1080p 30fps showcase MP4 is available at:
`public/video/mahima-batparss-showcase.mp4`

Technical details and LinkedIn post copy are documented in `LINKEDIN_SHOWCASE.md`.
