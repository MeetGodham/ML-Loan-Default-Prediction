import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Loan Default Prediction Dashboard | Enterprise ML Risk Intelligence',
  description: 'Evaluate borrower loan default risk using real-time machine learning algorithms and interactive fintech analytics.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
        <Header />
        
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 py-6 text-xs text-slate-500 dark:text-slate-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800 dark:text-slate-200">LoanRisk AI</span>
              <span>• Enterprise Default Prediction Engine</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span>Decision Tree Classifier (Selected Model)</span>
              <span>•</span>
              <span>StandardScaler + One-Hot Pipeline</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
