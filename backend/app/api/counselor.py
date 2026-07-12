from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.schemas.counselor_schema import (
    CounselorCreate,
    CounselorResponse,
)

from app.services.counselor_service import (
    create_session,
    get_sessions,
    get_student_sessions,
    update_session,
    delete_session,
)

router = APIRouter(
    prefix="/counselor",
    tags=["Counselor"],
)


@router.post("/", response_model=CounselorResponse)
def add_session(
    session: CounselorCreate,
    db: Session = Depends(get_db),
):
    return create_session(db, session)


@router.get("/", response_model=list[CounselorResponse])
def all_sessions(db: Session = Depends(get_db)):
    return get_sessions(db)


@router.get("/{student_id}")
def student_sessions(
    student_id: int,
    db: Session = Depends(get_db),
):
    return get_student_sessions(db, student_id)


@router.put("/{session_id}", response_model=CounselorResponse)
def edit_session(
    session_id: int,
    session: CounselorCreate,
    db: Session = Depends(get_db),
):
    updated = update_session(
        db,
        session_id,
        session,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Session not found",
        )

    return updated


@router.delete("/{session_id}")
def remove_session(
    session_id: int,
    db: Session = Depends(get_db),
):
    delete_session(db, session_id)

    return {
        "message": "Counselor session deleted successfully."
    }