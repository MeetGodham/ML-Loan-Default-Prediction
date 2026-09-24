# Loan Default Risk Prediction — End-to-End ML Application

An enterprise-grade, end-to-end Machine Learning web application designed to evaluate borrower loan default risk. Features an automated ML preprocessing pipeline, high-performance FastAPI serving engine, and modern Next.js interactive financial dashboard.

---

## Architecture Overview

```
project/
├── frontend/ (ML_Frontend/)   # Next.js 14, React 18, Tailwind CSS, Recharts
├── backend/                  # FastAPI REST API, Pydantic schemas, lifespan model caching
└── ml/                       # Scikit-learn Pipeline (StandardScaler + LogisticRegression), dataset, training script
```

- **ML Engine (`ml/`)**: Scikit-Learn `Pipeline` trained on `ml/Loan_default.csv` with 88.55% test accuracy. Performs one-hot encoding on 7 categorical features and standardizes 31 features.
- **Backend API (`backend/`)**: FastAPI server loading the serialized model once during application lifespan. Validates input payloads using Pydantic, executes preprocessing, returns calibrated default probabilities, risk scores, and credit metrics.
- **Frontend Dashboard (`ML_Frontend/` or `frontend/`)**: Modern UI with dark mode, interactive risk meter gauge, real-time input validation, live backend connectivity status badge, and history tracking.

---

## Prerequisites

- **Python**: 3.10+ (tested with Python 3.13)
- **Node.js**: 18+ and npm

---

## Quick Start (Run Concurrently)

### Option 1: Using the Python Concurrent Runner
From the root directory:
```bash
python run_all.py
```
This concurrently starts:
- **FastAPI Backend**: `http://127.0.0.1:8000` (Interactive Swagger Docs at `http://127.0.0.1:8000/docs`)
- **Next.js Frontend**: `http://localhost:3000`

### Option 2: Using the Windows Batch Launcher
Double-click or run from command prompt:
```cmd
start-dev.bat
```

---

## Step-by-Step Manual Setup

### 1. Model Pipeline (Already Trained & Exported)
The calibrated model artifact is located in `ml/loan_default_model.pkl` and `backend/app/model/loan_default_model.pkl`.
To retrain and export fresh artifacts at any time:
```bash
python ml/train_and_export.py
```

### 2. Backend Setup (`backend/`)
```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```
- Root Endpoint: `http://127.0.0.1:8000/`
- Health Check: `http://127.0.0.1:8000/health`
- Swagger UI Documentation: `http://127.0.0.1:8000/docs`

### 3. Frontend Setup (`ML_Frontend/` or `frontend/`)
```bash
cd ML_Frontend

# Install dependencies (if not already installed)
npm install

# Start Next.js development server
npm run dev
```
Open `http://localhost:3000` in your web browser.

---

## API Specification (`POST /predict`)

### Request Payload (`Content-Type: application/json`)
```json
{
  "Age": 35,
  "Income": 75000.0,
  "LoanAmount": 25000.0,
  "CreditScore": 720,
  "MonthsEmployed": 48,
  "NumCreditLines": 4,
  "InterestRate": 6.5,
  "LoanTerm": 36,
  "DTIRatio": 0.28,
  "Education": "Bachelor's",
  "EmploymentType": "Full-time",
  "MaritalStatus": "Married",
  "HasMortgage": "No",
  "HasDependents": "No",
  "LoanPurpose": "Auto",
  "HasCoSigner": "No"
}
```

### Response Payload (`200 OK`)
```json
{
  "status": "success",
  "prediction": 0,
  "default_probability": 0.0732,
  "probability": 0.0732,
  "risk_score": 7,
  "risk_level": "low",
  "metrics": {
    "creditScoreRating": "Good",
    "dtiStatus": "Optimal",
    "incomeToLoanRatio": 3.0
  },
  "message": "Borrower demonstrates low risk profile with 7% default probability. Supported by a good credit rating and optimal DTI ratio."
}
```

---

## Automated Verification

Run backend integration and validation tests:
```bash
cd backend
python test_backend.py
```

Run frontend build and type checking:
```bash
cd ML_Frontend
npm run build
```
