import React from 'react';
import { motion } from 'motion/react';
import { Plus, Play, CheckCircle2, Flame } from 'lucide-react';

const steps = [
  {
    icon: <Plus size={40} />,
    title: '1. Add Habits',
    description: 'Define the habits you want to master. Whether it\'s fitness, study, or productivity, start small but think big.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    icon: <Play size={40} />,
    title: '2. Start Tracking',
    description: 'Every new day, click the "Start Tracking" button to initiate your daily protocol. Your discipline starts here.',
    color: 'text-neon-green',
    bg: 'bg-neon-green/10'
  },
  {
    icon: <CheckCircle2 size={40} />,
    title: '3. Complete Daily',
    description: 'Mark your habits as completed. Once ticked, they are locked for the day. No unticking, no cheating.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10'
  },
  {
    icon: <Flame size={40} />,
    title: '4. Maintain Streaks',
    description: 'Keep the momentum. If you miss even one day, your streak resets to zero. The protocol is absolute.',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10'
  }
];

export const HowItWorksPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4">
          The <span className="text-neon-green">System</span>
        </h1>
        <p className="text-white/40 max-w-2xl mx-auto text-lg">
          Understanding the Habito protocol is the first step towards mastering your discipline.
        </p>
      </motion.div>

      <div className="space-y-12">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="glass p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-16"
          >
            <div className={`w-24 h-24 shrink-0 rounded-3xl flex items-center justify-center ${step.bg} ${step.color}`}>
              {step.icon}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className={`text-3xl font-black uppercase tracking-tighter mb-4 ${step.color}`}>
                {step.title}
              </h3>
              <p className="text-xl text-white/60 leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-20 p-8 glass border-red-500/20 text-center"
      >
        <h4 className="text-red-500 font-bold uppercase tracking-widest mb-2">Critical Rule</h4>
        <p className="text-white/40">
          The streak system is unforgiving. A single missed day will reset your progress. This is by design to ensure maximum accountability.
        </p>
      </motion.div>
    </div>
  );
};
