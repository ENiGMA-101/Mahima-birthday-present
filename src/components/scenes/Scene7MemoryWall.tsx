import React, { useState } from 'react';
import { ArrowRight, MapPin, Calendar, X, Sparkles, Camera } from 'lucide-react';
import { PhotoMemory } from '../../config/content';
import { audioManager } from '../../utils/audio';

interface Scene7MemoryWallProps {
  photos: PhotoMemory[];
  onContinue: () => void;
}

export const Scene7MemoryWall: React.FC<Scene7MemoryWallProps> = ({ photos, onContinue }) => {
  const [activePhoto, setActivePhoto] = useState<PhotoMemory | null>(null);

  return (
    <section className="relative min-h-[92vh] px-4 py-20 overflow-hidden bg-ivory text-warmCharcoal">
      {/* Background soft ambient accents */}
      <div className="absolute top-10 left-1/3 w-80 h-80 bg-softSage/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-champagne/40 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-champagne/40 border border-champagne text-deepPlum text-xs font-serif uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5 text-dustyRose" />
            <span>Cherished Snapshots</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-deepPlum font-bold tracking-tight">
            The Memory Wall
          </h2>
          <p className="mt-3 font-sans text-xs sm:text-sm text-warmCharcoal/70">
            A scrapbook of shared laughter, travel roads, and moments frozen in time.
          </p>
        </div>

        {/* Dynamic Scrapbook Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {photos.map((photo, index) => {
            // Alternating natural rotation for scrapbook organic feel
            const rotations = ['rotate-1', '-rotate-2', 'rotate-2', '-rotate-1', 'rotate-0', '-rotate-2'];
            const rotationClass = rotations[index % rotations.length];

            return (
              <div
                key={photo.id}
                onClick={() => {
                  audioManager.playChime(500 + index * 40, 0.4, 0.08);
                  setActivePhoto(photo);
                }}
                className={`group cursor-pointer bg-white p-3.5 pb-6 rounded-xl shadow-lg border border-champagne/80 hover:shadow-2xl hover:scale-103 hover:rotate-0 transition-all duration-300 ${rotationClass}`}
              >
                {/* Washi tape pin */}
                <div className="w-12 h-3.5 bg-champagne/80 mx-auto -mt-1.5 mb-2 rounded-xs shadow-inner transform -rotate-1" />

                {/* Photo frame */}
                <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-champagne/20 relative">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Editorial Caption */}
                <div className="mt-3 px-1 text-center">
                  <h4 className="font-serif font-bold text-deepPlum text-base">
                    {photo.title}
                  </h4>
                  <p className="font-bengali text-xs sm:text-sm text-dustyRose mt-0.5 line-clamp-2">
                    "{photo.caption}"
                  </p>
                  <div className="mt-2 flex items-center justify-center gap-3 text-[10px] text-warmCharcoal/50">
                    {photo.location && (
                      <span className="flex items-center gap-0.5">
                        <MapPin className="w-3 h-3 text-antiqueGold" />
                        {photo.location}
                      </span>
                    )}
                    {photo.date && (
                      <span className="flex items-center gap-0.5">
                        <Calendar className="w-3 h-3 text-mutedMauve" />
                        {photo.date}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continuation Button */}
        <div className="mt-16 text-center">
          <button
            onClick={() => {
              audioManager.playTransition();
              onContinue();
            }}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-deepPlum text-ivory font-sans text-sm font-semibold tracking-wide shadow-lg shadow-deepPlum/20 hover:bg-warmCharcoal hover:scale-105 transition-all"
          >
            <span>Read Batparss' Secret Letter</span>
            <ArrowRight className="w-4 h-4 text-antiqueGold group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Lightbox Zoom */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warmCharcoal/90 backdrop-blur-md">
          <div className="relative max-w-3xl w-full bg-ivory rounded-2xl p-6 shadow-2xl border border-champagne text-warmCharcoal animate-fade-in">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-champagne/60 text-deepPlum hover:bg-champagne"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-black/10 mb-4">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="text-center max-w-xl mx-auto">
              <h3 className="font-serif text-2xl font-bold text-deepPlum">
                {activePhoto.title}
              </h3>
              <p className="font-bengali text-base sm:text-lg text-dustyRose mt-1 font-medium">
                "{activePhoto.caption}"
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-warmCharcoal/60 mt-3">
                {activePhoto.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-antiqueGold" />
                    {activePhoto.location}
                  </span>
                )}
                {activePhoto.date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-mutedMauve" />
                    {activePhoto.date}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
