import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../../config/content';
import { audioManager } from '../../utils/audio';
import { GiftBox3D } from '../3d/GiftBox3D';

interface Scene1MysteryProps {
  onOpenSurprise: () => void;
}

export const Scene1Mystery: React.FC<Scene1MysteryProps> = ({ onOpenSurprise }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    audioManager.playTransition();
    audioManager.playBackgroundMusic();

    setTimeout(() => {
      onOpenSurprise();
    }, 1100);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center px-4 py-12 overflow-hidden bg-ivory text-warmCharcoal">
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-champagne/45 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-dustyRose/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center text-center">
        {/* Subtle Luxury Motif */}
        <div className="flex items-center gap-2 mb-4 text-antiqueGold tracking-widest text-xs uppercase font-serif">
          <span>—</span>
          <span>A Private Birthday Gift</span>
          <span>—</span>
        </div>

        {/* Real 3D Interactive Floating Gift Box */}
        <div className="relative my-2 flex items-center justify-center">
          <GiftBox3D isOpening={isOpening} onClick={handleOpen} />
        </div>

        {/* Text Presentation */}
        <div className="space-y-2 max-w-md mt-2">
          <p className="font-serif text-2xl sm:text-3xl text-deepPlum font-medium tracking-tight">
            "{SITE_CONFIG.mystery.leadText}"
          </p>
          <p className="font-bengali text-lg sm:text-xl text-dustyRose font-normal">
            {SITE_CONFIG.mystery.banglaText}
          </p>
        </div>

        {/* Single Clear Action Button */}
        <div className="mt-8">
          <button
            onClick={handleOpen}
            disabled={isOpening}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-deepPlum text-ivory font-sans text-sm font-semibold tracking-wide shadow-xl shadow-deepPlum/20 hover:bg-warmCharcoal hover:scale-105 active:scale-98 transition-all duration-300"
          >
            <span>{isOpening ? 'Opening...' : SITE_CONFIG.mystery.buttonLabel}</span>
            <ArrowRight className="w-4 h-4 text-antiqueGold group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
