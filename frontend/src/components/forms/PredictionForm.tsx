'use client';

import { useState, FormEvent } from 'react';
import { User, DollarSign, CreditCard, ShieldCheck, RefreshCw, ArrowRight, Loader2 } from 'lucide-react';
import { PredictionInput, FormErrors } from '@/types';
import { DEFAULT_PREDICTION_INPUT, EDUCATION_OPTIONS, EMPLOYMENT_OPTIONS, MARITAL_OPTIONS, LOAN_PURPOSE_OPTIONS, FIELD_RANGES } from '@/lib/constants';
import { validatePredictionInput } from '@/lib/utils';
import InputField from './InputField';
import SelectField from './SelectField';
import ToggleField from './ToggleField';

interface PredictionFormProps {
  onSubmit: (data: PredictionInput) => Promise<void>;
  isLoading: boolean;
}

export default function PredictionForm({ onSubmit, isLoading }: PredictionFormProps) {
  const [formData, setFormData] = useState<PredictionInput>(DEFAULT_PREDICTION_INPUT);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (field: keyof PredictionInput, value: any) => {
    const nextData = { ...formData, [field]: value };
    setFormData(nextData);

    // Live validation clearance
    if (errors[field]) {
      const nextErrors = { ...errors };
      delete nextErrors[field];
      setErrors(nextErrors);
    }
  };

  const handleBlur = (field: keyof PredictionInput) => {
    const currentErrors = validatePredictionInput(formData);
    if (currentErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: currentErrors[field] }));
    }
  };

  const handleReset = () => {
    setFormData(DEFAULT_PREDICTION_INPUT);
    setErrors({});
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validatePredictionInput(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section 1: Borrower Profile */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-card">
        <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">Section 1: Borrower Profile</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Demographic details and income background</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <InputField
            id="age"
            label="Age"
            type="number"
            value={formData.age}
            onChange={(e) => handleChange('age', parseInt(e.target.value) || 0)}
            onBlur={() => handleBlur('age')}
            error={errors.age}
            helpText={FIELD_RANGES.age.help}
            placeholder="e.g., 35"
            suffix="Years"
          />

          <InputField
            id="income"
            label="Annual Income"
            type="number"
            value={formData.income}
            onChange={(e) => handleChange('income', parseFloat(e.target.value) || 0)}
            onBlur={() => handleBlur('income')}
            error={errors.income}
            helpText={FIELD_RANGES.income.help}
            placeholder="e.g., 75000"
            icon={<DollarSign className="w-4 h-4" />}
          />

          <SelectField
            id="education"
            label="Education Level"
            value={formData.education}
            onChange={(e) => handleChange('education', e.target.value)}
            options={EDUCATION_OPTIONS}
            helpText="Highest completed qualification"
          />

          <SelectField
            id="employmentType"
            label="Employment Type"
            value={formData.employmentType}
            onChange={(e) => handleChange('employmentType', e.target.value)}
            options={EMPLOYMENT_OPTIONS}
            helpText="Current primary status"
          />

          <SelectField
            id="maritalStatus"
            label="Marital Status"
            value={formData.maritalStatus}
            onChange={(e) => handleChange('maritalStatus', e.target.value)}
            options={MARITAL_OPTIONS}
          />
        </div>
      </div>

      {/* Section 2: Financial Profile */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-card">
        <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-sm">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">Section 2: Financial & Loan Profile</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Requested loan parameters and debt ratios</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <InputField
            id="loanAmount"
            label="Loan Amount Requested"
            type="number"
            value={formData.loanAmount}
            onChange={(e) => handleChange('loanAmount', parseFloat(e.target.value) || 0)}
            onBlur={() => handleBlur('loanAmount')}
            error={errors.loanAmount}
            helpText={FIELD_RANGES.loanAmount.help}
            placeholder="e.g., 25000"
            icon={<DollarSign className="w-4 h-4" />}
          />

          <InputField
            id="creditScore"
            label="Credit Score"
            type="number"
            value={formData.creditScore}
            onChange={(e) => handleChange('creditScore', parseInt(e.target.value) || 0)}
            onBlur={() => handleBlur('creditScore')}
            error={errors.creditScore}
            helpText={FIELD_RANGES.creditScore.help}
            placeholder="e.g., 720"
            icon={<CreditCard className="w-4 h-4" />}
          />

          <InputField
            id="interestRate"
            label="Interest Rate (%)"
            type="number"
            step="0.1"
            value={formData.interestRate}
            onChange={(e) => handleChange('interestRate', parseFloat(e.target.value) || 0)}
            onBlur={() => handleBlur('interestRate')}
            error={errors.interestRate}
            helpText={FIELD_RANGES.interestRate.help}
            placeholder="e.g., 6.5"
            suffix="%"
          />

          <InputField
            id="loanTerm"
            label="Loan Term"
            type="number"
            value={formData.loanTerm}
            onChange={(e) => handleChange('loanTerm', parseInt(e.target.value) || 0)}
            onBlur={() => handleBlur('loanTerm')}
            error={errors.loanTerm}
            helpText={FIELD_RANGES.loanTerm.help}
            placeholder="e.g., 36"
            suffix="Months"
          />

          <InputField
            id="dtiRatio"
            label="Debt-to-Income (DTI) Ratio"
            type="number"
            step="0.01"
            value={formData.dtiRatio}
            onChange={(e) => handleChange('dtiRatio', parseFloat(e.target.value) || 0)}
            onBlur={() => handleBlur('dtiRatio')}
            error={errors.dtiRatio}
            helpText={FIELD_RANGES.dtiRatio.help}
            placeholder="e.g., 0.28"
          />

          <SelectField
            id="loanPurpose"
            label="Loan Purpose"
            value={formData.loanPurpose}
            onChange={(e) => handleChange('loanPurpose', e.target.value)}
            options={LOAN_PURPOSE_OPTIONS}
            helpText="Application purpose for loan funds"
          />
        </div>
      </div>

      {/* Section 3: Credit History */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-card">
        <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-sm">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">Section 3: Credit & Employment History</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Track record and existing credit exposure</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            id="monthsEmployed"
            label="Months Employed"
            type="number"
            value={formData.monthsEmployed}
            onChange={(e) => handleChange('monthsEmployed', parseInt(e.target.value) || 0)}
            onBlur={() => handleBlur('monthsEmployed')}
            error={errors.monthsEmployed}
            helpText={FIELD_RANGES.monthsEmployed.help}
            placeholder="e.g., 48"
            suffix="Months"
          />

          <InputField
            id="numCreditLines"
            label="Number of Open Credit Lines"
            type="number"
            value={formData.numCreditLines}
            onChange={(e) => handleChange('numCreditLines', parseInt(e.target.value) || 0)}
            onBlur={() => handleBlur('numCreditLines')}
            error={errors.numCreditLines}
            helpText={FIELD_RANGES.numCreditLines.help}
            placeholder="e.g., 4"
            suffix="Lines"
          />
        </div>
      </div>

      {/* Section 4: Additional Safeguards */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-card">
        <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">Section 4: Additional Information</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Assets, dependents, and co-borrower status</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ToggleField
            id="hasMortgage"
            label="Has Existing Mortgage"
            description="Active property mortgage loan"
            checked={formData.hasMortgage}
            onChange={(val) => handleChange('hasMortgage', val)}
          />

          <ToggleField
            id="hasDependents"
            label="Has Dependents"
            description="Financial dependents present"
            checked={formData.hasDependents}
            onChange={(val) => handleChange('hasDependents', val)}
          />

          <ToggleField
            id="hasCoSigner"
            label="Has Co-Signer"
            description="Co-borrower or guarantor"
            checked={formData.hasCoSigner}
            onChange={(val) => handleChange('hasCoSigner', val)}
          />
        </div>
      </div>

      {/* Form Action Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={handleReset}
          disabled={isLoading}
          className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Default Values
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-8 py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-600/25 transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing Risk Model...
            </>
          ) : (
            <>
              Analyze Default Risk <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
