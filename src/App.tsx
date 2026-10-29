import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Scene1Mystery } from './components/scenes/Scene1Mystery';
import { Scene2Cake } from './components/scenes/Scene2Cake';
import { StoryJourney } from './components/StoryJourney';
import { PhotoManagerModal } from './components/PhotoManagerModal';
import { DEFAULT_PHOTOS, PhotoMemory } from './config/content';
import { audioManager } from './utils/audio';

export type ExperiencePhase = 'mystery' | 'cake' | 'journey';

export const App: React.FC = () => {
  // Experience Phase: 'mystery' -> 'cake' -> 'journey'
  const [phase, setPhase] = useState<ExperiencePhase>(() => {
    try {
      const saved = localStorage.getItem('mahima_experience_phase');
      return (saved as ExperiencePhase) || 'mystery';
    } catch {
      return 'mystery';
    }
  });

  // Photos State with local storage persistence
  const [photos, setPhotos] = useState<PhotoMemory[]>(() => {
    try {
      const saved = localStorage.getItem('mahima_custom_photos');
      return saved ? JSON.parse(saved) : DEFAULT_PHOTOS;
    } catch {
      return DEFAULT_PHOTOS;
    }
  });

  // Audio & Admin States
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPhotoManagerOpen, setIsPhotoManagerOpen] = useState<boolean>(false);

  // Admin Mode check (via ?admin=true query parameter or Alt+P shortcut)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return typeof window !== 'undefined' && window.location.search.includes('admin=true');
  });

  // Keyboard shortcut Alt+P to toggle admin photo manager
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'p' || e.key === 'P')) {
        setIsAdmin(true);
        setIsPhotoManagerOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync phase to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mahima_experience_phase', phase);
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [phase]);

  // Sync photos to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mahima_custom_photos', JSON.stringify(photos));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [photos]);

  const handleStartCake = () => {
    setPhase('cake');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartJourney = () => {
    setPhase('journey');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplay = () => {
    setPhase('mystery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Music controls
  const handleToggleMusic = async () => {
    if (isPlayingMusic) {
      audioManager.pause();
      setIsPlayingMusic(false);
    } else {
      await audioManager.playBackgroundMusic();
      setIsPlayingMusic(true);
    }
  };

  const handleToggleMute = () => {
    const muted = audioManager.toggleMute();
    setIsMuted(muted);
    if (muted) {
      setIsPlayingMusic(false);
    }
  };

  const handleUpdatePhotoSrc = (id: string, newSrc: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, src: newSrc } : p))
    );
  };

  const handleResetPhotos = () => {
    setPhotos(DEFAULT_PHOTOS);
    try {
      localStorage.removeItem('mahima_custom_photos');
    } catch (e) {
      console.warn('Storage error', e);
    }
  };

  return (
    <div className="min-h-screen bg-ivory text-warmCharcoal flex flex-col font-sans selection:bg-dustyRose selection:text-white">
      {/* Minimal Floating Navigation (No chapter buttons or step counters) */}
      <Navigation
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isAdmin={isAdmin}
        onOpenPhotoManager={() => setIsPhotoManagerOpen(true)}
      />

      {/* Main Experience Layout */}
      <main className="flex-1 pt-14">
        {phase === 'mystery' && (
          <Scene1Mystery onOpenSurprise={handleStartCake} />
        )}

        {phase === 'cake' && (
          <Scene2Cake onContinue={handleStartJourney} />
        )}

        {phase === 'journey' && (
          <StoryJourney photos={photos} onReplay={handleReplay} />
        )}
      </main>

      {/* Discreet Footer */}
      <footer className="py-8 border-t border-champagne/40 bg-ivory/60 text-center text-xs text-mutedMauve">
        <p className="font-serif">
          Crafted with memories by Batparss for Mahima • 2026
        </p>
        <button
          onClick={() => {
            setIsAdmin(true);
            setIsPhotoManagerOpen(true);
          }}
          className="text-[10px] text-mutedMauve/40 hover:text-dustyRose mt-1 transition-colors"
          title="Admin photo settings (Alt+P)"
        >
          ⚙
        </button>
      </footer>

      {/* Photo Manager Modal (Only opened by admin) */}
      <PhotoManagerModal
        isOpen={isPhotoManagerOpen}
        onClose={() => setIsPhotoManagerOpen(false)}
        photos={photos}
        onUpdatePhotoSrc={handleUpdatePhotoSrc}
        onResetPhotos={handleResetPhotos}
      />
    </div>
  );
};

export default App;
