from sqlalchemy.orm import Session
from app.models.attendance import Attendance
from app.schemas.attendance_schema import AttendanceCreate


def create_attendance(db: Session, attendance: AttendanceCreate):
    db_attendance = Attendance(**attendance.model_dump())

    db.add(db_attendance)
    db.commit()
    db.refresh(db_attendance)

    return db_attendance


def get_attendance(db: Session):
    return db.query(Attendance).all()


def delete_attendance(db: Session, attendance_id: int):
    attendance = db.query(Attendance).filter(
        Attendance.id == attendance_id
    ).first()

    if attendance:
        db.delete(attendance)
        db.commit()

    return attendance