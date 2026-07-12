from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)

    student_id = Column(
        Integer,
        ForeignKey("students.id"),
        nullable=False,
    )

    risk_level = Column(
        String,
        nullable=False,
    )

    confidence = Column(
        Float,
        nullable=False,
    )

    recommendation = Column(
        String,
        nullable=False,
    )

    student = relationship("Student")