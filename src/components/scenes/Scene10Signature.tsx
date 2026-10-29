import React from 'react';
import { RotateCcw, Heart, Sparkles, Compass } from 'lucide-react';
import { SITE_CONFIG } from '../../config/content';
import { audioManager } from '../../utils/audio';

interface Scene10SignatureProps {
  onReplay: () => void;
  onJumpToScene: (sceneId: number) => void;
}

export const Scene10Signature: React.FC<Scene10SignatureProps> = ({ onReplay, onJumpToScene }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center px-4 py-20 overflow-hidden bg-ivory text-warmCharcoal">
      {/* Background soft ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-champagne/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Subtle Motif */}
        <div className="flex items-center gap-2 mb-8 text-antiqueGold text-xs uppercase font-serif tracking-widest">
          <span>—</span>
          <span>Until Our Next Adventure</span>
          <span>—</span>
        </div>

        {/* Lead Quote */}
        <h3 className="font-serif italic text-2xl sm:text-3xl text-dustyRose font-medium mb-3">
          "{SITE_CONFIG.signature.quote}"
        </h3>

        {/* Main Title */}
        <h2 className="font-serif text-4xl sm:text-6xl text-deepPlum font-bold tracking-tight mb-6">
          {SITE_CONFIG.signature.heading}
        </h2>

        {/* Closing Note */}
        <p className="font-bengali text-base sm:text-xl text-warmCharcoal/80 max-w-xl leading-relaxed mb-10">
          {SITE_CONFIG.signature.note}
        </p>

        {/* BATPARSS Typographic Signature Seal */}
        <div className="my-6 p-8 rounded-3xl bg-gradient-to-b from-white to-[#F9F5EE] border-2 border-champagne shadow-xl max-w-md w-full flex flex-col items-center">
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
            <span>Dedicated with care to Mahima</span>
          </div>
        </div>

        {/* Replay Options */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              audioManager.playTransition();
              onReplay();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-deepPlum text-ivory font-sans text-xs sm:text-sm font-semibold tracking-wide shadow-md hover:bg-warmCharcoal hover:scale-105 transition-all"
          >
            <RotateCcw className="w-4 h-4 text-antiqueGold" />
            <span>{SITE_CONFIG.signature.replayButton}</span>
          </button>

          <button
            onClick={() => onJumpToScene(5)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-champagne/50 border border-champagne text-deepPlum font-sans text-xs sm:text-sm font-medium hover:bg-champagne transition-all"
          >
            <span>Revisit Sreemangal Photos</span>
          </button>

          <button
            onClick={() => onJumpToScene(8)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-champagne/50 border border-champagne text-deepPlum font-sans text-xs sm:text-sm font-medium hover:bg-champagne transition-all"
          >
            <span>Re-read The Letter</span>
          </button>
        </div>
      </div>
    </section>
  );
};
