import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Quote } from 'lucide-react';

const motivations = [
  {
    title: 'Motivation nahi, system chahiye',
    content: 'Motivation is fleeting. A system is permanent. Build routines that work even when you don\'t feel like it. Discipline is the bridge between goals and accomplishment.'
  },
  {
    title: 'Discipline > Talent',
    content: 'Talent will get you in the door, but discipline will keep you in the room. Hard work beats talent when talent doesn\'t work hard. Consistency is the ultimate superpower.'
  },
  {
    title: 'Aaj nahi to kab?',
    content: 'The best time to start was yesterday. The second best time is now. Stop waiting for the perfect moment; it doesn\'t exist. Take the first step today.'
  }
];

export const MotivationSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 bg-white/[0.01]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block p-3 bg-neon-green/10 text-neon-green rounded-2xl mb-6"
          >
            <Quote size={32} />
          </motion.div>
          <h2 className="text-4xl font-bold mb-4">Daily Motivation</h2>
        </div>

        <div className="space-y-4">
          {motivations.map((item, index) => (
            <div key={index} className="glass overflow-hidden">
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-xl font-bold">{item.title}</span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-neon-green" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-white/60 leading-relaxed border-t border-white/5">
                      {item.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
