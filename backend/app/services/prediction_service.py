import os
import logging
from typing import Dict, Any, Optional
import joblib
import pandas as pd

logger = logging.getLogger("uvicorn.error")

FEATURE_COLUMNS = [
    'Age', 'Income', 'LoanAmount', 'CreditScore', 'MonthsEmployed',
    'NumCreditLines', 'InterestRate', 'LoanTerm', 'DTIRatio',
    'HasMortgage_No', 'HasMortgage_Yes',
    "Education_Bachelor's", 'Education_High School', "Education_Master's", 'Education_PhD',
    'EmploymentType_Full-time', 'EmploymentType_Part-time', 'EmploymentType_Self-employed', 'EmploymentType_Unemployed',
    'MaritalStatus_Divorced', 'MaritalStatus_Married', 'MaritalStatus_Single',
    'HasDependents_No', 'HasDependents_Yes',
    'LoanPurpose_Auto', 'LoanPurpose_Business', 'LoanPurpose_Education', 'LoanPurpose_Home', 'LoanPurpose_Other',
    'HasCoSigner_No', 'HasCoSigner_Yes'
]

_loaded_model = None


def resolve_model_path() -> str:
    env_path = os.getenv("MODEL_PATH")
    base_dir = os.path.dirname(os.path.abspath(__file__))
    candidate_paths = [
        env_path,
        os.path.join(base_dir, "..", "model", "loan_default_model.pkl"),
        os.path.join(base_dir, "..", "..", "..", "model", "loan_default_model.pkl"),
        os.path.join(base_dir, "..", "..", "model", "loan_default_model.pkl"),
        os.path.join(base_dir, "..", "..", "..", "ml", "loan_default_model.pkl"),
        os.path.join(base_dir, "..", "..", "ml", "loan_default_model.pkl"),
        "app/model/loan_default_model.pkl",
        "backend/app/model/loan_default_model.pkl",
        "model/loan_default_model.pkl",
        "../model/loan_default_model.pkl",
        "../ml/loan_default_model.pkl",
    ]

    for path in candidate_paths:
        if path and os.path.exists(path):
            return os.path.abspath(path)

    raise FileNotFoundError(
        "Could not find loan_default_model.pkl in any standard location. "
        "Please ensure backend/app/model/loan_default_model.pkl exists or set MODEL_PATH."
    )


def load_model():
    """Load model once into module memory (called at application startup)."""
    global _loaded_model
    if _loaded_model is None:
        model_file = resolve_model_path()
        logger.info(f"Loading ML model pipeline from: {model_file}")
        _loaded_model = joblib.load(model_file)
        logger.info("ML model pipeline successfully loaded and cached.")
    return _loaded_model


def get_model():
    global _loaded_model
    if _loaded_model is None:
        return load_model()
    return _loaded_model


def preprocess_input(data: Dict[str, Any]) -> pd.DataFrame:
    """
    Transforms the 16 incoming features into the exact 31-column dummy DataFrame
    expected by the trained ML pipeline (matching ml/ notebook training).
    """
    row = {col: 0.0 for col in FEATURE_COLUMNS}

    # Numerical features
    row['Age'] = float(data.get('Age', 0))
    row['Income'] = float(data.get('Income', 0))
    row['LoanAmount'] = float(data.get('LoanAmount', 0))
    row['CreditScore'] = float(data.get('CreditScore', 0))
    row['MonthsEmployed'] = float(data.get('MonthsEmployed', 0))
    row['NumCreditLines'] = float(data.get('NumCreditLines', 0))
    row['InterestRate'] = float(data.get('InterestRate', 0))
    row['LoanTerm'] = float(data.get('LoanTerm', 0))
    row['DTIRatio'] = float(data.get('DTIRatio', 0))

    # Categorical features one-hot mapping
    has_mortgage = str(data.get('HasMortgage', '')).strip().capitalize()
    if f"HasMortgage_{has_mortgage}" in row:
        row[f"HasMortgage_{has_mortgage}"] = 1.0

    education = str(data.get('Education', '')).strip()
    if f"Education_{education}" in row:
        row[f"Education_{education}"] = 1.0

    employment_type = str(data.get('EmploymentType', '')).strip()
    if f"EmploymentType_{employment_type}" in row:
        row[f"EmploymentType_{employment_type}"] = 1.0

    marital_status = str(data.get('MaritalStatus', '')).strip().capitalize()
    if f"MaritalStatus_{marital_status}" in row:
        row[f"MaritalStatus_{marital_status}"] = 1.0

    has_dependents = str(data.get('HasDependents', '')).strip().capitalize()
    if f"HasDependents_{has_dependents}" in row:
        row[f"HasDependents_{has_dependents}"] = 1.0

    loan_purpose = str(data.get('LoanPurpose', '')).strip().capitalize()
    if f"LoanPurpose_{loan_purpose}" in row:
        row[f"LoanPurpose_{loan_purpose}"] = 1.0

    has_cosigner = str(data.get('HasCoSigner', '')).strip().capitalize()
    if f"HasCoSigner_{has_cosigner}" in row:
        row[f"HasCoSigner_{has_cosigner}"] = 1.0

    return pd.DataFrame([row], columns=FEATURE_COLUMNS)


def calculate_metrics(data: Dict[str, Any]) -> Dict[str, Any]:
    cs = int(data.get('CreditScore', 600))
    if cs >= 750:
        cs_rating = "Excellent"
    elif cs >= 670:
        cs_rating = "Good"
    elif cs >= 580:
        cs_rating = "Fair"
    else:
        cs_rating = "Poor"

    dti = float(data.get('DTIRatio', 0.3))
    if dti <= 0.36:
        dti_status = "Optimal"
    elif dti <= 0.43:
        dti_status = "Manageable"
    else:
        dti_status = "Critical"

    income = float(data.get('Income', 0))
    loan_amount = float(data.get('LoanAmount', 1))
    income_to_loan = round(income / loan_amount, 2) if loan_amount > 0 else 0.0

    return {
        "creditScoreRating": cs_rating,
        "dtiStatus": dti_status,
        "incomeToLoanRatio": income_to_loan
    }


def predict_loan(data: Dict[str, Any]) -> Dict[str, Any]:
    model = get_model()
    features_df = preprocess_input(data)

    prediction = int(model.predict(features_df)[0])
    probabilities = model.predict_proba(features_df)[0]
    # Class 1 is default probability
    default_prob = float(probabilities[1])
    risk_score = int(round(default_prob * 100))
    risk_level = "high" if prediction == 1 or default_prob >= 0.5 else "low"

    metrics = calculate_metrics(data)

    if risk_level == "low":
        message = (
            f"Borrower demonstrates low risk profile with {risk_score}% default probability. "
            f"Supported by a {metrics['creditScoreRating'].lower()} credit rating and {metrics['dtiStatus'].lower()} DTI ratio."
        )
    else:
        message = (
            f"Borrower demonstrates elevated default risk ({risk_score}% probability). "
            f"Key exposure flags include debt obligations and credit profile characteristics."
        )

    return {
        "status": "success",
        "prediction": prediction,
        "default_probability": round(default_prob, 4),
        "probability": round(default_prob, 4),
        "risk_score": risk_score,
        "risk_level": risk_level,
        "metrics": metrics,
        "message": message
    }