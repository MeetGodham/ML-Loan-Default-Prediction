'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}

export default function EmptyState({
  icon,
  title,
  description,
  ctaText,
  ctaHref,
  onCtaClick,
}: EmptyStateProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto shadow-card">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 mb-4">
        {icon}
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>

      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-md leading-relaxed">
        {description}
      </p>

      {ctaText && ctaHref && (
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-colors"
        >
          {ctaText} <ArrowRight className="w-4 h-4" />
        </Link>
      )}

      {ctaText && !ctaHref && onCtaClick && (
        <button
          onClick={onCtaClick}
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-colors"
        >
          {ctaText} <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
