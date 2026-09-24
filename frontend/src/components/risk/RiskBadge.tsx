'use client';

import { ShieldCheck, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RiskBadgeProps {
  riskLevel: 'low' | 'high';
  size?: 'sm' | 'md' | 'lg';
}

export default function RiskBadge({ riskLevel, size = 'md' }: RiskBadgeProps) {
  const isLow = riskLevel === 'low';

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3.5 py-1.5 text-sm gap-2',
    lg: 'px-4 py-2 text-base gap-2.5',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center font-bold rounded-full border shadow-sm tracking-wide uppercase',
        sizeClasses[size],
        isLow
          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
          : 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30'
      )}
    >
      {isLow ? (
        <ShieldCheck className={cn('shrink-0', iconSizes[size])} />
      ) : (
        <ShieldAlert className={cn('shrink-0 animate-pulse', iconSizes[size])} />
      )}
      <span>{isLow ? 'Low Default Risk' : 'High Default Risk'}</span>
    </div>
  );
}
