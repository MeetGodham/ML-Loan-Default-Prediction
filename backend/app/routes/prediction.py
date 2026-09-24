from fastapi import APIRouter, HTTPException
from app.schemas.prediction import LoanPredictionInput, LoanPredictionResponse
from app.services.prediction_service import predict_loan

router = APIRouter()


@router.post("/predict", response_model=LoanPredictionResponse)
def predict(data: LoanPredictionInput):
    try:
        return predict_loan(data.model_dump())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")