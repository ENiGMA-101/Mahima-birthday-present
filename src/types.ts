export interface AppConfig {
  recipientName: string;
  senderName: string;
  birthDate: string;
  titleBadge: string;
  personalNote: string;
  customLetter: string;
}

export interface Coupon {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'adventure' | 'comfort' | 'treat' | 'sweet';
  redeemed: boolean;
}

export interface PolaroidMemory {
  id: string;
  imageUrl: string;
  caption: string;
  date: string;
  location?: string;
  color: string;
}

export interface SkyWish {
  id: string;
  author: string;
  wishText: string;
  color: string;
  createdAt: number;
}
