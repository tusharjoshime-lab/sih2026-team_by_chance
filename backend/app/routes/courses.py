from fastapi import APIRouter, Depends

from app.database import courses_collection
from app.dependencies import get_current_user

router = APIRouter(prefix="/courses", tags=["courses"])

@router.get("/")
def get_courses(current_user: dict = Depends(get_current_user)):
    courses = []
    for doc in courses_collection.find():
        course = dict(doc)
        course["id"] = str(course.pop("_id"))
        courses.append(course)
    return courses
