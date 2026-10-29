# MAHIMA × BATPARSS — LINKEDIN SHOWCASE & PORTFOLIO DELIVERABLE

A cinematic, interactive 3D digital birthday experience crafted by **Batparss** for **Mahima**, celebrating genuine friendship, spontaneous plans, and travel memories from Sreemangal, Sylhet, Bangladesh.

---

## 1. CINEMATIC SHOWCASE VIDEO (16:9, 1080p, 30fps)

An actual, verified 35-second portfolio showcase video has been compiled and saved to:
`public/video/mahima-batparss-showcase.mp4`

*(Directly streamable / downloadable at `/video/mahima-batparss-showcase.mp4` in the running web application)*

### Storyboard Breakdown (35 Seconds):
* **0–4s: The 3D Mystery Opening**  
  *Visual:* Real-time 3D floating gift box in warm ivory (#FAF7F2) with champagne highlights, dusty-rose ribbon bands, and antique gold wax seal medallion.  
  *On-screen Text:* `"A birthday surprise, designed with memories."`  
  *Sound:* Soft ambient chime.  
  *Confidentiality:* No private message is revealed.

* **4–9s: The 3D Cake & One-Action Extinguishing**  
  *Visual:* Stylized 3D cylindrical tiered cake with ivory frosting, delicate blush details, porcelain stand, and animated candle flame lighting on a deep plum backdrop.  
  *Action:* A single action extinguishes all candles simultaneously with flame fading, smoke particle system, and light drop.  
  *On-screen Text:* `"HAPPY BIRTHDAY, MAHIMA!" → "A little surprise, made with love by Batparss"`

* **9–14s: Batparss Presents & Friendship Chaos**  
  *Visual:* Editorial typography and candid friend frames.  
  *On-screen Text:* `"BATPARSS PRESENTS — One birthday girl. One chaotic gang. So many stories."`  
  *Copy:* `"Ekta group. Onek gula pagol. Countless memories."`

* **14–23s: Sreemangal Chronicles**  
  *Visual:* Panoramic tea garden landscape and road trip memories from Sylhet, Bangladesh with natural color grading and organic skin tones.  
  *On-screen Text:* `"SREEMANGAL CHRONICLES — Somewhere between the journey and the destination, we made memories."`

* **23–28s: Design Details & The Keepsake Letter**  
  *Visual:* 3D perspective sealed envelope with gold wax seal.  
  *Confidentiality:* The confidential body text of the personal letter is kept private in public showcase footage.  
  *On-screen Text:* `"There is one more thing we wanted to tell you... A Letter from Batparss."`

* **28–35s: Closing Signature**  
  *Visual:* Deep plum and gold typography seal with warm glowing particles.  
  *On-screen Text:*  
  `"MAHIMA × BATPARSS"`  
  `"An Interactive Birthday Experience"`  
  `"Designed with friendship. Built with memories."`

---

## 2. LINKEDIN POST CAPTION

```text
An interactive digital short film for a friend > A standard birthday card ✨

For our friend Mahima's birthday, our friend group (Batparss) wanted to build something personal and memorable rather than sending a generic message.

I designed and engineered an interactive 3D birthday experience: "Mahima × Batparss".

Key highlights:
• Reduced interaction friction: Replaced repetitive multi-step wizard screens with an effortless, continuous cinematic flow (~4 total meaningful interactions).
• Real-time 3D Graphics: Interactive Three.js WebGL gift box with physics bobbing & opening animation, and a stylized 3D tiered birthday cake with dynamic point-light flame illumination and smoke particle dissipation.
• Sreemangal Chronicles: An editorial travel chapter honoring our recent group trip to Sreemangal, Sylhet, Bangladesh — preserving natural skin tones and organic landscapes.
• The Keepsake Letter: A realistic 3D perspective envelope with gold wax seal that unfolds with smooth state transitions.
• Zero-dependency audio engine: Synthesizes melodic chimes, candle extinguishing puffs, and ambient harmonies via Web Audio API, with local MP3 playback support.

Tech Stack: React 18, Three.js, WebGL, TypeScript, Tailwind CSS, Web Audio API, Canvas Confetti, Vite.

Because the best way to celebrate friends is by turning shared memories into timeless experiences. 🎂🌸

#FrontendDevelopment #WebDesign #ThreeJS #WebGL #ReactJS #TypeScript #CreativeCoding #UIUX #InteractiveDesign #WebAudioAPI #Portfolio
```

---

## 3. HOW TO PERSONALIZE REAL TRIP PHOTOGRAPHS & AUDIO

### Option A: In-Browser Instant Replacement (Admin Mode)
1. Add `?admin=true` to the URL or press `Alt + P` on your keyboard.
2. Click **"Admin Photos"** in the top navigation bar or the footer gear icon.
3. Click **"Replace Photo"** on any card to select your actual trip photos directly from your device.
4. The photo updates immediately in all story chapters and persists in `localStorage`.

### Option B: Local File System
Drop your real photographs directly into the project's `public/` folder:
- **Mahima's Portrait:** `public/images/birthday/mahima-portrait-01.jpg`
- **Batparss Group:** `public/images/batparss/group-01.jpg` & `candid-01.jpg`
- **Sreemangal Tour:** `public/images/sreemangal/tour-01.jpg`, `tea-garden-01.jpg`, `group-memory-01.jpg`
- **Optional Background Music:** `public/audio/birthday-bg.mp3`

---

## 4. LOCAL DEVELOPMENT & VERCEL DEPLOYMENT GUIDE

### Running Locally:
```bash
# 1. Install dependencies
npm install

# 2. Start dev server on port 3000
npm run dev

# 3. Open in browser:
http://localhost:3000
```

### Deploying to Vercel:
1. Push the repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: Mahima x Batparss Cinematic 3D Website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/mahima-birthday-present.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset: **Vite** (auto-detected).
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **"Deploy"**. Your live URL will be ready in ~30 seconds!

---

## 5. RE-GENERATING OR RECORDING SHOWCASE VIDEO LOCALLY

To re-render the showcase video using ffmpeg:
```bash
./scripts/generate_showcase_video.sh
```
Or to screen record the live website in Google Chrome:
1. Open DevTools (`F12`), toggle Device Toolbar (`Ctrl+Shift+M`), and set resolution to `1920x1080` at 100% zoom.
2. In Chrome DevTools Command Menu (`Ctrl+Shift+P`), type `Capture node screenshot` or use OBS Studio / QuickTime to record the journey in real-time.
