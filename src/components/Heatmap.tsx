import React from 'react';
import { motion } from 'motion/react';
import { format, subDays, startOfDay, isSameDay } from 'date-fns';
import { cn } from '../lib/utils';

interface HeatmapProps {
  completions: string[];
}

export const Heatmap = ({ completions }: HeatmapProps) => {
  const today = startOfDay(new Date());
  // Last 12 weeks (84 days)
  const days = Array.from({ length: 84 }, (_, i) => subDays(today, 83 - i));

  const getIntensity = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return completions.includes(dateStr) ? 1 : 0;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest">Consistency Heatmap</h4>
        <div className="flex items-center gap-2 text-[10px] text-white/20">
          <span>Less</span>
          <div className="w-3 h-3 bg-white/5 rounded-sm" />
          <div className="w-3 h-3 bg-neon-green/40 rounded-sm" />
          <div className="w-3 h-3 bg-neon-green/70 rounded-sm" />
          <div className="w-3 h-3 bg-neon-green rounded-sm" />
          <span>More</span>
        </div>
      </div>
      
      <div className="flex gap-1.5 flex-wrap">
        {days.map((day, i) => {
          const intensity = getIntensity(day);
          const isToday = isSameDay(day, today);
          
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.005 }}
              className={cn(
                "w-3 h-3 rounded-sm transition-all duration-300",
                intensity === 0 ? "bg-white/5" : "bg-neon-green shadow-[0_0_5px_rgba(34,197,94,0.2)]",
                isToday && "ring-1 ring-white/40 ring-offset-1 ring-offset-dark-bg"
              )}
              title={`${format(day, 'MMM d, yyyy')}: ${intensity ? 'Completed' : 'No activity'}`}
            />
          );
        })}
      </div>
    </div>
  );
};
