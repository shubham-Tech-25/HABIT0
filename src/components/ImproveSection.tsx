import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { HabitTracker } from './HabitTracker';

const improveItems = [
  { title: 'Time Management', desc: 'Optimize your daily schedule' },
  { title: 'Mindset', desc: 'Build mental resilience' },
  { title: 'Health & Fitness', desc: 'Track physical wellness' },
  { title: 'Study & Skills', desc: 'Master new capabilities' },
];

export const ImproveSection = () => {
  return (
    <section id="improve" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Content */}
        <div className="lg:sticky lg:top-32">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-8"
          >
            How to <span className="text-neon-green">Improve</span>
          </motion.h2>
          
          <div className="space-y-6">
            {improveItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors group"
              >
                <div className="mt-1 text-neon-green">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold group-hover:text-neon-green transition-colors">{item.title}</h4>
                  <p className="text-white/50">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Real Habit Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <HabitTracker />
        </motion.div>
      </div>
    </section>
  );
};
