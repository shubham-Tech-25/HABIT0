import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { useHabits } from '../context/HabitContext';

export const GoalsPage = () => {
  const { items, addItem, removeItem, editItem } = useHabits();
  
  const [shortInput, setShortInput] = useState('');
  const [longInput, setLongInput] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

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

  const startEditing = (id: string, currentName: string) => {
    setEditingId(id);
    setEditValue(currentName);
  };

  const saveEdit = () => {
    if (editingId && editValue.trim()) {
      editItem(editingId, editValue);
      setEditingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4">
          Your <span className="text-neon-green">Vision</span>
        </h1>
        <p className="text-white/40 max-w-2xl mx-auto text-lg">
          Define your short-term milestones and long-term aspirations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Short Term */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-neon-green/20 text-neon-green rounded-2xl">
              <Target size={28} />
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tighter">Short-Term</h3>
          </div>

          <div className="flex gap-2 mb-8">
            <input
              type="text"
              value={shortInput}
              onChange={(e) => setShortInput(e.target.value)}
              placeholder="Add a short-term goal..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-neon-green transition-colors"
              onKeyPress={(e) => e.key === 'Enter' && handleAddGoal('short-term')}
            />
            <button
              onClick={() => handleAddGoal('short-term')}
              className="bg-neon-green text-dark-bg p-4 rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(34,197,94,0.3)]"
            >
              <Plus size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {shortTermGoals.map((goal) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center justify-between p-5 bg-white/5 rounded-2xl group border border-white/5 hover:border-white/10 transition-colors"
                >
                  {editingId === goal.id ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="flex-1 bg-white/10 border border-neon-green/50 rounded-lg px-3 py-1 focus:outline-none"
                        autoFocus
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                      />
                      <button onClick={saveEdit} className="text-neon-green"><Check size={20} /></button>
                      <button onClick={() => setEditingId(null)} className="text-red-500"><X size={20} /></button>
                    </div>
                  ) : (
                    <>
                      <span className="font-medium">{goal.name}</span>
                      <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEditing(goal.id, goal.name)}
                          className="text-white/40 hover:text-neon-green transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => removeItem(goal.id)}
                          className="text-white/40 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {shortTermGoals.length === 0 && (
              <p className="text-center text-white/20 py-12 italic">No short-term goals set yet.</p>
            )}
          </div>
        </motion.div>

        {/* Long Term */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-500/20 text-blue-500 rounded-2xl">
              <Target size={28} />
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tighter">Long-Term</h3>
          </div>

          <div className="flex gap-2 mb-8">
            <input
              type="text"
              value={longInput}
              onChange={(e) => setLongInput(e.target.value)}
              placeholder="Add a long-term goal..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-colors"
              onKeyPress={(e) => e.key === 'Enter' && handleAddGoal('long-term')}
            />
            <button
              onClick={() => handleAddGoal('long-term')}
              className="bg-blue-500 text-white p-4 rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              <Plus size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {longTermGoals.map((goal) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between p-5 bg-white/5 rounded-2xl group border border-white/5 hover:border-white/10 transition-colors"
                >
                  {editingId === goal.id ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="flex-1 bg-white/10 border border-blue-500/50 rounded-lg px-3 py-1 focus:outline-none"
                        autoFocus
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                      />
                      <button onClick={saveEdit} className="text-blue-500"><Check size={20} /></button>
                      <button onClick={() => setEditingId(null)} className="text-red-500"><X size={20} /></button>
                    </div>
                  ) : (
                    <>
                      <span className="font-medium">{goal.name}</span>
                      <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEditing(goal.id, goal.name)}
                          className="text-white/40 hover:text-blue-500 transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => removeItem(goal.id)}
                          className="text-white/40 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {longTermGoals.length === 0 && (
              <p className="text-center text-white/20 py-12 italic">No long-term goals set yet.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
