import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Calendar,
  X,
  Maximize2,
  Mail,
  Heart,
  Copy,
  Check,
  Feather,
  RotateCcw,
  Sparkles,
  Quote,
  Sun,
  Shield,
  Mountain,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SITE_CONFIG, PhotoMemory } from '../config/content';
import { audioManager } from '../utils/audio';

interface StoryJourneyProps {
  photos: PhotoMemory[];
  onReplay: () => void;
}

export const StoryJourney: React.FC<StoryJourneyProps> = ({ photos, onReplay }) => {
  // Lightbox state for photos
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMemory | null>(null);

  // Letter open state (meaningful interaction #3)
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [copiedLetter, setCopiedLetter] = useState(false);

  // Group and portrait photos
  const groupPhoto = photos.find((p) => p.category === 'batparss') || photos[2] || photos[0];
  const candidPhoto = photos.find((p) => p.src.includes('candid')) || photos[5] || photos[1];
  const spotlightPhoto = photos.find((p) => p.category === 'spotlight') || photos[3] || photos[0];
  const sreemangalPhotos = photos.filter((p) => p.category === 'sreemangal');

  const handleOpenLetter = () => {
    audioManager.playCelebrationSparkle();
    setIsLetterOpen(true);
  };

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(SITE_CONFIG.letter.content);
    setCopiedLetter(true);
    audioManager.playChime(800, 0.4, 0.1);
    setTimeout(() => setCopiedLetter(false), 2200);
  };

  const handleToastCelebration = () => {
    audioManager.playCelebrationSparkle();
    confetti({
      particleCount: 65,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#C6A56B', '#C88F91', '#F8F4EE', '#E8D8C5', '#A78B9A'],
    });
  };

  return (
    <div className="w-full text-warmCharcoal animate-fade-in">
      {/* =========================================================================
          CHAPTER 1: BATPARSS PRESENTS
         ========================================================================= */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 py-24 overflow-hidden bg-ivory">
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-champagne/45 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-dustyRose/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne/40 border border-champagne text-deepPlum text-xs font-serif uppercase tracking-widest mb-6">
            <Compass className="w-3.5 h-3.5 text-antiqueGold" />
            <span>{SITE_CONFIG.welcome.badge}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-deepPlum font-bold tracking-tight leading-tight max-w-2xl">
            {SITE_CONFIG.welcome.mainTitle}
          </h1>

          <p className="mt-4 font-serif italic text-xl sm:text-2xl text-dustyRose max-w-xl">
            "{SITE_CONFIG.welcome.tagline}"
          </p>

          <p className="mt-4 font-sans text-sm sm:text-base text-warmCharcoal/80 max-w-lg leading-relaxed">
            {SITE_CONFIG.welcome.description}
          </p>

          {/* Group Photo Vignette */}
          {groupPhoto && (
            <div className="relative mt-10 max-w-md w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border-4 border-ivory ring-1 ring-champagne group">
              <img
                src={groupPhoto.src}
                alt="The Batparss Circle"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deepPlum/70 via-transparent to-transparent flex items-end p-5">
                <span className="text-xs font-serif text-ivory tracking-wider">
                  The Batparss Circle • Bangladesh
                </span>
              </div>
            </div>
          )}

          <div className="mt-12 text-xs text-mutedMauve tracking-widest uppercase font-serif animate-bounce">
            Scroll to continue the story ↓
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 2: OUR FRIENDSHIP, OUR CHAOS
         ========================================================================= */}
      <section className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-ivory via-champagne/25 to-ivory">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-16">
            <span className="inline-block text-xs uppercase tracking-widest font-serif font-semibold text-antiqueGold mb-2">
              {SITE_CONFIG.chaos.badge}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-deepPlum font-bold tracking-tight">
              {SITE_CONFIG.chaos.title}
            </h2>
            <p className="font-sans text-xs text-mutedMauve mt-1 uppercase tracking-wider">
              Unfiltered • Loud • Irreplaceable
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Flowing dialogue without clicking individual cards */}
            <div className="lg:col-span-7 space-y-4">
              {SITE_CONFIG.chaos.quotes.map((q, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/70 backdrop-blur-sm border border-champagne/60 shadow-sm hover:border-antiqueGold hover:bg-white transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <span className="font-serif text-lg font-bold text-dustyRose select-none">
                      0{idx + 1}.
                    </span>
                    <div>
                      <p className="font-bengali text-lg sm:text-xl font-medium text-deepPlum leading-snug">
                        {q.bengali}
                      </p>
                      <p className="font-sans text-xs sm:text-sm text-warmCharcoal/70 mt-1 italic">
                        {q.english}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Candid Scrapbook Frame with slight natural tilt */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm aspect-[4/5] bg-white p-3.5 pb-8 rounded-2xl shadow-2xl border border-champagne rotate-1 hover:rotate-0 transition-transform duration-500 group">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-champagne/70 rounded-sm -rotate-2 shadow-inner" />
                <div className="w-full h-full bg-champagne/20 rounded-xl overflow-hidden relative">
                  <img
                    src={candidPhoto.src}
                    alt="Batparss Adda Moment"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="mt-3 text-center">
                  <span className="font-script text-2xl text-deepPlum font-bold">
                    The Batparss Chaos ❤️
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 3: SREEMANGAL CHRONICLES (Photographic Centerpiece)
         ========================================================================= */}
      <section className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-warmCharcoal via-deepPlum to-warmCharcoal text-ivory">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-dustyRose/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-ivory/10 border border-ivory/20 text-antiqueGold text-xs uppercase tracking-widest font-serif mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>SYLHET, BANGLADESH</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory font-bold tracking-tight">
              {SITE_CONFIG.sreemangal.title}
            </h2>

            <p className="mt-3 font-serif italic text-lg sm:text-2xl text-champagne">
              "{SITE_CONFIG.sreemangal.subtitle}"
            </p>

            <p className="mt-3 font-sans text-xs sm:text-sm text-ivory/70 max-w-lg mx-auto leading-relaxed">
              {SITE_CONFIG.sreemangal.narrative}
            </p>
          </div>

          {/* Cinematic Photo Sequence */}
          <div className="space-y-12">
            {/* 1. Large Viewport Panoramic Hero */}
            {photos[0] && (
              <div
                onClick={() => setSelectedPhoto(photos[0])}
                className="group cursor-pointer relative rounded-3xl overflow-hidden bg-deepPlum/40 border border-champagne/20 shadow-2xl transition-all duration-500 hover:border-antiqueGold/60"
              >
                <div className="aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden relative">
                  <img
                    src={photos[0].src}
                    alt={photos[0].title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deepPlum via-deepPlum/20 to-transparent flex flex-col justify-end p-6 sm:p-12">
                    <div className="flex items-center gap-2 text-xs text-antiqueGold uppercase tracking-wider mb-1 font-serif">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{photos[0].location || 'Sreemangal, Sylhet'}</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-4xl text-ivory font-bold">
                      {photos[0].title}
                    </h3>
                    <p className="font-bengali text-champagne/90 text-sm sm:text-lg mt-1 font-normal max-w-2xl">
                      "{photos[0].caption}"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Asymmetric Two-Photo Composition */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {photos[1] && (
                <div
                  onClick={() => setSelectedPhoto(photos[1])}
                  className="md:col-span-7 group cursor-pointer bg-ivory/5 p-4 rounded-2xl border border-champagne/20 shadow-xl hover:border-antiqueGold/50 transition-all"
                >
                  <div className="aspect-[4/3] w-full rounded-xl overflow-hidden relative bg-black/20">
                    <img
                      src={photos[1].src}
                      alt={photos[1].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 p-2 rounded-full bg-deepPlum/70 text-ivory opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="pt-4 px-1">
                    <p className="font-bengali text-base sm:text-lg text-champagne font-medium">
                      "{photos[1].caption}"
                    </p>
                    <p className="font-sans text-xs text-antiqueGold/80 mt-1">
                      {photos[1].location || 'Tea Gardens of Sreemangal'}
                    </p>
                  </div>
                </div>
              )}

              {photos[4] && (
                <div
                  onClick={() => setSelectedPhoto(photos[4])}
                  className="md:col-span-5 group cursor-pointer bg-ivory/5 p-4 rounded-2xl border border-champagne/20 shadow-xl hover:border-antiqueGold/50 transition-all"
                >
                  <div className="aspect-[3/4] w-full rounded-xl overflow-hidden relative bg-black/20">
                    <img
                      src={photos[4].src}
                      alt={photos[4].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 p-2 rounded-full bg-deepPlum/70 text-ivory opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="pt-4 px-1">
                    <p className="font-bengali text-base sm:text-lg text-champagne font-medium">
                      "{photos[4].caption}"
                    </p>
                    <p className="font-sans text-xs text-antiqueGold/80 mt-1">
                      {photos[4].location || 'The Scenic Trails'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 4: MAHIMA'S SPOTLIGHT & MEMORY MONTAGE (Combined!)
         ========================================================================= */}
      <section className="relative py-28 px-4 overflow-hidden bg-ivory text-warmCharcoal">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-champagne/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-dustyRose/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          {/* Header Tribute */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-champagne/40 border border-champagne text-dustyRose text-xs font-serif uppercase tracking-widest mb-4">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>{SITE_CONFIG.spotlight.badge}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-deepPlum font-bold tracking-tight">
              {SITE_CONFIG.spotlight.title}
            </h2>

            <p className="mt-4 font-serif italic text-lg sm:text-2xl text-dustyRose">
              "{SITE_CONFIG.spotlight.subtitle}"
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
            {/* Portrait Frame */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-xs aspect-[3/4] bg-white p-3 pb-8 rounded-2xl shadow-2xl border border-champagne transform -rotate-1 hover:rotate-0 transition-transform duration-500 group">
                <div className="w-full h-full bg-champagne/20 rounded-xl overflow-hidden relative">
                  <img
                    src={spotlightPhoto.src}
                    alt="Mahima"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="mt-3 text-center">
                  <span className="font-serif text-sm uppercase tracking-widest font-bold text-deepPlum">
                    Mahima • Birthday 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Wishes Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SITE_CONFIG.spotlight.wishes.map((wish, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/70 backdrop-blur-sm border border-champagne/80 shadow-sm hover:border-antiqueGold hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-champagne/30 flex items-center justify-center mb-3">
                    {idx === 0 && <Sun className="w-5 h-5 text-antiqueGold" />}
                    {idx === 1 && <Shield className="w-5 h-5 text-softSage" />}
                    {idx === 2 && <Sparkles className="w-5 h-5 text-dustyRose" />}
                    {idx === 3 && <Mountain className="w-5 h-5 text-mutedMauve" />}
                  </div>
                  <h4 className="font-serif text-lg font-bold text-deepPlum mb-1">
                    {wish.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-warmCharcoal/70 leading-relaxed">
                    {wish.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Overlapping Memory Montage */}
          <div className="pt-10 border-t border-champagne/60">
            <h3 className="font-serif text-2xl font-bold text-deepPlum text-center mb-8">
              Moments Frozen in Time
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {photos.map((photo, i) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group cursor-pointer bg-white p-2 pb-4 rounded-xl shadow-md border border-champagne/60 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <div className="aspect-square w-full rounded-lg overflow-hidden bg-champagne/20 mb-2">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="font-serif text-xs font-semibold text-deepPlum truncate text-center">
                    {photo.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 5: A LETTER FROM BATPARSS (Meaningful Interaction)
         ========================================================================= */}
      <section className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-champagne/20 via-ivory to-champagne/30 text-warmCharcoal">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-dustyRose/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto w-full">
          {!isLetterOpen ? (
            /* SEALED ENVELOPE (Single Click Interaction) */
            <div className="flex flex-col items-center text-center animate-fade-in">
              <span className="inline-block text-xs uppercase tracking-widest font-serif font-semibold text-antiqueGold mb-3">
                — A Secret Keepsake —
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl text-deepPlum font-bold tracking-tight mb-8">
                "{SITE_CONFIG.letter.teaser}"
              </h2>

              <div
                onClick={handleOpenLetter}
                className="group cursor-pointer relative w-full max-w-md aspect-[16/10] bg-gradient-to-br from-[#FAF7F2] to-[#EAE1D3] rounded-3xl shadow-2xl border-2 border-champagne p-6 flex flex-col items-center justify-center transition-all duration-500 hover:scale-103 hover:border-antiqueGold"
              >
                <div className="absolute inset-0 border border-white/40 rounded-3xl pointer-events-none" />
                <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-champagne/50 to-transparent pointer-events-none" />

                {/* Wax Seal */}
                <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-antiqueGold via-[#DFC38E] to-antiqueGold shadow-xl border-2 border-ivory flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full border border-dashed border-deepPlum/30 flex flex-col items-center justify-center">
                    <Heart className="w-5 h-5 text-deepPlum fill-deepPlum" />
                    <span className="text-[9px] uppercase tracking-widest font-bold text-deepPlum mt-0.5">
                      Batparss
                    </span>
                  </div>
                </div>

                <p className="mt-4 font-serif text-deepPlum text-base sm:text-lg font-medium tracking-wide">
                  For: Mahima
                </p>
                <p className="text-xs text-dustyRose font-sans mt-0.5">
                  [Tap wax seal to open]
                </p>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleOpenLetter}
                  className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-deepPlum text-ivory font-sans text-sm font-semibold tracking-wide shadow-xl hover:bg-warmCharcoal hover:scale-105 transition-all"
                >
                  <Mail className="w-4 h-4 text-antiqueGold" />
                  <span>{SITE_CONFIG.letter.openButton}</span>
                </button>
              </div>
            </div>
          ) : (
            /* UNFOLDED LETTER ON WARM IVORY PAPER */
            <div className="relative bg-[#FAF7F2] rounded-3xl p-6 sm:p-12 shadow-2xl border-2 border-champagne animate-fade-up">
              <div className="flex items-center justify-between border-b border-champagne pb-4 mb-8">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-deepPlum text-ivory flex items-center justify-center">
                    <Feather className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-deepPlum text-sm sm:text-base">
                      From Batparss with Love
                    </h4>
                    <p className="text-xs text-mutedMauve">For Mahima • Birthday 2026</p>
                  </div>
                </div>

                <button
                  onClick={handleCopyLetter}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-champagne/40 hover:bg-champagne text-deepPlum text-xs font-medium transition-all"
                  title="Copy letter text"
                >
                  {copiedLetter ? <Check className="w-3.5 h-3.5 text-dustyRose" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLetter ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="relative z-10 whitespace-pre-line font-bengali text-base sm:text-lg text-deepPlum/90 leading-relaxed space-y-4">
                {SITE_CONFIG.letter.content}
              </div>

              <div className="mt-10 pt-6 border-t border-champagne/80 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-dustyRose font-serif italic">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>Handcrafted by the Batparss Gang</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 6: GRAND FINALE & BATPARSS SIGNATURE (Combined!)
         ========================================================================= */}
      <section className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-deepPlum via-warmCharcoal to-deepPlum text-ivory">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-antiqueGold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ivory/10 border border-ivory/20 text-antiqueGold text-xs uppercase tracking-widest font-serif mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{SITE_CONFIG.celebration.kicker}</span>
          </div>

          <h3 className="font-serif italic text-2xl sm:text-3xl text-champagne mb-4 tracking-wide">
            "{SITE_CONFIG.celebration.heroText}"
          </h3>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ivory mb-6">
            {SITE_CONFIG.celebration.wishingHeading}
          </h2>

          <p className="font-bengali text-base sm:text-xl text-champagne/80 max-w-xl leading-relaxed mb-8">
            {SITE_CONFIG.signature.note}
          </p>

          {/* Toast Action */}
          <button
            onClick={handleToastCelebration}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-dustyRose to-antiqueGold text-ivory font-sans text-xs sm:text-sm font-semibold shadow-xl hover:scale-105 transition-all mb-10"
          >
            <Sparkles className="w-4 h-4 text-ivory" />
            <span>Toast with Batparss 🥂</span>
          </button>

          {/* BATPARSS Typographic Signature Seal */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-white to-[#F9F5EE] border-2 border-champagne shadow-2xl max-w-md w-full text-warmCharcoal flex flex-col items-center mb-10">
            <div className="w-14 h-14 rounded-full bg-deepPlum text-ivory flex items-center justify-center mb-3 shadow-md">
              <Compass className="w-6 h-6 text-antiqueGold" />
            </div>

            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.25em] text-deepPlum uppercase">
              BATPARSS
            </span>
            <span className="text-[10px] tracking-widest uppercase text-mutedMauve mt-1 font-sans">
              Sylhet • Dhaka • Forever Friends
            </span>

            <div className="mt-4 pt-4 border-t border-champagne/60 w-full flex items-center justify-center gap-1.5 text-xs text-dustyRose">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Dedicated with love to Mahima</span>
            </div>
          </div>

          {/* Replay Option */}
          <button
            onClick={() => {
              audioManager.playTransition();
              onReplay();
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-ivory text-deepPlum font-sans text-sm font-semibold tracking-wide shadow-xl hover:bg-champagne hover:scale-105 transition-all"
          >
            <RotateCcw className="w-4 h-4 text-antiqueGold" />
            <span>{SITE_CONFIG.signature.replayButton}</span>
          </button>
        </div>
      </section>

      {/* Lightbox Modal (Optional interaction) */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warmCharcoal/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-deepPlum border border-champagne/30 rounded-2xl p-4 sm:p-6 shadow-2xl text-ivory animate-fade-in">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-warmCharcoal/70 text-champagne hover:text-ivory"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] w-full rounded-xl overflow-hidden bg-black/40 flex items-center justify-center">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="max-h-[70vh] w-full object-contain"
              />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-champagne/20">
              <div>
                <h4 className="font-serif text-xl font-bold text-ivory">
                  {selectedPhoto.title}
                </h4>
                <p className="font-bengali text-champagne text-base mt-0.5">
                  "{selectedPhoto.caption}"
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-antiqueGold">
                {selectedPhoto.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {selectedPhoto.location}
                  </span>
                )}
                {selectedPhoto.date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedPhoto.date}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
