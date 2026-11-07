import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ArrowDown, Volume2, VolumeX, Cake, Music } from 'lucide-react';
import { PartyScene3D, CelebrationState } from '../3d/PartyScene3D';
import { audioManager } from '../../utils/audio';
import { useLanguage } from '../../context/LanguageContext';

interface PartyOpeningSceneProps {
  onBeginJourney: () => void;
}

export const PartyOpeningScene: React.FC<PartyOpeningSceneProps> = ({ onBeginJourney }) => {
  const { lang } = useLanguage();
  const [celebrationState, setCelebrationState] = useState<CelebrationState>('idle');
  const [showCelebrationBanner, setShowCelebrationBanner] = useState(false);
  const [showBeginButton, setShowBeginButton] = useState(false);
  const isInteractingRef = useRef(false);

  const handleCakeClick = () => {
    if (isInteractingRef.current || celebrationState !== 'idle') return;
    isInteractingRef.current = true;

    // STEP 1: Girl prepares (leans in, takes breath, candles flicker)
    setCelebrationState('preparing');
    audioManager.playTransition();

    setTimeout(() => {
      // STEP 2: She blows out the candles (wind airflow particles, flames extinguish, smoke wisps)
      setCelebrationState('blowing');
      audioManager.playCandleBlow();

      setTimeout(() => {
        // STEP 3: THE PARTY EXPLODES!
        setCelebrationState('celebrating');
        setShowCelebrationBanner(true);

        // Cheerful music & crowd cheering
        audioManager.playHappyBirthdayTune();

        // Massive joyful pastel & bright rainbow confetti bursts!
        const count = 120;
        const defaults = {
          origin: { y: 0.6 },
          colors: ['#FF5E97', '#70D6FF', '#FFD670', '#9BF6FF', '#BDB2FF', '#FF85A2', '#F3C053'],
        };

        confetti({
          ...defaults,
          particleCount: 80,
          spread: 80,
          startVelocity: 45,
        });

        setTimeout(() => {
          confetti({
            ...defaults,
            particleCount: 60,
            angle: 60,
            spread: 60,
            origin: { x: 0.15, y: 0.65 },
          });
          confetti({
            ...defaults,
            particleCount: 60,
            angle: 120,
            spread: 60,
            origin: { x: 0.85, y: 0.65 },
          });
        }, 300);

        // STEP 5: Let the celebration breathe, then display the transition button
        setTimeout(() => {
          setShowBeginButton(true);
        }, 2200);
      }, 1400);
    }, 900);
  };

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-between px-4 py-8 overflow-hidden bg-gradient-to-b from-[#FFF5F8] via-[#F4F0FF] to-[#FFFBF7]">
      {/* Dreamy Ambient Background Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-pinkPastel/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-skyBlueLight/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-butterYellowLight/40 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Sparkles & Party Ribbons Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <span className="absolute top-16 left-8 text-2xl animate-float-slow">🎈</span>
        <span className="absolute top-24 right-12 text-2xl animate-bounce">✨</span>
        <span className="absolute top-48 left-16 text-xl animate-pulse">⭐</span>
        <span className="absolute top-52 right-20 text-2xl animate-float-slow">🎀</span>
      </div>

      {/* Header Announcement Badge */}
      <div className="relative z-20 text-center max-w-xl mx-auto pt-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-pinkPastel/60 text-brightPink text-xs sm:text-sm font-serif font-bold uppercase tracking-widest shadow-sm">
          <Sparkles className="w-4 h-4 text-butterYellow animate-spin" style={{ animationDuration: '6s' }} />
          <span>
            {lang === 'bn' ? 'আজকের দিনটা শুধু তোমার জন্য! 🎂' : 'Today is all about you! 🎂'}
          </span>
        </div>

        {/* Dynamic Instructional Title before blow */}
        {!showCelebrationBanner ? (
          <div className="mt-3 space-y-1 animate-fade-in">
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-deepPlum">
              {lang === 'bn' ? 'শুভ জন্মদিন, মহিমা!' : 'Happy Birthday, Mahima!'}
            </h1>
            <p className="font-sans text-xs sm:text-sm font-medium text-coral flex items-center justify-center gap-1.5 animate-pulse">
              <Cake className="w-4 h-4" />
              <span>
                {lang === 'bn' ? 'কেকের উপর স্পর্শ করে ইচ্ছা প্রকাশ করো!' : 'Tap the cake to make a wish!'}
              </span>
            </p>
          </div>
        ) : (
          /* STEP 4: BIG SURPRISE CELEBRATION HEADING */
          <div className="mt-3 space-y-2 animate-fade-up">
            <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-brightPink via-butterYellow to-skyBlue text-white text-xs font-bold uppercase tracking-widest shadow-md">
              🎉 PARTY TIME! 🎉
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brightPink via-coral to-lavender tracking-tight drop-shadow-sm">
              HAPPY BIRTHDAY, MAHIMA! 🎂🎉
            </h1>
            <p className="font-bengali text-base sm:text-xl font-semibold text-deepPlum">
              {lang === 'bn'
                ? 'বাটপাড়সের পক্ষ থেকে অফুরন্ত ভালোবাসা ও শুভকামনা!'
                : 'Batparss sends you boundless love, joy, and endless laughter!'}
            </p>
          </div>
        )}
      </div>

      {/* 3D MAGICAL BIRTHDAY SCENE (Animated Girl, Tiered Cake, Guests, Balloons) */}
      <div className="relative z-10 w-full max-w-4xl my-auto">
        <PartyScene3D
          celebrationState={celebrationState}
          onCakeClick={handleCakeClick}
        />
      </div>

      {/* Action Area: Tap Prompt or Begin Memory Journey Button */}
      <div className="relative z-20 pb-4 text-center">
        {celebrationState === 'idle' && (
          <button
            onClick={handleCakeClick}
            className="group px-7 py-3 rounded-full bg-gradient-to-r from-brightPink via-coral to-butterYellow text-white font-serif text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 mx-auto cursor-pointer"
          >
            <Cake className="w-4 h-4 text-butterYellowLight group-hover:rotate-12 transition-transform" />
            <span>
              {lang === 'bn' ? 'মোমবাতি নেভাও ও উইশ করো 🎂' : 'Blow Out Candles & Make a Wish 🎂'}
            </span>
          </button>
        )}

        {/* STEP 5: Let celebration breathe, then show Begin Memories Button */}
        {showBeginButton && (
          <div className="animate-fade-up space-y-2">
            <button
              onClick={() => {
                audioManager.playTransition();
                onBeginJourney();
              }}
              className="group px-8 py-4 rounded-full bg-gradient-to-r from-deepPlum via-warmCharcoal to-deepPlum text-white font-serif text-base font-bold shadow-2xl hover:shadow-brightPink/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 mx-auto cursor-pointer border-2 border-butterYellow"
            >
              <Heart className="w-5 h-5 text-brightPink fill-brightPink animate-pulse" />
              <span>
                {lang === 'bn'
                  ? 'চলো, স্মৃতির পাতায় ফিরে যাই ❤️'
                  : "Let's Begin Our Memories ❤️"}
              </span>
              <ArrowDown className="w-4 h-4 text-butterYellow group-hover:translate-y-1 transition-transform" />
            </button>
            <p className="text-xs font-serif italic text-mutedMauve">
              {lang === 'bn'
                ? 'শ্রীমঙ্গল ভ্রমণ এবং বন্ধুদের চিরচেনা গল্পগুলো দেখতে ট্যাপ করো'
                : 'Scroll down to discover our shared journey and unforgettable stories'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
