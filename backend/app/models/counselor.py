from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class CounselorSession(Base):
    __tablename__ = "counselor_sessions"

    id = Column(Integer, primary_key=True, index=True)

    student_id = Column(
        Integer,
        ForeignKey("students.id"),
        nullable=False,
    )

    counselor_name = Column(String, nullable=False)

    session_date = Column(Date, nullable=False)

    notes = Column(Text)

    recommendation = Column(Text)

    next_followup = Column(Date)

    student = relationship("Student")