'use client';

import { PredictionResult } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import RiskMeter from '../risk/RiskMeter';
import RiskBadge from '../risk/RiskBadge';
import { CreditCard, DollarSign, Calendar, FileText, CheckCircle2, RefreshCw } from 'lucide-react';

interface RiskCardProps {
  result: PredictionResult;
  onNewPrediction?: () => void;
  onSave?: () => void;
}

export default function RiskCard({ result, onNewPrediction, onSave }: RiskCardProps) {
  const { riskLevel, riskScore, inputData, assessmentText, metrics, timestamp } = result;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-elevated p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
      {/* Header section with Badge & Date */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              Evaluation Complete
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              Model Used: Decision Tree Classifier
            </span>
          </div>
          <RiskBadge riskLevel={riskLevel} size="lg" />
        </div>
        <div className="text-left sm:text-right">
          <span className="text-xs text-slate-400 block font-medium">Evaluated At</span>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{formatDate(timestamp)}</span>
        </div>
      </div>

      {/* Main visualization grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
          <RiskMeter score={riskScore} size={220} />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-500" /> Model Risk Assessment
              </h4>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hidden sm:inline">
                Model Used: Decision Tree Classifier
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal bg-slate-50/80 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
              {assessmentText}
            </p>
          </div>

          {/* Key Metrics Breakdown Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Credit Rating</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 block">{metrics.creditScoreRating}</span>
              <span className="text-[10px] text-slate-500">Score: {inputData.creditScore}</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">DTI Status</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 block">{metrics.dtiStatus}</span>
              <span className="text-[10px] text-slate-500">Ratio: {inputData.dtiRatio.toFixed(2)}</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Income Coverage</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 block">{metrics.incomeToLoanRatio}x</span>
              <span className="text-[10px] text-slate-500">Income/Loan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Loan & Borrower Details Grid */}
      <div className="p-5 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200/70 dark:border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
          Evaluated Application Summary
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block font-medium">Loan Requested</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm mt-0.5 block">
              {formatCurrency(inputData.loanAmount)} {inputData.loanPurpose ? `• ${inputData.loanPurpose}` : ''}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block font-medium">Annual Income</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm mt-0.5 block">{formatCurrency(inputData.income)}</span>
          </div>

          <div>
            <span className="text-slate-400 block font-medium">Interest Rate & Term</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm mt-0.5 block">{inputData.interestRate}% ({inputData.loanTerm} mos)</span>
          </div>

          <div>
            <span className="text-slate-400 block font-medium">Employment Tenure</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm mt-0.5 block">{inputData.monthsEmployed} Months ({inputData.employmentType})</span>
          </div>
        </div>
      </div>

      {/* Action Footer Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <span className="text-xs text-slate-400 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Result saved to local session history
        </span>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {onSave && (
            <button
              onClick={onSave}
              type="button"
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Save Record
            </button>
          )}

          {onNewPrediction && (
            <button
              onClick={onNewPrediction}
              type="button"
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Run New Prediction
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
