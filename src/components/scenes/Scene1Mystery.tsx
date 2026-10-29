import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../../config/content';
import { audioManager } from '../../utils/audio';

interface Scene1MysteryProps {
  onOpenSurprise: () => void;
}

export const Scene1Mystery: React.FC<Scene1MysteryProps> = ({ onOpenSurprise }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    audioManager.playTransition();
    
    // Start background music seamlessly on user gesture
    audioManager.playBackgroundMusic();

    setTimeout(() => {
      onOpenSurprise();
    }, 900);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center px-4 py-16 overflow-hidden bg-ivory text-warmCharcoal">
      {/* Delicate background ambient gradient spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-champagne/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-mutedMauve/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center text-center">
        {/* Subtle decorative motif */}
        <div className="flex items-center gap-2 mb-8 text-antiqueGold tracking-widest text-xs uppercase font-serif">
          <span>—</span>
          <span>A Private Surprise</span>
          <span>—</span>
        </div>

        {/* The Animated Sealed Gift / Wax Sealed Box */}
        <div
          onClick={handleClick}
          className={`cursor-pointer group relative my-6 transition-all duration-700 ${
            isOpening ? 'scale-110 opacity-70' : 'hover:scale-105'
          }`}
        >
          {/* Soft ambient shadow ring */}
          <div className="absolute -inset-6 bg-champagne/60 rounded-3xl blur-xl group-hover:bg-dustyRose/20 transition-all duration-500" />

          {/* Luxury Gift / Letter Box */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 bg-gradient-to-b from-[#FAF7F2] to-[#ECE3D5] rounded-3xl border-2 border-champagne shadow-2xl p-6 flex flex-col items-center justify-center overflow-hidden">
            {/* Elegant ribbon horizontal & vertical */}
            <div className="absolute inset-x-0 h-8 bg-gradient-to-r from-dustyRose/70 via-dustyRose to-dustyRose/70 shadow-sm" />
            <div className="absolute inset-y-0 w-8 bg-gradient-to-b from-dustyRose/70 via-dustyRose to-dustyRose/70 shadow-sm" />

            {/* Central Antique Gold Wax Stamp */}
            <div className="relative z-20 w-20 h-20 rounded-full bg-gradient-to-tr from-antiqueGold via-[#DFC38E] to-antiqueGold shadow-lg border-2 border-ivory flex items-center justify-center transform group-hover:rotate-6 transition-transform">
              <div className="w-16 h-16 rounded-full border border-dashed border-deepPlum/30 flex flex-col items-center justify-center">
                <span className="font-serif text-2xl font-bold text-deepPlum">
                  M
                </span>
                <span className="text-[9px] uppercase tracking-widest text-deepPlum/70 font-sans">
                  Batparss
                </span>
              </div>
            </div>

            {/* Subtle glow sparkles */}
            <div className="absolute top-4 right-4">
              <Sparkles className="w-4 h-4 text-antiqueGold/70 animate-pulse-gentle" />
            </div>
            <div className="absolute bottom-4 left-4">
              <Sparkles className="w-4 h-4 text-antiqueGold/70 animate-pulse-gentle" />
            </div>
          </div>
        </div>

        {/* Text Presentation */}
        <div className="space-y-2 mt-4 max-w-md">
          <p className="font-serif text-2xl sm:text-3xl text-deepPlum font-medium tracking-tight">
            "{SITE_CONFIG.mystery.leadText}"
          </p>
          <p className="font-bengali text-lg sm:text-xl text-dustyRose font-normal">
            {SITE_CONFIG.mystery.banglaText}
          </p>
        </div>

        {/* Interactive Button */}
        <div className="mt-8">
          <button
            onClick={handleClick}
            disabled={isOpening}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-deepPlum text-ivory font-sans text-sm font-medium tracking-wide shadow-lg shadow-deepPlum/20 hover:bg-warmCharcoal hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>{isOpening ? 'Opening...' : SITE_CONFIG.mystery.buttonLabel}</span>
            <ArrowRight className="w-4 h-4 text-antiqueGold group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
