'use client';

import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PredictionResult } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface LoanAmountChartProps {
  history: PredictionResult[];
}

export default function LoanAmountChart({ history }: LoanAmountChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const brackets = [
    { bracket: '< $20k', count: 0 },
    { bracket: '$20k-$40k', count: 0 },
    { bracket: '$40k-$60k', count: 0 },
    { bracket: '> $60k', count: 0 },
  ];

  history.forEach((item) => {
    const amt = item.inputData.loanAmount;
    if (amt < 20000) brackets[0].count += 1;
    else if (amt <= 40000) brackets[1].count += 1;
    else if (amt <= 60000) brackets[2].count += 1;
    else brackets[3].count += 1;
  });

  if (!mounted) {
    return <div className="h-64 flex items-center justify-center text-xs text-slate-400">Loading chart...</div>;
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={brackets} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
          <XAxis dataKey="bracket" tick={{ fontSize: 11, fill: '#94a3b8' }} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '12px',
            }}
          />
          <Area type="monotone" dataKey="count" name="Evaluations" stroke="#0EA5E9" fillOpacity={1} fill="url(#colorAmt)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
