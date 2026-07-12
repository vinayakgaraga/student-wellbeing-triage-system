from sqlalchemy.orm import Session

from app.models.counselor import CounselorSession
from app.schemas.counselor_schema import CounselorCreate


def create_session(db: Session, session: CounselorCreate):
    new_session = CounselorSession(
        student_id=session.student_id,
        counselor_name=session.counselor_name,
        session_date=session.session_date,
        notes=session.notes,
        recommendation=session.recommendation,
        next_followup=session.next_followup,
    )

    db.add(new_session)
    db.commit()
    db.refresh(new_session)

    return new_session


def get_sessions(db: Session):
    return db.query(CounselorSession).all()


def get_student_sessions(db: Session, student_id: int):
    return (
        db.query(CounselorSession)
        .filter(CounselorSession.student_id == student_id)
        .all()
    )


def update_session(
    db: Session,
    session_id: int,
    updated: CounselorCreate,
):
    session = (
        db.query(CounselorSession)
        .filter(CounselorSession.id == session_id)
        .first()
    )

    if not session:
        return None

    session.student_id = updated.student_id
    session.counselor_name = updated.counselor_name
    session.session_date = updated.session_date
    session.notes = updated.notes
    session.recommendation = updated.recommendation
    session.next_followup = updated.next_followup

    db.commit()
    db.refresh(session)

    return session


def delete_session(db: Session, session_id: int):
    session = (
        db.query(CounselorSession)
        .filter(CounselorSession.id == session_id)
        .first()
    )

    if session:
        db.delete(session)
        db.commit()

    return session