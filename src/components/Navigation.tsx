import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music, Settings } from 'lucide-react';

interface NavigationProps {
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isAdmin: boolean;
  onOpenPhotoManager: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  isPlayingMusic,
  onToggleMusic,
  isMuted,
  onToggleMute,
  isAdmin,
  onOpenPhotoManager,
}) => {
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
    <header className="fixed top-0 inset-x-0 z-40 bg-ivory/85 backdrop-blur-md border-b border-champagne/40 px-5 py-3 transition-all">
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
          <span className="font-serif text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-deepPlum">
            Mahima × Batparss
          </span>
        </div>

        {/* Minimal Controls (Music & Sound FX only) */}
        <div className="flex items-center gap-2">
          {/* Admin Photo Manager (Only visible if ?admin=true or Alt+P pressed) */}
          {isAdmin && (
            <button
              onClick={onOpenPhotoManager}
              title="Admin Photo Manager"
              className="px-2.5 py-1 rounded-full bg-champagne/50 border border-champagne text-deepPlum text-xs font-medium flex items-center gap-1 hover:bg-champagne"
            >
              <Settings className="w-3.5 h-3.5 text-dustyRose" />
              <span className="text-[11px]">Admin Photos</span>
            </button>
          )}

          {/* Music Play / Pause */}
          <button
            onClick={onToggleMusic}
            title={isPlayingMusic ? 'Pause Music' : 'Play Background Music'}
            className={`p-2 rounded-full border transition-all ${
              isPlayingMusic
                ? 'bg-deepPlum text-antiqueGold border-deepPlum shadow-xs'
                : 'bg-ivory border-champagne text-warmCharcoal hover:bg-champagne/30'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
          </button>

          {/* Mute FX Toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className="p-2 rounded-full bg-ivory border border-champagne text-warmCharcoal hover:bg-champagne/30 transition-all"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-dustyRose" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-deepPlum" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
