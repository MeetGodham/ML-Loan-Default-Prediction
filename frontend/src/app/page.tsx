'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp, ShieldCheck, ShieldAlert, CreditCard, BarChart3, Clock, Cpu } from 'lucide-react';
import { predictionService } from '@/lib/prediction-service';
import { PredictionResult } from '@/types';
import StatCard from '@/components/cards/StatCard';
import RiskBadge from '@/components/risk/RiskBadge';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function DashboardPage() {
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

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-950 p-8 sm:p-12 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/60 dark:shadow-2xl text-slate-900 dark:text-white">
        {/* Elegant Abstract Financial Grid SVG Background */}
        <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="heroGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-emerald-500/20 dark:text-emerald-500/40" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroGrid)" />
            <path d="M0,200 Q200,80 400,180 T800,100 T1200,220" fill="none" stroke="#10B981" strokeWidth="2" className="opacity-25 dark:opacity-40" />
            <path d="M0,240 Q250,140 500,220 T900,130 T1200,280" fill="none" stroke="#0EA5E9" strokeWidth="1.5" className="opacity-20 dark:opacity-30" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" /> Enterprise Fintech ML Engine
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Loan Default Risk <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">Prediction</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Evaluate borrower risk using machine learning and make data-driven lending decisions with complete accuracy and transparent metrics.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/predict"
              className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-600/25 transition-all duration-150 flex items-center gap-2 group"
            >
              <TrendingUp className="w-4 h-4" /> Run New Prediction
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/insights"
              className="px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm transition-colors flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4 text-sky-600 dark:text-sky-400" /> View Analytics Insights
            </Link>
          </div>
        </div>
      </section>

      {/* Summary KPI Cards Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            Overview Summary Statistics
          </h2>
          <span className="text-xs font-medium text-slate-500">Live Session History</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Predictions"
            value={total}
            subtitle="Evaluated loan applications"
            icon={<Clock className="w-5 h-5" />}
            accentColor="blue"
          />

          <StatCard
            title="Low Risk Applications"
            value={lowRiskCount}
            subtitle={total > 0 ? `${Math.round((lowRiskCount / total) * 100)}% of total evaluated` : '0%'}
            icon={<ShieldCheck className="w-5 h-5" />}
            accentColor="safe"
          />

          <StatCard
            title="High Risk Applications"
            value={highRiskCount}
            subtitle={total > 0 ? `${Math.round((highRiskCount / total) * 100)}% default risk alert` : '0%'}
            icon={<ShieldAlert className="w-5 h-5" />}
            accentColor="risk"
          />

          <StatCard
            title="Avg Credit Score"
            value={avgCreditScore}
            subtitle="FICO score average"
            icon={<CreditCard className="w-5 h-5" />}
            accentColor="warn"
          />
        </div>
      </section>

      {/* Quick Action Navigation & Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-card hover:border-emerald-500/50 transition-colors group">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Risk Analysis Workspace
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
            Input borrower income, credit score, loan amount, and DTI ratio to run instant ML inference.
          </p>
          <Link
            href="/predict"
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 group-hover:gap-2 transition-all"
          >
            Launch Prediction Workspace <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-card hover:border-sky-500/50 transition-colors group">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Analytics & Insights
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
            Visualize default risk distributions, credit score correlations, and leverage histograms with Recharts.
          </p>
          <Link
            href="/insights"
            className="text-xs font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1.5 group-hover:gap-2 transition-all"
          >
            Explore Charts & Visualizations <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-card hover:border-teal-500/50 transition-colors group">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Model Specifications
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
            Inspect Decision Tree Classifier specifications, 80.28% accuracy, model comparison benchmarks, and dataset details.
          </p>
          <Link
            href="/model-info"
            className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1.5 group-hover:gap-2 transition-all"
          >
            Review Model Architecture <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Recent Evaluations Preview Table */}
      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recent Application Evaluations
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Latest borrowing risk assessments run in the dashboard</p>
          </div>
          <Link
            href="/history"
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            View Full History ({total}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Credit Score</th>
                <th className="py-3 px-4">Loan Amount</th>
                <th className="py-3 px-4">Income</th>
                <th className="py-3 px-4">DTI Ratio</th>
                <th className="py-3 px-4">Risk Assessment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {history.slice(0, 5).map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 text-slate-500">{formatDate(item.timestamp)}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{item.inputData.creditScore}</td>
                  <td className="py-3.5 px-4 text-slate-800 dark:text-slate-200">{formatCurrency(item.inputData.loanAmount)}</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">{formatCurrency(item.inputData.income)}</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">{item.inputData.dtiRatio.toFixed(2)}</td>
                  <td className="py-3.5 px-4">
                    <RiskBadge riskLevel={item.riskLevel} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
