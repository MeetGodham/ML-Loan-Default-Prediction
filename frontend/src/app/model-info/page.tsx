'use client';

import { Cpu, Database, Layers, ShieldCheck, Ban, CheckCircle2, Activity, Server, GitBranch } from 'lucide-react';
import { MODEL_METADATA } from '@/lib/constants';
import SelectedModelCard from '@/components/models/SelectedModelCard';
import ModelMetricCards from '@/components/models/ModelMetricCards';
import ModelComparisonTable from '@/components/models/ModelComparisonTable';
import ModelComparisonChart from '@/components/models/ModelComparisonChart';

export default function ModelInfoPage() {
  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* Header section */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Cpu className="w-3.5 h-3.5" /> Model Architecture & Specification
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Machine Learning Model Specifications
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          Technical overview of the statistical modeling methodology, training parameters, performance comparison benchmarks, and feature splitting criteria.
        </p>
      </div>

      {/* 1. Prominent Selected Model Card */}
      <SelectedModelCard />

      {/* 2. Four Metric Cards */}
      <ModelMetricCards />

      {/* 3. Model Performance Comparison Table */}
      <ModelComparisonTable />

      {/* 4. Model Comparison Chart */}
      <ModelComparisonChart />

      {/* 5. Primary Technical Architecture Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Core Algorithm */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Algorithm & Classifier</h3>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{MODEL_METADATA.model}</span>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {MODEL_METADATA.explanation} Selected for this project to provide transparent decision rules, clear credit threshold cutoffs, and deterministic rule paths for lending compliance.
          </p>
        </div>

        {/* Card 2: Preprocessing Pipeline */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Preprocessing Pipeline</h3>
              <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">{MODEL_METADATA.preprocessing}</span>
            </div>
          </div>
          <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc list-inside">
            {MODEL_METADATA.preprocessingSteps.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Card 3: Dataset Split */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Dataset Split & Size</h3>
              <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">{MODEL_METADATA.totalDatasetSize}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <span className="text-slate-400 block text-[11px]">Training Set (80%)</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm mt-0.5 block">{MODEL_METADATA.trainSplit}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <span className="text-slate-400 block text-[11px]">Testing Set (20%)</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm mt-0.5 block">{MODEL_METADATA.testSplit}</span>
            </div>
          </div>
        </div>

        {/* Card 4: Target & Exclusions */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Ban className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Target & Feature Exclusions</h3>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">Strict Compliance</span>
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Target Variable:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{MODEL_METADATA.targetVariable}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Excluded Non-Predictive Identifier:</span>
              <span className="font-semibold text-red-500">{MODEL_METADATA.excludedFeatures.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Feature Importance Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Key Predictive Splitting Features
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Relative tree feature importance and decision threshold influence</p>
          </div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            Validated Weights
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Feature Name</th>
                <th className="py-3 px-4">Importance Weight</th>
                <th className="py-3 px-4">Decision Tree Split Vector</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {MODEL_METADATA.featureImportance.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">{item.feature}</td>
                  <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                    {(item.weight * 100).toFixed(0)}%
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                    {item.direction}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
