import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Maximize2, MapPin, Calendar, X, Sparkles } from 'lucide-react';
import { MemoryItem, fetchMemories } from '../utils/api';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_MEMORIES } from '../../server/defaultData';

interface MovingPhotoGalleryProps {
  memories?: MemoryItem[];
}

export const MovingPhotoGallery: React.FC<MovingPhotoGalleryProps> = ({ memories: propMemories }) => {
  const { lang } = useLanguage();
  const [memories, setMemories] = useState<MemoryItem[]>(propMemories || []);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryItem | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // If no memories passed as props, fetch them
  useEffect(() => {
    if (propMemories && propMemories.length > 0) {
      setMemories(propMemories);
      return;
    }

    let isMounted = true;
    async function load() {
      try {
        const data = await fetchMemories();
        if (isMounted) {
          if (data && data.length > 0) {
            setMemories(data);
          } else {
            const defaults = INITIAL_MEMORIES.map((m) => ({
              id: m.id,
              title_bn: m.title_bn,
              title_en: m.title_en,
              caption_bn: m.caption_bn,
              caption_en: m.caption_en,
              image_url: m.image_url,
              category: m.category,
              location: m.location,
              memory_date: m.memory_date,
              is_featured: m.is_featured,
              display_order: m.display_order,
              is_published: m.is_published,
            }));
            setMemories(defaults);
          }
        }
      } catch (err) {
        console.warn('Failed to load gallery memories', err);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [propMemories]);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Split memories into two tracks for rich depth
  const track1 = memories.length > 0 ? memories : [];
  const track2 = memories.length > 2 ? [...memories.slice(2), ...memories.slice(0, 2)] : track1;

  // Manual scroll offset for nudging
  const trackRef = useRef<HTMLDivElement>(null);
  const handleNudge = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (memories.length === 0) return null;

  return (
    <section className="relative py-24 overflow-hidden bg-ivory border-y border-champagne/40">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/2 -left-20 w-72 h-72 bg-champagne/30 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-72 h-72 bg-dustyRose/15 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-6xl mx-auto px-4 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne/40 border border-champagne text-deepPlum text-xs font-serif uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-antiqueGold" />
            <span>{lang === 'bn' ? 'চলমান স্মৃতির অ্যালবাম' : 'Continuous Photo Reel'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-deepPlum font-bold tracking-tight">
            {lang === 'bn' ? 'আমাদের অবিস্মরণীয় মুহূর্তগুলো' : 'Echoes of Shared Adventures'}
          </h2>
          <p className="font-serif italic text-sm text-dustyRose mt-1">
            {lang === 'bn'
              ? 'ডান থেকে বামে চলমান আমাদের প্রতিটি হাসিমুখের গল্প'
              : 'Flowing right-to-left continuously • Hover or tap to pause'}
          </p>
        </div>

        {/* Gallery Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => handleNudge('left')}
            className="p-2 rounded-full border border-champagne bg-ivory hover:bg-champagne/40 text-deepPlum transition-colors cursor-pointer"
            title="Scroll Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="px-3.5 py-1.5 rounded-full border border-champagne bg-ivory hover:bg-champagne/40 text-deepPlum text-xs font-serif flex items-center gap-1.5 transition-colors cursor-pointer"
            title={isPaused ? 'Resume Reel' : 'Pause Reel'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
            <span>{isPaused ? (lang === 'bn' ? 'চালান' : 'Resume') : (lang === 'bn' ? 'থামান' : 'Pause')}</span>
          </button>

          <button
            onClick={() => handleNudge('right')}
            className="p-2 rounded-full border border-champagne bg-ivory hover:bg-champagne/40 text-deepPlum transition-colors cursor-pointer"
            title="Scroll Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CONTINUOUS MOVING MARQUEE (Right to Left) */}
      <div
        ref={trackRef}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Track 1: Moving right to left */}
        <div
          className={`flex gap-6 w-max ${
            prefersReducedMotion ? '' : 'animate-marquee-left'
          }`}
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
            animationDuration: '36s',
          }}
        >
          {/* Double track items for seamless continuous looping */}
          {[...track1, ...track1, ...track1].map((photo, idx) => (
            <div
              key={`${photo.id}-${idx}`}
              onClick={() => setSelectedPhoto(photo)}
              className="group cursor-pointer flex-shrink-0 w-64 sm:w-80 bg-white rounded-2xl p-3 border border-champagne/60 shadow-md hover:shadow-xl hover:border-antiqueGold/60 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-champagne/20">
                <img
                  src={photo.image_url}
                  alt={lang === 'bn' ? photo.title_bn : photo.title_en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deepPlum/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-xs text-ivory font-serif flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5 text-antiqueGold" />
                    {lang === 'bn' ? 'বড় করে দেখুন' : 'Expand'}
                  </span>
                </div>
              </div>

              <div className="mt-3 px-1">
                <h4 className="font-serif text-sm font-bold text-deepPlum line-clamp-1">
                  {lang === 'bn' ? photo.title_bn : photo.title_en}
                </h4>
                <p className="text-xs text-warmCharcoal/70 line-clamp-2 mt-1 font-sans">
                  {lang === 'bn' ? photo.caption_bn : photo.caption_en}
                </p>
                {photo.location && (
                  <div className="mt-2 pt-2 border-t border-champagne/40 flex items-center gap-1 text-[11px] text-mutedMauve">
                    <MapPin className="w-3 h-3 text-antiqueGold" />
                    <span>{photo.location}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-deepPlum/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-ivory rounded-3xl overflow-hidden shadow-2xl border border-champagne"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-deepPlum/80 text-ivory hover:bg-deepPlum flex items-center justify-center transition-all shadow-md"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] bg-black/10 overflow-hidden">
              <img
                src={selectedPhoto.image_url}
                alt={lang === 'bn' ? selectedPhoto.title_bn : selectedPhoto.title_en}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                {selectedPhoto.location && (
                  <span className="flex items-center gap-1 text-xs text-mutedMauve">
                    <MapPin className="w-3.5 h-3.5 text-antiqueGold" />
                    {selectedPhoto.location}
                  </span>
                )}
                {selectedPhoto.memory_date && (
                  <span className="flex items-center gap-1 text-xs text-mutedMauve">
                    <Calendar className="w-3.5 h-3.5 text-antiqueGold" />
                    {selectedPhoto.memory_date}
                  </span>
                )}
              </div>

              <h3 className="font-serif text-2xl font-bold text-deepPlum">
                {lang === 'bn' ? selectedPhoto.title_bn : selectedPhoto.title_en}
              </h3>

              <p className="mt-2 text-sm text-warmCharcoal/80 font-sans leading-relaxed">
                {lang === 'bn' ? selectedPhoto.caption_bn : selectedPhoto.caption_en}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
