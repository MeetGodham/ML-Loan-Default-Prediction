'use client';

import { useEffect, useState } from 'react';
import { History as HistoryIcon, Search, Filter, Trash2, Eye, ArrowUpDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { predictionService } from '@/lib/prediction-service';
import { PredictionResult } from '@/types';
import RiskBadge from '@/components/risk/RiskBadge';
import RiskCard from '@/components/cards/RiskCard';
import EmptyState from '@/components/states/EmptyState';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function HistoryPage() {
  const [history, setHistory] = useState<PredictionResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | 'low' | 'high'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [selectedRecord, setSelectedRecord] = useState<PredictionResult | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const data = predictionService.getPredictionHistory();
    setHistory(data);
  }, []);

  const handleDelete = (id: string) => {
    const updated = predictionService.deletePrediction(id);
    setHistory(updated);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all prediction history?')) {
      predictionService.clearHistory();
      setHistory([]);
    }
  };

  // Filter & Sort logic
  const filteredHistory = history
    .filter((item) => {
      if (riskFilter !== 'all' && item.riskLevel !== riskFilter) return false;
      if (!searchTerm) return true;

      const query = searchTerm.toLowerCase();
      const scoreStr = item.inputData.creditScore.toString();
      const amountStr = item.inputData.loanAmount.toString();
      const incomeStr = item.inputData.income.toString();
      const edStr = item.inputData.education.toLowerCase();

      return (
        scoreStr.includes(query) ||
        amountStr.includes(query) ||
        incomeStr.includes(query) ||
        edStr.includes(query)
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  // Pagination
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage) || 1;
  const paginatedItems = filteredHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <HistoryIcon className="w-3.5 h-3.5" /> Audit Log & History
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Prediction History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review past loan default evaluations, filter by score or risk category, and inspect detailed parameters.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={handleClearAll}
            type="button"
            className="px-4 py-2 rounded-lg text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900/40 transition-colors flex items-center gap-1.5 self-start sm:self-center"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear All Records
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <EmptyState
          icon={<HistoryIcon className="w-8 h-8 text-slate-400" />}
          title="No Predictions Found"
          description="You haven't run any risk evaluations yet. Submit a new application form to store evaluation history here."
          ctaText="Run New Prediction"
          ctaHref="/predict"
        />
      ) : (
        <div className="space-y-6">
          {/* Controls Bar: Search, Filter, Sort */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search score, amount, income..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-3.5 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>

            {/* Filter & Sort Controls */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={riskFilter}
                  onChange={(e: any) => {
                    setRiskFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="py-1.5 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="low">Low Risk Only</option>
                  <option value="high">High Risk Only</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortOrder}
                  onChange={(e: any) => setSortOrder(e.target.value)}
                  className="py-1.5 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Table Format */}
          <div className="hidden md:block bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-card overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-semibold bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">Borrower Profile</th>
                  <th className="py-3.5 px-4">Credit Score</th>
                  <th className="py-3.5 px-4">Requested Loan</th>
                  <th className="py-3.5 px-4">DTI Ratio</th>
                  <th className="py-3.5 px-4">Risk Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {paginatedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 text-slate-500">{formatDate(item.timestamp)}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        {item.inputData.age} yrs • {item.inputData.education}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {formatCurrency(item.inputData.income)}/yr ({item.inputData.employmentType})
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">{item.inputData.creditScore}</span>
                      <span className="text-[10px] text-slate-400 block">{item.metrics?.creditScoreRating || 'Rating'}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-800 dark:text-slate-200">
                      <span className="font-bold">{formatCurrency(item.inputData.loanAmount)}</span>
                      <span className="text-[10px] text-slate-400 block">{item.inputData.loanTerm} mos @ {item.inputData.interestRate}%</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                      {item.inputData.dtiRatio.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4">
                      <RiskBadge riskLevel={item.riskLevel} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedRecord(item)}
                        type="button"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="View Full Evaluation"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        type="button"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Grid Format */}
          <div className="md:hidden space-y-4">
            {paginatedItems.map((item) => (
              <div key={item.id} className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-card space-y-3">
                <div className="flex items-center justify-between">
                  <RiskBadge riskLevel={item.riskLevel} size="sm" />
                  <span className="text-[11px] text-slate-400">{formatDate(item.timestamp)}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block">Credit Score</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{item.inputData.creditScore}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Requested Loan</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{formatCurrency(item.inputData.loanAmount)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Borrower Income</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{formatCurrency(item.inputData.income)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">DTI Ratio</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{item.inputData.dtiRatio.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setSelectedRecord(item)}
                    type="button"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Details
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    type="button"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 text-xs">
              <span className="text-slate-500">
                Page <span className="font-semibold text-slate-900 dark:text-white">{currentPage}</span> of {totalPages} ({filteredHistory.length} items)
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Detail Inspection Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-slate-900/70 backdrop-blur-md">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
            <button
              onClick={() => setSelectedRecord(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <RiskCard
              result={selectedRecord}
              onNewPrediction={() => setSelectedRecord(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
