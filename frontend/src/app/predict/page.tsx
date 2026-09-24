'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { PredictionInput, PredictionResult } from '@/types';
import { predictionService } from '@/lib/prediction-service';
import PredictionForm from '@/components/forms/PredictionForm';
import RiskCard from '@/components/cards/RiskCard';
import ErrorState from '@/components/states/ErrorState';
import { TrendingUp, Sparkles, AlertCircle, RefreshCw, GitBranch, ArrowRight } from 'lucide-react';

export default function PredictPage() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState<{
    checked: boolean;
    online: boolean;
    modelLoaded: boolean;
  }>({ checked: false, online: false, modelLoaded: false });

  const resultRef = useRef<HTMLDivElement>(null);

  const verifyBackend = async () => {
    const health = await predictionService.checkBackendHealth();
    setBackendStatus({ checked: true, online: health.online, modelLoaded: health.modelLoaded });
  };

  useEffect(() => {
    verifyBackend();
  }, []);

  const handlePredict = async (input: PredictionInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await predictionService.predict(input);
      setResult(res);
      // Smoothly scroll down to the inline result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      console.error('Prediction calculation error:', err);
      setError(err.message || 'Failed to analyze loan default risk. Please check your inputs.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewPrediction = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" /> Risk Evaluation Engine
            </div>
            <Link
              href="/model-info"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-medium border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <GitBranch className="w-3 h-3 text-emerald-500" />
              <span>Model: <strong>Decision Tree Classifier</strong></span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Run Loan Default Risk Prediction
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Input borrower credit parameters to calculate default risk score, metrics breakdown, and model evaluation narrative.
          </p>
        </div>

        {/* Backend Connectivity Status Badge */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          {backendStatus.checked ? (
            backendStatus.online ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-medium">FastAPI Engine Connected</span>
              </div>
            ) : (
              <button
                onClick={verifyBackend}
                title="Click to re-check FastAPI backend status"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-700 dark:text-amber-300 hover:bg-amber-100 transition-colors"
              >
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>Backend Offline (Fallback Active)</span>
                <RefreshCw className="w-3 h-3 ml-1 text-amber-600" />
              </button>
            )
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-500">
              <Sparkles className="w-3.5 h-3.5 text-slate-400 animate-spin" />
              <span>Checking Engine...</span>
            </div>
          )}
        </div>
      </div>

      {error && (
        <ErrorState
          title="Prediction Error"
          message={error}
          onRetry={() => setError(null)}
        />
      )}

      {/* Main Workspace Form */}
      <PredictionForm onSubmit={handlePredict} isLoading={isLoading} />

      {/* Inline Prediction Result (rendered below form on the same page) */}
      {result && (
        <section ref={resultRef} className="pt-6 scroll-mt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Prediction Result & Risk Analysis
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Machine learning inference calculated for the submitted application
              </p>
            </div>
            <button
              onClick={() => setResult(null)}
              type="button"
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Clear Result
            </button>
          </div>

          <RiskCard
            result={result}
            onNewPrediction={handleNewPrediction}
          />
        </section>
      )}
    </div>
  );
}
