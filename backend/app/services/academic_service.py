from sqlalchemy.orm import Session

from app.models.academic import AcademicRecord
from app.schemas.academic_schema import AcademicCreate


def create_record(db: Session, record: AcademicCreate):
    obj = AcademicRecord(**record.model_dump())

    db.add(obj)
    db.commit()
    db.refresh(obj)

    return obj


def get_records(db: Session):
    return db.query(AcademicRecord).all()


def update_record(db: Session, record_id: int, data: AcademicCreate):

    record = (
        db.query(AcademicRecord)
        .filter(AcademicRecord.id == record_id)
        .first()
    )

    if not record:
        return None

    record.student_id = data.student_id
    record.gpa = data.gpa
    record.assignments_pending = data.assignments_pending
    record.exam_days_left = data.exam_days_left
    record.study_hours = data.study_hours
    record.internal_marks = data.internal_marks
    record.lab_performance = data.lab_performance

    db.commit()
    db.refresh(record)

    return record


def delete_record(db: Session, record_id: int):

    record = (
        db.query(AcademicRecord)
        .filter(AcademicRecord.id == record_id)
        .first()
    )

    if not record:
        return None

    db.delete(record)
    db.commit()

    return record