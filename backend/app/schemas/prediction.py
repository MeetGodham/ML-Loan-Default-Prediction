from typing import Dict, Any, Optional
from pydantic import BaseModel, Field


class LoanPredictionInput(BaseModel):
    Age: int = Field(..., ge=18, le=100, description="Borrower age in years", example=35)
    Income: float = Field(..., ge=0, description="Gross annual income in USD", example=75000.0)
    LoanAmount: float = Field(..., ge=1000, description="Requested loan amount in USD", example=25000.0)
    CreditScore: int = Field(..., ge=300, le=850, description="FICO credit score", example=720)
    MonthsEmployed: int = Field(..., ge=0, le=600, description="Total months with current/recent employer", example=48)
    NumCreditLines: int = Field(..., ge=0, le=30, description="Number of active open credit lines", example=4)
    InterestRate: float = Field(..., ge=0.0, le=50.0, description="Annual loan interest rate percentage", example=6.5)
    LoanTerm: int = Field(..., ge=12, le=120, description="Loan repayment duration in months", example=36)
    DTIRatio: float = Field(..., ge=0.0, le=2.0, description="Debt-to-Income ratio (0.0 to 1.0+)", example=0.28)

    Education: str = Field(..., description="Highest education level: Bachelor's, High School, Master's, or PhD", example="Bachelor's")
    EmploymentType: str = Field(..., description="Employment category: Full-time, Part-time, Self-employed, Unemployed", example="Full-time")
    MaritalStatus: str = Field(..., description="Marital status: Divorced, Married, Single", example="Married")
    HasMortgage: str = Field(..., description="Active residential mortgage: 'Yes' or 'No'", example="No")
    HasDependents: str = Field(..., description="Presence of financial dependents: 'Yes' or 'No'", example="No")
    LoanPurpose: str = Field(..., description="Purpose: Auto, Business, Education, Home, Other", example="Auto")
    HasCoSigner: str = Field(..., description="Presence of co-signer / guarantor: 'Yes' or 'No'", example="No")


class LoanMetrics(BaseModel):
    creditScoreRating: str
    dtiStatus: str
    incomeToLoanRatio: float


class LoanPredictionResponse(BaseModel):
    status: str = Field(..., example="success")
    prediction: int = Field(..., description="0 for No Default, 1 for Default", example=0)
    default_probability: float = Field(..., description="Estimated probability of loan default (0.0 to 1.0)", example=0.0435)
    probability: float = Field(..., description="Probability of loan default (backwards compatibility)", example=0.0435)
    risk_score: int = Field(..., description="Calculated risk score out of 100", example=4)
    risk_level: str = Field(..., description="Risk category: 'low' or 'high'", example="low")
    metrics: LoanMetrics
    message: str = Field(..., example="Borrower demonstrates low risk of loan default.")