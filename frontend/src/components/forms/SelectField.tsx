'use client';

import { SelectHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: (string | SelectOption)[];
  error?: string;
  helpText?: string;
}

export default function SelectField({
  id,
  label,
  options,
  error,
  helpText,
  className,
  ...props
}: SelectFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
        {label}
      </label>

      <select
        id={id}
        className={cn(
          'block w-full rounded-lg text-sm bg-white dark:bg-slate-900 border text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 transition-colors py-2.5 px-3.5',
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            : 'border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20 dark:focus:border-emerald-500',
          className
        )}
        {...props}
      >
        {options.map((opt) => {
          const val = typeof opt === 'string' ? opt : opt.value;
          const lbl = typeof opt === 'string' ? opt : opt.label;
          return (
            <option key={val} value={val} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
              {lbl}
            </option>
          );
        })}
      </select>

      {helpText && !error && (
        <p className="text-xs text-slate-500 dark:text-slate-400">{helpText}</p>
      )}

      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500 font-medium">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
