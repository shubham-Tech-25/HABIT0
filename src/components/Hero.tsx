import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-green/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-neon-green text-sm font-medium mb-8"
        >
          <Sparkles size={16} />
          <span>New: 2026 Discipline Protocol</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-black tracking-tight mb-6 leading-[0.9]"
        >
          Ab to 2026 bhi aa gaya, <br />
          <span className="text-neon-green">ab start kar.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10"
        >
          Habito helps you master your discipline, track daily habits, and achieve 
          your most ambitious goals with a premium SaaS-driven approach.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="group bg-neon-green text-dark-bg px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-2 hover:scale-105 transition-all neon-glow neon-glow-hover">
            Start Improving
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 rounded-2xl font-bold text-lg border border-white/10 hover:bg-white/5 transition-colors">
            View Demo
          </button>
        </motion.div>

        {/* Mock Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 relative"
        >
          <div className="glass p-4 md:p-8 max-w-4xl mx-auto overflow-hidden shadow-2xl">
             <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <div className="ml-4 h-4 w-48 bg-white/5 rounded-full" />
             </div>
             <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-64 bg-white/5 rounded-xl animate-pulse" />
                <div className="flex flex-col gap-4">
                  <div className="h-20 bg-white/5 rounded-xl animate-pulse" />
                  <div className="h-20 bg-white/5 rounded-xl animate-pulse" />
                  <div className="h-20 bg-white/5 rounded-xl animate-pulse" />
                </div>
             </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent z-20" />
        </motion.div>
      </div>
    </section>
  );
};
