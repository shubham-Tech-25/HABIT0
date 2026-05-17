import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, Menu, X, LogOut, HelpCircle, Home } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

interface NavbarProps {
  onNavigate: (page: 'home' | 'dashboard' | 'support' | 'motivation' | 'about' | 'features' | 'how-it-works' | 'goals' | 'profile') => void;
  currentPage: 'home' | 'dashboard' | 'support' | 'motivation' | 'about' | 'features' | 'how-it-works' | 'goals' | 'profile';
}

export const Navbar = ({ onNavigate, currentPage }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();
  const { logout, user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: 'home' },
    { name: 'Dashboard', href: 'dashboard' },
    { name: 'Features', href: 'features' },
    { name: 'How It Works', href: 'how-it-works' },
    { name: 'Goals', href: 'goals' },
    { name: 'Motivation', href: 'motivation' },
    { name: 'About', href: 'about' },
    { name: 'Support', href: 'support' },
    { name: 'Profile', href: 'profile' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'backdrop-blur-lg border-b' : 'bg-transparent'
      )}
      style={{ 
        backgroundColor: isScrolled ? 'var(--nav-bg)' : 'transparent',
        borderColor: isScrolled ? 'var(--nav-border)' : 'transparent'
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => onNavigate('home')}
          className="text-2xl font-bold tracking-tighter flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-neon-green rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.3)]">
            <div className="w-4 h-4 bg-dark-bg rounded-sm rotate-45" />
          </div>
          <span className="text-white group-hover:text-neon-green transition-colors uppercase light:text-slate-900">Habito</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => onNavigate(link.href as any)}
              className={cn(
                "text-[10px] lg:text-xs font-bold transition-colors uppercase tracking-widest",
                currentPage === link.href ? "text-neon-green" : "text-white/70 hover:text-neon-green"
              )}
            >
              {link.name}
            </button>
          ))}
          
          <div className="h-4 w-[1px] bg-white/10 mx-1" />

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="flex items-center gap-4 pl-4 border-l border-white/10">
            <div className="text-right hidden lg:block">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">User</p>
              <p className="text-sm font-bold text-neon-green">{user?.name}</p>
            </div>
            <button
              onClick={logout}
              className="p-2 text-white/40 hover:text-red-500 transition-colors"
              title="Sign Out"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-dark-bg border-b border-white/10 p-6 flex flex-col gap-4 md:hidden light:bg-light-bg light:border-slate-200"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => { onNavigate(link.href as any); setIsMobileMenuOpen(false); }}
                className={cn(
                  "text-lg font-medium text-left",
                  currentPage === link.href ? "text-neon-green" : "text-white/70 hover:text-neon-green"
                )}
              >
                {link.name}
              </button>
            ))}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-neon-green font-bold">
                  {user?.name?.[0]}
                </div>
                <span className="font-bold">{user?.name}</span>
              </div>
              <button
                onClick={logout}
                className="p-2 text-red-500/60 hover:text-red-500"
              >
                <LogOut size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
