from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from app.database.base import Base


class CheckIn(Base):
    __tablename__ = "checkins"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    date = Column(Date, nullable=False)
    mood = Column(String, nullable=False)
    stress_level = Column(Integer, nullable=False)
    sleep_hours = Column(Float, nullable=False)