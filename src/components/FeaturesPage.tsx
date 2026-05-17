import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Shield, Target, Flame, BarChart3, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <CheckCircle2 className="text-neon-green" size={32} />,
    title: 'Habit Tracking',
    description: 'Track your daily habits with a locked-in system. Once you tick it, it stays ticked. No excuses.'
  },
  {
    icon: <Shield className="text-blue-500" size={32} />,
    title: 'Discipline Building',
    description: 'Our system is designed to build iron-clad discipline. Every day counts towards your protocol.'
  },
  {
    icon: <Target className="text-purple-500" size={32} />,
    title: 'Goal Management',
    description: 'Manage both short-term and long-term goals. Break them down into actionable habits.'
  },
  {
    icon: <Flame className="text-orange-500" size={32} />,
    title: 'Streak Tracking',
    description: 'Maintain your streaks. Miss one day, and the streak resets to zero. Consistency is key.'
  },
  {
    icon: <BarChart3 className="text-emerald-500" size={32} />,
    title: 'Progress Analytics',
    description: 'Visualize your progress with heatmaps and charts. See your growth over time.'
  },
  {
    icon: <Sparkles className="text-yellow-500" size={32} />,
    title: 'Motivation System',
    description: 'Daily quotes and AI-driven insights to keep you focused on your journey.'
  }
];

export const FeaturesPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4">
          Core <span className="text-neon-green">Capabilities</span>
        </h1>
        <p className="text-white/40 max-w-2xl mx-auto text-lg">
          Habito is more than just a tracker. It's a complete discipline protocol designed for those who want to master their lives.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-8 hover:border-neon-green/30 transition-colors group"
          >
            <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
            <p className="text-white/50 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
