from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.schemas.checkin_schema import CheckInCreate, CheckInResponse
from app.services.checkin_service import (
    create_checkin,
    get_checkins,
    delete_checkin,
    update_checkin,
)

router = APIRouter(
    prefix="/checkins",
    tags=["Check-Ins"],
)


@router.post("/", response_model=CheckInResponse)
def add_checkin(
    checkin: CheckInCreate,
    db: Session = Depends(get_db),
):
    return create_checkin(db, checkin)


@router.get("/", response_model=list[CheckInResponse])
def fetch_checkins(
    db: Session = Depends(get_db),
):
    return get_checkins(db)


@router.put("/{checkin_id}", response_model=CheckInResponse)
def edit_checkin(
    checkin_id: int,
    checkin: CheckInCreate,
    db: Session = Depends(get_db),
):
    updated = update_checkin(db, checkin_id, checkin)

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Check-In not found",
        )

    return updated


@router.delete("/{checkin_id}")
def remove_checkin(
    checkin_id: int,
    db: Session = Depends(get_db),
):
    checkin = delete_checkin(db, checkin_id)

    if checkin is None:
        raise HTTPException(
            status_code=404,
            detail="Check-In not found",
        )

    return {
        "message": "Deleted Successfully"
    }