from pydantic import BaseModel, Field


class AcademicCreate(BaseModel):
    student_id: int
    gpa: float = Field(ge=0, le=10)
    assignments_pending: int = Field(ge=0)
    exam_days_left: int = Field(ge=0)
    study_hours: float = Field(ge=0, le=24)
    internal_marks: float = Field(ge=0, le=100)
    lab_performance: float = Field(ge=0, le=100)


class AcademicResponse(AcademicCreate):
    id: int

    class Config:
        from_attributes = True