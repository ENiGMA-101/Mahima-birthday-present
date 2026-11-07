# Mahima × Batparss — Cinematic Birthday Experience

An interactive, 3D digital gift and editorial birthday journey created for **Mahima** by her friends in **Batparss**, commemorating shared adventures including their trip to Sreemangal, Sylhet, Bangladesh.

---

## 🌟 Key Features

### 1. 3D Animated Birthday Party Universe (Three.js)
- **3D Animated Girl (Mahima)**: A charming 3D stylized character dressed in a layered birthday party gown with party hat, blinking eyes, subtle breathing motion, smiling expressions, and head movements.
- **Interactive Cake Blowout**:
  1. *Preparation*: Leans forward and takes a deep breath.
  2. *Airflow & Wind*: Rushing 3D particle wind stream shoots from her mouth toward the candle wicks.
  3. *Flame Extinguish & Smoke*: Dynamic flames shrink and extinguish as wispy smoke particles billow upward.
  4. *Celebration Explosion*: Confetti bursts across the scene, colorful balloons float skyward, party lights flash, and flanking 3D Batparss friends jump, wave, and cheer!
- **Grand Birthday Reveal**: Celebratory banner with sound effects (applause, arpeggio melodies, synthesized Web Audio chimes).

### 2. "Little Surprises" Interactive Playground
- **3D Interactive Gift Boxes**: Click to unwrap real-time 3D gift boxes with animated lifting lids, dynamic ribbon rotations, and glowing surprise friendship keepsakes.
- **Floating Friendship Balloons**: Colorful bouncing balloons that pop with authentic Web Audio sound synthesis and confetti to reveal heartfelt secret notes from Batparss friends.

### 3. Strict Bilingual Language System (বাংলা | English)
- **Authentic Bengali Script (`বাংলা হরফ`)**: All Bengali text is written in natural, authentic Bengali script — strictly **zero** Romanized Bengali ("Banglish").
- **Real-Time Toggle**: Unobtrusive toggle in the floating header (**বাংলা | English**) with instant zero-reload dynamic rendering and `localStorage` persistence.

### 4. Continuous Moving Photo Gallery
- Seamless right-to-left marquee photo reel with dual parallax rows displaying genuine personal memories and Sreemangal trip captures.
- Interactive controls: Pause on hover/click, Resume, Previous, Next.
- High-resolution modal lightbox with full metadata (date, location, bilingual captions).

### 5. Dedicated Last-Year's Birthday Memory Section
- Dedicated keepsake showcase looking back at Mahima's previous birthday celebrations with Batparss.
- Fullscreen modal viewer, location stamps, and friendship notes.

### 6. Keepsake Letter & Wax Seal Reveal
- Interactive 3D wax seal envelope unfolding into an emotional birthday letter from Batparss with a heartfelt toast and replay option.

### 7. Protected Admin Dashboard (`/admin` or `#admin`)
- **Real JWT Authentication**: Secure password hashing with bcrypt, session verification, and token storage.
- **Little Surprises Manager**: Add, edit, or delete interactive gift boxes and balloons with custom reveal notes.
- **Photo Memories Manager**: Add, edit, or delete photos with local file uploads via Multer (`/api/admin/uploads`) or external URLs.
- **Story Chapters & Letter Editor**: Full editing suite for bilingual greetings, letter paragraphs, and narrative arcs.
- **Appearance & Settings**: Custom scroll duration and section visibility toggles.

### 8. Neon Serverless PostgreSQL & Resilient In-Memory Fallback
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
