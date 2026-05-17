import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Target, Plus, Trash2 } from 'lucide-react';
import { useHabits } from '../context/HabitContext';

export const GoalsSection = () => {
  const { items, addItem, removeItem } = useHabits();
  
  const [shortInput, setShortInput] = useState('');
  const [longInput, setLongInput] = useState('');

  const shortTermGoals = items.filter(item => item.type === 'short-term');
  const longTermGoals = items.filter(item => item.type === 'long-term');

  const handleAddGoal = (type: 'short-term' | 'long-term') => {
    const input = type === 'short-term' ? shortInput : longInput;
    if (input.trim()) {
      addItem(input, type);
      if (type === 'short-term') setShortInput('');
      else setLongInput('');
    }
  };

  return (
    <section id="goals" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Set Your <span className="text-neon-green">Goals</span>
          </motion.h2>
          <p className="text-white/60">Vision without action is just a dream. Every goal added here becomes a trackable habit.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Short Term */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-neon-green/20 text-neon-green rounded-lg">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-bold">Short-Term Goals</h3>
            </div>

            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={shortInput}
                onChange={(e) => setShortInput(e.target.value)}
                placeholder="Add a short-term goal..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-neon-green transition-colors"
                onKeyPress={(e) => e.key === 'Enter' && handleAddGoal('short-term')}
              />
              <button
                onClick={() => handleAddGoal('short-term')}
                className="bg-neon-green text-dark-bg p-3 rounded-xl hover:scale-105 transition-transform"
              >
                <Plus size={24} />
              </button>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {shortTermGoals.map((goal) => (
                <div key={goal.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl group">
                  <span>{goal.name}</span>
                  <button
                    onClick={() => removeItem(goal.id)}
                    className="text-white/20 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              {shortTermGoals.length === 0 && (
                <p className="text-center text-white/20 py-8 italic">No goals set yet.</p>
              )}
            </div>
          </motion.div>

          {/* Long Term */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/20 text-blue-500 rounded-lg">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-bold">Long-Term Goals</h3>
            </div>

            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={longInput}
                onChange={(e) => setLongInput(e.target.value)}
                placeholder="Add a long-term goal..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-neon-green transition-colors"
                onKeyPress={(e) => e.key === 'Enter' && handleAddGoal('long-term')}
              />
              <button
                onClick={() => handleAddGoal('long-term')}
                className="bg-blue-500 text-white p-3 rounded-xl hover:scale-105 transition-transform"
              >
                <Plus size={24} />
              </button>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {longTermGoals.map((goal) => (
                <div key={goal.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl group">
                  <span>{goal.name}</span>
                  <button
                    onClick={() => removeItem(goal.id)}
                    className="text-white/20 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              {longTermGoals.length === 0 && (
                <p className="text-center text-white/20 py-8 italic">No goals set yet.</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
