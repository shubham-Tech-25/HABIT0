import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Quote, Sparkles, Lightbulb, Trophy, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { useHabits } from '../context/HabitContext';

const quotes = [
  { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
  { text: "The secret of your future is hidden in your daily routine.", author: "Mike Murdock" },
  { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
  { text: "Small acts, when multiplied by millions of people, can transform the world.", author: "Howard Zinn" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" }
];

const tips = [
  { title: "The 2-Minute Rule", desc: "If a habit takes less than 2 minutes, do it now. It builds momentum." },
  { title: "Habit Stacking", desc: "Attach a new habit to an existing one. 'After I drink coffee, I will meditate'." },
  { title: "Environment Design", desc: "Make good habits easy and bad habits hard by changing your surroundings." },
  { title: "Identity Shift", desc: "Don't say 'I'm trying to run'. Say 'I am a runner'. Focus on who you wish to become." }
];

export const MotivationPage = () => {
  const { dailyChallenge, acceptChallenge } = useHabits();
  const [dailyQuote, setDailyQuote] = useState(quotes[0]);

  useEffect(() => {
    const index = new Date().getDate() % quotes.length;
    setDailyQuote(quotes[index]);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-12 md:p-20 text-center relative overflow-hidden mb-16"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-neon-green/5 pointer-events-none" />
          <Quote className="text-neon-green/20 mx-auto mb-8" size={64} />
          <h1 className="text-3xl md:text-5xl font-bold italic mb-6 leading-tight">
            "{dailyQuote.text}"
          </h1>
          <p className="text-neon-green font-bold uppercase tracking-widest">— {dailyQuote.author}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Success Tips */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-8">
              <Lightbulb className="text-neon-green" size={24} />
              Productivity Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tips.map((tip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-6 border-white/5 hover:border-neon-green/20 transition-colors group"
                >
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-neon-green group-hover:text-dark-bg transition-colors">
                    <Zap size={20} />
                  </div>
                  <h3 className="font-bold mb-2">{tip.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{tip.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Daily Challenge */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-8">
              <Trophy className="text-neon-green" size={24} />
              Daily Challenge
            </h2>
            {dailyChallenge ? (
              <div className="glass p-8 border-neon-green/20 bg-neon-green/5">
                <div className="flex items-center gap-2 text-neon-green text-xs font-bold uppercase tracking-widest mb-4">
                  <Sparkles size={14} />
                  {dailyChallenge.accepted ? 'Challenge Accepted' : 'Active Now'}
                </div>
                <h3 className="text-xl font-bold mb-4">{dailyChallenge.text}</h3>
                <p className="text-sm text-white/60 mb-8 leading-relaxed">
                  {dailyChallenge.category} focused challenge. Complete this to boost your discipline and maintain your streak.
                </p>
                <button 
                  onClick={acceptChallenge}
                  disabled={dailyChallenge.accepted}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                    dailyChallenge.accepted 
                      ? 'bg-white/10 text-white/40 cursor-not-allowed' 
                      : 'bg-neon-green text-dark-bg hover:scale-[1.02]'
                  }`}
                >
                  {dailyChallenge.accepted ? (
                    <>
                      <CheckCircle2 size={18} />
                      Accepted
                    </>
                  ) : (
                    <>
                      Accept Challenge
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="glass p-8 text-center text-white/20 italic">
                Generating daily challenge...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
