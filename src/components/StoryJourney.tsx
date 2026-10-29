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

interface StoryJourneyProps {
  photos: PhotoMemory[];
  onReplay: () => void;
}

export const StoryJourney: React.FC<StoryJourneyProps> = ({ photos, onReplay }) => {
  const { lang } = useLanguage();

  // Lightbox state for photos
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMemory | null>(null);

  // Letter open state (meaningful interaction #3)
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [copiedLetter, setCopiedLetter] = useState(false);

  // Group and portrait photos
  const groupPhoto = photos.find((p) => p.category === 'batparss') || photos[2] || photos[0];
  const candidPhoto = photos.find((p) => p.src.includes('candid')) || photos[5] || photos[1];
  const spotlightPhoto = photos.find((p) => p.category === 'spotlight') || photos[3] || photos[0];
  const sreemangalPhotos = photos.filter((p) => p.category === 'sreemangal');

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
      particleCount: 65,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#C6A56B', '#C88F91', '#F8F4EE', '#E8D8C5', '#A78B9A'],
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
          CHAPTER 1: BATPARSS PRESENTS
         ========================================================================= */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 py-24 overflow-hidden bg-ivory">
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-champagne/45 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-dustyRose/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne/40 border border-champagne text-deepPlum text-xs font-serif uppercase tracking-widest mb-6 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-antiqueGold" />
            <span>{lang === 'bn' ? 'বাটপাড়স গ্যাংয়ের উপহার' : 'A Batparss Presentation'}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-deepPlum font-bold tracking-tight leading-tight max-w-3xl">
            {lang === 'bn' ? 'শুভ জন্মদিন, মহিমা!' : 'Happy Birthday, Mahima!'}
          </h1>

          <p className="mt-4 font-serif italic text-xl sm:text-2xl text-dustyRose max-w-2xl">
            {lang === 'bn'
              ? '“শ্রীমঙ্গলের সবুজে ঘেরা সেই স্মৃতি, আর আজীবন পাশে থাকার এক নিটোল গল্প।”'
              : '"Misty tea gardens, unscripted laughter, and an unbreakable circle of friends."'}
          </p>

          <p className="mt-4 text-sm sm:text-base text-warmCharcoal/80 max-w-xl leading-relaxed">
            {lang === 'bn'
              ? 'বাটপাড়সের পক্ষ থেকে তোমার এই বিশেষ দিনে আমাদের হৃদয়ের সবচেয়ে উষ্ণ ভালোবাসা। এটি কোনো সাধারণ শুভেচ্ছা নয়, আমাদের একরাশ অমূল্য স্মৃতির জীবন্ত দলিল।'
              : 'From your friends in Batparss, wishing you a celebration full of warmth, nostalgia, and genuine joy. This is our shared story.'}
          </p>

          {/* Group Photo Vignette */}
          {groupPhoto && (
            <div className="relative mt-10 max-w-md w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border-4 border-ivory ring-1 ring-champagne group">
              <img
                src={groupPhoto.src}
                alt="The Batparss Circle"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deepPlum/75 via-transparent to-transparent flex items-end p-5">
                <span className="text-xs font-serif text-ivory tracking-wider">
                  {lang === 'bn' ? 'বাটপাড়স সার্কেল • সিলেট ভ্রমণ' : 'The Batparss Circle • Bangladesh'}
                </span>
              </div>
            </div>
          )}

          <div className="mt-12 text-xs text-mutedMauve tracking-widest uppercase font-serif animate-bounce">
            {lang === 'bn' ? 'গল্পের গভীরে যেতে স্ক্রোল করুন ↓' : 'Scroll down to unfold our story ↓'}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 2: OUR FRIENDSHIP, OUR CHAOS
         ========================================================================= */}
      <section className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-ivory via-champagne/25 to-ivory">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-16">
            <span className="inline-block text-xs uppercase tracking-widest font-serif font-semibold text-antiqueGold mb-2">
              {lang === 'bn' ? 'বন্ধুত্ব ও খুনসুটি' : 'Friendship & Endless Chaos'}
            </span>
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
                  className="p-5 rounded-2xl bg-white/70 backdrop-blur-xs border border-champagne/60 shadow-xs hover:border-antiqueGold hover:bg-white transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <span className="font-serif text-lg font-bold text-dustyRose select-none">
                      0{idx + 1}.
                    </span>
                    <div>
                      <p className="text-base sm:text-lg font-medium text-deepPlum leading-snug">
                        {q.text}
                      </p>
                      <p className="text-xs sm:text-sm text-warmCharcoal/70 mt-1 italic font-serif">
                        {q.sub}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Candid Scrapbook Frame with slight natural tilt */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm aspect-[4/5] bg-white p-3.5 pb-8 rounded-2xl shadow-2xl border border-champagne rotate-1 hover:rotate-0 transition-transform duration-500 group">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-champagne/70 rounded-xs -rotate-2 shadow-inner" />
                <div className="w-full h-full bg-champagne/20 rounded-xl overflow-hidden relative">
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
          CONTINUOUS RIGHT-TO-LEFT MOVING PHOTO GALLERY
         ========================================================================= */}
      <MovingPhotoGallery />

      {/* =========================================================================
          CHAPTER 3: SREEMANGAL CHRONICLES (Photographic Centerpiece)
         ========================================================================= */}
      <section className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-warmCharcoal via-deepPlum to-warmCharcoal text-ivory">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-dustyRose/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-ivory/10 border border-ivory/20 text-antiqueGold text-xs uppercase tracking-widest font-serif mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'শ্রীমঙ্গল • সিলেট ভ্রমণ' : 'SREEMANGAL, SYLHET'}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory font-bold tracking-tight">
              {lang === 'bn' ? 'শ্রীমঙ্গলের স্মৃতিময় দিনগুলো' : 'The Sreemangal Chronicles'}
            </h2>

            <p className="mt-3 font-serif italic text-lg sm:text-2xl text-champagne">
              {lang === 'bn'
                ? '“যাত্রাপথ এবং গন্তব্যের মাঝেই আমরা খুঁজে পেয়েছি বন্ধুত্ব।”'
                : '"Somewhere between the journey and the destination, we found home."'}
            </p>

            <p className="mt-3 text-xs sm:text-sm text-ivory/70 max-w-lg mx-auto leading-relaxed">
              {lang === 'bn'
                ? 'কুয়াশাচ্ছন্ন ভোর, চা বাগানের বুক চিরে চলা পথ আর একরাশ হাসি—সেই ভ্রমণের প্রতিটি পলক আজও আমাদের মনে অক্ষয় হয়ে আছে।'
                : 'Misty tea estates, spontaneous highway stops, and conversations that stretched well past midnight.'}
            </p>
          </div>

          {/* Cinematic Photo Sequence */}
          <div className="space-y-12">
            {/* 1. Panoramic Hero */}
            {photos[0] && (
              <div
                onClick={() => setSelectedPhoto(photos[0])}
                className="group cursor-pointer relative rounded-3xl overflow-hidden bg-deepPlum/40 border border-champagne/20 shadow-2xl transition-all duration-500 hover:border-antiqueGold/60"
              >
                <div className="aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden relative">
                  <img
                    src={photos[0].src}
                    alt={photos[0].title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deepPlum via-deepPlum/20 to-transparent flex flex-col justify-end p-6 sm:p-12">
                    <div className="flex items-center gap-2 text-xs text-antiqueGold uppercase tracking-wider mb-1 font-serif">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{photos[0].location || 'শ্রীমঙ্গল, সিলেট'}</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-4xl text-ivory font-bold">
                      {lang === 'bn' ? 'চা বাগানের অনন্ত দিগন্ত' : photos[0].title}
                    </h3>
                    <p className="text-champagne/90 text-sm sm:text-lg mt-1 font-normal max-w-2xl font-serif italic">
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
                  className="md:col-span-7 group cursor-pointer bg-ivory/5 p-4 rounded-2xl border border-champagne/20 shadow-xl hover:border-antiqueGold/50 transition-all"
                >
                  <div className="aspect-[16/10] rounded-xl overflow-hidden relative bg-black/20">
                    <img
                      src={photos[1].src}
                      alt={photos[1].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[11px] font-serif uppercase tracking-widest text-antiqueGold">
                      {photos[1].location || 'লাউয়াছড়া'}
                    </span>
                    <h4 className="font-serif text-xl font-bold text-ivory mt-1">{photos[1].title}</h4>
                    <p className="text-xs text-champagne/80 mt-1">{photos[1].caption}</p>
                  </div>
                </div>
              )}

              {photos[2] && (
                <div
                  onClick={() => setSelectedPhoto(photos[2])}
                  className="md:col-span-5 group cursor-pointer bg-ivory/5 p-4 rounded-2xl border border-champagne/20 shadow-xl hover:border-antiqueGold/50 transition-all"
                >
                  <div className="aspect-[4/5] rounded-xl overflow-hidden relative bg-black/20">
                    <img
                      src={photos[2].src}
                      alt={photos[2].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[11px] font-serif uppercase tracking-widest text-antiqueGold">
                      {photos[2].location || 'শ্রীমঙ্গল'}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-ivory mt-1">{photos[2].title}</h4>
                    <p className="text-xs text-champagne/80 mt-1">{photos[2].caption}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 4: MAHIMA SPOTLIGHT
         ========================================================================= */}
      <section className="relative py-28 px-4 overflow-hidden bg-ivory">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Large portrait frame */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden p-3 bg-white border-2 border-champagne shadow-2xl">
                <div className="w-full h-full rounded-2xl overflow-hidden relative bg-champagne/20">
                  <img
                    src={spotlightPhoto.src}
                    alt="Mahima"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deepPlum/60 via-transparent to-transparent flex items-end p-6">
                    <span className="font-serif italic text-lg text-ivory font-bold">
                      {lang === 'bn' ? 'আমাদের প্রিয় মহিমা ✨' : 'Our Star, Mahima ✨'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial write-up */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne/50 text-deepPlum text-xs font-serif uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-antiqueGold" />
                <span>{lang === 'bn' ? 'জন্মদিনের আলো' : 'The Birthday Girl'}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl text-deepPlum font-bold tracking-tight">
                {lang === 'bn' ? 'তোমার হাসিই আড্ডার প্রাণ' : 'A Presence that Brightens Every Room'}
              </h2>

              <p className="font-serif italic text-lg text-dustyRose">
                {lang === 'bn'
                  ? '“ট্যুর শেষ হয়ে গেলেও তোমার হাসিমুখের আলো আমাদের সবাইকে আজও মুগ্ধ করে।”'
                  : '"Tours conclude, but the warmth of your laughter lingers forever."'}
              </p>

              <p className="text-sm sm:text-base text-warmCharcoal/80 leading-relaxed font-sans">
                {lang === 'bn'
                  ? 'চা বাগানের চড়াই-উতরাই থেকে শুরু করে প্রতিদিনের যেকোনো আড্ডায়—তোমার প্রাণবন্ত উপস্থিতি সবকিছুকে আরও সহজ আর সুন্দর করে তোলে। বাটপাড়সের প্রত্যেকের পক্ষ থেকে তোমার জন্য অফুরন্ত শুভকামনা।'
                  : 'From traversing rugged tea trails in Sylhet to spontaneous group gatherings in Dhaka, your joyful energy always anchors our circle. May this year shower you with health, success, and continuous happiness.'}
              </p>

              <div className="pt-4 border-t border-champagne/60 flex items-center gap-6 text-xs text-mutedMauve font-serif">
                <span>• {lang === 'bn' ? 'অকৃত্রিম বন্ধুত্ব' : 'Genuine Friend'}</span>
                <span>• {lang === 'bn' ? 'আড্ডার মধ্যমণি' : 'Heart of Batparss'}</span>
                <span>• {lang === 'bn' ? 'চিরন্তন প্রেরণা' : 'Timeless Memories'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 5: DEDICATED LAST-YEAR BIRTHDAY MEMORIES
         ========================================================================= */}
      <LastYearBirthdaySection />

      {/* =========================================================================
          CHAPTER 6: THE BIRTHDAY LETTER (Interactive Keepsake)
         ========================================================================= */}
      <section className="relative py-28 px-4 overflow-hidden bg-ivory/60 border-t border-champagne/40">
        <div className="max-w-3xl mx-auto w-full">
          {!isLetterOpen ? (
            /* SEALED ENVELOPE STATE */
            <div className="flex flex-col items-center text-center">
              <span className="inline-block text-xs uppercase tracking-widest font-serif font-semibold text-antiqueGold mb-3">
                {lang === 'bn' ? '— বাটপাড়সের গোপন চিঠি —' : '— A Secret Keepsake —'}
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl text-deepPlum font-bold tracking-tight mb-8">
                {lang === 'bn' ? '“তোমার জন্য বন্ধুদের এক টুকরো চিঠি”' : '"A Special Letter Waiting for You"'}
              </h2>

              <div
                onClick={handleOpenLetter}
                className="group cursor-pointer relative w-full max-w-md aspect-[16/10] bg-gradient-to-br from-[#FAF7F2] to-[#EAE1D3] rounded-3xl shadow-2xl border-2 border-champagne p-6 flex flex-col items-center justify-center transition-all duration-500 hover:scale-103 hover:border-antiqueGold"
              >
                <div className="absolute inset-0 border border-white/40 rounded-3xl pointer-events-none" />
                <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-champagne/50 to-transparent pointer-events-none" />

                {/* Wax Seal */}
                <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-antiqueGold via-[#DFC38E] to-antiqueGold shadow-xl border-2 border-ivory flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full border border-dashed border-deepPlum/30 flex flex-col items-center justify-center">
                    <Heart className="w-5 h-5 text-deepPlum fill-deepPlum" />
                    <span className="text-[9px] uppercase tracking-widest font-bold text-deepPlum mt-0.5">
                      Batparss
                    </span>
                  </div>
                </div>

                <p className="mt-4 font-serif text-deepPlum text-base sm:text-lg font-medium tracking-wide">
                  {lang === 'bn' ? 'প্রাপক: মহিমা' : 'For: Mahima'}
                </p>
                <p className="text-xs text-dustyRose font-sans mt-0.5">
                  {lang === 'bn' ? '[খুলতে সিলমোহরে স্পর্শ করুন]' : '[Tap wax seal to open]'}
                </p>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleOpenLetter}
                  className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-deepPlum text-ivory font-sans text-sm font-semibold tracking-wide shadow-xl hover:bg-warmCharcoal hover:scale-105 transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-antiqueGold" />
                  <span>{lang === 'bn' ? 'চিঠিটি খুলুন' : 'Open the Birthday Letter'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* UNFOLDED LETTER ON WARM IVORY PAPER */
            <div className="relative bg-[#FAF7F2] rounded-3xl p-6 sm:p-12 shadow-2xl border-2 border-champagne animate-fade-in">
              <div className="flex items-center justify-between border-b border-champagne pb-4 mb-8">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-deepPlum text-ivory flex items-center justify-center">
                    <Feather className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-deepPlum text-sm sm:text-base">
                      {lang === 'bn' ? 'বাটপাড়সের ভালোবাসার চিঠি' : 'From Batparss with Love'}
                    </h4>
                    <p className="text-xs text-mutedMauve">
                      {lang === 'bn' ? 'মহিমার জন্মদিনে • ২০২৬' : 'For Mahima • Birthday 2026'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCopyLetter}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-champagne/40 hover:bg-champagne text-deepPlum text-xs font-medium transition-all cursor-pointer"
                  title="Copy letter text"
                >
                  {copiedLetter ? <Check className="w-3.5 h-3.5 text-dustyRose" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLetter ? (lang === 'bn' ? 'কপি হয়েছে' : 'Copied') : (lang === 'bn' ? 'কপি করুন' : 'Copy')}</span>
                </button>
              </div>

              <div className="relative z-10 whitespace-pre-line text-base sm:text-lg text-deepPlum/90 leading-relaxed font-sans space-y-4">
                {lang === 'bn' ? letterTextBn : letterTextEn}
              </div>

              <div className="mt-10 pt-6 border-t border-champagne/80 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-dustyRose font-serif italic">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>{lang === 'bn' ? 'বাটপাড়স গ্যাংয়ের আন্তরিক পরিবেশনা' : 'Handcrafted by the Batparss Gang'}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 7: GRAND FINALE & BATPARSS SIGNATURE
         ========================================================================= */}
      <section className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-deepPlum via-warmCharcoal to-deepPlum text-ivory">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-antiqueGold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ivory/10 border border-ivory/20 text-antiqueGold text-xs uppercase tracking-widest font-serif mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'উদযাপন ও শুভেচ্ছা' : 'THE CELEBRATION'}</span>
          </div>

          <h3 className="font-serif italic text-2xl sm:text-3xl text-champagne mb-4 tracking-wide">
            {lang === 'bn'
              ? '“বন্ধুত্ব বেঁচে থাকে স্মৃতিতে, আর পূর্ণতা পায় ভালোবাসায়।”'
              : '"Here is to another year of genuine smiles, laughter, and adventures."'}
          </h3>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ivory mb-6">
            {lang === 'bn' ? 'শুভ জন্মদিন, মহিমা!' : 'Happy Birthday, Mahima!'}
          </h2>

          <p className="text-base sm:text-xl text-champagne/80 max-w-xl leading-relaxed mb-8 font-sans">
            {lang === 'bn'
              ? 'তোমার জীবনের প্রতিটি মুহূর্ত ভরে উঠুক আনন্দ আর সাফল্যে। আমাদের বন্ধুত্ব অটুট থাকুক চিরদিন।'
              : 'May the coming year bring you boundless happiness, peace, and dreams fulfilled.'}
          </p>

          {/* Toast Action */}
          <button
            onClick={handleToastCelebration}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-dustyRose to-antiqueGold text-ivory font-sans text-xs sm:text-sm font-semibold shadow-xl hover:scale-105 transition-all mb-10 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-ivory" />
            <span>{lang === 'bn' ? 'বাটপাড়সের সাথে টোস্ট করুন 🥂' : 'Toast with Batparss 🥂'}</span>
          </button>

          {/* BATPARSS Typographic Signature Seal */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-white to-[#F9F5EE] border-2 border-champagne shadow-2xl max-w-md w-full text-warmCharcoal flex flex-col items-center mb-10">
            <div className="w-14 h-14 rounded-full bg-deepPlum text-ivory flex items-center justify-center mb-3 shadow-md">
              <Compass className="w-6 h-6 text-antiqueGold" />
            </div>

            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.25em] text-deepPlum uppercase">
              BATPARSS
            </span>
            <span className="text-[10px] tracking-widest uppercase text-mutedMauve mt-1 font-sans">
              {lang === 'bn' ? 'সিলেট • ঢাকা • চিরন্তন বন্ধুত্ব' : 'Sylhet • Dhaka • Forever Friends'}
            </span>

            <div className="mt-4 pt-4 border-t border-champagne/60 w-full flex items-center justify-center gap-1.5 text-xs text-dustyRose">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>{lang === 'bn' ? 'মহিমার জন্য ভালোবাসায় নিবেদিত' : 'Dedicated with love to Mahima'}</span>
            </div>
          </div>

          {/* Replay Option */}
          <button
            onClick={() => {
              audioManager.playTransition();
              onReplay();
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-ivory text-deepPlum font-sans text-sm font-semibold tracking-wide shadow-xl hover:bg-champagne hover:scale-105 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-antiqueGold" />
            <span>{lang === 'bn' ? 'আবার শুরু থেকে দেখুন' : 'Replay Experience'}</span>
          </button>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warmCharcoal/90 backdrop-blur-md"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-deepPlum border border-champagne/30 rounded-2xl p-4 sm:p-6 shadow-2xl text-ivory animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-warmCharcoal/70 text-champagne hover:text-ivory"
              aria-label="Close photo preview"
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
                <p className="text-champagne text-base mt-0.5 font-serif italic">
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
    </div>
  );
};
