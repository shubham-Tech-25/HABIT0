import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Calendar, 
  Flame, 
  BarChart3, 
  Plus, 
  Trash2,
  Play,
  RotateCcw,
  Target,
  Trophy
} from 'lucide-react';
import { 
  format, 
  startOfWeek, 
  addDays, 
  isSameDay, 
  differenceInDays, 
  parseISO,
  subDays,
  isAfter,
  isBefore,
  startOfDay
} from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useHabits } from '../context/HabitContext';
import { cn } from '../lib/utils';
import { Heatmap } from './Heatmap';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const HabitTracker = () => {
  const { 
    items, 
    startDate, 
    startTracking, 
    resetTracking, 
    addItem, 
    removeItem, 
    toggleCompletion,
    stats 
  } = useHabits();
  
  const [newHabitName, setNewHabitName] = React.useState('');

  const today = startOfDay(new Date());
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const allCompletions = useMemo(() => {
    const set = new Set<string>();
    items.forEach(item => {
      item.completions.forEach(c => set.add(c));
    });
    return Array.from(set);
  }, [items]);

  const handleAddHabit = () => {
    if (newHabitName.trim()) {
      addItem(newHabitName, 'habit');
      setNewHabitName('');
    }
  };

  // Chart Data
  const chartData = useMemo(() => {
    const labels = weekDays.map(d => format(d, 'EEE'));
    const data = weekDays.map(d => {
      const dateStr = format(d, 'yyyy-MM-dd');
      const completedCount = items.filter(h => h.completions.includes(dateStr)).length;
      return items.length > 0 ? (completedCount / items.length) * 100 : 0;
    });

    return {
      labels,
      datasets: [
        {
          label: 'Completion %',
          data,
          borderColor: '#22c55e',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#22c55e',
          pointBorderColor: document.documentElement.classList.contains('light') ? '#f8fafc' : '#0a0a0a',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  }, [items, weekDays]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--chart-tooltip-bg').trim() || '#1a1a1a',
        titleColor: '#22c55e',
        bodyColor: document.documentElement.classList.contains('light') ? '#0f172a' : '#fff',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: any) => `Completion: ${Math.round(context.raw)}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: { color: getComputedStyle(document.documentElement).getPropertyValue('--chart-grid').trim() || 'rgba(255,255,255,0.05)' },
        ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--chart-ticks').trim() || 'rgba(255,255,255,0.3)', font: { size: 10 } },
      },
      x: {
        grid: { display: false },
        ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--chart-ticks').trim() || 'rgba(255,255,255,0.3)', font: { size: 10 } },
      },
    },
  };

  if (!startDate) {
    return (
      <div className="glass p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-20 h-20 bg-neon-green/10 text-neon-green rounded-full flex items-center justify-center mb-6 animate-pulse">
          <Play size={40} fill="currentColor" />
        </div>
        <h3 className="text-3xl font-bold mb-4">Start Your Journey</h3>
        <p className="text-white/50 max-w-md mb-8">
          Begin tracking your discipline today. We'll help you stay consistent and build 
          the systems you need to succeed in 2026.
        </p>
        <button
          onClick={startTracking}
          className="bg-neon-green text-dark-bg px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all neon-glow"
        >
          Start Tracking Now
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass p-6 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest">Days Active</p>
            <p className="text-2xl font-bold">{stats.daysActive}</p>
          </div>
        </div>
        <div className="glass p-6 flex items-center gap-4">
          <div className="p-3 bg-neon-green/10 text-neon-green rounded-xl">
            <BarChart3 size={24} />
          </div>
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest">Rate</p>
            <p className="text-2xl font-bold">{stats.completionRate}%</p>
          </div>
        </div>
        <div className="glass p-6 flex items-center gap-4">
          <div className="p-3 bg-orange-500/10 text-orange-500 rounded-xl">
            <Flame size={24} />
          </div>
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest">Streak</p>
            <p className="text-2xl font-bold">{stats.currentStreak}</p>
          </div>
        </div>
        <div className="glass p-6 flex items-center gap-4">
          <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-xl">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest">Best</p>
            <p className="text-2xl font-bold">{stats.bestStreak}</p>
          </div>
        </div>
      </div>

      {/* Main Tracker UI */}
      <div className="glass p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/5">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Calendar size={20} className="text-neon-green" />
            Weekly Discipline
          </h3>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              placeholder="New habit..."
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-neon-green outline-none"
              onKeyPress={(e) => e.key === 'Enter' && handleAddHabit()}
            />
            <button
              onClick={handleAddHabit}
              className="p-2 bg-neon-green text-dark-bg rounded-lg hover:scale-105 transition-transform"
            >
              <Plus size={20} />
            </button>
            <button
              onClick={resetTracking}
              className="p-2 bg-white/5 text-white/40 rounded-lg hover:text-red-500 transition-colors"
              title="Reset All Data"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar pb-4">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left pb-4 text-xs font-medium text-white/20 uppercase tracking-widest">Item</th>
                {weekDays.map((day, i) => (
                  <th key={i} className="pb-4 px-2">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] text-white/20 uppercase">{format(day, 'EEE')}</span>
                      <span className={cn(
                        "text-xs font-bold",
                        isSameDay(day, today) ? "text-neon-green" : "text-white/40"
                      )}>
                        {format(day, 'd')}
                      </span>
                    </div>
                  </th>
                ))}
                <th className="text-right pb-4 text-xs font-medium text-white/20 uppercase tracking-widest">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.map((item) => {
                const completionsThisWeek = weekDays.filter(d => 
                  item.completions.includes(format(d, 'yyyy-MM-dd'))
                ).length;
                const progress = Math.round((completionsThisWeek / 7) * 100);

                return (
                  <tr key={item.id} className="group">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-white/20 hover:text-red-500 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                        <div className="flex items-center gap-2">
                          {item.type !== 'habit' && (
                            <Target size={14} className={cn(
                              item.type === 'short-term' ? "text-neon-green" : "text-blue-500"
                            )} />
                          )}
                          <span className="font-medium whitespace-nowrap">{item.name}</span>
                        </div>
                      </div>
                    </td>
                    {weekDays.map((day, i) => {
                      const dateStr = format(day, 'yyyy-MM-dd');
                      const isCompleted = item.completions.includes(dateStr);
                      const isToday = isSameDay(day, today);
                      const isFuture = isAfter(day, today);
                      const isPast = isBefore(day, today) && !isToday;

                      return (
                        <td key={i} className="py-4 px-2">
                          <button
                            disabled={isFuture || isPast || isCompleted}
                            onClick={() => toggleCompletion(item.id, day)}
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                              isCompleted 
                                ? "bg-neon-green text-dark-bg shadow-[0_0_10px_rgba(34,197,94,0.3)] cursor-default" 
                                : "bg-white/5 text-white/10 hover:bg-white/10",
                              (isFuture || isPast) && !isCompleted && "opacity-20 cursor-not-allowed",
                              isToday && !isCompleted && "border border-neon-green/30 hover:border-neon-green"
                            )}
                          >
                            {isCompleted && <CheckCircle2 size={16} />}
                          </button>
                        </td>
                      );
                    })}
                    <td className="py-4 pl-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-neon-green"
                          />
                        </div>
                        <span className="text-xs font-bold text-neon-green w-8">{progress}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Weekly Chart */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-sm font-bold text-white/60 uppercase tracking-widest">Weekly Performance</h4>
            <div className="flex items-center gap-4 text-xs text-white/40">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-neon-green" />
                <span>Completion %</span>
              </div>
            </div>
          </div>
          <div className="h-48">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Heatmap Section */}
        <div className="mt-8 pt-8 border-t border-white/5">
          <Heatmap completions={allCompletions} />
        </div>
      </div>
    </div>
  );
};
