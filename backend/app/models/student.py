from sqlalchemy import Column, Integer, String

from app.database.base import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    email = Column(String, unique=True)

    department = Column(String)

    year = Column(Integer)

    section = Column(String)

    gender = Column(String)

    phone = Column(String)