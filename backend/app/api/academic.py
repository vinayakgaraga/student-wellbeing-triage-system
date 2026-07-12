from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.schemas.academic_schema import (
    AcademicCreate,
    AcademicResponse,
)

from app.services.academic_service import (
    create_record,
    get_records,
    update_record,
    delete_record,
)

router = APIRouter(
    prefix="/academic",
    tags=["Academic"],
)


@router.post("/", response_model=AcademicResponse)
def add_record(
    record: AcademicCreate,
    db: Session = Depends(get_db),
):
    return create_record(db, record)


@router.get("/", response_model=List[AcademicResponse])
def fetch_records(
    db: Session = Depends(get_db),
):
    return get_records(db)


@router.put("/{record_id}", response_model=AcademicResponse)
def edit_record(
    record_id: int,
    record: AcademicCreate,
    db: Session = Depends(get_db),
):
    updated = update_record(db, record_id, record)

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Academic record not found",
        )

    return updated


@router.delete("/{record_id}")
def remove_record(
    record_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_record(db, record_id)

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Academic record not found",
        )

    return {
        "message": "Academic record deleted successfully."
    }