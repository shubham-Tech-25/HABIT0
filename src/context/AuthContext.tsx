import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  fullName: string;
  username: string;
  avatar?: string;
  categories: string[];
  reminderTime: string;
  notifications: boolean;
  age?: string;
  dailyGoal?: string;
  theme?: 'dark' | 'light';
}

interface User {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
  isOnboarded: boolean;
  profile?: UserProfile;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (emailOrPhone: string, method: 'email' | 'phone') => void;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('habito_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (emailOrPhone: string, method: 'email' | 'phone') => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      [method === 'email' ? 'email' : 'phone']: emailOrPhone,
      isOnboarded: false,
    };
    setUser(newUser);
    localStorage.setItem('habito_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('habito_user');
  };

  const updateProfile = (profile: UserProfile) => {
    if (user) {
      const updatedUser = { ...user, profile, isOnboarded: true };
      setUser(updatedUser);
      localStorage.setItem('habito_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
