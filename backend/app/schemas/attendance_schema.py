from datetime import date
from pydantic import BaseModel


class AttendanceCreate(BaseModel):
    student_id: int
    date: date
    status: str


class AttendanceResponse(AttendanceCreate):
    id: int

    class Config:
        from_attributes = True