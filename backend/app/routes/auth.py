from datetime import datetime
from fastapi import APIRouter, HTTPException, status
from pymongo.errors import DuplicateKeyError

from app.database import users_collection
from app.schemas import UserRegister, UserLogin, TokenResponse, UserOut
from app.security import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])


def _user_doc_to_out(doc: dict) -> UserOut:
    """Convert a raw MongoDB document into the safe UserOut shape (never leaks passwordHash)."""
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


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(payload: UserRegister):
    new_user = {
        "name": payload.name,
        "email": payload.email.lower(),
        "passwordHash": hash_password(payload.password),
        "designation": payload.designation,
        "department": payload.department,
        "jobRole": payload.jobRole,
        "education": payload.education,
        "experience": [],
        "previousTrainings": [],
        "competencyScores": {},
        "createdAt": datetime.utcnow(),
    }

    try:
        result = users_collection.insert_one(new_user)
    except DuplicateKeyError:
        # The unique index on "email" (set up in database.py) rejected this insert.
        raise HTTPException(status_code=400, detail="An account with this email already exists")

    new_user["_id"] = result.inserted_id
    token = create_access_token({"sub": str(result.inserted_id)})
    return TokenResponse(access_token=token, user=_user_doc_to_out(new_user))


@router.post("/login", response_model=TokenResponse)
def login(payload: UserLogin):
    user = users_collection.find_one({"email": payload.email.lower()})

    # Deliberately vague error message (don't reveal whether it was the email
    # or the password that was wrong -- that's a basic security practice).
    if not user or not verify_password(payload.password, user["passwordHash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"sub": str(user["_id"])})
    return TokenResponse(access_token=token, user=_user_doc_to_out(user))
