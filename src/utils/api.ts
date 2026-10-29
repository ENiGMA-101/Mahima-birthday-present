export interface MemoryItem {
  id: number;
  title_bn: string;
  title_en: string;
  caption_bn: string;
  caption_en: string;
  image_url: string;
  category: string;
  location?: string;
  memory_date?: string;
  is_featured?: boolean;
  display_order: number;
  is_published: boolean;
}

export interface StoryChapterItem {
  id: number;
  title_bn: string;
  title_en: string;
  description_bn: string;
  description_en: string;
  display_order: number;
  is_published: boolean;
}

export interface SiteContentMap {
  [key: string]: { bn: string; en: string };
}

export interface SiteSettingsMap {
  [key: string]: string;
}

export interface AdminStats {
  totalMemories: number;
  publishedMemories: number;
  draftMemories: number;
  birthdayMemories: number;
  storyChapters: number;
  databaseType: string;
}

// Fetch published site content
export async function fetchSiteContent(): Promise<SiteContentMap> {
  try {
    const res = await fetch('/api/content');
    if (!res.ok) throw new Error('Failed to fetch content');
    return await res.json();
  } catch (err) {
    console.warn('API error, using client fallback', err);
    return {};
  }
}

// Fetch published memories
export async function fetchMemories(category?: string): Promise<MemoryItem[]> {
  try {
    const url = category ? `/api/memories?category=${encodeURIComponent(category)}` : '/api/memories';
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch memories');
    return await res.json();
  } catch (err) {
    console.warn('API error fetching memories', err);
    return [];
  }
}

// Fetch published story chapters
export async function fetchStoryChapters(): Promise<StoryChapterItem[]> {
  try {
    const res = await fetch('/api/story-chapters');
    if (!res.ok) throw new Error('Failed to fetch story chapters');
    return await res.json();
  } catch (err) {
    console.warn('API error fetching story chapters', err);
    return [];
  }
}

// Fetch public settings
export async function fetchSiteSettings(): Promise<SiteSettingsMap> {
  try {
    const res = await fetch('/api/settings');
    if (!res.ok) throw new Error('Failed to fetch settings');
    return await res.json();
  } catch (err) {
    console.warn('API error fetching settings', err);
    return {};
  }
}
