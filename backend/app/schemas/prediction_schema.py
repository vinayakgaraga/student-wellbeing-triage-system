from pydantic import BaseModel


class PredictionCreate(BaseModel):
    student_id: int


class PredictionResponse(BaseModel):
    id: int
    student_id: int
    risk_level: str
    confidence: float
    recommendation: str

    class Config:
        from_attributes = True