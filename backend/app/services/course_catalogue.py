"""
Course catalogue service. Currently reads from the seeded `courses`
collection (mock data). To integrate a real course catalogue API later,
only this function needs to change -- callers elsewhere in the app only
ever call get_all_courses() and don't know or care where the data comes from.
"""
from app.database import courses_collection


def get_all_courses() -> list[dict]:
    return list(courses_collection.find({}, {"_id": 0}))
