import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Sparkles, Cake, Maximize2, X, ChevronRight, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { fetchMemories, MemoryItem } from '../utils/api';
import { INITIAL_MEMORIES } from '../../server/defaultData';

export const LastYearBirthdaySection: React.FC = () => {
  const { lang } = useLanguage();
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadBirthdayMemories() {
      try {
        const data = await fetchMemories('birthday_last_year');
        if (isMounted) {
          if (data && data.length > 0) {
            setMemories(data);
          } else {
            // Fallback to default records if API empty
            const defaults = INITIAL_MEMORIES
              .filter((m) => m.category === 'birthday_last_year')
              .map((m) => ({
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
        console.warn('Error loading last year birthday memories', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadBirthdayMemories();
    return () => {
      isMounted = false;
    };
  }, []);

  if (memories.length === 0 && !loading) {
    return null;
  }

  return (
    <section className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-ivory via-champagne/30 to-ivory">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-antiqueGold/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-dustyRose/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne/50 border border-champagne text-deepPlum text-xs font-serif uppercase tracking-widest mb-4 shadow-2xs">
            <Cake className="w-3.5 h-3.5 text-antiqueGold" />
            <span>
              {lang === 'bn' ? 'গত জন্মদিনের স্মৃতিমালা' : "Last Year's Birthday Memories"}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-deepPlum font-bold tracking-tight">
            {lang === 'bn' ? 'ফিরে দেখা ফেলে আসা দিন' : 'Looking Back at Yesterday'}
          </h2>

          <p className="mt-4 font-serif italic text-lg sm:text-xl text-dustyRose">
            {lang === 'bn'
              ? '“বছর ঘুরে জন্মদিন আবার ফিরে এলো, কিন্তু আমাদের বন্ধুত্ব রয়ে গেছে ঠিক আগের মতোই অটুট।”'
              : '"Another year has passed, but our friendship remains as bright and joyful as ever."'}
          </p>

          <p className="mt-3 text-sm text-warmCharcoal/80 leading-relaxed max-w-xl mx-auto">
            {lang === 'bn'
              ? 'গত বছরের এই দিনে তোমার হাসিমুখ, কেক কাটার সেই মিষ্টি মুহূর্ত আর বন্ধুদের একসাথে কাটানো দারুণ কিছু স্মৃতি আজ আবার জীবন্ত হয়ে উঠেছে।'
              : 'Remembering the laughter, the heartfelt wishes, and the joyful moments shared with Batparss on your previous birthday.'}
          </p>
        </div>

        {/* Memories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {memories.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => setSelectedPhoto(item)}
              className="group cursor-pointer bg-ivory rounded-2xl p-3 border border-champagne/60 shadow-lg hover:shadow-2xl hover:border-antiqueGold/60 transition-all duration-500 flex flex-col"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-champagne/20">
                <img
                  src={item.image_url}
                  alt={lang === 'bn' ? item.title_bn : item.title_en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deepPlum/75 via-deepPlum/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-ivory font-medium bg-deepPlum/80 px-2.5 py-1 rounded-full backdrop-blur-xs">
                    <Maximize2 className="w-3 h-3 text-antiqueGold" />
                    {lang === 'bn' ? 'বড় করে দেখুন' : 'View Fullscreen'}
                  </span>
                </div>
                {item.memory_date && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-deepPlum/85 backdrop-blur-xs text-[11px] font-serif text-ivory flex items-center gap-1 shadow-sm">
                    <Calendar className="w-3 h-3 text-antiqueGold" />
                    {item.memory_date}
                  </span>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-deepPlum group-hover:text-dustyRose transition-colors">
                    {lang === 'bn' ? item.title_bn : item.title_en}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-warmCharcoal/80 leading-relaxed font-sans line-clamp-3">
                    {lang === 'bn' ? item.caption_bn : item.caption_en}
                  </p>
                </div>

                {item.location && (
                  <div className="mt-4 pt-3 border-t border-champagne/40 flex items-center justify-between text-xs text-mutedMauve">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-antiqueGold" />
                      {item.location}
                    </span>
                    <span className="text-[11px] font-serif italic text-dustyRose flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-dustyRose/20 text-dustyRose" />
                      {lang === 'bn' ? 'স্মৃতি' : 'Keepsake'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal Lightbox */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-deepPlum/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-ivory rounded-3xl overflow-hidden shadow-2xl border border-champagne flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-deepPlum/80 text-ivory hover:bg-deepPlum flex items-center justify-center transition-all shadow-md"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] bg-black/5 overflow-hidden">
              <img
                src={selectedPhoto.image_url}
                alt={lang === 'bn' ? selectedPhoto.title_bn : selectedPhoto.title_en}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-champagne/50 text-deepPlum text-xs font-serif font-semibold">
                  {lang === 'bn' ? 'গত জন্মদিন' : "Last Year's Birthday"}
                </span>
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

              <p className="mt-3 text-sm sm:text-base text-warmCharcoal/90 leading-relaxed font-sans">
                {lang === 'bn' ? selectedPhoto.caption_bn : selectedPhoto.caption_en}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
