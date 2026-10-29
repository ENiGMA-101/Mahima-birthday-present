export interface MemoryRecord {
  id: number;
  title_bn: string;
  title_en: string;
  caption_bn: string;
  caption_en: string;
  image_url: string;
  category: string;
  location: string;
  memory_date: string;
  is_featured: boolean;
  display_order: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface StoryChapterRecord {
  id: number;
  title_bn: string;
  title_en: string;
  description_bn: string;
  description_en: string;
  display_order: number;
  is_published: boolean;
}

export interface SiteContentRecord {
  content_key: string;
  value_bn: string;
  value_en: string;
}

export const INITIAL_MEMORIES: MemoryRecord[] = [
  {
    id: 1,
    title_bn: 'শ্রীমঙ্গলের সবুজে ঘেরা চা বাগান',
    title_en: 'Rolling Tea Gardens of Sreemangal',
    caption_bn: 'যাত্রাপথ এবং গন্তব্যের মাঝেই আমরা গড়ে তুলেছি সবচেয়ে সুন্দর স্মৃতিগুলো।',
    caption_en: 'Somewhere between the journey and the destination, we made memories.',
    image_url: '/images/sreemangal/tour-01.jpg',
    category: 'sreemangal',
    location: 'শ্রীমঙ্গল, সিলেট',
    memory_date: 'গত ভ্রমণ',
    is_featured: true,
    display_order: 1,
    is_published: true,
  },
  {
    id: 2,
    title_bn: 'কুয়াশাচ্ছন্ন ভোর ও গরম চায়ের আড্ডা',
    title_en: 'Morning Mist & Chai Adda',
    caption_bn: 'ট্যুর শেষ হয়ে গেছে ঠিকই, কিন্তু গল্পগুলো আজও আমাদের মনে তাজা।',
    caption_en: 'The tour has ended, but our conversations and stories stay forever.',
    image_url: '/images/sreemangal/tea-garden-01.jpg',
    category: 'sreemangal',
    location: 'লাউয়াছড়া চা বাগান',
    memory_date: 'কুয়াশাচ্ছন্ন সকাল',
    is_featured: true,
    display_order: 2,
    is_published: true,
  },
  {
    id: 3,
    title_bn: 'বাটপাড়স গ্যাংয়ের চিরচেনা সার্কেল',
    title_en: 'The Batparss Circle',
    caption_bn: 'ক্যামেরার ফ্রেমে কিছু মুহূর্ত ধরা পড়ে, আর বাকিগুলো হৃদয়ে জমে থাকে স্মৃতি হয়ে।',
    caption_en: 'A camera catches mere moments; the rest become timeless memories.',
    image_url: '/images/batparss/group-01.jpg',
    category: 'batparss',
    location: 'সিলেট রোড ট্রিপ',
    memory_date: 'রোড ট্রিপ',
    is_featured: true,
    display_order: 3,
    is_published: true,
  },
  {
    id: 4,
    title_bn: 'হাস্যোজ্জ্বল জন্মদিনের তারকা মহিমা',
    title_en: 'Mahima in Her Element',
    caption_bn: 'শ্রীমঙ্গলের শেষ ট্যুর মানেই সব শেষ নয়, সামনে আরও কত অভিযান বাকি!',
    caption_en: 'This last tour is not the end. Countless more adventures await us!',
    image_url: '/images/birthday/mahima-portrait-01.jpg',
    category: 'spotlight',
    location: 'শ্রীমঙ্গল ইকো রিসোর্ট',
    memory_date: 'গোধূলি বেলা',
    is_featured: true,
    display_order: 4,
    is_published: true,
  },
  {
    id: 5,
    title_bn: 'অফুরন্ত হাসির না-বলা মুহূর্ত',
    title_en: 'Unscripted Moments',
    caption_bn: 'একটি মাত্র সফর, অথচ হাজারো স্মরণীয় গল্প।',
    caption_en: 'One memorable trip, countless unforgettable stories.',
    image_url: '/images/sreemangal/group-memory-01.jpg',
    category: 'sreemangal',
    location: 'টি ট্রেইল ওয়াক',
    memory_date: 'বিকেলের ভ্রমণ',
    is_featured: false,
    display_order: 5,
    is_published: true,
  },
  {
    id: 6,
    title_bn: 'লেকপাড়ে মনখোলা আড্ডা',
    title_en: 'Laughter by the Waters',
    caption_bn: 'কিছু বন্ধুত্ব সাধারণ দিনগুলোকে আজীবন মনে রাখার মতো গল্পে বদলে দেয়।',
    caption_en: 'Some friendships effortlessly turn ordinary days into lifelong stories.',
    image_url: '/images/batparss/candid-01.jpg',
    category: 'batparss',
    location: 'মাধবপুর লেক',
    memory_date: 'সূর্যাস্ত',
    is_featured: false,
    display_order: 6,
    is_published: true,
  },
  // Dedicated Last Year's Birthday Memories
  {
    id: 7,
    title_bn: 'গত জন্মদিনের মিষ্টি মুহূর্ত',
    title_en: 'Last Year Birthday Celebration',
    caption_bn: 'গত বছর এই বিশেষ দিনে তোমার হাসিমুখ আমাদের সবার দিনটিকে আলোকময় করে তুলেছিল।',
    caption_en: 'Your joyful smile lit up our whole day on your birthday last year.',
    image_url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80',
    category: 'birthday_last_year',
    location: 'ঢাকা',
    memory_date: 'পূর্ববর্তী জন্মদিন',
    is_featured: true,
    display_order: 7,
    is_published: true,
  },
  {
    id: 8,
    title_bn: 'কেক কাটার আনন্দ ও বন্ধুদের ভালোবাসা',
    title_en: 'Cake Cutting & Warm Celebrations',
    caption_bn: 'মোমবাতির আলোয় চোখ বন্ধ করে চাওয়া সেই মিষ্টি ইচ্ছাগুলোর কথা আজও মনে পড়ে।',
    caption_en: 'Fondly remembering the secret wishes made under glowing candles.',
    image_url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1000&q=80',
    category: 'birthday_last_year',
    location: 'ক্যাফে আড্ডা',
    memory_date: 'জন্মদিনের রাত',
    is_featured: true,
    display_order: 8,
    is_published: true,
  },
  {
    id: 9,
    title_bn: 'বন্ধুত্বের উষ্ণ আলিঙ্গন',
    title_en: 'Warmth of Lasting Friendship',
    caption_bn: 'বছর ঘুরে জন্মদিন আবার ফিরে এলো, কিন্তু আমাদের বন্ধুত্ব রয়ে গেছে ঠিক আগের মতোই অটুট।',
    caption_en: 'Another year has passed, but our bond remains as strong and vibrant as ever.',
    image_url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80',
    category: 'birthday_last_year',
    location: 'গেট টুগেদার',
    memory_date: 'স্মরণীয় সন্ধ্যা',
    is_featured: true,
    display_order: 9,
    is_published: true,
  },
];

export const INITIAL_CHAPTERS: StoryChapterRecord[] = [
  {
    id: 1,
    title_bn: 'বন্ধুত্বের প্রথম দিনগুলো',
    title_en: 'The Beginning of the Journey',
    description_bn: 'যেখান থেকে আমাদের পথচলা শুরু হয়েছিল—একটি দল, একরাশ পাগলামি আর এক বুক স্বপ্ন নিয়ে।',
    description_en: 'Where our paths first crossed—one gang, boundless laughter, and shared dreams.',
    display_order: 1,
    is_published: true,
  },
  {
    id: 2,
    title_bn: 'অকারণ আড্ডা ও খুনসুটি',
    title_en: 'Friendship & Endless Chaos',
    description_bn: 'পরিকল্পনা আমরা সবাই বানাই, কিন্তু সময়মতো পৌঁছানো? সে এক মহাযজ্ঞ!',
    description_en: 'We are experts at making plans. Getting everyone on time? Entirely different story.',
    display_order: 2,
    is_published: true,
  },
  {
    id: 3,
    title_bn: 'শ্রীমঙ্গলের সবুজ পথে ভ্রমণ',
    title_en: 'Sreemangal Chronicles',
    description_bn: 'সবুজে ঘেরা চা বাগান, আঁকাবাঁকা পথ আর জীবনের সেরা স্মৃতিগুলোর সাক্ষী আমাদের সেই ট্যুর।',
    description_en: 'The lush tea plantations, winding roads, and memories that stay with us forever.',
    display_order: 3,
    is_published: true,
  },
  {
    id: 4,
    title_bn: 'গত জন্মদিনের স্মৃতিমালা',
    title_en: "Last Year's Birthday Memories",
    description_bn: 'পেছনের বছরটিতে কাটানো জন্মদিনের উৎসব আর নির্মল হাসির কিছু অমূল্য মুহূর্ত।',
    description_en: "A nostalgic glimpse at the celebrations, cake slices, and laughter from last year's birthday.",
    display_order: 4,
    is_published: true,
  },
  {
    id: 5,
    title_bn: 'আজকের স্পটলাইট শুধুই তোমার',
    title_en: "Mahima's Spotlight",
    description_bn: 'আমাদের বন্ধুদলের প্রাণ, যার শান্ত হাসি ও সহমর্মিতা পুরো ঘরকে আলোকিত করে রাখে।',
    description_en: 'To the heart of the gang who brings calmness, laughter, and light to every room.',
    display_order: 5,
    is_published: true,
  },
  {
    id: 6,
    title_bn: 'বাটপাড়সের গোপন চিঠি ও শুভকামনা',
    title_en: 'A Letter from Batparss',
    description_bn: 'হৃদয়ের গভীর থেকে লেখা কিছু অকপট কথা আর আগামীর জন্য অফুরন্ত শুভাশিস।',
    description_en: 'Heartfelt words from the gang, celebrating you today and all the adventures still to come.',
    display_order: 6,
    is_published: true,
  },
];

export const INITIAL_SITE_CONTENT: SiteContentRecord[] = [
  {
    content_key: 'mystery_lead',
    value_bn: 'তোমার জন্য একটি বিশেষ চমক অপেক্ষা করছে...',
    value_en: 'Something special is waiting for you...',
  },
  {
    content_key: 'mystery_sub',
    value_bn: 'একটি ছোট সারপ্রাইজ আছে তোমার জন্য।',
    value_en: 'A little surprise crafted just for you.',
  },
  {
    content_key: 'mystery_btn',
    value_bn: 'চমকটি খুলুন',
    value_en: 'Open your surprise',
  },
  {
    content_key: 'cake_instruction',
    value_bn: 'শুরু করার আগে একটি ছোট্ট কাজ...',
    value_en: 'One little thing before we begin...',
  },
  {
    content_key: 'cake_sub',
    value_bn: 'একটি মনের ইচ্ছা পোষণ করো এবং মোমবাতিগুলো নিভিয়ে দাও।',
    value_en: 'Make a wish and blow out the candles.',
  },
  {
    content_key: 'cake_btn',
    value_bn: 'মোমবাতিগুলো নিভিয়ে দাও',
    value_en: 'Blow out the candles',
  },
  {
    content_key: 'cake_revealed_title',
    value_bn: 'শুভ জন্মদিন, মহিমা! ❤️',
    value_en: 'HAPPY BIRTHDAY, MAHIMA! ❤️',
  },
  {
    content_key: 'cake_revealed_sub',
    value_bn: 'বাটপাড়স-এর পক্ষ থেকে গভীর ভালোবাসার এক ছোট্ট উপহার।',
    value_en: 'A little surprise, made with love by Batparss.',
  },
  {
    content_key: 'welcome_badge',
    value_bn: 'বাটপাড়স নিবেদন করছে',
    value_en: 'BATPARSS PRESENTS',
  },
  {
    content_key: 'welcome_title',
    value_bn: 'মহিমার জন্মদিনের বিশেষ উপহার',
    value_en: "Mahima's Birthday Special",
  },
  {
    content_key: 'welcome_tagline',
    value_bn: 'একজন জন্মদিনের মধ্যমণি। একটি পাগলাটে বন্ধুদল। আর অজস্র রঙিন গল্প।',
    value_en: 'One birthday girl. One chaotic gang. So many stories.',
  },
  {
    content_key: 'welcome_desc',
    value_bn: 'কয়েক বছর পরও আমরা হয়তো এই খ্যাপাটে পরিকল্পনা, হঠাৎ দেওয়া ট্যুর আর তোমাকে খুশি করার এই মুহূর্তগুলো নিয়ে প্রাণ খুলে হাসব।',
    value_en: 'Years from now, we will still be laughing at the silly plans, spontaneous trips, and the moments we created to celebrate you.',
  },
  {
    content_key: 'sreemangal_title',
    value_bn: 'শ্রীমঙ্গলের ডায়েরি',
    value_en: 'SREEMANGAL CHRONICLES',
  },
  {
    content_key: 'sreemangal_sub',
    value_bn: 'একটি স্মরণীয় ভ্রমণ। একশটি ছোট্ট মুহূর্ত। আর আজীবন থেকে যাওয়া স্মৃতি।',
    value_en: 'One trip. A hundred little moments. Memories that stay.',
  },
  {
    content_key: 'sreemangal_narrative',
    value_bn: 'শ্রীমঙ্গলের পথে যখন আমরা রওনা হয়েছিলাম, কোনো নিখুঁত পরিকল্পনার তোয়াক্কা করিনি। চা বাগানের আঁকাবাঁকা পথ, কুয়াশাচ্ছন্ন ভোর, রাস্তার ধারের সাত রঙের চায়ের আড্ডা, আর প্রতিটি ছবির ফাঁকে চলা খুনসুটিই ছিল আসল।',
    value_en: 'When we boarded for Sreemangal, none of us cared about a strict itinerary. It was the winding tea garden roads, the mist in the morning air, roadside tea debates, and endless banter between every photo stop.',
  },
  {
    content_key: 'last_year_title',
    value_bn: 'গত জন্মদিনের রঙিন স্মৃতি',
    value_en: "Moments from Last Year's Birthday",
  },
  {
    content_key: 'last_year_sub',
    value_bn: 'পেছনের বছরটিতে তোমার এই বিশেষ দিনটিতে কাটানো কিছু মিষ্টি মুহূর্তের স্মৃতিচারণ',
    value_en: 'Looking back at the warmth, smiles, and celebrations from your previous birthday.',
  },
  {
    content_key: 'last_year_intro',
    value_bn: 'প্রতিটি জন্মদিন জীবনে নতুন আনন্দ আর সুন্দর অধ্যায়ের সূচনা করে। গত বছরের সেই আনন্দঘন দিনটির কিছু সোনালী মুহূর্ত আজ আবার চোখের সামনে ভেসে উঠছে।',
    value_en: 'Every birthday marks a joyful milestone and a new chapter. Here is a fond glance back at the cherished moments and radiant smiles from last year.',
  },
  {
    content_key: 'spotlight_title',
    value_bn: 'আজকের দিনটি শুধুই তোমার',
    value_en: 'Today, the spotlight belongs to you.',
  },
  {
    content_key: 'spotlight_sub',
    value_bn: 'আমাদের বন্ধুদলের প্রাণ, যার শান্ত হাসি পুরো পরিবেশকে সুন্দর করে তোলে।',
    value_en: 'To the heart of the gang who brings calmness, laughter, and light to every room.',
  },
  {
    content_key: 'letter_teaser',
    value_bn: 'তোমাকে বলার মতো আরও একটি বিশেষ কথা ছিল...',
    value_en: "There's one more thing we wanted to tell you...",
  },
  {
    content_key: 'letter_btn',
    value_bn: 'চিঠিটি খুলুন',
    value_en: 'Open the letter',
  },
  {
    content_key: 'letter_body',
    value_bn: `প্রিয় মহিমা,

আজকের এই বিশেষ দিনটি পুরোপুরি তোমার — আর আজ আমাদের পুরো বাটপাড়স দল প্রাণভরে উদযাপন করছে তোমাকে!

বন্ধুত্বের সবচেয়ে সুন্দর দিক হলো এই ছোট্ট ছোট্ট মুহূর্তগুলো। অকারণ আড্ডা, দমফাটা হাসি, হঠাৎ তৈরি হওয়া সব পরিকল্পনা, আর একসঙ্গে ঘুরে বেড়ানোর স্মৃতিগুলোই একসময় জীবনের সবচেয়ে বড় গল্প হয়ে ওঠে।

শ্রীমঙ্গলে আমাদের কাটানো সেই স্মরণীয় ট্যুরটিও ঠিক তেমনই এক অনুভূতির নাম, যা মনে পড়লেই সেই সুন্দর দিনগুলোতে আবার ফিরে যেতে ইচ্ছে করে।

তোমার এই জন্মদিনে আমরা কায়মনোবাক্যে কামনা করি তোমার অসীম সুখ, মানসিক শান্তি, সুস্বাস্থ্য, সাফল্য এবং জীবনের প্রতিটি পদক্ষেপে নতুন নতুন রোমাঞ্চকর অভিজ্ঞতা।

আগামীর দিনগুলো তোমাকে তোমার স্বপ্নের আরও কাছাকাছি নিয়ে যাক, তোমার জীবনে আসুক শুভাকাঙ্ক্ষী ও ভালো মানুষ, আর তোমার মুখে ফুটে উঠুক আরও অনেক বেশি প্রাণবন্ত হাসির উপলক্ষ।

আর শোনো, বার্থডে গার্ল — আজকের দিনটি প্রাণভরে উপভোগ করো। ইচ্ছেমতো কেক খাও, হাসো, আর এই বিশেষ দিনটি নিজের মতো করে উদযাপন করো!

সামনে এখনো কত ট্যুর বাকি, কত নতুন আড্ডা বাকি, আর কতশত পাগলামি বাকি!

শুভ জন্মদিন, মহিমা!

অফুরন্ত ভালোবাসা, আনন্দ আর আজীবন মনে রাখার মতো সব স্মৃতিসহ —
তোমার বাটপাড়স গ্যাং ❤️`,
    value_en: `Dear Mahima,

Today belongs entirely to you — and today, our whole Batparss gang is joyfully celebrating you!

The most precious part of friendship lives in the little things. Spontaneous addas, endless laughter, unexpected adventures, and shared travel memories — these quiet moments eventually become our greatest lifelong stories.

Our last tour to Sreemangal is one of those timeless memories that instantly makes us want to relive those golden days all over again.

On your birthday, we wish you boundless happiness, peace of mind, vibrant health, great success, and countless new adventures.

May this coming year draw you closer to your fondest dreams, surround you with genuine hearts, and give you countless more reasons to smile brightly.

So birthday girl — enjoy every single second of today. Eat the cake, laugh out loud, and celebrate this special day in your own unique way!

There are still so many tours to take, so many addas to share, and so much craziness waiting ahead.

Happy Birthday, Mahima!

With endless love, laughter, and unforgettable memories —
Your Batparss Gang ❤️`,
  },
  {
    content_key: 'celebration_kicker',
    value_bn: 'মহিমার জন্য আরও একটি প্রার্থনা',
    value_en: 'One more wish for Mahima.',
  },
  {
    content_key: 'celebration_hero',
    value_bn: 'নতুন একটি বছর। আরও অজস্র রোমাঞ্চকর ভ্রমণ। আরও হাজারো রঙিন স্মৃতি।',
    value_en: 'Another year. More adventures. More memories.',
  },
  {
    content_key: 'celebration_title',
    value_bn: 'শুভ জন্মদিন, মহিমা! ❤️',
    value_en: 'Happy Birthday, Mahima! ❤️',
  },
  {
    content_key: 'signature_note',
    value_bn: 'আরও কত হাসিমুখ, নতুন নতুন গল্প আর স্মৃতি তৈরির প্রত্যাশায় — তোমার প্রিয় বাটপাড়স গ্যাং। ❤️',
    value_en: 'With love, laughter, and countless memories still waiting to happen — your Batparss gang. ❤️',
  },
  {
    content_key: 'replay_btn',
    value_bn: 'পুনরায় অভিজ্ঞতাটি দেখুন',
    value_en: 'Replay the Experience',
  },
];

export const INITIAL_SETTINGS = {
  theme_color: '#C88F91',
  photo_speed: '35', // seconds per cycle
  auto_movement: 'true',
  sound_effects: 'true',
  show_birthday_section: 'true',
  recipient_name: 'Mahima',
  group_name: 'Batparss',
};
