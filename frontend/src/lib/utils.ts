import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FormErrors, PredictionInput } from '@/types';
import { FIELD_RANGES } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function getCreditScoreRating(score: number): 'Poor' | 'Fair' | 'Good' | 'Excellent' {
  if (score >= 750) return 'Excellent';
  if (score >= 700) return 'Good';
  if (score >= 640) return 'Fair';
  return 'Poor';
}

export function getDTIStatus(dti: number): 'Healthy' | 'Moderate' | 'High Risk' {
  if (dti <= 0.30) return 'Healthy';
  if (dti <= 0.43) return 'Moderate';
  return 'High Risk';
}

export function validatePredictionInput(input: PredictionInput): FormErrors {
  const errors: FormErrors = {};

  if (input.age < FIELD_RANGES.age.min || input.age > FIELD_RANGES.age.max) {
    errors.age = `Age must be between ${FIELD_RANGES.age.min} and ${FIELD_RANGES.age.max}`;
  }

  if (input.income < FIELD_RANGES.income.min) {
    errors.income = `Income cannot be negative`;
  }

  if (input.loanAmount < FIELD_RANGES.loanAmount.min) {
    errors.loanAmount = `Loan amount must be at least ${formatCurrency(FIELD_RANGES.loanAmount.min)}`;
  }

  if (input.creditScore < FIELD_RANGES.creditScore.min || input.creditScore > FIELD_RANGES.creditScore.max) {
    errors.creditScore = `Credit score must be between ${FIELD_RANGES.creditScore.min} and ${FIELD_RANGES.creditScore.max}`;
  }

  if (input.interestRate < FIELD_RANGES.interestRate.min || input.interestRate > FIELD_RANGES.interestRate.max) {
    errors.interestRate = `Interest rate must be between ${FIELD_RANGES.interestRate.min}% and ${FIELD_RANGES.interestRate.max}%`;
  }

  if (input.loanTerm < FIELD_RANGES.loanTerm.min || input.loanTerm > FIELD_RANGES.loanTerm.max) {
    errors.loanTerm = `Loan term must be between ${FIELD_RANGES.loanTerm.min} and ${FIELD_RANGES.loanTerm.max} months`;
  }

  if (input.dtiRatio < FIELD_RANGES.dtiRatio.min || input.dtiRatio > FIELD_RANGES.dtiRatio.max) {
    errors.dtiRatio = `DTI Ratio must be between 0.0 and 1.0`;
  }

  if (input.monthsEmployed < FIELD_RANGES.monthsEmployed.min) {
    errors.monthsEmployed = `Months employed cannot be negative`;
  }

  if (input.numCreditLines < FIELD_RANGES.numCreditLines.min) {
    errors.numCreditLines = `Credit lines cannot be negative`;
  }

  return errors;
}
