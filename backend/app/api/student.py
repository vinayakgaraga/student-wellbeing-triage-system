from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.student import Student
from app.schemas.student_schema import StudentCreate, StudentResponse
from app.services.student_service import create_student, get_students

router = APIRouter(
    prefix="/students",
    tags=["Students"]
)


@router.post("/", response_model=StudentResponse)
def add_student(student: StudentCreate, db: Session = Depends(get_db)):
    return create_student(db, student)


@router.get("/", response_model=list[StudentResponse])
def fetch_students(db: Session = Depends(get_db)):
    return get_students(db)


@router.put("/{student_id}", response_model=StudentResponse)
def update_student(
    student_id: int,
    student_data: StudentCreate,
    db: Session = Depends(get_db),
):
    student = db.query(Student).filter(Student.id == student_id).first()

    if student is None:
        raise HTTPException(status_code=404, detail="Student not found")

    student.name = student_data.name
    student.email = student_data.email
    student.department = student_data.department
    student.year = student_data.year
    student.section = student_data.section
    student.gender = student_data.gender
    student.phone = student_data.phone

    db.commit()
    db.refresh(student)

    return student


@router.delete("/{student_id}")
def delete_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()

    if student is None:
        raise HTTPException(status_code=404, detail="Student not found")

    db.delete(student)
    db.commit()

    return {"message": "Student deleted successfully"}