import React, { useState } from 'react';
import { ArrowRight, MapPin, Calendar, X, Maximize2, Compass } from 'lucide-react';
import { SITE_CONFIG, PhotoMemory } from '../../config/content';
import { audioManager } from '../../utils/audio';

interface Scene5SreemangalProps {
  photos: PhotoMemory[];
  onContinue: () => void;
}

export const Scene5Sreemangal: React.FC<Scene5SreemangalProps> = ({ photos, onContinue }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMemory | null>(null);

  // Filter photos relevant to Sreemangal & trip
  const sreemangalPhotos = photos.filter(
    (p) => p.category === 'sreemangal' || p.location?.includes('Sreemangal') || p.location?.includes('Sylhet')
  );

  const displayPhotos = sreemangalPhotos.length > 0 ? sreemangalPhotos : photos;

  const handlePhotoClick = (photo: PhotoMemory) => {
    audioManager.playChime(600, 0.3, 0.1);
    setSelectedPhoto(photo);
  };

  return (
    <section className="relative min-h-[92vh] px-4 py-20 overflow-hidden bg-gradient-to-b from-warmCharcoal via-deepPlum to-warmCharcoal text-ivory">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-dustyRose/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Cinematic Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-ivory/10 border border-ivory/20 text-antiqueGold text-xs uppercase tracking-widest font-serif mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>SYLHET, BANGLADESH</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory font-bold tracking-tight">
            {SITE_CONFIG.sreemangal.title}
          </h2>

          <p className="mt-4 font-serif italic text-lg sm:text-2xl text-champagne">
            "{SITE_CONFIG.sreemangal.subtitle}"
          </p>

          <p className="mt-4 font-sans text-xs sm:text-sm text-ivory/70 max-w-lg mx-auto leading-relaxed">
            {SITE_CONFIG.sreemangal.narrative}
          </p>
        </div>

        {/* Cinematic Asymmetrical Photo Sequence (Scrapbook + Editorial layout) */}
        <div className="space-y-12">
          {/* Hero Feature 1: Wide Panorama & Story Quote */}
          {displayPhotos[0] && (
            <div
              onClick={() => handlePhotoClick(displayPhotos[0])}
              className="group cursor-pointer relative rounded-2xl overflow-hidden bg-deepPlum/40 border border-champagne/20 shadow-2xl transition-all duration-500 hover:border-antiqueGold/60"
            >
              <div className="aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden relative">
                <img
                  src={displayPhotos[0].src}
                  alt={displayPhotos[0].title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deepPlum via-deepPlum/20 to-transparent flex flex-col justify-end p-6 sm:p-10">
                  <div className="flex items-center gap-2 text-xs text-antiqueGold uppercase tracking-wider mb-1 font-serif">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{displayPhotos[0].location || 'Sreemangal, Sylhet'}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-3xl text-ivory font-bold">
                    {displayPhotos[0].title}
                  </h3>
                  <p className="font-bengali text-champagne/90 text-sm sm:text-lg mt-1 font-normal max-w-2xl">
                    "{displayPhotos[0].caption}"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Dual Layer Composition: 2 Asymmetrical Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {displayPhotos[1] && (
              <div
                onClick={() => handlePhotoClick(displayPhotos[1])}
                className="md:col-span-7 group cursor-pointer bg-ivory/5 p-4 rounded-2xl border border-champagne/20 shadow-xl hover:border-antiqueGold/50 transition-all"
              >
                <div className="aspect-[4/3] w-full rounded-xl overflow-hidden relative bg-black/20">
                  <img
                    src={displayPhotos[1].src}
                    alt={displayPhotos[1].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-deepPlum/70 text-ivory backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="pt-4 px-1">
                  <p className="font-bengali text-base sm:text-lg text-champagne font-medium">
                    "{displayPhotos[1].caption}"
                  </p>
                  <p className="font-sans text-xs text-antiqueGold/80 mt-1">
                    {displayPhotos[1].location || 'Tea Gardens of Sreemangal'}
                  </p>
                </div>
              </div>
            )}

            {displayPhotos[2] && (
              <div
                onClick={() => handlePhotoClick(displayPhotos[2])}
                className="md:col-span-5 group cursor-pointer bg-ivory/5 p-4 rounded-2xl border border-champagne/20 shadow-xl hover:border-antiqueGold/50 transition-all md:-translate-y-4"
              >
                <div className="aspect-[3/4] w-full rounded-xl overflow-hidden relative bg-black/20">
                  <img
                    src={displayPhotos[2].src}
                    alt={displayPhotos[2].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-deepPlum/70 text-ivory backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="pt-4 px-1">
                  <p className="font-bengali text-base sm:text-lg text-champagne font-medium">
                    "{displayPhotos[2].caption}"
                  </p>
                  <p className="font-sans text-xs text-antiqueGold/80 mt-1">
                    {displayPhotos[2].location || 'The Scenic Way'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Additional Scrapbook Moments Grid */}
          {displayPhotos.length > 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
              {displayPhotos.slice(3, 6).map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => handlePhotoClick(photo)}
                  className="group cursor-pointer bg-ivory/5 p-3 rounded-2xl border border-champagne/20 shadow-lg hover:border-antiqueGold/50 transition-all"
                >
                  <div className="aspect-square w-full rounded-xl overflow-hidden bg-black/20 relative">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="pt-3 px-1">
                    <p className="font-bengali text-sm text-champagne line-clamp-2">
                      "{photo.caption}"
                    </p>
                    <span className="text-[11px] text-ivory/50 mt-1 block font-sans">
                      {photo.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Continuation Button */}
        <div className="mt-16 text-center">
          <button
            onClick={() => {
              audioManager.playTransition();
              onContinue();
            }}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-ivory text-deepPlum font-sans text-sm font-semibold tracking-wide shadow-xl hover:bg-champagne hover:scale-105 transition-all"
          >
            <span>{SITE_CONFIG.sreemangal.buttonText}</span>
            <ArrowRight className="w-4 h-4 text-dustyRose group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warmCharcoal/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-deepPlum border border-champagne/30 rounded-2xl p-4 sm:p-6 shadow-2xl text-ivory animate-fade-in">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-warmCharcoal/70 text-champagne hover:text-ivory"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] w-full rounded-xl overflow-hidden bg-black/40 flex items-center justify-center">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="max-h-[70vh] w-full object-contain"
              />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-champagne/20">
              <div>
                <h4 className="font-serif text-xl font-bold text-ivory">
                  {selectedPhoto.title}
                </h4>
                <p className="font-bengali text-champagne text-base mt-0.5">
                  "{selectedPhoto.caption}"
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-antiqueGold">
                {selectedPhoto.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {selectedPhoto.location}
                  </span>
                )}
                {selectedPhoto.date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedPhoto.date}
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
