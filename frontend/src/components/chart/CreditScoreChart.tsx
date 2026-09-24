'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PredictionResult } from '@/types';

interface CreditScoreChartProps {
  history: PredictionResult[];
}

export default function CreditScoreChart({ history }: CreditScoreChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Aggregate predictions by credit score tier
  const tiers = [
    { tier: '< 580 (Poor)', lowRisk: 0, highRisk: 0 },
    { tier: '580-660 (Fair)', lowRisk: 0, highRisk: 0 },
    { tier: '660-740 (Good)', lowRisk: 0, highRisk: 0 },
    { tier: '740+ (Excellent)', lowRisk: 0, highRisk: 0 },
  ];

  history.forEach((item) => {
    const score = item.inputData.creditScore;
    let idx = 0;
    if (score >= 740) idx = 3;
    else if (score >= 660) idx = 2;
    else if (score >= 580) idx = 1;

    if (item.riskLevel === 'low') tiers[idx].lowRisk += 1;
    else tiers[idx].highRisk += 1;
  });

  if (!mounted) {
    return <div className="h-64 flex items-center justify-center text-xs text-slate-400">Loading chart...</div>;
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={tiers} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
          <XAxis dataKey="tier" tick={{ fontSize: 11, fill: '#94a3b8' }} />
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
          <Bar dataKey="lowRisk" name="Low Risk" fill="#10B981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="highRisk" name="High Risk" fill="#EF4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
