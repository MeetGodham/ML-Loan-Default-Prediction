"""
Train and export the Loan Default Prediction pipeline.
Matches the notebook preprocessing and model parameters while ensuring the StandardScaler
is fitted on unscaled training data, producing a calibrated end-to-end model.
"""

import os
import joblib
import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, "Loan_default.csv")
MODEL_OUT_ML = os.path.join(BASE_DIR, "loan_default_model.pkl")
MODEL_OUT_BACKEND = os.path.abspath(os.path.join(BASE_DIR, "..", "backend", "app", "model", "loan_default_model.pkl"))

FEATURE_NAMES = [
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

def train_and_export():
    print(f"Loading dataset from: {CSV_PATH}")
    df = pd.read_csv(CSV_PATH)

    # One-hot encode categorical features as performed during training
    for col in ['HasMortgage', 'Education', 'EmploymentType', 'MaritalStatus', 'HasDependents', 'LoanPurpose', 'HasCoSigner']:
        df = pd.get_dummies(df, columns=[col], dtype=int)

    # Outlier handling (IQR clipping on numeric columns)
    numeric_cols = df.drop(['Default', 'LoanID'], axis=1).select_dtypes(include=['int64', 'float64']).columns
    for col in numeric_cols:
        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1
        lower = Q1 - 1.5 * IQR
        upper = Q3 + 1.5 * IQR
        median = df[col].median()
        df.loc[df[col] < lower, col] = median
        df.loc[df[col] > upper, col] = median

    X = df.drop(['Default', 'LoanID'], axis=1)[FEATURE_NAMES]
    y = df['Default']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print("Fitting calibrated pipeline (StandardScaler + LogisticRegression)...")
    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('model', LogisticRegression(random_state=42, max_iter=1000))
    ])
    pipeline.fit(X_train, y_train)

    train_acc = pipeline.score(X_train, y_train)
    test_acc = pipeline.score(X_test, y_test)
    print(f"Train Accuracy: {train_acc:.4f}")
    print(f"Test Accuracy:  {test_acc:.4f}")

    os.makedirs(os.path.dirname(MODEL_OUT_ML), exist_ok=True)
    joblib.dump(pipeline, MODEL_OUT_ML)
    print(f"Saved model to: {MODEL_OUT_ML}")

    os.makedirs(os.path.dirname(MODEL_OUT_BACKEND), exist_ok=True)
    joblib.dump(pipeline, MODEL_OUT_BACKEND)
    print(f"Saved model to: {MODEL_OUT_BACKEND}")

if __name__ == '__main__':
    train_and_export()
