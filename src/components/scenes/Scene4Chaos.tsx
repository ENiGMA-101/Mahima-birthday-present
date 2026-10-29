import React, { useState } from 'react';
import { ArrowRight, Quote, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../../config/content';
import { audioManager } from '../../utils/audio';

interface Scene4ChaosProps {
  onContinue: () => void;
  candidPhotoSrc?: string;
}

export const Scene4Chaos: React.FC<Scene4ChaosProps> = ({ onContinue, candidPhotoSrc }) => {
  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center px-4 py-20 overflow-hidden bg-gradient-to-b from-ivory via-champagne/30 to-ivory text-warmCharcoal">
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs uppercase tracking-widest font-serif font-semibold text-antiqueGold mb-2">
            {SITE_CONFIG.chaos.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-deepPlum font-bold tracking-tight">
            {SITE_CONFIG.chaos.title}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-mutedMauve mt-1 uppercase tracking-wider">
            Unfiltered • Loud • Irreplaceable
          </p>
        </div>

        {/* Narrative Composition: Editorial Asymmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Flowing Dialogue & Thoughts */}
          <div className="lg:col-span-7 space-y-6">
            {SITE_CONFIG.chaos.quotes.map((q, idx) => {
              const isSelected = activeQuoteIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    audioManager.playChime(440 + idx * 50, 0.4, 0.08);
                    setActiveQuoteIdx(idx);
                  }}
                  className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 ${
                    isSelected
                      ? 'bg-ivory border-antiqueGold shadow-md shadow-antiqueGold/10 scale-101'
                      : 'bg-ivory/60 border-champagne/60 hover:bg-ivory hover:border-champagne'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-serif text-xl font-bold text-dustyRose/80 select-none">
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
              );
            })}
          </div>

          {/* Right Column: Candid Visual Scrapbook Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm aspect-[4/5] bg-white p-3.5 pb-8 rounded-xl shadow-xl border border-champagne rotate-1 hover:rotate-0 transition-transform duration-500 group">
              {/* Washi tape accent on top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-champagne/70 rounded-sm -rotate-2 shadow-inner" />

              <div className="w-full h-full bg-champagne/30 rounded-lg overflow-hidden relative">
                {candidPhotoSrc ? (
                  <img
                    src={candidPhotoSrc}
                    alt="Batparss Adda Moment"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-warmCharcoal/60">
                    <Quote className="w-10 h-10 text-dustyRose/40 mb-2" />
                    <p className="font-serif italic text-sm">
                      "Real friendship isn't measured in years. It's measured in uncontrollable laughs."
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-3 text-center">
                <span className="font-script text-xl text-deepPlum font-bold">
                  The Batparss Chaos ❤️
                </span>
              </div>
            </div>

            <p className="font-serif italic text-xs text-mutedMauve mt-4 text-center">
              Tap any memory note to highlight its story
            </p>
          </div>
        </div>

        {/* Section Continuation Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              audioManager.playTransition();
              onContinue();
            }}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-deepPlum text-ivory font-sans text-sm font-semibold tracking-wide shadow-lg shadow-deepPlum/20 hover:bg-warmCharcoal hover:scale-105 transition-all"
          >
            <span>{SITE_CONFIG.chaos.buttonText}</span>
            <ArrowRight className="w-4 h-4 text-antiqueGold group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
