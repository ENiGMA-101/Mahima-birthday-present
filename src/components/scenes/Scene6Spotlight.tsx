import React from 'react';
import { ArrowRight, Heart, Sparkles, Smile, Sun, Shield, Mountain } from 'lucide-react';
import { SITE_CONFIG } from '../../config/content';
import { audioManager } from '../../utils/audio';

interface Scene6SpotlightProps {
  onContinue: () => void;
  portraitSrc?: string;
}

export const Scene6Spotlight: React.FC<Scene6SpotlightProps> = ({ onContinue, portraitSrc }) => {
  const getWishIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Sun className="w-5 h-5 text-antiqueGold" />;
      case 1:
        return <Shield className="w-5 h-5 text-softSage" />;
      case 2:
        return <Sparkles className="w-5 h-5 text-dustyRose" />;
      default:
        return <Mountain className="w-5 h-5 text-mutedMauve" />;
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center px-4 py-20 overflow-hidden bg-ivory text-warmCharcoal">
      {/* Background soft ambient glows */}
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

        {/* Content Layout: Portrait & 4 Sincere Wishes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Mahima's Portrait / Editorial Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-xs aspect-[3/4] bg-white p-3 pb-8 rounded-2xl shadow-2xl border border-champagne transform -rotate-1 hover:rotate-0 transition-transform duration-500 group">
              <div className="w-full h-full bg-champagne/20 rounded-xl overflow-hidden relative">
                {portraitSrc ? (
                  <img
                    src={portraitSrc}
                    alt="Mahima"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-deepPlum/60">
                    <Sparkles className="w-10 h-10 text-antiqueGold mb-2" />
                    <span className="font-serif text-lg font-semibold text-deepPlum">
                      Our Birthday Girl
                    </span>
                    <p className="text-xs text-mutedMauve mt-1">
                      Radiant, calm, and deeply cherished
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-3 text-center">
                <span className="font-serif text-sm uppercase tracking-widest font-bold text-deepPlum">
                  Mahima • Birthday 2026
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Thoughtful Wishes from Friends */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SITE_CONFIG.spotlight.wishes.map((wish, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/70 backdrop-blur-sm border border-champagne/80 shadow-sm hover:border-antiqueGold hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-champagne/30 flex items-center justify-center mb-3">
                  {getWishIcon(idx)}
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

        {/* Continuation Button */}
        <div className="mt-14 text-center">
          <button
            onClick={() => {
              audioManager.playTransition();
              onContinue();
            }}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-deepPlum text-ivory font-sans text-sm font-semibold tracking-wide shadow-lg shadow-deepPlum/20 hover:bg-warmCharcoal hover:scale-105 transition-all"
          >
            <span>{SITE_CONFIG.spotlight.buttonText}</span>
            <ArrowRight className="w-4 h-4 text-antiqueGold group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
