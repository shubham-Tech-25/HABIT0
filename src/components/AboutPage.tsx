import React from 'react';
import { motion } from 'motion/react';
import { Target, TrendingUp, Award, CheckCircle2, ShieldCheck, Users } from 'lucide-react';

const steps = [
  { 
    title: "Add Habits or Goals", 
    desc: "Start by defining what you want to achieve. Whether it's a daily habit or a long-term vision.",
    icon: <Target className="text-neon-green" size={24} />
  },
  { 
    title: "Track Daily", 
    desc: "Consistency is key. Mark your progress every day. Our system only allows one completion per day.",
    icon: <CheckCircle2 className="text-neon-green" size={24} />
  },
  { 
    title: "Maintain Consistency", 
    desc: "Build streaks. If you skip a day, the streak breaks. This keeps you accountable and focused.",
    icon: <ShieldCheck className="text-neon-green" size={24} />
  },
  { 
    title: "Analyze & Achieve", 
    desc: "Watch your progress through graphs and stats. Transform daily routines into long-term success.",
    icon: <TrendingUp className="text-neon-green" size={24} />
  }
];

export const AboutPage = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tighter mb-6"
          >
            ABOUT <span className="text-neon-green">HABITO</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Habito is a smart productivity platform designed to help users build discipline, track habits, and achieve meaningful goals.
          </motion.p>
        </div>

        {/* Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-white/50 leading-relaxed">
              We believe that greatness is not an act, but a habit. Our mission is to provide the tools and framework necessary for anyone to transform their life through small, consistent daily actions.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-xs font-bold uppercase tracking-widest text-white/60">
                <Award size={14} className="text-neon-green" /> Discipline
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-xs font-bold uppercase tracking-widest text-white/60">
                <Users size={14} className="text-neon-green" /> Community
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass aspect-video relative overflow-hidden flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-neon-green/5 blur-3xl" />
            <div className="relative z-10 text-center">
              <div className="text-6xl font-black text-neon-green mb-2">100%</div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/40">Focused on Growth</div>
            </div>
          </motion.div>
        </div>

        {/* How It Works */}
        <div className="space-y-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-white/40 uppercase tracking-widest text-xs font-bold">Track → Improve → Achieve</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 relative group"
              >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-neon-green group-hover:text-dark-bg transition-colors">
                  {step.icon}
                </div>
                <h3 className="font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
                <div className="absolute top-4 right-4 text-white/5 font-black text-4xl">0{i + 1}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
