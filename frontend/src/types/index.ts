export type EducationLevel = 'High School' | 'Bachelor' | 'Master' | 'PhD';

export type EmploymentType = 'Full-Time' | 'Part-Time' | 'Self-Employed' | 'Other';

export type MaritalStatus = 'Single' | 'Married' | 'Divorced' | 'Widowed';

export type LoanPurpose = 'Personal' | 'Education' | 'Auto' | 'Home' | 'Business' | 'Other';

export interface PredictionInput {
  age: number;
  income: number;
  education: EducationLevel;
  employmentType: EmploymentType;
  maritalStatus: MaritalStatus;
  loanAmount: number;
  creditScore: number;
  interestRate: number;
  loanTerm: number;
  dtiRatio: number;
  monthsEmployed: number;
  numCreditLines: number;
  hasMortgage: boolean;
  hasDependents: boolean;
  hasCoSigner: boolean;
  loanPurpose: LoanPurpose;
}

export interface PredictionResult {
  id: string;
  riskLevel: 'low' | 'high';
  riskScore: number; // 0-100 scale (higher = higher risk)
  probability: number; // 0-1 probability of default
  timestamp: string;
  inputData: PredictionInput;
  assessmentText: string;
  metrics: {
    creditScoreRating: 'Poor' | 'Fair' | 'Good' | 'Excellent';
    dtiStatus: 'Healthy' | 'Moderate' | 'High Risk';
    incomeToLoanRatio: number;
  };
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export interface DashboardStats {
  totalPredictions: number;
  lowRiskCount: number;
  highRiskCount: number;
  avgCreditScore: number;
  avgLoanAmount: number;
  lowRiskPercentage: number;
}

export interface ModelComparisonItem {
  name: string;
  shortName?: string;
  accuracy: number; // percentage value (e.g. 80.28)
  precision: number; // percentage value (e.g. 19.86)
  recall: number; // percentage value (e.g. 23.29)
  f1: number; // percentage value (e.g. 21.44)
  rawAccuracy: number; // raw decimal value e.g. 0.80278...
  rawPrecision: number;
  rawRecall: number;
  rawF1: number;
  selected: boolean;
  algorithmType?: string;
}
