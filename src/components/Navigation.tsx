import React from 'react';
import { Volume2, VolumeX, Music, Image as ImageIcon, Sparkles, ChevronRight } from 'lucide-react';
import { SCENES, StoryScene } from '../config/content';

interface NavigationProps {
  currentScene: number;
  unlockedScenes: number[];
  onSelectScene: (sceneId: number) => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenPhotoManager: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentScene,
  unlockedScenes,
  onSelectScene,
  isPlayingMusic,
  onToggleMusic,
  isMuted,
  onToggleMute,
  onOpenPhotoManager,
}) => {
  const currentSceneObj = SCENES.find((s) => s.id === currentScene) || SCENES[0];

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-ivory/80 backdrop-blur-md border-b border-champagne/60 px-4 py-2.5 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Label */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-deepPlum text-ivory flex items-center justify-center font-serif text-sm font-semibold shadow-sm">
            M
          </div>
          <div className="hidden sm:block">
            <h1 className="font-serif text-sm font-bold tracking-wider uppercase text-deepPlum">
              Mahima × Batparss
            </h1>
            <p className="text-[10px] text-mutedMauve tracking-wide">
              {currentSceneObj.title}
            </p>
          </div>
        </div>

        {/* Story Journey Indicator / Breadcrumbs */}
        <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none max-w-[55vw]">
          {SCENES.map((scene) => {
            const isUnlocked = unlockedScenes.includes(scene.id);
            const isCurrent = currentScene === scene.id;

            return (
              <button
                key={scene.id}
                disabled={!isUnlocked}
                onClick={() => onSelectScene(scene.id)}
                title={isUnlocked ? scene.title : 'Complete previous chapters to unlock'}
                className={`group flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-all whitespace-nowrap ${
                  isCurrent
                    ? 'bg-deepPlum text-ivory font-medium shadow-sm'
                    : isUnlocked
                    ? 'text-warmCharcoal/80 hover:bg-champagne/40 hover:text-deepPlum'
                    : 'text-warmCharcoal/30 cursor-not-allowed opacity-50'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${
                  isCurrent ? 'bg-antiqueGold' : isUnlocked ? 'bg-dustyRose' : 'bg-warmCharcoal/20'
                }`} />
                <span className="hidden md:inline">{scene.shortLabel}</span>
                <span className="md:hidden">{scene.id}</span>
              </button>
            );
          })}
        </nav>

        {/* Audio & Photo Controls */}
        <div className="flex items-center gap-1.5">
          {/* Photo Manager / Upload Button */}
          <button
            onClick={onOpenPhotoManager}
            title="Upload or Change Trip Photos"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-champagne/40 border border-champagne text-deepPlum hover:bg-champagne/70 text-xs font-medium transition-all"
          >
            <ImageIcon className="w-3.5 h-3.5 text-dustyRose" />
            <span className="hidden lg:inline">Photos</span>
          </button>

          {/* Background Music Toggle */}
          <button
            onClick={onToggleMusic}
            title={isPlayingMusic ? 'Pause Music' : 'Play Background Music'}
            className={`p-1.5 rounded-full border transition-all ${
              isPlayingMusic
                ? 'bg-deepPlum text-antiqueGold border-deepPlum shadow-sm'
                : 'bg-ivory border-champagne text-warmCharcoal hover:bg-champagne/30'
            }`}
          >
            <Music className="w-4 h-4" />
          </button>

          {/* Sound FX Mute Toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className="p-1.5 rounded-full bg-ivory border border-champagne text-warmCharcoal hover:bg-champagne/30 transition-all"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-dustyRose" /> : <Volume2 className="w-4 h-4 text-deepPlum" />}
          </button>
        </div>
      </div>
    </header>
  );
};
