'use client';

import { useEffect, useState } from 'react';
import { BarChart3, PieChart as PieIcon, TrendingUp, DollarSign, CreditCard } from 'lucide-react';
import { predictionService } from '@/lib/prediction-service';
import { PredictionResult } from '@/types';
import StatCard from '@/components/cards/StatCard';
import RiskDistribution from '@/components/chart/RiskDistribution';
import CreditScoreChart from '@/components/chart/CreditScoreChart';
import LoanAmountChart from '@/components/chart/LoanAmountChart';
import IncomeVsLoanChart from '@/components/chart/IncomeVsLoanChart';
import { formatCurrency } from '@/lib/utils';

export default function InsightsPage() {
  const [history, setHistory] = useState<PredictionResult[]>([]);

  useEffect(() => {
    const data = predictionService.getPredictionHistory();
    setHistory(data);
  }, []);

  const total = history.length;
  const lowRiskCount = history.filter((item) => item.riskLevel === 'low').length;
  const highRiskCount = history.filter((item) => item.riskLevel === 'high').length;
  const avgCreditScore = total > 0 
    ? Math.round(history.reduce((acc, curr) => acc + curr.inputData.creditScore, 0) / total) 
    : 0;
  const avgLoanAmount = total > 0
    ? Math.round(history.reduce((acc, curr) => acc + curr.inputData.loanAmount, 0) / total)
    : 0;

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <BarChart3 className="w-3.5 h-3.5" /> Data Intelligence Dashboard
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Portfolio Risk Analytics & Insights
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          Visual breakdowns of borrower default probability distributions, leverage parameters, and credit score ratings.
        </p>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Evaluations"
          value={total}
          icon={<BarChart3 className="w-4 h-4" />}
          accentColor="blue"
        />

        <StatCard
          title="Low Risk Split"
          value={lowRiskCount}
          subtitle={total > 0 ? `${Math.round((lowRiskCount / total) * 100)}% of total` : '0%'}
          icon={<TrendingUp className="w-4 h-4" />}
          accentColor="safe"
        />

        <StatCard
          title="High Risk Split"
          value={highRiskCount}
          subtitle={total > 0 ? `${Math.round((highRiskCount / total) * 100)}% of total` : '0%'}
          icon={<PieIcon className="w-4 h-4" />}
          accentColor="risk"
        />

        <StatCard
          title="Avg Credit Score"
          value={avgCreditScore}
          icon={<CreditCard className="w-4 h-4" />}
          accentColor="warn"
        />

        <StatCard
          title="Avg Loan Requested"
          value={formatCurrency(avgLoanAmount)}
          icon={<DollarSign className="w-4 h-4" />}
          accentColor="slate"
        />
      </div>

      {/* Visual Analytics 2x2 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Default Risk Distribution */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Default Risk Distribution
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Proportional split between Low and High Risk portfolios</p>
            </div>
          </div>
          <RiskDistribution lowRiskCount={lowRiskCount} highRiskCount={highRiskCount} />
        </div>

        {/* Chart 2: Credit Score vs Risk */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Credit Score Tiers vs Default Risk
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">Risk outcome grouped by FICO score ranges</p>
            </div>
          </div>
          <CreditScoreChart history={history} />
        </div>

        {/* Chart 3: Loan Amount Distribution */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Requested Loan Amount Brackets
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Application volume by requested dollar tier</p>
            </div>
          </div>
          <LoanAmountChart history={history} />
        </div>

        {/* Chart 4: Income vs Loan Scatter */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Income vs Loan Amount Correlation
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Borrower annual income against requested principal size</p>
            </div>
          </div>
          <IncomeVsLoanChart history={history} />
        </div>
      </div>
    </div>
  );
}
