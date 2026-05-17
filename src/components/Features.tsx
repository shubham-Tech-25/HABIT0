import React from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Target, ArrowUpRight } from 'lucide-react';

const features = [
  {
    title: 'Discipline',
    description: 'Daily discipline tracker to keep you on the right path.',
    icon: Shield,
    color: 'bg-emerald-500/20 text-emerald-500',
  },
  {
    title: 'Habits',
    description: 'Track good & bad habits daily with streak counters.',
    icon: Zap,
    color: 'bg-neon-green/20 text-neon-green',
  },
  {
    title: 'Goals',
    description: 'Set short & long-term goals and track your progress.',
    icon: Target,
    color: 'bg-blue-500/20 text-blue-500',
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Track • Improve • Achieve
          </motion.h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Everything you need to transform your life in 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="glass p-8 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="text-neon-green" />
              </div>
              
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon size={28} />
              </div>

              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/50 mb-8 leading-relaxed">
                {feature.description}
              </p>

              <button className="w-full py-3 rounded-xl border border-white/10 font-bold hover:bg-neon-green hover:text-dark-bg hover:border-neon-green transition-all">
                Get Started
              </button>

              {/* Hover Glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-neon-green/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
