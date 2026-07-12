from datetime import date
from pydantic import BaseModel


class CheckInCreate(BaseModel):
    student_id: int
    date: date
    mood: str
    stress_level: int
    sleep_hours: float


class CheckInResponse(CheckInCreate):
    id: int

    class Config:
        from_attributes = True