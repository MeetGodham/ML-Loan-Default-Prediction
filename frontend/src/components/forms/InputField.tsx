'use client';

import { InputHTMLAttributes, ReactNode } from 'react';
import { HelpCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  helpText?: string;
  icon?: ReactNode;
  suffix?: string;
}

export default function InputField({
  id,
  label,
  error,
  helpText,
  icon,
  suffix,
  className,
  ...props
}: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {label}
        </label>
        {helpText && (
          <span className="group relative cursor-help text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="pointer-events-none absolute bottom-full right-0 mb-1 hidden w-48 rounded-md bg-slate-900 dark:bg-slate-800 p-2 text-[11px] font-normal text-slate-200 shadow-xl group-hover:block z-20 border border-slate-700">
              {helpText}
            </span>
          </span>
        )}
      </div>

      <div className="relative rounded-lg shadow-sm">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            {icon}
          </div>
        )}

        <input
          id={id}
          className={cn(
            'block w-full rounded-lg text-sm bg-white dark:bg-slate-900 border text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors py-2.5',
            icon ? 'pl-9' : 'pl-3.5',
            suffix ? 'pr-12' : 'pr-3.5',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20 dark:focus:border-emerald-500',
            className
          )}
          {...props}
        />

        {suffix && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-xs font-medium text-slate-400">
            {suffix}
          </div>
        )}
      </div>

      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500 font-medium animate-in fade-in duration-150">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
