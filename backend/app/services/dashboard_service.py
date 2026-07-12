from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.student import Student
from app.models.attendance import Attendance
from app.models.checkin import CheckIn
from app.models.academic import AcademicRecord
from app.services.prediction_service import predict_student


def get_dashboard_data(db: Session):

    total_students = db.query(Student).count()
    total_attendance = db.query(Attendance).count()
    total_checkins = db.query(CheckIn).count()
    total_academic = db.query(AcademicRecord).count()

    departments = (
        db.query(
            Student.department,
            func.count(Student.id)
        )
        .group_by(Student.department)
        .all()
    )

    department_data = [
        {
            "department": dept,
            "students": count,
        }
        for dept, count in departments
    ]

    risk_distribution = {
        "Low": 0,
        "Medium": 0,
        "High": 0,
    }

    students = db.query(Student).all()

    for student in students:
        result = predict_student(db, student.id)
        risk_distribution[result["risk_level"]] += 1

    return {
        "total_students": total_students,
        "attendance_records": total_attendance,
        "checkins": total_checkins,
        "academic_records": total_academic,
        "departments": department_data,
        "risk_distribution": risk_distribution,

        
    }