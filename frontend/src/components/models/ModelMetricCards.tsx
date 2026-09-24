'use client';

import { Activity, Crosshair, RefreshCcw, Award } from 'lucide-react';
import { SELECTED_MODEL_INFO } from '@/lib/constants';

export default function ModelMetricCards() {
  const { metrics } = SELECTED_MODEL_INFO;

  const cards = [
    {
      title: 'Accuracy',
      value: metrics.accuracy,
      description: 'Overall classification correctness',
      icon: Activity,
      accentColor: 'emerald',
      bgColor: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      borderColor: 'border-emerald-200 dark:border-emerald-800/60',
    },
    {
      title: 'Precision',
      value: metrics.precision,
      description: 'Positive default prediction fidelity',
      icon: Crosshair,
      accentColor: 'teal',
      bgColor: 'bg-teal-500/10 dark:bg-teal-500/15',
      textColor: 'text-teal-600 dark:text-teal-400',
      borderColor: 'border-teal-200 dark:border-teal-800/60',
    },
    {
      title: 'Recall',
      value: metrics.recall,
      description: 'True default detection coverage',
      icon: RefreshCcw,
      accentColor: 'sky',
      bgColor: 'bg-sky-500/10 dark:bg-sky-500/15',
      textColor: 'text-sky-600 dark:text-sky-400',
      borderColor: 'border-sky-200 dark:border-sky-800/60',
    },
    {
      title: 'F1 Score',
      value: metrics.f1Score,
      description: 'Harmonic mean of precision & recall',
      icon: Award,
      accentColor: 'indigo',
      bgColor: 'bg-indigo-500/10 dark:bg-indigo-500/15',
      textColor: 'text-indigo-600 dark:text-indigo-400',
      borderColor: 'border-indigo-200 dark:border-indigo-800/60',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-card transition-all duration-150 hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.bgColor} ${card.textColor}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${card.textColor} mb-1`}>
              {card.value}
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
