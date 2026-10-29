export interface StoryScene {
  id: number;
  slug: string;
  title: string;
  shortLabel: string;
}

export interface PhotoMemory {
  id: string;
  title: string;
  caption: string;
  location?: string;
  date?: string;
  src: string;
  category: 'sreemangal' | 'batparss' | 'spotlight';
  aspect?: 'portrait' | 'landscape' | 'square';
}

export const SCENES: StoryScene[] = [
  { id: 1, slug: 'mystery', title: 'A Secret Surprise', shortLabel: 'Surprise' },
  { id: 2, slug: 'cake', title: 'The Birthday Cake', shortLabel: 'Make a Wish' },
  { id: 3, slug: 'intro', title: 'Batparss Presents', shortLabel: 'Welcome' },
  { id: 4, slug: 'chaos', title: 'Friendship & Chaos', shortLabel: 'Our Story' },
  { id: 5, slug: 'sreemangal', title: 'Sreemangal Chronicles', shortLabel: 'Sreemangal' },
  { id: 6, slug: 'spotlight', title: "Mahima's Spotlight", shortLabel: 'Spotlight' },
  { id: 7, slug: 'gallery', title: 'Memory Wall', shortLabel: 'Gallery' },
  { id: 8, slug: 'letter', title: 'A Letter from Batparss', shortLabel: 'The Letter' },
  { id: 9, slug: 'celebration', title: 'Grand Celebration', shortLabel: 'Celebration' },
  { id: 10, slug: 'signature', title: 'Until Next Tour', shortLabel: 'Batparss' },
];

export const SITE_CONFIG = {
  recipient: 'Mahima',
  groupName: 'Batparss',
  tagline: 'Mahima × Batparss',
  tourLocation: 'Sreemangal, Sylhet, Bangladesh',
  
  mystery: {
    leadText: 'Something special is waiting for you...',
    banglaText: 'Ekta chhoto surprise ache tomar jonno.',
    buttonLabel: 'Open your surprise',
  },

  cake: {
    instruction: 'One little thing before we begin...',
    subInstruction: 'Make a wish and blow out the candles.',
    revealedTitle: 'HAPPY BIRTHDAY, MAHIMA! ❤️',
    revealedSubtitle: 'A little surprise, made with love by Batparss.',
    continueButton: 'Continue into the story',
  },

  welcome: {
    badge: 'BATPARSS PRESENTS',
    mainTitle: "Mahima's Birthday Special",
    tagline: 'One birthday girl. One chaotic gang. So many stories.',
    description: 'Years from now, we will still be laughing at the silly plans, the sudden trips, and the time we made this site just to celebrate you.',
    buttonText: 'Enter the memories',
  },

  chaos: {
    badge: 'THE GANG & THE BONDS',
    title: 'Our friendship, our chaos',
    quotes: [
      {
        bengali: 'Ekta group. Onek gula pagol. Countless memories.',
        english: 'One group. A bunch of crazy heads. Countless memories.',
      },
      {
        bengali: 'Plans korte amra expert. Shobai ke time moto ana? Different story.',
        english: 'We are experts at making plans. Getting everyone on time? Entirely different story.',
      },
      {
        bengali: 'Random adda, endless hasi, ar ekshathe thakar chhoto chhoto moments.',
        english: 'Spontaneous addas, unstoppable laughter, and the quiet beauty of just being together.',
      },
      {
        bengali: 'Some friendships turn ordinary days into stories worth remembering.',
        english: 'Some friendships effortlessly turn everyday moments into lifelong folklore.',
      },
      {
        bengali: 'Ar ajke amader birthday girl Mahima-r special day!',
        english: 'And today belongs completely to our very own birthday girl, Mahima!',
      },
    ],
    buttonText: 'Journey to Sreemangal',
  },

  sreemangal: {
    title: 'SREEMANGAL CHRONICLES',
    subtitle: 'One trip. A hundred little moments. Memories that stay.',
    narrative: 'When we boarded for Sreemangal, none of us cared about a strict itinerary. It was the winding tea garden roads, the mist in the morning air, the roadside seven-color tea debates, and the endless banter between every photo stop.',
    captions: [
      'Somewhere between the journey and the destination, we made memories.',
      'Tour shesh hoye geche. Golpogulo ekhono baki.',
      'Camera te kichu moments dhora pore. Baki gula theke jay memory hoye.',
      'Last tour bole shesh na. Aro adventure baki!',
      'Ekta trip, countless stories.',
    ],
    buttonText: "See Mahima's Spotlight",
  },

  spotlight: {
    badge: 'HONORING OUR BIRTHDAY GIRL',
    title: 'Today, the spotlight belongs to you.',
    subtitle: 'To the heart of the gang who brings calmness, laughter, and light into every room.',
    wishes: [
      {
        title: 'Happiness & Peace',
        text: 'May your days be calm and your heart be light, free from worries and blessed with tranquility.',
      },
      {
        title: 'Good Health & Energy',
        text: 'Wishing you strong health, vitality, and the stamina to survive all our chaotic future plans!',
      },
      {
        title: 'Boundless Success',
        text: 'Whatever dreams you are quietly working towards, may you reach and surpass them effortlessly.',
      },
      {
        title: 'More Adventures Together',
        text: 'From the tea hills of Sylhet to wherever life takes us next, more adventures are waiting for us.',
      },
    ],
    buttonText: 'Explore Memory Wall',
  },

  letter: {
    teaser: "There's one more thing we wanted to tell you...",
    openButton: 'Open the letter',
    content: `Dear Mahima,

Ajker din ta tomar — and today, our whole Batparss gang is celebrating you!

Friendship-er shobcheye shundor part holo chhoto chhoto moment gulo. Random adda, endless hasi, unexpected plans, ar ekshathe ghure beranor memories — egulai ekshomoy onek boro golpo hoye jay.

Sreemangal-er amader last tour tao shei rokom ekta memory, jeta mone porle abar oi din gulote fire jete iccha kore.

On your birthday, we wish you happiness, peace, good health, success, and countless new adventures.

May this year bring you closer to your dreams, surround you with good people, and give you many more reasons to smile.

Ar shono, birthday girl — ajker din ta fully enjoy koro. Cake khao, hasho, ar ei special din ta nijer moto kore celebrate koro!

Aro onek tour, aro onek adda, aro onek paglamo baki.

Happy Birthday, Mahima!

With lots of love, laughter, and unforgettable memories,

Your Batparss Gang ❤️`,
    buttonText: 'Join the Grand Celebration',
  },

  celebration: {
    kicker: 'One more wish for Mahima.',
    heroText: 'Another year. More adventures. More memories.',
    wishingHeading: 'Happy Birthday, Mahima! ❤️',
    buttonText: 'A final message from Batparss',
  },

  signature: {
    quote: 'More adventures. More laughter. More stories together.',
    heading: 'Happy Birthday, Mahima!',
    note: 'With love, laughter, and countless memories still waiting to happen — your Batparss gang. ❤️',
    replayButton: 'Revisit the Experience',
  },
};

// Default gallery memories referencing Sreemangal and Batparss moments
export const DEFAULT_PHOTOS: PhotoMemory[] = [
  {
    id: 'p1',
    title: 'The Rolling Tea Gardens',
    caption: 'Somewhere between the journey and the destination, we made memories.',
    location: 'Sreemangal, Sylhet',
    date: 'Last Tour',
    src: '/images/sreemangal/tour-01.jpg',
    category: 'sreemangal',
    aspect: 'landscape',
  },
  {
    id: 'p2',
    title: 'Morning Mist & Chai Adda',
    caption: 'Tour shesh hoye geche. Golpogulo ekhono baki.',
    location: 'Lawachara / Tea Valley',
    date: 'Early Morning',
    src: '/images/sreemangal/tea-garden-01.jpg',
    category: 'sreemangal',
    aspect: 'portrait',
  },
  {
    id: 'p3',
    title: 'The Batparss Circle',
    caption: 'Camera te kichu moments dhora pore. Baki gula theke jay memory hoye.',
    location: 'Sylhet Scenic Road',
    date: 'Road Trip',
    src: '/images/batparss/group-01.jpg',
    category: 'batparss',
    aspect: 'landscape',
  },
  {
    id: 'p4',
    title: 'Mahima in Her Element',
    caption: 'Last tour bole shesh na. Aro adventure baki!',
    location: 'Sreemangal Retreat',
    date: 'Golden Hour',
    src: '/images/birthday/mahima-portrait-01.jpg',
    category: 'spotlight',
    aspect: 'portrait',
  },
  {
    id: 'p5',
    title: 'Unscripted Moments',
    caption: 'Ekta trip, countless stories.',
    location: 'Tea Trail',
    date: 'Afternoon Walks',
    src: '/images/sreemangal/group-memory-01.jpg',
    category: 'sreemangal',
    aspect: 'square',
  },
  {
    id: 'p6',
    title: 'Laughter by the Lake',
    caption: 'Some friendships turn ordinary days into stories worth remembering.',
    location: 'Madhpur Lake / Sylhet',
    date: 'Sunset',
    src: '/images/batparss/candid-01.jpg',
    category: 'batparss',
    aspect: 'landscape',
  },
];
