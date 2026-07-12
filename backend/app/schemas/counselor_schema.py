from datetime import date
from pydantic import BaseModel


class CounselorCreate(BaseModel):
    student_id: int
    counselor_name: str
    session_date: date
    notes: str
    recommendation: str
    next_followup: date


class CounselorResponse(CounselorCreate):
    id: int

    class Config:
        from_attributes = True