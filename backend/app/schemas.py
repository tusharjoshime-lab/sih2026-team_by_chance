"""
Pydantic models for request/response validation.
"""
from typing import List, Optional, Dict
from pydantic import BaseModel, EmailStr, Field


class ExperienceItem(BaseModel):
    role: str
    organization: Optional[str] = None
    years: Optional[float] = None


class TrainingItem(BaseModel):
    title: str
    completedOn: Optional[str] = None


class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(min_length=6)
    designation: Optional[str] = None
    department: Optional[str] = None
    jobRole: Optional[str] = None
    education: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    designation: Optional[str] = None
    department: Optional[str] = None
    jobRole: Optional[str] = None
    education: Optional[str] = None
    experience: List[ExperienceItem] = []
    previousTrainings: List[TrainingItem] = []
    competencyScores: Dict[str, float] = {}


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut
