import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Scene1Mystery } from './components/scenes/Scene1Mystery';
import { Scene2Cake } from './components/scenes/Scene2Cake';
import { Scene3Welcome } from './components/scenes/Scene3Welcome';
import { Scene4Chaos } from './components/scenes/Scene4Chaos';
import { Scene5Sreemangal } from './components/scenes/Scene5Sreemangal';
import { Scene6Spotlight } from './components/scenes/Scene6Spotlight';
import { Scene7MemoryWall } from './components/scenes/Scene7MemoryWall';
import { Scene8Letter } from './components/scenes/Scene8Letter';
import { Scene9Celebration } from './components/scenes/Scene9Celebration';
import { Scene10Signature } from './components/scenes/Scene10Signature';
import { PhotoManagerModal } from './components/PhotoManagerModal';
import { DEFAULT_PHOTOS, PhotoMemory } from './config/content';
import { audioManager } from './utils/audio';

export const App: React.FC = () => {
  // Staged Scene Progress State
  const [currentScene, setCurrentScene] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('mahima_current_scene');
      return saved ? parseInt(saved, 10) : 1;
    } catch {
      return 1;
    }
  });

  const [unlockedScenes, setUnlockedScenes] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('mahima_unlocked_scenes');
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  // Photos State
  const [photos, setPhotos] = useState<PhotoMemory[]>(() => {
    try {
      const saved = localStorage.getItem('mahima_custom_photos');
      return saved ? JSON.parse(saved) : DEFAULT_PHOTOS;
    } catch {
      return DEFAULT_PHOTOS;
    }
  });

  // Audio & Modal States
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPhotoManagerOpen, setIsPhotoManagerOpen] = useState<boolean>(false);

  // Sync scene state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mahima_current_scene', currentScene.toString());
      localStorage.setItem('mahima_unlocked_scenes', JSON.stringify(unlockedScenes));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [currentScene, unlockedScenes]);

  // Sync photos to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mahima_custom_photos', JSON.stringify(photos));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [photos]);

  // Unlock and advance scene
  const advanceToScene = (nextSceneId: number) => {
    setUnlockedScenes((prev) => (prev.includes(nextSceneId) ? prev : [...prev, nextSceneId]));
    setCurrentScene(nextSceneId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectScene = (sceneId: number) => {
    if (unlockedScenes.includes(sceneId)) {
      audioManager.playTransition();
      setCurrentScene(sceneId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReplay = () => {
    setCurrentScene(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Music & Mute controls
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

  // Photo updates
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

  // Group and portrait photo lookup
  const groupPhoto = photos.find((p) => p.category === 'batparss')?.src || DEFAULT_PHOTOS[2].src;
  const candidPhoto = photos.find((p) => p.src.includes('candid'))?.src || DEFAULT_PHOTOS[5].src;
  const mahimaPortrait = photos.find((p) => p.category === 'spotlight')?.src || DEFAULT_PHOTOS[3].src;

  return (
    <div className="min-h-screen bg-ivory text-warmCharcoal flex flex-col font-sans selection:bg-dustyRose selection:text-white">
      {/* Top Floating Story Navigation */}
      <Navigation
        currentScene={currentScene}
        unlockedScenes={unlockedScenes}
        onSelectScene={handleSelectScene}
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenPhotoManager={() => setIsPhotoManagerOpen(true)}
      />

      {/* Main Staged Scene Presentation */}
      <main className="flex-1 pt-12">
        {currentScene === 1 && (
          <Scene1Mystery onOpenSurprise={() => advanceToScene(2)} />
        )}

        {currentScene === 2 && (
          <Scene2Cake onContinue={() => advanceToScene(3)} />
        )}

        {currentScene === 3 && (
          <Scene3Welcome onContinue={() => advanceToScene(4)} groupPhotoSrc={groupPhoto} />
        )}

        {currentScene === 4 && (
          <Scene4Chaos onContinue={() => advanceToScene(5)} candidPhotoSrc={candidPhoto} />
        )}

        {currentScene === 5 && (
          <Scene5Sreemangal photos={photos} onContinue={() => advanceToScene(6)} />
        )}

        {currentScene === 6 && (
          <Scene6Spotlight onContinue={() => advanceToScene(7)} portraitSrc={mahimaPortrait} />
        )}

        {currentScene === 7 && (
          <Scene7MemoryWall photos={photos} onContinue={() => advanceToScene(8)} />
        )}

        {currentScene === 8 && (
          <Scene8Letter onContinue={() => advanceToScene(9)} />
        )}

        {currentScene === 9 && (
          <Scene9Celebration onContinue={() => advanceToScene(10)} />
        )}

        {currentScene === 10 && (
          <Scene10Signature onReplay={handleReplay} onJumpToScene={handleSelectScene} />
        )}
      </main>

      {/* Photo Manager Modal */}
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
