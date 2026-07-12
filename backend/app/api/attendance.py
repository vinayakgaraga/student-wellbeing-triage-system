from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.schemas.attendance_schema import AttendanceCreate, AttendanceResponse
from app.services.attendance_service import (
    create_attendance,
    get_attendance,
    delete_attendance,
)

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)


@router.post("/", response_model=AttendanceResponse)
def add_attendance(
    attendance: AttendanceCreate,
    db: Session = Depends(get_db),
):
    return create_attendance(db, attendance)


@router.get("/", response_model=list[AttendanceResponse])
def fetch_attendance(db: Session = Depends(get_db)):
    return get_attendance(db)


@router.delete("/{attendance_id}")
def remove_attendance(
    attendance_id: int,
    db: Session = Depends(get_db),
):
    attendance = delete_attendance(db, attendance_id)

    if attendance is None:
        raise HTTPException(
            status_code=404,
            detail="Attendance not found",
        )

    return {"message": "Deleted Successfully"}