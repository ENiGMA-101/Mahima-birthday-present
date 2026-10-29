import React, { useState, useEffect, useRef } from 'react';
import { Flame, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SITE_CONFIG } from '../../config/content';
import { audioManager } from '../../utils/audio';
import { Cake3D } from '../3d/Cake3D';

interface Scene2CakeProps {
  onContinue: () => void;
}

export const Scene2Cake: React.FC<Scene2CakeProps> = ({ onContinue }) => {
  const [isBlown, setIsBlown] = useState<boolean>(false);
  const autoAdvanceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, []);

  const handleBlowOut = () => {
    if (isBlown) return;
    setIsBlown(true);

    // Audio SFX: realistic breath blow + sparkle chime
    audioManager.playCandleBlow();

    // Single restrained luxury confetti burst
    confetti({
      particleCount: 75,
      spread: 75,
      origin: { y: 0.55 },
      colors: ['#C6A56B', '#C88F91', '#F8F4EE', '#E8D8C5', '#A78B9A'],
    });

    // Automatic cinematic transition after brief celebration pause (~2.8s)
    autoAdvanceTimerRef.current = window.setTimeout(() => {
      onContinue();
    }, 2800);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center px-4 py-12 overflow-hidden bg-gradient-to-b from-warmCharcoal via-deepPlum to-warmCharcoal text-ivory">
      {/* Cinematic ambient depth glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-dustyRose/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center text-center">
        {/* Instruction or Birthday Reveal */}
        {!isBlown ? (
          <div className="space-y-2 mb-4 animate-fade-in">
            <span className="inline-block text-antiqueGold text-xs uppercase tracking-widest font-serif font-medium">
              — The Birthday Tradition —
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ivory font-semibold tracking-tight">
              {SITE_CONFIG.cake.instruction}
            </h2>
            <p className="font-bengali text-champagne/80 text-base sm:text-lg">
              {SITE_CONFIG.cake.subInstruction}
            </p>
          </div>
        ) : (
          <div className="space-y-3 mb-4 animate-fade-up">
            <span className="inline-block px-3 py-1 rounded-full bg-antiqueGold/20 border border-antiqueGold/40 text-antiqueGold text-xs uppercase tracking-widest font-serif font-semibold">
              WISH CAST TO THE STARS ✨
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-ivory font-bold tracking-tight">
              {SITE_CONFIG.cake.revealedTitle}
            </h2>
            <p className="font-sans text-champagne/90 text-sm sm:text-base font-medium">
              {SITE_CONFIG.cake.revealedSubtitle}
            </p>
          </div>
        )}

        {/* Real 3D Interactive Cake */}
        <div className="relative my-2 flex items-center justify-center">
          <Cake3D isBlown={isBlown} onBlowOut={handleBlowOut} />
        </div>

        {/* Single Action Button */}
        {!isBlown ? (
          <div className="mt-6 animate-fade-in">
            <button
              onClick={handleBlowOut}
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-dustyRose via-[#BA7F84] to-antiqueGold text-ivory font-sans text-sm font-semibold tracking-wide shadow-xl hover:scale-105 active:scale-98 transition-all duration-300"
            >
              <Flame className="w-4 h-4 text-amber-200 group-hover:scale-110 transition-transform" />
              <span>Blow out the candles</span>
            </button>
            <p className="text-[11px] text-champagne/50 mt-2 font-sans">
              (or click directly on the cake)
            </p>
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center animate-fade-up">
            <p className="text-xs text-antiqueGold font-serif italic mb-2">
              Unfolding your birthday story...
            </p>
            <button
              onClick={() => {
                if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
                onContinue();
              }}
              className="inline-flex items-center gap-1.5 text-xs text-champagne/70 hover:text-ivory transition-colors underline underline-offset-4"
            >
              <span>Skip pause</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
