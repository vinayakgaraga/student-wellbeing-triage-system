from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.schemas.prediction_schema import PredictionResponse

from app.services.prediction_service import (
    predict_student,
    get_predictions,
    delete_prediction,
)

router = APIRouter(
    prefix="/predict",
    tags=["Prediction"],
)


@router.get("/{student_id}", response_model=PredictionResponse)
def get_prediction(
    student_id: int,
    db: Session = Depends(get_db),
):
    return predict_student(db, student_id)


@router.get("/", response_model=list[PredictionResponse])
def fetch_predictions(
    db: Session = Depends(get_db),
):
    return get_predictions(db)


@router.delete("/{prediction_id}")
def remove_prediction(
    prediction_id: int,
    db: Session = Depends(get_db),
):
    prediction = delete_prediction(db, prediction_id)

    if prediction is None:
        raise HTTPException(
            status_code=404,
            detail="Prediction not found",
        )

    return {
        "message": "Prediction deleted successfully."
    }