# MAHIMA × BATPARSS — LINKEDIN SHOWCASE & PORTFOLIO DELIVERABLE

A bespoke, interactive digital birthday experience crafted by **Batparss** for **Mahima**, celebrating genuine friendship, shared laughter, and travel memories from Sreemangal, Sylhet, Bangladesh.

---

## 1. CINEMATIC SHOWCASE VIDEO (16:9, 1080p, 30fps)

An actual, verified 35-second portfolio showcase video has been compiled and saved to:
`public/video/mahima-batparss-showcase.mp4`

*(Directly streamable / downloadable at `/video/mahima-batparss-showcase.mp4` in the running web application)*

### Storyboard Breakdown (35 Seconds):
* **0–4s: The Mystery Opening**  
  *Visual:* Warm ivory background (#F8F4EE) with a sealed gift envelope bearing an antique gold wax seal ("M" monogram).  
  *On-screen Text:* `"A birthday surprise, designed with memories."`  
  *Sound:* Soft ambient chime.  
  *Confidentiality:* No private message is revealed.

* **4–9s: The Interactive Cake Ceremony**  
  *Visual:* Tiered ivory and blush birthday cake with flickering candle flames on deep plum backdrop.  
  *Action:* Candles extinguish on click or gentle breath, smoke curls up, golden confetti bursts.  
  *On-screen Text:* `"Make a wish and blow out the candles" → "HAPPY BIRTHDAY, MAHIMA!"`

* **9–15s: Batparss Presents & Friendship Chaos**  
  *Visual:* Editorial typography and candid friend frames.  
  *On-screen Text:* `"BATPARSS PRESENTS — Mahima's Birthday Special. One birthday girl. One chaotic gang. So many stories."`  
  *Copy:* `"Ekta group. Onek gula pagol. Countless memories."`

* **15–22s: Sreemangal Chronicles**  
  *Visual:* Scenic tea gardens and tour moments from Sylhet, Bangladesh with natural color grading.  
  *On-screen Text:* `"SREEMANGAL CHRONICLES — Somewhere between the journey and the destination, we made memories."`

* **22–28s: Design Details & The Keepsake Letter**  
  *Visual:* Elegant envelope opening animation with champagne borders.  
  *Confidentiality:* The confidential body text of the personal letter is kept private in public showcase footage.  
  *On-screen Text:* `"There is one more thing we wanted to tell you... A Letter from Batparss."`

* **28–35s: Closing Signature**  
  *Visual:* Deep plum and gold typography seal with warm glowing particles.  
  *On-screen Text:*  
  `"MAHIMA × BATPARSS"`  
  `"An interactive birthday experience."`  
  `"Designed with friendship. Built with memories."`

---

## 2. LINKEDIN POST CAPTION

```text
A digital gift for a friend > A standard birthday card ✨

For our friend Mahima's birthday, our friend group (Batparss) decided to build something personal rather than sending a generic message.

I designed and engineered an interactive birthday experience: "Mahima × Batparss".

Key highlights:
• Staged storytelling: The experience unlocks progressively across 10 distinct scenes rather than dumping everything onto a single page.
• Interactive candle ceremony: Tiered 3D cake with realistic flame physics, interactive candle extinguishing, and optional audio breath detection via Web Audio API.
• Sreemangal Chronicles: An editorial travel chapter honoring our recent group trip to Sreemangal, Sylhet, Bangladesh — preserving natural skin tones and organic landscapes.
• The Keepsake Letter: A sealed vintage stationery letter that unfolds with smooth state transitions.
• Zero-dependency audio engine: Synthesizes melodic chimes, candle extinguishing puffs, and ambient harmonies via Web Audio API, with local MP3 playback support.

Tech Stack: React 18, TypeScript, Tailwind CSS, Web Audio API, Canvas Confetti, Vite.

Because the best way to celebrate friends is by turning shared memories into timeless experiences. 🎂🌸

#FrontendDevelopment #WebDesign #ReactJS #TypeScript #CreativeCoding #UIUX #InteractiveDesign #WebAudioAPI #Portfolio
```

---

## 3. HOW TO PERSONALIZE REAL TRIP PHOTOGRAPHS & AUDIO

### Option A: In-Browser Instant Replacement
1. Click the **"Photos"** button in the top navigation bar.
2. Click **"Replace Photo"** on any card to select your actual trip photos directly from your device.
3. The photo updates immediately in all story chapters and persists in `localStorage`.

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
   git commit -m "feat: Mahima x Batparss Birthday Website"
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
2. In Chrome DevTools Command Menu (`Ctrl+Shift+P`), type `Capture node screenshot` or use OBS Studio / QuickTime to record the 10-chapter reveal in real-time.
