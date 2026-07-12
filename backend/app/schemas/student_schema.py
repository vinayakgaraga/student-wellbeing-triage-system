from pydantic import BaseModel, EmailStr


class StudentCreate(BaseModel):
    name: str
    email: EmailStr
    department: str
    year: int
    section: str
    gender: str
    phone: str


class StudentResponse(StudentCreate):
    id: int

    class Config:
        from_attributes = True