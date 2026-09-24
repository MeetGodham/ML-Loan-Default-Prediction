'use client';

import { useEffect, useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';
import { PredictionResult } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface IncomeVsLoanChartProps {
  history: PredictionResult[];
}

export default function IncomeVsLoanChart({ history }: IncomeVsLoanChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const lowRiskPoints = history
    .filter((h) => h.riskLevel === 'low')
    .map((h) => ({
      income: h.inputData.income,
      loan: h.inputData.loanAmount,
      score: h.inputData.creditScore,
    }));

  const highRiskPoints = history
    .filter((h) => h.riskLevel === 'high')
    .map((h) => ({
      income: h.inputData.income,
      loan: h.inputData.loanAmount,
      score: h.inputData.creditScore,
    }));

  if (!mounted) {
    return <div className="h-64 flex items-center justify-center text-xs text-slate-400">Loading chart...</div>;
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
          <XAxis
            type="number"
            dataKey="income"
            name="Income"
            unit="$"
            tickFormatter={(v) => `$${v / 1000}k`}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
          />
          <YAxis
            type="number"
            dataKey="loan"
            name="Loan Amount"
            unit="$"
            tickFormatter={(v) => `$${v / 1000}k`}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
          />
          <ZAxis dataKey="score" range={[60, 200]} name="Credit Score" />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '12px',
            }}
            formatter={(value: any, name: string) => [
              typeof value === 'number' ? formatCurrency(value) : value,
              name,
            ]}
          />
          <Scatter name="Low Risk" data={lowRiskPoints} fill="#10B981" />
          <Scatter name="High Risk" data={highRiskPoints} fill="#EF4444" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
