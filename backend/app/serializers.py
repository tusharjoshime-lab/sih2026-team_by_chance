from app.schemas import UserOut


def user_doc_to_out(doc: dict) -> UserOut:
    return UserOut(
        id=str(doc["_id"]),
        name=doc.get("name"),
        email=doc.get("email"),
        designation=doc.get("designation"),
        department=doc.get("department"),
        jobRole=doc.get("jobRole"),
        education=doc.get("education"),
        experience=doc.get("experience", []),
        previousTrainings=doc.get("previousTrainings", []),
        competencyScores=doc.get("competencyScores", {}),
    )
