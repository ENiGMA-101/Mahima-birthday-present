import React, { useState } from 'react';
import { Gift, Sparkles, Heart, X, MessageCircle, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GiftBox3D } from './3d/GiftBox3D';
import { audioManager } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

export interface SurpriseItem {
  id: number;
  type: 'box' | 'balloon';
  title_bn: string;
  title_en: string;
  message_bn: string;
  message_en: string;
  color: string;
  revealed?: boolean;
}

const DEFAULT_SURPRISES: SurpriseItem[] = [
  {
    id: 1,
    type: 'box',
    title_bn: 'এক টুকরো আন্তরিক শুভেচ্ছা',
    title_en: 'A Heartfelt Friendship Wish',
    message_bn: 'শ্রীমঙ্গলের সবুজে ঘেরা সেই চা বাগানের মতো তোমার জীবন সবসময় সজীব আর আনন্দময় থাকুক। শুভ জন্মদিন মহিমা!',
    message_en: 'May your days stay as fresh, green, and vibrant as the rolling hills of Sreemangal. Happy Birthday, Mahima!',
    color: '#FF5E97',
  },
  {
    id: 2,
    type: 'box',
    title_bn: 'বাটপাড়সের গোপন বার্তা',
    title_en: 'The Batparss Secret Note',
    message_bn: 'ট্যুর শেষ হয়ে গেলেও আমাদের অবিরাম আড্ডা আর হাসাহাসি কখনই থামবে না। তুমি আমাদের গ্রুপের মধ্যমণি!',
    message_en: 'Trips may come and go, but the laughter of Batparss is lifelong. You remain the glowing spark of our circle!',
    color: '#70D6FF',
  },
  {
    id: 3,
    type: 'box',
    title_bn: 'আগামীর জন্য প্রার্থনা',
    title_en: 'Wishes for the Days Ahead',
    message_bn: 'তোমার সামনের প্রতিটি দিন ভরে উঠুক সাফল্য, সুস্বাস্থ্য আর হাজারো সুন্দর স্মৃতিতে।',
    message_en: 'May every step forward bring you endless happiness, radiant health, and beautiful new memories.',
    color: '#FFD670',
  },
];

const BALLOON_WISHES = [
  {
    id: 101,
    color: '#FF5E97',
    text_bn: '🎈 "মহিমার মিষ্টি হাসি সবসময় অটুট থাকুক!"',
    text_en: '🎈 "May your joyful smile shine bright forever!"',
  },
  {
    id: 102,
    color: '#70D6FF',
    text_bn: '🎈 "পরের ট্যুর সিলেটে নাকি কক্সবাজারে?"',
    text_en: '🎈 "Where is our next road trip together?"',
  },
  {
    id: 103,
    color: '#BDB2FF',
    text_bn: '🎈 "বাটপাড়স গ্যাংয়ের পক্ষ থেকে অফুরন্ত ভালোবাসা!"',
    text_en: '🎈 "Boundless love from the entire Batparss gang!"',
  },
  {
    id: 104,
    color: '#9BF6FF',
    text_bn: '🎈 "তোমার সব স্বপ্ন পূরণ হোক এই বছরে!"',
    text_en: '🎈 "May all your heartfelt dreams come true this year!"',
  },
];

export const LittleSurprisesSection: React.FC = () => {
  const { lang } = useLanguage();
  const [surprises] = useState<SurpriseItem[]>(DEFAULT_SURPRISES);
  const [selectedSurprise, setSelectedSurprise] = useState<SurpriseItem | null>(null);
  const [openedBoxId, setOpenedBoxId] = useState<number | null>(null);

  // Popped balloons state
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);
  const [activeBalloonWish, setActiveBalloonWish] = useState<{ bn: string; en: string } | null>(null);

  const handleOpenBox = (item: SurpriseItem) => {
    setOpenedBoxId(item.id);
    audioManager.playGiftOpen();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#FF5E97', '#70D6FF', '#FFD670', '#9BF6FF', '#BDB2FF'],
    });

    setTimeout(() => {
      setSelectedSurprise(item);
    }, 600);
  };

  const handlePopBalloon = (balloon: typeof BALLOON_WISHES[0]) => {
    if (poppedBalloons.includes(balloon.id)) return;

    setPoppedBalloons((prev) => [...prev, balloon.id]);
    audioManager.playBalloonPop();

    confetti({
      particleCount: 40,
      spread: 50,
      colors: [balloon.color, '#FFF', '#FFD670'],
    });

    setActiveBalloonWish({
      bn: balloon.text_bn,
      en: balloon.text_en,
    });
  };

  return (
    <section className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-ivory via-lavenderLight/30 to-ivory">
      {/* Decorative Pastel Background Glows */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-pinkPastel/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-skyBlueLight/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-lavender text-brightPink text-xs font-serif uppercase tracking-widest mb-4 shadow-sm">
            <Gift className="w-3.5 h-3.5 text-coral" />
            <span>{lang === 'bn' ? 'ছোট ছোট চমক' : 'LITTLE SURPRISES'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-deepPlum font-bold tracking-tight">
            {lang === 'bn' ? 'উপহারের বাক্সে লুকানো বার্তা' : 'Unwrap Magical Surprises'}
          </h2>

          <p className="mt-3 font-serif italic text-lg sm:text-xl text-coral">
            {lang === 'bn'
              ? '“উপহারের বাক্স বা বেলুনে স্পর্শ করো, প্রতিটি চমকে আছে বন্ধুদের ভালোবাসা।”'
              : '"Tap a 3D gift box or pop a floating balloon to reveal hidden friendship wishes."'}
          </p>
        </div>

        {/* 1. SURPRISE 3D GIFT BOXES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {surprises.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border-2 border-champagne hover:border-brightPink/60 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center group cursor-pointer"
              onClick={() => handleOpenBox(item)}
            >
              <div className="w-48 h-48 sm:w-56 sm:h-56 relative flex items-center justify-center">
                <GiftBox3D
                  isOpening={openedBoxId === item.id}
                  onClick={() => handleOpenBox(item)}
                />
              </div>

              <div className="mt-4">
                <span className="inline-block px-3 py-1 rounded-full bg-pinkPastel/30 text-brightPink text-[11px] font-serif font-bold tracking-wider mb-2">
                  BOX #{idx + 1}
                </span>
                <h3 className="font-serif text-xl font-bold text-deepPlum group-hover:text-brightPink transition-colors">
                  {lang === 'bn' ? item.title_bn : item.title_en}
                </h3>
                <p className="mt-2 text-xs text-mutedMauve font-sans">
                  {lang === 'bn' ? '[খুলতে বক্সে স্পর্শ করো]' : '[Tap box to reveal note]'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 2. FLOATING BIRTHDAY BALLOONS WITH HIDDEN WISHES */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white/90 border-2 border-lavender/50 shadow-xl text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-skyBlueLight/40 text-skyBlue text-xs font-serif font-bold uppercase tracking-wider mb-3">
            <PartyPopper className="w-4 h-4" />
            <span>{lang === 'bn' ? 'বেলুন ফাটিয়ে উইশ দেখো!' : 'Pop Balloons for Wishes!'}</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-deepPlum mb-2">
            {lang === 'bn' ? 'রঙিন বেলুনের না-বলা কথা' : 'Floating Birthday Messages'}
          </h3>
          <p className="text-xs sm:text-sm text-warmCharcoal/70 mb-8 max-w-md mx-auto">
            {lang === 'bn'
              ? 'নিচের যেকোনো বেলুনে স্পর্শ করে বাটপাড়স বন্ধুদের বিশেষ উইশ আবিষ্কার করো।'
              : 'Tap any floating balloon below to pop it and reveal secret group wishes.'}
          </p>

          {/* Balloon row */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {BALLOON_WISHES.map((b) => {
              const isPopped = poppedBalloons.includes(b.id);
              return (
                <button
                  key={b.id}
                  onClick={() => handlePopBalloon(b)}
                  disabled={isPopped}
                  className={`group relative flex flex-col items-center transition-all duration-300 ${
                    isPopped
                      ? 'opacity-40 cursor-default scale-90'
                      : 'hover:scale-110 active:scale-95 cursor-pointer animate-float-slow'
                  }`}
                  style={{ animationDelay: `${b.id * 0.2}s` }}
                >
                  <div
                    className="w-16 h-20 sm:w-20 sm:h-24 rounded-full flex items-center justify-center text-2xl shadow-md transition-transform"
                    style={{
                      backgroundColor: b.color,
                      borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                    }}
                  >
                    {isPopped ? '💥' : '🎈'}
                  </div>
                  <div className="w-0.5 h-6 bg-butterYellow" />
                  <span className="text-[11px] font-serif font-bold text-deepPlum mt-1">
                    {isPopped ? (lang === 'bn' ? 'দেখা হয়েছে' : 'Popped') : (lang === 'bn' ? 'ট্যাপ করো' : 'Tap')}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Revealed Balloon Wish Toast Area */}
          {activeBalloonWish && (
            <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-pinkPastel/30 via-butterYellowLight/40 to-skyBlueLight/30 border border-pinkPastel animate-fade-in max-w-lg mx-auto">
              <p className="font-serif text-lg font-bold text-deepPlum">
                {lang === 'bn' ? activeBalloonWish.bn : activeBalloonWish.en}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL LIGHTBOX FOR SURPRISE BOX MESSAGE */}
      {selectedSurprise && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-deepPlum/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedSurprise(null)}
        >
          <div
            className="relative max-w-lg w-full bg-white rounded-3xl p-8 border-2 border-butterYellow shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedSurprise(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-champagne hover:bg-pinkPastel/40 flex items-center justify-center text-deepPlum transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-pinkPastel/30 text-brightPink flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-deepPlum mb-3">
              {lang === 'bn' ? selectedSurprise.title_bn : selectedSurprise.title_en}
            </h3>

            <p className="font-serif italic text-base sm:text-lg text-warmCharcoal/90 leading-relaxed p-4 bg-softCream rounded-2xl border border-champagne">
              “{lang === 'bn' ? selectedSurprise.message_bn : selectedSurprise.message_en}”
            </p>

            <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-coral font-serif font-bold">
              <Heart className="w-4 h-4 fill-coral" />
              <span>{lang === 'bn' ? 'বাটপাড়স গ্যাংয়ের ভালোবাসা' : 'From the Batparss Circle'}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
