from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.dashboard import router as dashboard_router

from app.api.prediction import router as prediction_router

from app.api.academic import router as academic_router
from app.models.academic import AcademicRecord

from app.api.counselor import router as counselor_router
from app.models.counselor import CounselorSession

from app.api.checkin import router as checkin_router
from app.models.checkin import CheckIn

from app.api.student import router as student_router
from app.api.attendance import router as attendance_router

from app.database.base import Base
from app.database.connection import engine

from app.models.student import Student
from app.models.attendance import Attendance
from app.api.analytics import router as analytics_router


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Student Wellbeing Triage System",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(student_router)
app.include_router(attendance_router)
app.include_router(checkin_router)
app.include_router(counselor_router)
app.include_router(academic_router)
app.include_router(prediction_router)
app.include_router(dashboard_router)
app.include_router(analytics_router)



@app.get("/")
def root():
    return {
        "message": "Student Wellbeing Triage System API"
    }


@app.get("/health")
def health():
    return {
        "status": "Healthy"
    }