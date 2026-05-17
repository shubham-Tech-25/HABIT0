import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  CheckCircle2, 
  Target, 
  Flame, 
  Sparkles, 
  HelpCircle, 
  ArrowRight,
  Shield,
  Zap
} from 'lucide-react';
import { useHabits } from '../context/HabitContext';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';

interface HomePageProps {
  onNavigate: (page: any) => void;
}

export const HomePage = ({ onNavigate }: HomePageProps) => {
  const { stats, items } = useHabits();
  const { user } = useAuth();
  const { setIsOpen } = useChat();

  const habitCount = items.filter(i => i.type === 'habit').length;
  const goalCount = items.filter(i => i.type !== 'habit').length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-24">
      {/* Hero Section */}
      <section className="text-center py-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-green/5 rounded-full blur-[120px] -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-green/10 text-neon-green text-xs font-bold uppercase tracking-widest mb-8"
        >
          <Sparkles size={14} />
          Master Your Discipline
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6"
        >
          Habito
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-white/40 font-medium tracking-tight mb-12"
        >
          Track • Improve • Achieve
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => onNavigate('dashboard')}
            className="bg-neon-green text-dark-bg px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
          >
            Go to Dashboard <ArrowRight size={20} />
          </button>
          <button
            onClick={() => onNavigate('how-it-works')}
            className="glass px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-white/5 transition-colors"
          >
            How It Works
          </button>
        </motion.div>
      </section>

      {/* Grid Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Discipline Tracker Preview */}
        <motion.div
          whileHover={{ y: -5 }}
          className="glass p-8 group cursor-pointer"
          onClick={() => onNavigate('dashboard')}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 bg-neon-green/10 text-neon-green rounded-xl">
              <Shield size={24} />
            </div>
            <ArrowRight className="text-white/20 group-hover:text-neon-green transition-colors" />
          </div>
          <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">Discipline Protocol</h3>
          <p className="text-white/40 text-sm leading-relaxed mb-6">
            Your current discipline level is based on your consistency and completion rate.
          </p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-neon-green">{stats.completionRate}%</span>
            <span className="text-xs text-white/20 mb-2 uppercase font-bold">Efficiency</span>
          </div>
        </motion.div>

        {/* Habit Tracker Preview */}
        <motion.div
          whileHover={{ y: -5 }}
          className="glass p-8 group cursor-pointer"
          onClick={() => onNavigate('dashboard')}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
              <CheckCircle2 size={24} />
            </div>
            <ArrowRight className="text-white/20 group-hover:text-blue-500 transition-colors" />
          </div>
          <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">Habit Tracker</h3>
          <p className="text-white/40 text-sm leading-relaxed mb-6">
            You are currently tracking {habitCount} active habits in your daily routine.
          </p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-blue-500">{habitCount}</span>
            <span className="text-xs text-white/20 mb-2 uppercase font-bold">Active Habits</span>
          </div>
        </motion.div>

        {/* Goals Preview */}
        <motion.div
          whileHover={{ y: -5 }}
          className="glass p-8 group cursor-pointer"
          onClick={() => onNavigate('goals')}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl">
              <Target size={24} />
            </div>
            <ArrowRight className="text-white/20 group-hover:text-purple-500 transition-colors" />
          </div>
          <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">Goals & Vision</h3>
          <p className="text-white/40 text-sm leading-relaxed mb-6">
            {goalCount} milestones set to achieve your long-term vision.
          </p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-purple-500">{goalCount}</span>
            <span className="text-xs text-white/20 mb-2 uppercase font-bold">Milestones</span>
          </div>
        </motion.div>

        {/* Streak Statistics Preview */}
        <motion.div
          whileHover={{ y: -5 }}
          className="glass p-8 group cursor-pointer"
          onClick={() => onNavigate('dashboard')}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 bg-orange-500/10 text-orange-500 rounded-xl">
              <Flame size={24} />
            </div>
            <ArrowRight className="text-white/20 group-hover:text-orange-500 transition-colors" />
          </div>
          <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">Streak Stats</h3>
          <p className="text-white/40 text-sm leading-relaxed mb-6">
            Your momentum is your power. Keep the flame alive every single day.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase font-bold text-white/20 mb-1">Current</p>
              <p className="text-2xl font-black text-orange-500">{stats.currentStreak}d</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-white/20 mb-1">Best</p>
              <p className="text-2xl font-black text-white/60">{stats.bestStreak}d</p>
            </div>
          </div>
        </motion.div>

        {/* Motivation Quotes Preview */}
        <motion.div
          whileHover={{ y: -5 }}
          className="glass p-8 group cursor-pointer"
          onClick={() => onNavigate('motivation')}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-xl">
              <Zap size={24} />
            </div>
            <ArrowRight className="text-white/20 group-hover:text-yellow-500 transition-colors" />
          </div>
          <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">Daily Fuel</h3>
          <p className="text-white/40 text-sm leading-relaxed mb-6 italic">
            "Discipline is the bridge between goals and accomplishment."
          </p>
          <span className="text-xs text-neon-green font-bold uppercase tracking-widest">Get Inspired</span>
        </motion.div>

        {/* Help & Support Quick Links */}
        <motion.div
          whileHover={{ y: -5 }}
          className="glass p-8 group cursor-pointer"
          onClick={() => onNavigate('support')}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 bg-white/10 text-white rounded-xl">
              <HelpCircle size={24} />
            </div>
            <ArrowRight className="text-white/20 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">Support Hub</h3>
          <p className="text-white/40 text-sm leading-relaxed mb-6">
            Need help with the protocol? Access our guides and FAQs.
          </p>
          <div className="flex gap-4">
            <span className="text-[10px] font-bold uppercase text-white/30 hover:text-neon-green transition-colors">FAQs</span>
            <span className="text-[10px] font-bold uppercase text-white/30 hover:text-neon-green transition-colors">Guides</span>
            <span className="text-[10px] font-bold uppercase text-white/30 hover:text-neon-green transition-colors">Contact</span>
          </div>
        </motion.div>
      </div>

      {/* How It Works Section */}
      <section className="py-12 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">How It Works</h2>
          <p className="text-white/40 max-w-xl mx-auto">The Habito discipline protocol is simple but unforgiving.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Define', desc: 'Add your habits and goals.' },
            { step: '02', title: 'Commit', desc: 'Start your daily tracking.' },
            { step: '03', title: 'Execute', desc: 'Complete and lock your habits.' },
            { step: '04', title: 'Master', desc: 'Build streaks and discipline.' }
          ].map((item, i) => (
            <div key={i} className="text-center">
              <span className="text-5xl font-black text-white/5 block mb-4">{item.step}</span>
              <h4 className="text-lg font-bold mb-2 uppercase tracking-tight">{item.title}</h4>
              <p className="text-sm text-white/40">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="glass p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green/10 rounded-full blur-[80px] -z-10" />
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6">Ready to Level Up?</h2>
        <p className="text-white/40 mb-10 max-w-2xl mx-auto">
          Your AI Assistant is ready to help you plan your routine and stay motivated.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="bg-neon-green text-dark-bg px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_30px_rgba(34,197,94,0.3)]"
          >
            Start Now
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="glass px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-white/5 transition-colors flex items-center gap-2"
          >
            <Sparkles size={18} className="text-neon-green" /> Talk to AI
          </button>
        </div>
      </section>
    </div>
  );
};
