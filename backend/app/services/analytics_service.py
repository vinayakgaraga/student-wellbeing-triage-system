from sqlalchemy import func
from sqlalchemy.orm import Session

from app.services.prediction_service import predict_student

from app.models.student import Student
from app.models.attendance import Attendance
from app.models.checkin import CheckIn
from app.models.academic import AcademicRecord
from app.models.prediction import Prediction


# =========================
# Dashboard Data
# =========================
def get_dashboard_data(db: Session):

    total_students = db.query(Student).count()
    total_attendance = db.query(Attendance).count()
    total_checkins = db.query(CheckIn).count()
    total_academic = db.query(AcademicRecord).count()

    # Department-wise student count
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

    # Risk Distribution
    risk_distribution = {
        "Low": 0,
        "Medium": 0,
        "High": 0,
    }

    students = db.query(Student).all()

    for student in students:
        prediction = predict_student(db, student.id)

        # prediction may be object or dict
        if hasattr(prediction, "risk_level"):
            risk_distribution[prediction.risk_level] += 1
        else:
            risk_distribution[prediction["risk_level"]] += 1

    low = db.query(Prediction).filter(
        Prediction.risk_level == "Low"
    ).count()

    medium = db.query(Prediction).filter(
        Prediction.risk_level == "Medium"
    ).count()

    high = db.query(Prediction).filter(
        Prediction.risk_level == "High"
    ).count()

    return {
        "total_students": total_students,
        "attendance_records": total_attendance,
        "checkins": total_checkins,
        "academic_records": total_academic,

        "departments": department_data,
        "risk_distribution": risk_distribution,

        "low_risk": low,
        "medium_risk": medium,
        "high_risk": high,

        "attendance_trend": [
            {"day": "Mon", "attendance": 92},
            {"day": "Tue", "attendance": 88},
            {"day": "Wed", "attendance": 95},
            {"day": "Thu", "attendance": 90},
            {"day": "Fri", "attendance": 94},
        ],
    }


# =========================
# Analytics Page
# =========================
def get_analytics(db: Session):

    students = db.query(Student).all()
    predictions = db.query(Prediction).all()

    total_students = len(students)

    low = sum(
        1 for p in predictions
        if p.risk_level == "Low"
    )

    medium = sum(
        1 for p in predictions
        if p.risk_level == "Medium"
    )

    high = sum(
        1 for p in predictions
        if p.risk_level == "High"
    )

    # Department Data
    departments = {}

    for student in students:
        departments[student.department] = (
            departments.get(student.department, 0) + 1
        )

    department_data = [
        {
            "dept": dept,
            "students": count,
        }
        for dept, count in departments.items()
    ]

    # Attendance Distribution
    present = db.query(Attendance).filter(
        Attendance.status == "Present"
    ).count()

    absent = db.query(Attendance).filter(
        Attendance.status == "Absent"
    ).count()

    # Average Stress Level
    stress = (
        db.query(
            CheckIn.student_id,
            func.avg(CheckIn.stress_level).label("stress")
        )
        .group_by(CheckIn.student_id)
        .all()
    )

    return {

        "risk_distribution": [
            {"name": "Low", "value": low},
            {"name": "Medium", "value": medium},
            {"name": "High", "value": high},
        ],

        "department_data": department_data,

        "total_students": total_students,

        "attendance_distribution": [
            {"name": "Present", "value": present},
            {"name": "Absent", "value": absent},
        ],

        "stress_data": [
            {
                "student": f"Student {row.student_id}",
                "stress": round(row.stress, 1),
            }
            for row in stress
        ],

        "low_risk": low,
        "medium_risk": medium,
        "high_risk": high,
    }