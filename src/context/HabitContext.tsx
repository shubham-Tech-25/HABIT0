import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { format, isSameDay, subDays, differenceInDays, parseISO, startOfDay, addDays } from 'date-fns';

export interface HabitItem {
  id: string;
  name: string;
  type: 'habit' | 'short-term' | 'long-term' | 'challenge';
  completions: string[]; // ISO date strings (YYYY-MM-DD)
  createdAt: string;
}

export interface DailyChallenge {
  id: string;
  text: string;
  category: string;
  accepted: boolean;
  date: string; // YYYY-MM-DD
}

const CHALLENGES = [
  { text: "Drink 3L of water", category: "Health" },
  { text: "Read 10 pages of a book", category: "Mindset" },
  { text: "15 minutes of meditation", category: "Mindset" },
  { text: "No sugar for the day", category: "Health" },
  { text: "Walk 10,000 steps", category: "Fitness" },
  { text: "Write 3 things you're grateful for", category: "Mindset" },
  { text: "Plan your next day before bed", category: "Productivity" },
  { text: "Cold shower for 2 minutes", category: "Discipline" },
  { text: "No social media for 2 hours", category: "Focus" },
  { text: "Do 20 pushups", category: "Fitness" }
];

interface HabitContextType {
  items: HabitItem[];
  dailyChallenge: DailyChallenge | null;
  addItem: (name: string, type: 'habit' | 'short-term' | 'long-term' | 'challenge') => void;
  editItem: (id: string, name: string) => void;
  removeItem: (id: string) => void;
  toggleCompletion: (id: string, date: Date) => void;
  acceptChallenge: () => void;
  stats: {
    currentStreak: number;
    bestStreak: number;
    completionRate: number;
    daysActive: number;
    totalCompletedDays: number;
  };
  startDate: string | null;
  isTrackingStarted: boolean;
  startTracking: () => void;
  resetTracking: () => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<HabitItem[]>([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [lastTrackingDate, setLastTrackingDate] = useState<string | null>(null);
  const [dailyChallenge, setDailyChallenge] = useState<DailyChallenge | null>(null);

  useEffect(() => {
    const savedItems = localStorage.getItem('habito_items');
    const savedStart = localStorage.getItem('habito_start');
    const savedLastTrack = localStorage.getItem('habito_last_track');
    const savedChallenge = localStorage.getItem('habito_challenge');

    if (savedItems) setItems(JSON.parse(savedItems));
    if (savedStart) setStartDate(savedStart);
    if (savedLastTrack) setLastTrackingDate(savedLastTrack);
    
    const today = format(new Date(), 'yyyy-MM-dd');
    if (savedChallenge) {
      const challenge = JSON.parse(savedChallenge) as DailyChallenge;
      if (challenge.date === today) {
        setDailyChallenge(challenge);
      } else {
        generateNewChallenge(today);
      }
    } else {
      generateNewChallenge(today);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('habito_items', JSON.stringify(items));
    if (startDate) localStorage.setItem('habito_start', startDate);
    if (lastTrackingDate) localStorage.setItem('habito_last_track', lastTrackingDate);
    if (dailyChallenge) localStorage.setItem('habito_challenge', JSON.stringify(dailyChallenge));
  }, [items, startDate, lastTrackingDate, dailyChallenge]);

  const generateNewChallenge = (date: string) => {
    const randomIndex = Math.floor(Math.random() * CHALLENGES.length);
    const challenge: DailyChallenge = {
      id: Math.random().toString(36).substr(2, 9),
      text: CHALLENGES[randomIndex].text,
      category: CHALLENGES[randomIndex].category,
      accepted: false,
      date
    };
    setDailyChallenge(challenge);
  };

  const acceptChallenge = () => {
    if (dailyChallenge && !dailyChallenge.accepted) {
      setDailyChallenge({ ...dailyChallenge, accepted: true });
      addItem(dailyChallenge.text, 'challenge');
    }
  };

  const isTrackingStarted = lastTrackingDate === format(new Date(), 'yyyy-MM-dd');

  const startTracking = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    setLastTrackingDate(today);
    if (!startDate) {
      setStartDate(new Date().toISOString());
    }
  };

  const resetTracking = () => {
    setItems([]);
    setStartDate(null);
    setLastTrackingDate(null);
    setDailyChallenge(null);
    localStorage.clear();
  };

  const addItem = (name: string, type: 'habit' | 'short-term' | 'long-term' | 'challenge') => {
    const newItem: HabitItem = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      type,
      completions: [],
      createdAt: new Date().toISOString(),
    };
    setItems([...items, newItem]);
  };

  const editItem = (id: string, name: string) => {
    setItems(items.map(item => item.id === id ? { ...item, name } : item));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const toggleCompletion = (id: string, date: Date) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const dateStr = format(date, 'yyyy-MM-dd');
    
    // Rule: User can only mark habits for today's date
    if (dateStr !== today) return;

    setItems(items.map(item => {
      if (item.id === id) {
        const isCompleted = item.completions.includes(dateStr);
        // Rule: Once completed, tick stays locked (cannot untick)
        if (isCompleted) return item; 
        
        return {
          ...item,
          completions: [...item.completions, dateStr]
        };
      }
      return item;
    }));
  };

  const stats = useMemo(() => {
    if (!startDate || items.length === 0) {
      return { currentStreak: 0, bestStreak: 0, completionRate: 0, daysActive: 0, totalCompletedDays: 0 };
    }

    const today = startOfDay(new Date());
    const start = startOfDay(parseISO(startDate));
    const daysActive = Math.max(differenceInDays(today, start) + 1, 1);

    let bestStreak = 0;
    let tempStreak = 0;
    let totalCompletedDays = 0;

    // A day is "perfect" if ALL items of type 'habit' and 'challenge' are completed
    const isDayPerfect = (dateStr: string) => {
      const dayItems = items.filter(item => {
        const itemCreated = format(parseISO(item.createdAt), 'yyyy-MM-dd');
        return (item.type === 'habit' || item.type === 'challenge') && itemCreated <= dateStr;
      });
      
      if (dayItems.length === 0) return false;
      return dayItems.every(item => item.completions.includes(dateStr));
    };

    // Calculate best streak and total completed days (global)
    for (let i = 0; i < daysActive; i++) {
      const checkDate = addDays(start, i);
      const dateStr = format(checkDate, 'yyyy-MM-dd');
      
      if (isDayPerfect(dateStr)) {
        tempStreak++;
        totalCompletedDays++;
      } else {
        bestStreak = Math.max(bestStreak, tempStreak);
        tempStreak = 0;
      }
    }
    bestStreak = Math.max(bestStreak, tempStreak);

    // Calculate current streak (global)
    let currentStreak = 0;
    for (let i = 0; i < daysActive; i++) {
      const checkDate = subDays(today, i);
      const dateStr = format(checkDate, 'yyyy-MM-dd');

      if (isDayPerfect(dateStr)) {
        currentStreak++;
      } else {
        // Momentum rule: if today isn't perfect yet, but yesterday was, streak is still alive
        if (i === 0) {
          const yesterday = subDays(today, 1);
          const yesterdayStr = format(yesterday, 'yyyy-MM-dd');
          if (!isDayPerfect(yesterdayStr)) {
            currentStreak = 0;
            break;
          }
        } else {
          break;
        }
      }
    }

    const habitItems = items.filter(i => i.type === 'habit' || i.type === 'challenge');
    const totalPossibleCompletions = daysActive * habitItems.length;
    const actualCompletions = habitItems.reduce((acc, item) => acc + item.completions.length, 0);
    const completionRate = totalPossibleCompletions > 0 ? Math.round((actualCompletions / totalPossibleCompletions) * 100) : 0;

    return { currentStreak, bestStreak, completionRate, daysActive, totalCompletedDays };
  }, [items, startDate]);

  return (
    <HabitContext.Provider value={{ 
      items, 
      dailyChallenge,
      addItem, 
      editItem,
      removeItem, 
      toggleCompletion, 
      acceptChallenge,
      stats,
      startDate,
      isTrackingStarted,
      startTracking,
      resetTracking
    }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) throw new Error('useHabits must be used within HabitProvider');
  return context;
};
