import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Calendar,
  X,
  Maximize2,
  Mail,
  Heart,
  Copy,
  Check,
  Feather,
  RotateCcw,
  Sparkles,
  Quote,
  Sun,
  Shield,
  Mountain,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PhotoMemory } from '../config/content';
import { audioManager } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';
import { MovingPhotoGallery } from './MovingPhotoGallery';
import { LastYearBirthdaySection } from './LastYearBirthdaySection';
import { LittleSurprisesSection } from './LittleSurprisesSection';

interface StoryJourneyProps {
  photos: PhotoMemory[];
  onReplay: () => void;
}

export const StoryJourney: React.FC<StoryJourneyProps> = ({ photos, onReplay }) => {
  const { lang } = useLanguage();

  // Lightbox state for photos
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMemory | null>(null);

  // Letter open state
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [copiedLetter, setCopiedLetter] = useState(false);

  // Group and portrait photos
  const groupPhoto = photos.find((p) => p.category === 'batparss') || photos[2] || photos[0];
  const candidPhoto = photos.find((p) => p.src.includes('candid')) || photos[5] || photos[1];
  const spotlightPhoto = photos.find((p) => p.category === 'spotlight') || photos[3] || photos[0];

  const handleOpenLetter = () => {
    audioManager.playCelebrationSparkle();
    setIsLetterOpen(true);
  };

  const letterTextBn = `প্রিয় মহিমা,

শুভ জন্মদিন! বাটপাড়সের সবার পক্ষ থেকে তোমার জন্য অফুরন্ত শুভকামনা আর ভালোবাসা।

আমাদের জীবনের সেরা স্মৃতিগুলোর মধ্যে অন্যতম সেই শ্রীমঙ্গলের ট্যুর। চা বাগানের আঁকাবাঁকা পথ, ভোরের কুয়াশা, লেকের ঠান্ডা বাতাস, আর কোনো কারণ ছাড়াই একসাথে প্রাণখুলে হাসা—এসব কিছু আমাদের বন্ধুত্বকে এক নতুন অর্থ দিয়েছিল।

তুমি শুধু আমাদের বন্ধুই নও, আমাদের আড্ডার মধ্যমণি আর অনুপ্রেরণা। জীবনের প্রতিটি দিন তোমার শ্রীমঙ্গলের ভোরের মতো নির্মল আর সতেজ হয়ে উঠুক।

হাসি যেন তোমার মুখ থেকে কখনো মিলিয়ে না যায়। শুভ জন্মদিন মহিমা!

— ভালোবাসা ও দোয়ায়,
বাটপাড়স গ্যাং`;

  const letterTextEn = `Dearest Mahima,

Happy Birthday! From every single member of Batparss, sending you endless warmth, happiness, and heartfelt love.

Looking back, our group journey to Sreemangal remains one of the brightest chapters of our lives. The winding paths through emerald tea estates, the cool morning mist, the tranquil lakeside moments, and countless hours of effortless laughter together gave our bond an irreplaceable meaning.

You are not merely our dear friend; you are the soul and spark of every single gathering. May every upcoming day of your life unfold with the fresh serenity of a misty Sreemangal dawn.

May your joyful smile keep illuminating everyone around you forever. Happy Birthday, Mahima!

— With everlasting warmth,
The Batparss Gang`;

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(lang === 'bn' ? letterTextBn : letterTextEn);
    setCopiedLetter(true);
    audioManager.playChime(800, 0.4, 0.1);
    setTimeout(() => setCopiedLetter(false), 2200);
  };

  const handleToastCelebration = () => {
    audioManager.playCelebrationSparkle();
    confetti({
      particleCount: 85,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#FF5E97', '#70D6FF', '#FFD670', '#9BF6FF', '#BDB2FF', '#FF85A2'],
    });
  };

  // Chaotic adda quotes (strictly authentic Bengali script)
  const quotesBn = [
    { text: '“আমরা সবাই ঠিক ৯টায় পৌঁছাব—এই প্রতিশ্রুতি আজও কেউ রক্ষা করতে পারল না!”', sub: 'পরিকল্পনা বনাম বাস্তবতা' },
    { text: '“আরে ছবিটা আরেকবার তোল, ঠিকমতো হাসি আসেনি!”', sub: 'শ্রীমঙ্গলের টি গার্ডেন মোমেন্ট' },
    { text: '“চলো আরও একটু হাঁটি, পরের চা বাগানটা নাকি আরও সুন্দর!”', sub: 'চিরন্তন বাটপাড়স উদ্যম' },
    { text: '“ট্যুর তো শেষ হলো, কিন্তু আমাদের আড্ডা আজীবন চলবে।”', sub: 'অবিচ্ছেদ্য বন্ধুত্ব' },
  ];

  const quotesEn = [
    { text: '"Let\'s all reach strictly by 9:00 AM—a promise nobody has ever kept!"', sub: 'Planning vs Reality' },
    { text: '"Take that picture one more time, the candid smile wasn\'t ready!"', sub: 'Tea Garden Memories' },
    { text: '"Let\'s walk just a little further, the next tea hill is supposedly even prettier!"', sub: 'Batparss Exploration' },
    { text: '"The road trip may end, but our conversations and laughter last forever."', sub: 'Lifelong Friendship' },
  ];

  return (
    <div className="w-full text-warmCharcoal animate-fade-in font-sans">
      {/* =========================================================================
          SECTION 1: OUR BEAUTIFUL MEMORIES (Continuous Moving Photo Gallery)
         ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-skyBlueLight/20 to-white">
        <MovingPhotoGallery />
      </section>

      {/* =========================================================================
          SECTION 2: DEDICATED LAST-YEAR BIRTHDAY MEMORIES
         ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-pinkPastel/15 to-white">
        <LastYearBirthdaySection />
      </section>

      {/* =========================================================================
          SECTION 3: OUR STORY — CHAPTER 1: FRIENDSHIP & CHAOS
         ========================================================================= */}
      <section className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-white via-butterYellowLight/30 to-white">
        {/* Soft pastel decorative glows */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-pinkPastel/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-lavenderLight/35 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-champagne text-coral text-xs font-serif uppercase tracking-widest mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-butterYellow" />
              <span>{lang === 'bn' ? 'বন্ধুত্ব ও খুনসুটি' : 'Friendship & Endless Chaos'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-deepPlum font-bold tracking-tight">
              {lang === 'bn' ? 'আমাদের সেই চিরচেনা আড্ডা' : 'Unfiltered, Loud & Irreplaceable'}
            </h2>
            <p className="font-sans text-xs text-mutedMauve mt-1 uppercase tracking-wider">
              {lang === 'bn' ? 'অনাবিল হাসি • মিষ্টি খুনসুটি • হাজারো গল্প' : 'Laughter • Memories • Togetherness'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Flowing dialogue without clicking individual cards */}
            <div className="lg:col-span-7 space-y-4">
              {(lang === 'bn' ? quotesBn : quotesEn).map((q, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/90 backdrop-blur-sm border-2 border-champagne hover:border-brightPink/60 shadow-sm hover:shadow-lg hover:bg-white transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <span className="font-serif text-lg font-bold text-brightPink select-none">
                      0{idx + 1}.
                    </span>
                    <div>
                      <p className="text-base sm:text-lg font-medium text-deepPlum leading-snug font-serif">
                        {q.text}
                      </p>
                      <p className="text-xs sm:text-sm text-coral mt-1 font-serif italic">
                        {q.sub}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Candid Scrapbook Frame with colorful party tilt */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm aspect-[4/5] bg-white p-3.5 pb-8 rounded-3xl shadow-2xl border-4 border-pinkPastel/60 rotate-2 hover:rotate-0 transition-transform duration-500 group">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-butterYellow/70 rounded-sm -rotate-3 shadow-inner text-center flex items-center justify-center text-[10px] font-bold text-deepPlum uppercase tracking-wider">
                  BATPARSS
                </div>
                <div className="w-full h-full bg-champagne/20 rounded-2xl overflow-hidden relative">
                  <img
                    src={candidPhoto.src}
                    alt="Batparss Adda Moment"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="mt-3 text-center">
                  <span className="font-serif italic text-lg text-deepPlum font-bold">
                    {lang === 'bn' ? 'বাটপাড়সের মিষ্টি বিশৃঙ্খলা ❤️' : 'The Batparss Chaos ❤️'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: OUR STORY — CHAPTER 2: SREEMANGAL CHRONICLES
         ========================================================================= */}
      <section className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-white via-mintGreenLight/30 to-white text-warmCharcoal">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-softSage text-deepPlum text-xs uppercase tracking-widest font-serif mb-4 shadow-sm">
              <Compass className="w-3.5 h-3.5 text-softSage" />
              <span>{lang === 'bn' ? 'শ্রীমঙ্গল • সিলেট ভ্রমণ' : 'SREEMANGAL, SYLHET'}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-deepPlum font-bold tracking-tight">
              {lang === 'bn' ? 'শ্রীমঙ্গলের স্মৃতিময় দিনগুলো' : 'The Sreemangal Chronicles'}
            </h2>

            <p className="mt-3 font-serif italic text-lg sm:text-2xl text-coral">
              {lang === 'bn'
                ? '“যাত্রাপথ এবং গন্তব্যের মাঝেই আমরা খুঁজে পেয়েছি বন্ধুত্ব।”'
                : '"Somewhere between the journey and the destination, we found home."'}
            </p>

            <p className="mt-3 text-xs sm:text-sm text-warmCharcoal/80 max-w-lg mx-auto leading-relaxed">
              {lang === 'bn'
                ? 'কুয়াশাচ্ছন্ন ভোর, চা বাগানের বুক চিরে চলা পথ আর একরাশ হাসি—সেই ভ্রমণের প্রতিটি পলক আজও আমাদের মনে অক্ষয় হয়ে আছে।'
                : 'Misty tea estates, spontaneous highway stops, and conversations that stretched well past midnight.'}
            </p>
          </div>

          {/* Cinematic Photo Sequence */}
          <div className="space-y-12">
            {/* 1. Panoramic Hero Photo */}
            {photos[0] && (
              <div
                onClick={() => setSelectedPhoto(photos[0])}
                className="group cursor-pointer relative rounded-3xl overflow-hidden bg-white border-2 border-champagne shadow-2xl transition-all duration-500 hover:border-brightPink/60"
              >
                <div className="aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden relative">
                  <img
                    src={photos[0].src}
                    alt={photos[0].title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deepPlum/80 via-deepPlum/20 to-transparent flex flex-col justify-end p-6 sm:p-12 text-white">
                    <div className="flex items-center gap-2 text-xs text-butterYellow uppercase tracking-wider mb-1 font-serif">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{photos[0].location || 'শ্রীমঙ্গল, সিলেট'}</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-4xl text-white font-bold">
                      {lang === 'bn' ? 'চা বাগানের অনন্ত দিগন্ত' : photos[0].title}
                    </h3>
                    <p className="text-white/90 text-sm sm:text-lg mt-1 font-normal max-w-2xl font-serif italic">
                      "{lang === 'bn' ? 'সবুজের মাঝে হারিয়ে গিয়ে বন্ধুত্বকে নতুন করে আবিষ্কার।' : photos[0].caption}"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Asymmetric Two-Photo Composition */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {photos[1] && (
                <div
                  onClick={() => setSelectedPhoto(photos[1])}
                  className="md:col-span-7 group cursor-pointer bg-white p-4 rounded-3xl border-2 border-champagne shadow-xl hover:border-brightPink/60 transition-all"
                >
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden relative bg-black/5">
                    <img
                      src={photos[1].src}
                      alt={photos[1].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[11px] font-serif uppercase tracking-widest text-brightPink font-bold">
                      {photos[1].location || 'লাউয়াছড়া'}
                    </span>
                    <h4 className="font-serif text-xl font-bold text-deepPlum mt-1">{photos[1].title}</h4>
                    <p className="text-xs text-warmCharcoal/80 mt-1">{photos[1].caption}</p>
                  </div>
                </div>
              )}

              {photos[2] && (
                <div
                  onClick={() => setSelectedPhoto(photos[2])}
                  className="md:col-span-5 group cursor-pointer bg-white p-4 rounded-3xl border-2 border-champagne shadow-xl hover:border-brightPink/60 transition-all"
                >
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden relative bg-black/5">
                    <img
                      src={photos[2].src}
                      alt={photos[2].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[11px] font-serif uppercase tracking-widest text-brightPink font-bold">
                      {photos[2].location || 'শ্রীমঙ্গল'}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-deepPlum mt-1">{photos[2].title}</h4>
                    <p className="text-xs text-warmCharcoal/80 mt-1">{photos[2].caption}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: OUR STORY — CHAPTER 3: MAHIMA SPOTLIGHT
         ========================================================================= */}
      <section className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-white via-lavenderLight/25 to-white">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Large portrait frame */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden p-3 bg-white border-4 border-pinkPastel/60 shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="w-full h-full rounded-2xl overflow-hidden relative bg-champagne/20">
                  <img
                    src={spotlightPhoto.src}
                    alt="Mahima"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deepPlum/70 via-transparent to-transparent flex items-end p-6">
                    <span className="font-serif italic text-lg text-white font-bold">
                      {lang === 'bn' ? 'আমাদের প্রিয় মহিমা ✨' : 'Our Star, Mahima ✨'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial write-up */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-pinkPastel text-brightPink text-xs font-serif uppercase tracking-widest shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-butterYellow" />
                <span>{lang === 'bn' ? 'জন্মদিনের আলো' : 'The Birthday Star'}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl text-deepPlum font-bold tracking-tight">
                {lang === 'bn' ? 'তোমার হাসিই আড্ডার প্রাণ' : 'A Presence that Brightens Every Room'}
              </h2>

              <p className="font-serif italic text-lg text-coral">
                {lang === 'bn'
                  ? '“ট্যুর শেষ হয়ে গেলেও তোমার হাসিমুখের আলো আমাদের সবাইকে আজও মুগ্ধ করে।”'
                  : '"Tours conclude, but the warmth of your laughter lingers forever."'}
              </p>

              <p className="text-sm sm:text-base text-warmCharcoal/80 leading-relaxed font-sans">
                {lang === 'bn'
                  ? 'চা বাগানের চড়াই-উতরাই থেকে শুরু করে প্রতিদিনের যেকোনো আড্ডায়—তোমার প্রাণবন্ত উপস্থিতি সবকিছুকে আরও সহজ আর সুন্দর করে তোলে। বাটপাড়সের প্রত্যেকের পক্ষ থেকে তোমার জন্য অফুরন্ত শুভকামনা।'
                  : 'From traversing rugged tea trails in Sylhet to spontaneous group gatherings in Dhaka, your joyful energy always anchors our circle. May this year shower you with health, success, and continuous happiness.'}
              </p>

              <div className="pt-4 border-t border-champagne flex items-center gap-6 text-xs text-mutedMauve font-serif font-bold">
                <span>• {lang === 'bn' ? 'অকৃত্রিম বন্ধুত্ব' : 'Genuine Friend'}</span>
                <span>• {lang === 'bn' ? 'আড্ডার মধ্যমণি' : 'Heart of Batparss'}</span>
                <span>• {lang === 'bn' ? 'চিরন্তন প্রেরণা' : 'Timeless Memories'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: LITTLE SURPRISES (Interactive 3D Gift Boxes & Balloons)
         ========================================================================= */}
      <LittleSurprisesSection />

      {/* =========================================================================
          SECTION 5: THE FINAL LETTER (Magical Animated Keepsake)
         ========================================================================= */}
      <section className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-white via-pinkPastel/20 to-ivory">
        <div className="max-w-3xl mx-auto w-full">
          {!isLetterOpen ? (
            /* SEALED ENVELOPE STATE */
            <div className="flex flex-col items-center text-center">
              <span className="inline-block text-xs uppercase tracking-widest font-serif font-bold text-coral mb-3">
                {lang === 'bn' ? '— বাটপাড়সের গোপন চিঠি —' : '— A Secret Keepsake —'}
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl text-deepPlum font-bold tracking-tight mb-8">
                {lang === 'bn' ? '“তোমার জন্য বন্ধুদের এক টুকরো চিঠি”' : '"A Special Letter Waiting for You"'}
              </h2>

              <div
                onClick={handleOpenLetter}
                className="group cursor-pointer relative w-full max-w-md aspect-[16/10] bg-gradient-to-br from-white via-peachLight/40 to-white rounded-3xl shadow-2xl border-4 border-pinkPastel/70 p-6 flex flex-col items-center justify-center transition-all duration-500 hover:scale-105 hover:border-brightPink"
              >
                {/* Wax Seal */}
                <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-brightPink via-coral to-butterYellow shadow-xl border-2 border-white flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full border border-dashed border-white/50 flex flex-col items-center justify-center">
                    <Heart className="w-6 h-6 text-white fill-white" />
                    <span className="text-[9px] uppercase tracking-widest font-bold text-white mt-0.5">
                      Batparss
                    </span>
                  </div>
                </div>

                <p className="mt-4 font-serif text-deepPlum text-base sm:text-lg font-bold tracking-wide">
                  {lang === 'bn' ? 'প্রাপক: মহিমা' : 'For: Mahima'}
                </p>
                <p className="text-xs text-coral font-sans font-medium mt-0.5 animate-pulse">
                  {lang === 'bn' ? '[খুলতে সিলমোহরে স্পর্শ করো]' : '[Tap wax seal to open]'}
                </p>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleOpenLetter}
                  className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-brightPink via-coral to-butterYellow text-white font-serif text-sm font-bold shadow-xl hover:scale-105 transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-butterYellowLight" />
                  <span>{lang === 'bn' ? 'চিঠিটি খুলুন' : 'Open the Birthday Letter'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* UNFOLDED LETTER ON WARM PASTEL PAPER */
            <div className="relative bg-white rounded-3xl p-6 sm:p-12 shadow-2xl border-4 border-pinkPastel/60 animate-fade-in">
              <div className="flex items-center justify-between border-b border-champagne pb-4 mb-8">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brightPink to-lavender text-white flex items-center justify-center shadow-md">
                    <Feather className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-deepPlum text-base">
                      {lang === 'bn' ? 'বাটপাড়সের ভালোবাসার চিঠি' : 'From Batparss with Love'}
                    </h4>
                    <p className="text-xs text-mutedMauve">
                      {lang === 'bn' ? 'মহিমার জন্মদিনে • ২০২৬' : 'For Mahima • Birthday 2026'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCopyLetter}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-champagne hover:bg-pinkPastel/30 text-deepPlum text-xs font-serif font-bold transition-all cursor-pointer"
                  title="Copy letter text"
                >
                  {copiedLetter ? <Check className="w-3.5 h-3.5 text-brightPink" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLetter ? (lang === 'bn' ? 'কপি হয়েছে' : 'Copied') : (lang === 'bn' ? 'কপি করুন' : 'Copy')}</span>
                </button>
              </div>

              <div className="relative z-10 whitespace-pre-line text-base sm:text-lg text-deepPlum/90 leading-relaxed font-sans space-y-4">
                {lang === 'bn' ? letterTextBn : letterTextEn}
              </div>

              <div className="mt-10 pt-6 border-t border-champagne flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-coral font-serif font-bold italic">
                  <Heart className="w-3.5 h-3.5 fill-coral" />
                  <span>{lang === 'bn' ? 'বাটপাড়স গ্যাংয়ের আন্তরিক পরিবেশনা' : 'Handcrafted by the Batparss Gang'}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: GRAND FINALE & BATPARSS CELEBRATION SIGNATURE
         ========================================================================= */}
      <section className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-ivory via-lavenderLight/30 to-white text-deepPlum">
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-pinkPastel text-brightPink text-xs uppercase tracking-widest font-serif font-bold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-butterYellow" />
            <span>{lang === 'bn' ? 'উদযাপন ও শুভেচ্ছা' : 'THE CELEBRATION'}</span>
          </div>

          <h3 className="font-serif italic text-2xl sm:text-3xl text-coral mb-4 tracking-wide">
            {lang === 'bn'
              ? '“বন্ধুত্ব বেঁচে থাকে স্মৃতিতে, আর পূর্ণতা পায় ভালোবাসায়।”'
              : '"Here is to another year of genuine smiles, laughter, and adventures."'}
          </h3>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-deepPlum mb-6">
            {lang === 'bn' ? 'শুভ জন্মদিন, মহিমা!' : 'Happy Birthday, Mahima!'}
          </h2>

          <p className="text-base sm:text-xl text-warmCharcoal/80 max-w-xl leading-relaxed mb-8 font-sans">
            {lang === 'bn'
              ? 'তোমার জীবনের প্রতিটি মুহূর্ত ভরে উঠুক আনন্দ আর সাফল্যে। আমাদের বন্ধুত্ব অটুট থাকুক চিরদিন।'
              : 'May the coming year bring you boundless happiness, peace, and dreams fulfilled.'}
          </p>

          {/* Toast Action */}
          <button
            onClick={handleToastCelebration}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-brightPink via-coral to-butterYellow text-white font-serif text-sm font-bold shadow-xl hover:scale-105 transition-all mb-10 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-butterYellowLight" />
            <span>{lang === 'bn' ? 'বাটপাড়সের সাথে টোস্ট করো 🥂' : 'Toast with Batparss 🥂'}</span>
          </button>

          {/* BATPARSS Typographic Signature Seal */}
          <div className="p-8 rounded-3xl bg-white border-2 border-champagne shadow-2xl max-w-md w-full text-warmCharcoal flex flex-col items-center mb-10">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brightPink to-lavender text-white flex items-center justify-center mb-3 shadow-md">
              <Compass className="w-6 h-6 text-butterYellow" />
            </div>

            <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-[0.25em] text-deepPlum uppercase">
              BATPARSS
            </span>
            <span className="text-[10px] tracking-widest uppercase text-mutedMauve mt-1 font-sans font-bold">
              {lang === 'bn' ? 'সিলেট • ঢাকা • চিরন্তন বন্ধুত্ব' : 'Sylhet • Dhaka • Forever Friends'}
            </span>

            <div className="mt-4 pt-4 border-t border-champagne w-full flex items-center justify-center gap-1.5 text-xs text-brightPink font-serif font-bold">
              <Heart className="w-3.5 h-3.5 fill-brightPink" />
              <span>{lang === 'bn' ? 'মহিমার জন্য ভালোবাসায় নিবেদিত' : 'Dedicated with love to Mahima'}</span>
            </div>
          </div>

          {/* Replay Option */}
          <button
            onClick={() => {
              audioManager.playTransition();
              onReplay();
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-deepPlum text-white font-serif text-sm font-bold tracking-wide shadow-xl hover:bg-warmCharcoal hover:scale-105 transition-all cursor-pointer border border-butterYellow"
          >
            <RotateCcw className="w-4 h-4 text-butterYellow" />
            <span>{lang === 'bn' ? 'আবার শুরু থেকে দেখো' : 'Replay Experience'}</span>
          </button>
        </div>
      </section>

      {/* Lightbox Modal for any photo click */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deepPlum/85 backdrop-blur-md"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white border-2 border-champagne rounded-3xl p-4 sm:p-6 shadow-2xl text-deepPlum animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-champagne hover:bg-pinkPastel/40 text-deepPlum"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] w-full rounded-2xl overflow-hidden bg-black/5 flex items-center justify-center">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="max-h-[70vh] w-full object-contain"
              />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-champagne">
              <div>
                <h4 className="font-serif text-xl font-bold text-deepPlum">
                  {selectedPhoto.title}
                </h4>
                <p className="text-coral text-base mt-0.5 font-serif italic">
                  "{selectedPhoto.caption}"
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-mutedMauve font-serif font-bold">
                {selectedPhoto.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brightPink" />
                    {selectedPhoto.location}
                  </span>
                )}
                {selectedPhoto.date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-brightPink" />
                    {selectedPhoto.date}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
