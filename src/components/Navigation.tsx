import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music, Shield, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavigationProps {
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenAdmin: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  isPlayingMusic,
  onToggleMusic,
  isMuted,
  onToggleMute,
  onOpenAdmin,
}) => {
  const { lang, toggleLang } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-ivory/85 backdrop-blur-md border-b border-champagne/40 px-4 sm:px-6 py-2.5 transition-all">
      {/* Subtle Progress Line at the very top */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-dustyRose via-antiqueGold to-dustyRose transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Minimal Monogram & Wordmark */}
        <div className="flex items-center gap-2.5 select-none">
          <div className="w-7 h-7 rounded-full bg-deepPlum text-ivory flex items-center justify-center font-serif text-xs font-semibold shadow-xs">
            M
          </div>
          <span className="font-serif text-xs sm:text-sm font-bold tracking-[0.16em] uppercase text-deepPlum">
            Mahima × Batparss
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Authentic Bengali / English Language Switcher */}
          <button
            onClick={toggleLang}
            title={lang === 'bn' ? 'Switch to English' : 'বাংলা ভাষায় দেখুন'}
            className="px-2.5 py-1 rounded-full bg-ivory border border-champagne hover:border-antiqueGold text-deepPlum text-xs font-serif font-semibold flex items-center gap-1.5 shadow-2xs transition-all hover:bg-champagne/30"
          >
            <Languages className="w-3.5 h-3.5 text-antiqueGold" />
            <span className="text-[11px] tracking-wide">
              {lang === 'bn' ? (
                <>
                  <span className="text-deepPlum font-bold">বাংলা</span>
                  <span className="text-mutedMauve/60">/</span>
                  <span className="text-mutedMauve hover:text-deepPlum">EN</span>
                </>
              ) : (
                <>
                  <span className="text-mutedMauve hover:text-deepPlum">বাংলা</span>
                  <span className="text-mutedMauve/60">/</span>
                  <span className="text-deepPlum font-bold">EN</span>
                </>
              )}
            </span>
          </button>

          {/* Music Play / Pause */}
          <button
            onClick={onToggleMusic}
            title={isPlayingMusic ? 'Pause Background Music' : 'Play Background Music'}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              isPlayingMusic
                ? 'bg-deepPlum text-antiqueGold border-deepPlum shadow-2xs'
                : 'bg-ivory border-champagne text-warmCharcoal hover:bg-champagne/30'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
          </button>

          {/* Mute FX Toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className="p-2 rounded-full bg-ivory border border-champagne text-warmCharcoal hover:bg-champagne/30 transition-all cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-dustyRose" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-deepPlum" />
            )}
          </button>

          {/* Discreet Admin Portal Button */}
          <button
            onClick={onOpenAdmin}
            title="Batparss Admin Console"
            className="p-2 rounded-full bg-ivory border border-champagne/70 text-mutedMauve hover:text-deepPlum hover:bg-champagne/30 transition-all cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
