import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Scene1Mystery } from './components/scenes/Scene1Mystery';
import { Scene2Cake } from './components/scenes/Scene2Cake';
import { StoryJourney } from './components/StoryJourney';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { DEFAULT_PHOTOS, PhotoMemory } from './config/content';
import { audioManager } from './utils/audio';

export type ExperiencePhase = 'mystery' | 'cake' | 'journey';

const MainExperience: React.FC = () => {
  const { lang } = useLanguage();

  // Experience Phase: 'mystery' -> 'cake' -> 'journey'
  const [phase, setPhase] = useState<ExperiencePhase>(() => {
    try {
      const saved = localStorage.getItem('mahima_experience_phase');
      return (saved as ExperiencePhase) || 'mystery';
    } catch {
      return 'mystery';
    }
  });

  // Admin routing state
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.location.pathname.startsWith('/admin') ||
      window.location.hash === '#admin' ||
      window.location.search.includes('admin=true')
    );
  });

  const [adminToken, setAdminToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem('admin_token');
    } catch {
      return null;
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

  // Audio States
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Sync phase to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mahima_experience_phase', phase);
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [phase]);

  // Handle URL hash changes for #admin
  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminRoute(
        window.location.pathname.startsWith('/admin') ||
        window.location.hash === '#admin' ||
        window.location.search.includes('admin=true')
      );
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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

  const handleOpenAdmin = () => {
    window.location.hash = '#admin';
    setIsAdminRoute(true);
  };

  const handleBackToSite = () => {
    window.location.hash = '';
    setIsAdminRoute(false);
  };

  const handleLoginSuccess = (token: string) => {
    setAdminToken(token);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('admin_token');
    setAdminToken(null);
  };

  // If in admin view:
  if (isAdminRoute) {
    if (adminToken) {
      return (
        <AdminDashboard
          token={adminToken}
          onLogout={handleLogout}
          onBackToSite={handleBackToSite}
        />
      );
    }
    return (
      <AdminLogin
        onLoginSuccess={handleLoginSuccess}
        onBackToSite={handleBackToSite}
      />
    );
  }

  // Public Birthday Experience
  return (
    <div className="min-h-screen bg-ivory text-warmCharcoal flex flex-col font-sans selection:bg-dustyRose selection:text-white">
      {/* Minimal Floating Navigation */}
      <Navigation
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenAdmin={handleOpenAdmin}
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

      {/* Discreet Editorial Footer */}
      <footer className="py-8 border-t border-champagne/40 bg-ivory/60 text-center text-xs text-mutedMauve">
        <p className="font-serif">
          {lang === 'bn'
            ? 'মহিমার জন্য বাটপাড়স গ্যাংয়ের আন্তরিক পরিবেশনা • ২০২৬'
            : 'Crafted with genuine memories by Batparss for Mahima • 2026'}
        </p>
        <button
          onClick={handleOpenAdmin}
          className="text-[11px] text-mutedMauve/40 hover:text-dustyRose mt-1 transition-colors"
          title="Batparss Console Access"
        >
          🔒
        </button>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <MainExperience />
    </LanguageProvider>
  );
};

export default App;
