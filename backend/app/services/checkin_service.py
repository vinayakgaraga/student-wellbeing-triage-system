from sqlalchemy.orm import Session

from app.models.checkin import CheckIn
from app.schemas.checkin_schema import CheckInCreate


def create_checkin(db: Session, checkin: CheckInCreate):
    db_checkin = CheckIn(**checkin.model_dump())

    db.add(db_checkin)
    db.commit()
    db.refresh(db_checkin)

    return db_checkin


def get_checkins(db: Session):
    return db.query(CheckIn).all()


def update_checkin(
    db: Session,
    checkin_id: int,
    data: CheckInCreate,
):
    checkin = (
        db.query(CheckIn)
        .filter(CheckIn.id == checkin_id)
        .first()
    )

    if not checkin:
        return None

    checkin.student_id = data.student_id
    checkin.date = data.date
    checkin.mood = data.mood
    checkin.stress_level = data.stress_level
    checkin.sleep_hours = data.sleep_hours

    db.commit()
    db.refresh(checkin)

    return checkin


def delete_checkin(db: Session, checkin_id: int):
    checkin = (
        db.query(CheckIn)
        .filter(CheckIn.id == checkin_id)
        .first()
    )

    if checkin:
        db.delete(checkin)
        db.commit()

    return checkin