'use client';

import { CheckCircle2, GitBranch, TableProperties } from 'lucide-react';
import { MODEL_COMPARISON_DATA } from '@/lib/constants';
import { ModelComparisonItem } from '@/types';

interface ModelComparisonTableProps {
  data?: ModelComparisonItem[];
}

export default function ModelComparisonTable({ data = MODEL_COMPARISON_DATA }: ModelComparisonTableProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-card p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <TableProperties className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Model Performance Comparison
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Comparative evaluation across tested classifiers on the holdout test dataset (20% split, 51,069 samples)
          </p>
        </div>

        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 self-start sm:self-center bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
          Standardized Evaluation Metrics
        </span>
      </div>

      {/* Responsive table container with horizontal scroll */}
      <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0">
        <table className="w-full min-w-[620px] text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
              <th className="py-3 px-4">Model</th>
              <th className="py-3 px-4 text-right">Accuracy</th>
              <th className="py-3 px-4 text-right">Precision</th>
              <th className="py-3 px-4 text-right">Recall</th>
              <th className="py-3 px-4 text-right">F1 Score</th>
              <th className="py-3 px-4 text-center">Selected</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
            {data.map((model) => {
              const isSelected = model.selected;
              return (
                <tr
                  key={model.name}
                  className={`transition-colors ${
                    isSelected
                      ? 'bg-emerald-500/10 dark:bg-emerald-500/15 border-l-4 border-l-emerald-500'
                      : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      {isSelected && <GitBranch className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />}
                      <span>{model.name}</span>
                      {isSelected && (
                        <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                          Current
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-800 dark:text-slate-200">
                    {model.accuracy.toFixed(2)}%
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-800 dark:text-slate-200">
                    {model.precision.toFixed(2)}%
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-800 dark:text-slate-200">
                    {model.recall.toFixed(2)}%
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-800 dark:text-slate-200">
                    {model.f1.toFixed(2)}%
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {isSelected ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500 text-white shadow-sm shadow-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" />
                        Selected
                      </span>
                    ) : (
                      <span className="text-slate-400 font-mono text-xs">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/80">
        <span>Decision Tree Classifier is highlighted and configured as the selected model for this project.</span>
        <span>Metrics rounded to 2 decimal places</span>
      </div>
    </div>
  );
}
