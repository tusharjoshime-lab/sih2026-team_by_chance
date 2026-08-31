"""
Run this once to insert a couple of sample competencyFramework documents,
so /competency/gaps has something to compare against while testing.

Usage:
    python seed_competency_framework.py

This is meant to be replaced later with the real framework data once the
research/domain member finalizes it -- these are placeholder values only.
"""
from app.database import competency_framework_collection

sample_frameworks = [
    {
        "jobRole": "Assistant Section Officer",
        "domain": "Digital Literacy",
        "requiredSkills": [
            {"skill": "MS Excel", "requiredLevel": 7},
            {"skill": "Email Communication", "requiredLevel": 6},
            {"skill": "Data Entry", "requiredLevel": 5},
        ],
    },
    {
        "jobRole": "Assistant Section Officer",
        "domain": "Communication",
        "requiredSkills": [
            {"skill": "Report Writing", "requiredLevel": 6},
            {"skill": "Public Speaking", "requiredLevel": 4},
        ],
    },
    {
        "jobRole": "Section Officer",
        "domain": "Leadership",
        "requiredSkills": [
            {"skill": "Team Management", "requiredLevel": 7},
            {"skill": "Decision Making", "requiredLevel": 8},
        ],
    },
]

if __name__ == "__main__":
    for doc in sample_frameworks:
        competency_framework_collection.update_one(
            {"jobRole": doc["jobRole"], "domain": doc["domain"]},
            {"$set": doc},
            upsert=True,
        )
    print(f"Seeded {len(sample_frameworks)} competency framework documents.")
