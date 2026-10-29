import React from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SITE_CONFIG } from '../../config/content';
import { audioManager } from '../../utils/audio';

interface Scene9CelebrationProps {
  onContinue: () => void;
}

export const Scene9Celebration: React.FC<Scene9CelebrationProps> = ({ onContinue }) => {
  const triggerCelebration = () => {
    audioManager.playCelebrationSparkle();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#C6A56B', '#C88F91', '#F8F4EE', '#E8D8C5', '#A78B9A'],
    });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center px-4 py-20 overflow-hidden bg-gradient-to-b from-deepPlum via-warmCharcoal to-deepPlum text-ivory">
      {/* Background starlight / candlelight glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-antiqueGold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-dustyRose/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Kicker badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ivory/10 border border-ivory/20 text-antiqueGold text-xs uppercase tracking-widest font-serif mb-6 animate-pulse-gentle">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{SITE_CONFIG.celebration.kicker}</span>
        </div>

        {/* Hero Narrative Line */}
        <h3 className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-champagne mb-4 tracking-wide font-normal">
          "{SITE_CONFIG.celebration.heroText}"
        </h3>

        {/* Grand Wishing Heading */}
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ivory mb-8">
          {SITE_CONFIG.celebration.wishingHeading}
        </h2>

        {/* Subtle Candlelight & Toast Vignette */}
        <div className="relative my-6 p-6 rounded-3xl bg-ivory/5 border border-champagne/20 backdrop-blur-md max-w-md w-full shadow-2xl flex flex-col items-center">
          <div className="flex items-center justify-center gap-6 mb-4">
            <span className="text-3xl">🥂</span>
            <div className="w-8 h-8 rounded-full bg-dustyRose/30 flex items-center justify-center">
              <Heart className="w-4 h-4 text-dustyRose fill-dustyRose animate-pulse" />
            </div>
            <span className="text-3xl">🎂</span>
          </div>
          <p className="font-bengali text-champagne text-sm sm:text-base leading-relaxed">
            Here's to laughter that leaves our stomachs aching, friendships that never fade, and all the tours yet to come!
          </p>

          <button
            onClick={triggerCelebration}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-dustyRose to-antiqueGold text-ivory font-sans text-xs font-semibold shadow-md hover:scale-105 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-ivory" />
            <span>Toast with Batparss</span>
          </button>
        </div>

        {/* Continuation Button */}
        <div className="mt-8">
          <button
            onClick={() => {
              audioManager.playTransition();
              onContinue();
            }}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-ivory text-deepPlum font-sans text-sm font-semibold tracking-wide shadow-xl hover:bg-champagne hover:scale-105 transition-all"
          >
            <span>{SITE_CONFIG.celebration.buttonText}</span>
            <ArrowRight className="w-4 h-4 text-dustyRose group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
