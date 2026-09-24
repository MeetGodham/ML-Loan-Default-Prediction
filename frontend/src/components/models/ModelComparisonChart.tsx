'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { BarChart3 } from 'lucide-react';
import { MODEL_COMPARISON_DATA } from '@/lib/constants';
import { ModelComparisonItem } from '@/types';

interface ModelComparisonChartProps {
  data?: ModelComparisonItem[];
}

export default function ModelComparisonChart({ data = MODEL_COMPARISON_DATA }: ModelComparisonChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Map to chart-friendly format with shortName for readable X-axis
  const chartData = data.map((item) => ({
    model: item.shortName || item.name,
    fullName: item.name,
    Accuracy: item.accuracy,
    Precision: item.precision,
    Recall: item.recall,
    'F1 Score': item.f1,
    selected: item.selected,
  }));

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-card p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <BarChart3 className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Model Performance Comparison Chart
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Grouped bar visualization comparing Accuracy, Precision, Recall, and F1 Score (%) across all tested models
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>Decision Tree is the selected model</span>
        </div>
      </div>

      {!mounted ? (
        <div className="h-80 flex items-center justify-center text-xs text-slate-400">
          Loading performance chart...
        </div>
      ) : (
        <div className="w-full h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 15, left: -10, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
              <XAxis
                dataKey="model"
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                tickLine={false}
                dy={8}
              />
              <YAxis
                unit="%"
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: number) => [`${value.toFixed(2)}%`]}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '10px',
                  color: '#ffffff',
                  fontSize: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                }}
                labelStyle={{ fontWeight: 'bold', color: '#38bdf8', marginBottom: '4px' }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }}
              />
              <Bar dataKey="Accuracy" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="Precision" fill="#14B8A6" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="Recall" fill="#0EA5E9" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="F1 Score" fill="#6366F1" radius={[4, 4, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
