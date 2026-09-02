"""
Run this once to insert a mock course catalogue -- this is the seeded
data get_all_courses() reads from (see app/services/course_catalogue.py).

Usage:
    python seed_courses.py

Placeholder data. Replace/expand with the real curated list once the
research/domain member finalizes it -- the rest of the app doesn't change.
"""
from app.database import courses_collection

sample_courses = [
    {"id": "DL01", "title": "MS Excel Essentials for Government Offices", "domain": "Digital Literacy",
     "skillTags": ["MS Excel", "Data Entry"], "level": "Beginner", "durationHrs": 6,
     "description": "Spreadsheets, formulas, and basic data organization for office work.",
     "link": "https://example.com/courses/dl01"},
    {"id": "DL02", "title": "Advanced MS Excel: Pivot Tables & Reporting", "domain": "Digital Literacy",
     "skillTags": ["MS Excel"], "level": "Intermediate", "durationHrs": 8,
     "description": "Pivot tables, charts, and building recurring reports.",
     "link": "https://example.com/courses/dl02"},
    {"id": "DL03", "title": "Professional Email Communication", "domain": "Digital Literacy",
     "skillTags": ["Email Communication"], "level": "Beginner", "durationHrs": 3,
     "description": "Writing clear, professional emails for official correspondence.",
     "link": "https://example.com/courses/dl03"},
    {"id": "DL04", "title": "Accurate Data Entry Practices", "domain": "Digital Literacy",
     "skillTags": ["Data Entry"], "level": "Beginner", "durationHrs": 4,
     "description": "Speed and accuracy techniques for high-volume data entry.",
     "link": "https://example.com/courses/dl04"},
    {"id": "CM01", "title": "Government Report Writing", "domain": "Communication",
     "skillTags": ["Report Writing"], "level": "Beginner", "durationHrs": 6,
     "description": "Structuring clear, concise official reports.",
     "link": "https://example.com/courses/cm01"},
    {"id": "CM02", "title": "Advanced Technical Report Writing", "domain": "Communication",
     "skillTags": ["Report Writing"], "level": "Intermediate", "durationHrs": 8,
     "description": "Writing detailed policy and technical reports.",
     "link": "https://example.com/courses/cm02"},
    {"id": "CM03", "title": "Public Speaking for Officials", "domain": "Communication",
     "skillTags": ["Public Speaking"], "level": "Beginner", "durationHrs": 5,
     "description": "Confidence and clarity when addressing an audience.",
     "link": "https://example.com/courses/cm03"},
    {"id": "CM04", "title": "Advanced Public Speaking & Presentation Skills", "domain": "Communication",
     "skillTags": ["Public Speaking"], "level": "Intermediate", "durationHrs": 6,
     "description": "Structuring persuasive presentations for senior stakeholders.",
     "link": "https://example.com/courses/cm04"},
    {"id": "LD01", "title": "Foundations of Team Management", "domain": "Leadership",
     "skillTags": ["Team Management"], "level": "Beginner", "durationHrs": 8,
     "description": "Core principles of leading and motivating a team.",
     "link": "https://example.com/courses/ld01"},
    {"id": "LD02", "title": "Advanced Team Management for Section Officers", "domain": "Leadership",
     "skillTags": ["Team Management"], "level": "Intermediate", "durationHrs": 10,
     "description": "Delegation, conflict resolution, and performance management.",
     "link": "https://example.com/courses/ld02"},
    {"id": "LD03", "title": "Decision Making Under Pressure", "domain": "Leadership",
     "skillTags": ["Decision Making"], "level": "Beginner", "durationHrs": 6,
     "description": "Structured frameworks for faster, better decisions.",
     "link": "https://example.com/courses/ld03"},
    {"id": "LD04", "title": "Strategic Decision Making for Senior Officials", "domain": "Leadership",
     "skillTags": ["Decision Making"], "level": "Advanced", "durationHrs": 10,
     "description": "Long-term, high-stakes decision frameworks.",
     "link": "https://example.com/courses/ld04"},
    {"id": "GN01", "title": "Time Management for Government Employees", "domain": "General",
     "skillTags": ["Time Management"], "level": "Beginner", "durationHrs": 4,
     "description": "Prioritization and workload management techniques.",
     "link": "https://example.com/courses/gn01"},
    {"id": "GN02", "title": "RTI Act: Practical Guide for Officials", "domain": "General",
     "skillTags": ["Governance", "Compliance"], "level": "Beginner", "durationHrs": 5,
     "description": "Understanding and applying the Right to Information Act in daily work.",
     "link": "https://example.com/courses/gn02"},
]

if __name__ == "__main__":
    for course in sample_courses:
        courses_collection.update_one(
            {"id": course["id"]},
            {"$set": course},
            upsert=True,
        )
    print(f"Seeded {len(sample_courses)} courses.")
