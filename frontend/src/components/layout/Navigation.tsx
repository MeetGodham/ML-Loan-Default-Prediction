'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, TrendingUp, BarChart3, History, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

export const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/predict', label: 'Predict', icon: TrendingUp },
  { href: '/insights', label: 'Insights', icon: BarChart3 },
  { href: '/history', label: 'History', icon: History },
  { href: '/model-info', label: 'Model Info', icon: Cpu },
];

interface NavigationProps {
  onItemClick?: () => void;
  isMobile?: boolean;
}

export default function Navigation({ onItemClick, isMobile }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex', isMobile ? 'flex-col gap-1' : 'items-center gap-1')}>
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              'flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150',
              isActive
                ? 'bg-slate-200/80 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-semibold border border-slate-300/50 dark:border-slate-700/50'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            )}
          >
            <Icon className={cn('w-4 h-4', isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400')} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
