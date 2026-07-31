export interface MusicTool {
  id: string;
  name: string;
  category: 'music-tools' | 'studio-tools' | 'analysis' | 'recording' | 'theory' | 'instruments' | 'practice' | 'converters';
  description: string;
  iconName: string;
  popular?: boolean;
  featured?: boolean;
  recentlyAdded?: boolean;
  tags: string[];
}

export interface StoreProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  isHandcrafted?: boolean;
  inStock: boolean;
  features: string[];
  specs?: Record<string, string>;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: 'Music Theory' | 'Instrument Guides' | 'Music Production' | 'Industry News' | 'Tutorials' | 'Buying Guides';
  summary: string;
  author: string;
  readTime: string;
  date: string;
  image: string;
  content: string;
  tags: string[];
}

export interface PracticeSession {
  id: string;
  date: string;
  durationMinutes: number;
  topic: string;
  notes: string;
  rating: number;
}

export interface PracticeGoal {
  id: string;
  title: string;
  targetMinutesPerDay: number;
  targetDaysPerWeek: number;
  currentStreakDays: number;
}

export interface UserPreset {
  id: string;
  toolId: string;
  name: string;
  settings: Record<string, any>;
  createdAt: string;
}

export interface DictionaryTerm {
  term: string;
  category: string;
  definition: string;
  origin?: string;
}

export interface Exercise {
  id: string;
  title: string;
  category: 'Scales' | 'Finger Independence' | 'Ear Training' | 'Speed & Dexterity' | 'Rhythm';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  targetBpm: number;
  instructions: string[];
}
