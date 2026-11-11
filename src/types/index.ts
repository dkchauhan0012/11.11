export type WeekCategory = 'flowers' | 'reality_tv' | 'crafts' | 'finale';

export interface SurpriseDay {
  dayNumber: number; // 1 to 31
  dateStr: string; // e.g. "2026-11-11"
  displayDate: string; // e.g. "11 Nov"
  title: string;
  theme: string;
  meaning: string;
  category: WeekCategory;
  weekNumber: 1 | 2 | 3 | 4;
  iconName: string;
  flowerType?: string;
  teaser: string;
  badgeText?: string;
}

export interface UserWish {
  id: string;
  timestamp: number;
  text: string;
  flower: string;
}

export interface VentingEntry {
  id: string;
  timestamp: number;
  mood: string;
  content: string;
}

export interface VaultNote {
  id: string;
  date: string;
  title: string;
  content: string;
  tags: string[];
  pinned?: boolean;
}

export interface MoodLog {
  date: string;
  flower: string;
  mood: string;
  note?: string;
}
