'use client';

import { X, ShieldAlert } from 'lucide-react';
import Navigation from './Navigation';
import ThemeToggle from './ThemeToggle';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose} 
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-200">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-bold">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white text-base block leading-tight">LoanRisk AI</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">Enterprise Risk</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="pt-2">
            <Navigation isMobile onItemClick={onClose} />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
