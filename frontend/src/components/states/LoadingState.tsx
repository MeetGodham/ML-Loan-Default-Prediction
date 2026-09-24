'use client';

export default function LoadingState() {
  return (
    <div className="w-full space-y-6 animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-xl bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>
      <div className="h-96 rounded-xl bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}
