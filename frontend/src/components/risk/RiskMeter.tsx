'use client';

import { cn } from '@/lib/utils';

interface RiskMeterProps {
  score: number; // 0-100
  size?: number;
}

export default function RiskMeter({ score, size = 200 }: RiskMeterProps) {
  // Clamp score between 0 and 100
  const normalizedScore = Math.min(Math.max(score, 0), 100);
  
  // Gauge arc parameters (semi-circle / 220 degree arc)
  const radius = 80;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  // Arc spans 240 degrees out of 360 (2/3 of circle)
  const arcLength = circumference * (240 / 360);
  const strokeDashoffset = arcLength - (arcLength * normalizedScore) / 100;

  // Determine dynamic status color gradient
  const getColor = (s: number) => {
    if (s <= 35) return { stroke: '#10B981', text: 'text-emerald-500', bg: 'bg-emerald-500/10' };
    if (s <= 60) return { stroke: '#F59E0B', text: 'text-amber-500', bg: 'bg-amber-500/10' };
    return { stroke: '#EF4444', text: 'text-red-500', bg: 'bg-red-500/10' };
  };

  const themeColor = getColor(normalizedScore);

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="w-full h-full transform -rotate-210"
          viewBox="0 0 200 200"
        >
          <defs>
            <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
          </defs>

          {/* Background Arc Track */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
            className="text-slate-200 dark:text-slate-800"
          />

          {/* Animated Value Arc */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="url(#riskGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Readout Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-2">
          <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
            Default Score
          </span>
          <div className="flex items-baseline gap-0.5">
            <span className={cn('text-4xl font-extrabold tracking-tight', themeColor.text)}>
              {Math.round(normalizedScore)}
            </span>
            <span className="text-sm font-semibold text-slate-400">%</span>
          </div>
          <span className={cn('mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider', themeColor.bg, themeColor.text)}>
            {normalizedScore >= 50 ? 'High Risk' : 'Low Risk'}
          </span>
        </div>
      </div>
    </div>
  );
}
