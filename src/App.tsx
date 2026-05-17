/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { HabitProvider } from './context/HabitContext';
import { ChatProvider } from './context/ChatContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { ImproveSection } from './components/ImproveSection';
import { GoalsSection } from './components/GoalsSection';
import { MotivationSection } from './components/MotivationSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { AuthPage } from './components/AuthPage';
import { SupportPage } from './components/SupportPage';
import { ProfileSetupPage } from './components/ProfileSetupPage';
import { MotivationPage } from './components/MotivationPage';
import { AboutPage } from './components/AboutPage';
import { Chatbot } from './components/Chatbot';
import { DisciplineDashboard } from './components/DisciplineDashboard';
import { HabitTracker } from './components/HabitTracker';

const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
    className="fixed inset-0 z-[100] bg-dark-bg flex items-center justify-center"
  >
    <div className="relative">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-16 h-16 border-4 border-neon-green/20 border-t-neon-green rounded-2xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute top-20 left-1/2 -translate-x-1/2 text-neon-green font-bold tracking-widest uppercase text-xs"
      >
        Habito
      </motion.div>
    </div>
  </motion.div>
);

import { HomePage } from './components/HomePage';
import { FeaturesPage } from './components/FeaturesPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { GoalsPage } from './components/GoalsPage';
import { Play } from 'lucide-react';
import { useHabits } from './context/HabitContext';

import { ProfilePage } from './components/ProfilePage';

const AppContent = () => {
  const { isAuthenticated, user } = useAuth();
  const { isTrackingStarted, startTracking } = useHabits();
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard' | 'support' | 'motivation' | 'about' | 'features' | 'how-it-works' | 'goals' | 'profile'>('home');

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  if (!user?.isOnboarded) {
    return <ProfileSetupPage />;
  }

  if (!isTrackingStarted && currentPage === 'dashboard') {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-green/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-12 text-center relative z-10 max-w-md w-full"
        >
          <div className="w-20 h-20 bg-neon-green/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
            <Play className="text-neon-green fill-neon-green" size={40} />
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-4">New Day, New Focus</h1>
          <p className="text-white/40 mb-10 leading-relaxed">
            Ready to maintain your discipline? Click below to start tracking your habits for today.
          </p>
          <button
            onClick={startTracking}
            className="w-full bg-neon-green text-dark-bg py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all neon-glow"
          >
            Start Tracking
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-neon-green selection:text-dark-bg">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="pt-20">
        {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
        {currentPage === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-2">
                Welcome back, <span className="text-neon-green">{user.profile?.fullName || user.name}</span>
              </h1>
              <p className="text-white/40 font-medium tracking-widest uppercase text-xs">
                Your Discipline Protocol is Active
              </p>
            </motion.div>
            
            <DisciplineDashboard />
            <HabitTracker />
            <GoalsSection />
          </div>
        )}
        {currentPage === 'support' && <SupportPage />}
        {currentPage === 'motivation' && <MotivationPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'features' && <FeaturesPage />}
        {currentPage === 'how-it-works' && <HowItWorksPage />}
        {currentPage === 'goals' && <GoalsPage />}
        {currentPage === 'profile' && <ProfilePage />}
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <HabitProvider>
          <ChatProvider>
            <AnimatePresence>
              {isLoading && <LoadingScreen key="loading" />}
            </AnimatePresence>
            <AppContent />
          </ChatProvider>
        </HabitProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
