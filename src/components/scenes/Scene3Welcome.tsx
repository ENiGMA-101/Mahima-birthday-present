import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { SITE_CONFIG } from '../../config/content';
import { audioManager } from '../../utils/audio';

interface Scene3WelcomeProps {
  onContinue: () => void;
  groupPhotoSrc?: string;
}

export const Scene3Welcome: React.FC<Scene3WelcomeProps> = ({ onContinue, groupPhotoSrc }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center px-4 py-20 overflow-hidden bg-ivory text-warmCharcoal">
      {/* Editorial backdrop accents */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-champagne/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-dustyRose/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Top Kicker Crest */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne/40 border border-champagne text-deepPlum text-xs font-serif uppercase tracking-widest mb-6">
          <Compass className="w-3.5 h-3.5 text-antiqueGold" />
          <span>{SITE_CONFIG.welcome.badge}</span>
        </div>

        {/* Editorial Heading */}
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-deepPlum font-bold tracking-tight leading-tight max-w-2xl">
          {SITE_CONFIG.welcome.mainTitle}
        </h2>

        {/* Supporting Line */}
        <p className="mt-4 font-serif italic text-xl sm:text-2xl text-dustyRose max-w-xl">
          "{SITE_CONFIG.welcome.tagline}"
        </p>

        <p className="mt-4 font-sans text-sm sm:text-base text-warmCharcoal/80 max-w-lg leading-relaxed">
          {SITE_CONFIG.welcome.description}
        </p>

        {/* Optional Tasteful Group Photo Vignette */}
        {groupPhotoSrc && (
          <div className="relative mt-8 max-w-md w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border-4 border-ivory ring-1 ring-champagne group">
            <img
              src={groupPhotoSrc}
              alt="Batparss Group Memory"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deepPlum/60 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-serif text-ivory tracking-wider">
                The Batparss Circle • Bangladesh
              </span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-10">
          <button
            onClick={() => {
              audioManager.playTransition();
              onContinue();
            }}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-deepPlum text-ivory font-sans text-sm font-semibold tracking-wide shadow-lg shadow-deepPlum/20 hover:bg-warmCharcoal hover:scale-105 transition-all"
          >
            <span>{SITE_CONFIG.welcome.buttonText}</span>
            <ArrowRight className="w-4 h-4 text-antiqueGold group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
