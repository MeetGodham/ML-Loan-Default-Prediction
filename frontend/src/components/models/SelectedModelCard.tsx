'use client';

import { GitBranch, CheckCircle2, ShieldCheck, Cpu, Target, Layers } from 'lucide-react';
import { SELECTED_MODEL_INFO } from '@/lib/constants';

export default function SelectedModelCard() {
  const { modelName, algorithmType, problemType, target, explanation } = SELECTED_MODEL_INFO;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-950 border border-slate-200/80 dark:border-emerald-500/30 p-6 sm:p-8 shadow-xl shadow-slate-200/60 dark:shadow-2xl text-slate-900 dark:text-white">
      {/* Subtle background SVG grid */}
      <div className="absolute inset-0 pointer-events-none opacity-25 dark:opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="modelCardGrid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-emerald-500/30 dark:text-emerald-400" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#modelCardGrid)" />
        </svg>
      </div>

      <div className="relative z-10 space-y-6">
        {/* Header with Title and Selected Model Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
              <GitBranch className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Current Production Model
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              {modelName}
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-sm self-start sm:self-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Selected Model
          </div>
        </div>

        {/* Structured Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 bg-white/80 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm dark:shadow-none flex flex-col justify-center">
            <span className="text-slate-500 dark:text-slate-400 font-medium text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Model Name
            </span>
            <span className="font-bold text-slate-900 dark:text-white text-sm mt-1">{modelName}</span>
          </div>

          <div className="p-3.5 bg-white/80 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm dark:shadow-none flex flex-col justify-center">
            <span className="text-slate-500 dark:text-slate-400 font-medium text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Algorithm Type
            </span>
            <span className="font-bold text-slate-900 dark:text-white text-sm mt-1">{algorithmType}</span>
          </div>

          <div className="p-3.5 bg-white/80 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm dark:shadow-none flex flex-col justify-center">
            <span className="text-slate-500 dark:text-slate-400 font-medium text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" /> Problem Type
            </span>
            <span className="font-bold text-slate-900 dark:text-white text-sm mt-1">{problemType}</span>
          </div>

          <div className="p-3.5 bg-white/80 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm dark:shadow-none flex flex-col justify-center">
            <span className="text-slate-500 dark:text-slate-400 font-medium text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Target Variable
            </span>
            <span className="font-bold text-slate-900 dark:text-white text-sm mt-1">{target}</span>
          </div>
        </div>

        {/* Short Explanation Box */}
        <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/50 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed shadow-sm dark:shadow-none">
          <p className="flex items-start gap-2">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
            <span>{explanation}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
