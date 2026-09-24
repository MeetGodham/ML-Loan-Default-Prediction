'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = 'Evaluation Failed',
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl p-6 flex flex-col sm:flex-row items-start gap-4">
      <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 shrink-0">
        <AlertTriangle className="w-6 h-6" />
      </div>

      <div className="space-y-1 flex-1">
        <h4 className="text-sm font-bold text-red-900 dark:text-red-200">{title}</h4>
        <p className="text-xs text-red-700 dark:text-red-300 leading-relaxed">{message}</p>

        {onRetry && (
          <button
            onClick={onRetry}
            type="button"
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-600 text-white hover:bg-red-500 transition-colors shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retry Request
          </button>
        )}
      </div>
    </div>
  );
}
