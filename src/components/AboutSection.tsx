import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { Users, CheckCircle, Trophy } from 'lucide-react';

const stats = [
  { label: 'Users', value: 100000, suffix: 'k+', icon: Users },
  { label: 'Habits Tracked', value: 500000, suffix: 'k+', icon: CheckCircle },
  { label: 'Goals Achieved', value: 300000, suffix: 'k+', icon: Trophy },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value / 1000;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-neon-green/5 blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <img
                src="https://picsum.photos/seed/habito/100/100"
                alt="Habito Creator"
                className="w-16 h-16 rounded-full border-2 border-neon-green p-1"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-2xl font-bold">Hi, my name is Habito</h3>
                <p className="text-neon-green font-medium">Your Discipline Partner</p>
              </div>
            </div>
            <p className="text-xl text-white/60 leading-relaxed mb-8">
              We built Habito because we believe that discipline is the ultimate 
              form of self-love. In a world full of distractions, Habito is your 
              sanctuary for focus and growth.
            </p>
            <button className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-colors">
              Learn Our Story
            </button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 text-center group"
              >
                <div className="w-12 h-12 bg-neon-green/10 text-neon-green rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon size={24} />
                </div>
                <h4 className="text-3xl font-black mb-1">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </h4>
                <p className="text-sm text-white/40 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter / CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to start your journey?</h2>
          <p className="text-white/60 mb-10 max-w-2xl mx-auto">
            Join 100,000+ users who are mastering their discipline every single day.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-80 bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-neon-green transition-colors"
            />
            <button className="w-full sm:w-auto bg-neon-green text-dark-bg px-10 py-4 rounded-xl font-bold hover:scale-105 transition-transform neon-glow">
              Join Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
