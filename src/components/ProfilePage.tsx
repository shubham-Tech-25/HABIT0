import React from 'react';
import { motion } from 'motion/react';
import { User, Mail, Shield, Flame, Target, Settings, Moon, Sun, LogOut, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useHabits } from '../context/HabitContext';
import { cn } from '../lib/utils';

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { stats } = useHabits();

  const profile = user?.profile || {
    fullName: user?.name || 'User',
    email: user?.email || 'user@example.com',
    bio: 'Mastering the Habito protocol.',
    avatar: null
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-2">
          Your <span className="text-neon-green">Profile</span>
        </h1>
        <p className="text-white/40 font-medium tracking-widest uppercase text-xs">
          Manage your identity and preferences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-1 space-y-6"
        >
          <div className="glass p-8 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-neon-green" />
            <div className="relative mb-6 inline-block">
              <div className="w-32 h-32 bg-white/5 rounded-3xl flex items-center justify-center text-neon-green border-2 border-white/10 group-hover:border-neon-green/50 transition-colors overflow-hidden">
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.fullName} className="w-full h-full object-cover" />
                ) : (
                  <User size={64} />
                )}
              </div>
              <button className="absolute bottom-[-10px] right-[-10px] p-3 bg-neon-green text-dark-bg rounded-2xl shadow-lg hover:scale-110 transition-transform">
                <Camera size={18} />
              </button>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-1">{profile.fullName}</h3>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-6">{profile.email}</p>
            
            <div className="flex justify-center gap-4 pt-6 border-t border-white/5">
              <div className="text-center">
                <p className="text-xl font-black text-neon-green">{stats.currentStreak}</p>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Streak</p>
              </div>
              <div className="w-[1px] h-8 bg-white/5" />
              <div className="text-center">
                <p className="text-xl font-black text-blue-500">{stats.totalCompletedDays}</p>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Days</p>
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full glass p-4 flex items-center justify-center gap-3 text-red-500 hover:bg-red-500/10 transition-colors font-bold uppercase tracking-widest text-xs"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </motion.div>

        {/* Settings & Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2 space-y-8"
        >
          {/* Theme Toggle */}
          <div className="glass p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/5 rounded-xl text-neon-green">
                  <Settings size={24} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">App Preferences</h3>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/5 rounded-lg">
                    {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                  </div>
                  <div>
                    <p className="font-bold text-sm">Visual Theme</p>
                    <p className="text-xs text-white/40">Switch between dark and light mode</p>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className={cn(
                    "relative w-14 h-8 rounded-full transition-colors duration-300",
                    theme === 'light' ? "bg-neon-green" : "bg-white/10"
                  )}
                >
                  <motion.div
                    animate={{ x: theme === 'light' ? 26 : 4 }}
                    className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/5 rounded-lg">
                    <Shield size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Privacy Mode</p>
                    <p className="text-xs text-white/40">Hide sensitive stats from dashboard</p>
                  </div>
                </div>
                <button className="relative w-14 h-8 rounded-full bg-white/10">
                  <div className="absolute top-1 left-1 w-6 h-6 bg-white/20 rounded-full" />
                </button>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="glass p-8">
            <h3 className="text-xl font-black uppercase tracking-tight mb-8">Account Details</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Full Name</label>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-sm font-medium">
                    {profile.fullName}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Email Address</label>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-sm font-medium">
                    {profile.email}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Bio</label>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-sm font-medium leading-relaxed">
                  {profile.bio}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
