import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserPreset, PracticeSession, StoreProduct } from '../types';

interface AppContextType {
  activeView: string;
  setActiveView: (view: string) => void;
  selectedToolId: string | null;
  setSelectedToolId: (toolId: string | null) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  storeEnabled: boolean;
  setStoreEnabled: (enabled: boolean) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  userPresets: UserPreset[];
  savePreset: (preset: Omit<UserPreset, 'id' | 'createdAt'>) => void;
  practiceSessions: PracticeSession[];
  addPracticeSession: (session: Omit<PracticeSession, 'id'>) => void;
  cart: { product: StoreProduct; quantity: number }[];
  addToCart: (product: StoreProduct) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  dailyStreak: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [storeEnabled, setStoreEnabled] = useState<boolean>(false); // Spec default: STORE_ENABLED = false

  // Load persistent user data
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tig_favorites');
      return saved ? JSON.parse(saved) : ['metronome', 'chromatic-tuner', 'circle-of-fifths'];
    } catch {
      return ['metronome', 'chromatic-tuner', 'circle-of-fifths'];
    }
  });

  const [userPresets, setUserPresets] = useState<UserPreset[]>(() => {
    try {
      const saved = localStorage.getItem('tig_presets');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [practiceSessions, setPracticeSessions] = useState<PracticeSession[]>(() => {
    try {
      const saved = localStorage.getItem('tig_practice');
      return saved ? JSON.parse(saved) : [
        { id: '1', date: new Date().toISOString().split('T')[0], durationMinutes: 45, topic: 'Scale Runs & Metronome Accents', notes: 'Nailed 120 BPM cleanly', rating: 5 }
      ];
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState<{ product: StoreProduct; quantity: number }[]>([]);

  useEffect(() => {
    localStorage.setItem('tig_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('tig_presets', JSON.stringify(userPresets));
  }, [userPresets]);

  useEffect(() => {
    localStorage.setItem('tig_practice', JSON.stringify(practiceSessions));
  }, [practiceSessions]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const savePreset = (preset: Omit<UserPreset, 'id' | 'createdAt'>) => {
    const newPreset: UserPreset = {
      ...preset,
      id: 'p_' + Date.now(),
      createdAt: new Date().toISOString()
    };
    setUserPresets(prev => [newPreset, ...prev]);
  };

  const addPracticeSession = (session: Omit<PracticeSession, 'id'>) => {
    const newSession: PracticeSession = {
      ...session,
      id: 'ps_' + Date.now()
    };
    setPracticeSessions(prev => [newSession, ...prev]);
  };

  const addToCart = (product: StoreProduct) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const dailyStreak = practiceSessions.length > 0 ? Math.min(practiceSessions.length + 2, 7) : 0;

  return (
    <AppContext.Provider value={{
      activeView,
      setActiveView,
      selectedToolId,
      setSelectedToolId,
      searchOpen,
      setSearchOpen,
      storeEnabled,
      setStoreEnabled,
      favorites,
      toggleFavorite,
      userPresets,
      savePreset,
      practiceSessions,
      addPracticeSession,
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      dailyStreak
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
