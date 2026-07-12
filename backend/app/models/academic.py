from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class AcademicRecord(Base):
    __tablename__ = "academic_records"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)

    gpa = Column(Float, nullable=False)
    assignments_pending = Column(Integer, nullable=False)
    exam_days_left = Column(Integer, nullable=False)
    study_hours = Column(Float, nullable=False)
    internal_marks = Column(Float, nullable=False)
    lab_performance = Column(Float, nullable=False)

    student = relationship("Student")