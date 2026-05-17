import React from 'react';
import { motion } from 'motion/react';
import { Shield, Flame, Target, TrendingUp, Award, Zap, CheckCircle2 } from 'lucide-react';
import { useHabits } from '../context/HabitContext';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import { format, startOfDay } from 'date-fns';

export const DisciplineDashboard = () => {
  const { stats, items, toggleCompletion, dailyChallenge, acceptChallenge } = useHabits();
  const { user } = useAuth();

  const getDisciplineLevel = (streak: number) => {
    if (streak >= 30) return { name: 'Master', color: 'text-purple-500', bg: 'bg-purple-500/10' };
    if (streak >= 14) return { name: 'Warrior', color: 'text-blue-500', bg: 'bg-blue-500/10' };
    if (streak >= 7) return { name: 'Disciple', color: 'text-neon-green', bg: 'bg-neon-green/10' };
    return { name: 'Novice', color: 'text-white/40', bg: 'bg-white/5' };
  };

  const level = getDisciplineLevel(stats.currentStreak);
  
  const today = startOfDay(new Date());
  const todayStr = format(today, 'yyyy-MM-dd');
  
  const habitItems = items.filter(i => i.type === 'habit' || i.type === 'challenge');
  const todayCompletions = habitItems.filter(h => h.completions.includes(todayStr)).length;
  const totalTasks = habitItems.length;
  const progress = totalTasks > 0 ? Math.min((todayCompletions / totalTasks) * 100, 100) : 0;
  const allCompleted = totalTasks > 0 && todayCompletions === totalTasks;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
      {/* Main Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="lg:col-span-2 glass p-8 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <Shield size={160} />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className={cn("p-4 rounded-2xl shadow-lg", level.bg)}>
              <Shield className={level.color} size={32} />
            </div>
            <div>
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Discipline Level</p>
              <h3 className={cn("text-3xl font-black uppercase tracking-tighter", level.color)}>{level.name}</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 text-neon-green mb-1">
                <Flame size={18} />
                <span className="text-2xl font-black">{stats.currentStreak}</span>
              </div>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Current Streak</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-blue-500 mb-1">
                <Award size={18} />
                <span className="text-2xl font-black">{stats.bestStreak}</span>
              </div>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Best Streak</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-purple-500 mb-1">
                <TrendingUp size={18} />
                <span className="text-2xl font-black">{stats.completionRate}%</span>
              </div>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Efficiency</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-orange-500 mb-1">
                <Zap size={18} />
                <span className="text-2xl font-black">{stats.daysActive}</span>
              </div>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Days Active</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Daily Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="glass p-8 flex flex-col"
      >
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Today's Focus</h3>
            <Target className="text-neon-green" size={20} />
          </div>
          
          <div className="relative h-3 bg-white/5 rounded-full overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="absolute top-0 left-0 h-full bg-neon-green shadow-[0_0_15px_rgba(34,197,94,0.5)]"
            />
          </div>
          
          <div className="flex justify-between text-xs mb-8">
            <span className="text-white/40 uppercase font-bold tracking-widest">Progress</span>
            <span className="font-bold text-neon-green">
              {allCompleted ? "All Tasks Completed" : `${todayCompletions} / ${totalTasks} Tasks`}
            </span>
          </div>

          {/* Daily Challenge Section */}
          {dailyChallenge && !dailyChallenge.accepted && (
            <div className="mb-8 p-4 bg-neon-green/5 border border-neon-green/20 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="text-neon-green" size={14} />
                <span className="text-[10px] font-bold text-neon-green uppercase tracking-widest">Daily Challenge</span>
              </div>
              <p className="text-sm font-bold mb-4">{dailyChallenge.text}</p>
              <button
                onClick={acceptChallenge}
                className="w-full py-2 bg-neon-green text-dark-bg text-xs font-bold rounded-xl hover:bg-neon-green/90 transition-colors"
              >
                Accept Challenge
              </button>
            </div>
          )}

          {/* Habit Completion List */}
          <div className="space-y-3 mb-8">
            {habitItems.map((habit) => {
              const isCompleted = habit.completions.includes(todayStr);
              return (
                <button
                  key={habit.id}
                  disabled={isCompleted}
                  onClick={() => toggleCompletion(habit.id, today)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-xl border transition-all group",
                    isCompleted 
                      ? "bg-neon-green/10 border-neon-green/20 text-neon-green cursor-default" 
                      : "bg-white/5 border-white/10 text-white/60 hover:border-neon-green/50 hover:bg-neon-green/5"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {habit.type === 'challenge' && <Zap size={14} className="text-neon-green" />}
                    <span className="text-sm font-medium">{habit.name}</span>
                  </div>
                  <div className={cn(
                    "w-6 h-6 rounded-lg flex items-center justify-center transition-all",
                    isCompleted ? "bg-neon-green text-dark-bg" : "bg-white/10 text-transparent group-hover:text-white/20"
                  )}>
                    <CheckCircle2 size={16} />
                  </div>
                </button>
              );
            })}
            {habitItems.length === 0 && !dailyChallenge?.accepted && (
              <p className="text-center text-white/20 text-xs py-4 italic">No habits added yet.</p>
            )}
          </div>
        </div>

        <div className="mt-auto p-4 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-xs text-white/60 italic leading-relaxed">
            "Discipline is doing what needs to be done, even if you don't want to do it."
          </p>
        </div>
      </motion.div>
    </div>
  );
};
