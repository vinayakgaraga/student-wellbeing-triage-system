from sqlalchemy.orm import Session

from app.models.attendance import Attendance
from app.models.checkin import CheckIn
from app.models.academic import AcademicRecord
from app.models.prediction import Prediction


def predict_student(db: Session, student_id: int):

    attendance = (
        db.query(Attendance)
        .filter(Attendance.student_id == student_id)
        .order_by(Attendance.id.desc())
        .first()
    )

    checkin = (
        db.query(CheckIn)
        .filter(CheckIn.student_id == student_id)
        .order_by(CheckIn.id.desc())
        .first()
    )

    academic = (
        db.query(AcademicRecord)
        .filter(AcademicRecord.student_id == student_id)
        .order_by(AcademicRecord.id.desc())
        .first()
    )

    score = 0

    # Attendance
    if attendance:
        if attendance.status == "Absent":
            score += 30

    # Check-In
    if checkin:
        if checkin.stress_level >= 8:
            score += 30
        elif checkin.stress_level >= 5:
            score += 15

        if checkin.sleep_hours < 5:
            score += 20

    # Academic
    if academic:
        if academic.gpa < 6:
            score += 30
        elif academic.gpa < 8:
            score += 15

        if academic.assignments_pending >= 3:
            score += 15

    if score >= 60:
        risk = "High"
        recommendation = "Immediate counselor intervention recommended."
    elif score >= 30:
        risk = "Medium"
        recommendation = "Monitor student and schedule follow-up."
    else:
        risk = "Low"
        recommendation = "Student is doing well."

    confidence = round(score / 100, 2)

    # Check if prediction already exists
    existing_prediction = (
        db.query(Prediction)
        .filter(Prediction.student_id == student_id)
        .first()
    )

    if existing_prediction:

        existing_prediction.risk_level = risk
        existing_prediction.confidence = confidence
        existing_prediction.recommendation = recommendation

        db.commit()
        db.refresh(existing_prediction)

        return existing_prediction

    else:

        prediction = Prediction(
            student_id=student_id,
            risk_level=risk,
            confidence=confidence,
            recommendation=recommendation,
        )

        db.add(prediction)
        db.commit()
        db.refresh(prediction)

        return prediction


def get_predictions(db: Session):
    return (
        db.query(Prediction)
        .order_by(Prediction.id.desc())
        .all()
    )


def delete_prediction(db: Session, prediction_id: int):

    prediction = (
        db.query(Prediction)
        .filter(Prediction.id == prediction_id)
        .first()
    )

    if prediction:
        db.delete(prediction)
        db.commit()

    return prediction