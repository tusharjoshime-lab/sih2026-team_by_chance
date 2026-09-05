from datetime import datetime, timezone

from bson import ObjectId
from bson.errors import InvalidId
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Query

from app.database import quizzes_collection, quiz_attempts_collection, uploaded_materials_collection
from app.dependencies import get_current_user
from app.schemas import QuizSubmitRequest
from app.services.text_extraction import extract_text
from app.services.gemini_client import generate_json

router = APIRouter(prefix="/quiz", tags=["quiz"])

MAX_TEXT_CHARS = 15000


def _build_mcq_prompt(text: str, num_questions: int) -> str:
    return f"""You are creating a multiple-choice quiz to test understanding of the
following training material.

Material:
\"\"\"
{text[:MAX_TEXT_CHARS]}
\"\"\"

Create exactly {num_questions} multiple-choice questions based ONLY on this
material. Respond with ONLY a JSON array (no other text before or after it),
where each item has exactly these fields:
- "question": the question text
- "options": an array of exactly 4 answer choices (strings)
- "correctAnswer": the exact text of the correct option (must match one of the 4 options exactly)
- "explanation": one short sentence explaining why that answer is correct

Do not number the questions. Do not include anything outside the JSON array.
"""


@router.post("/generate")
def generate_quiz(
    file: UploadFile = File(...),
    num_questions: int = Query(5, ge=1, le=15),
    current_user: dict = Depends(get_current_user),
):
    filename = file.filename or ""
    file_bytes = file.file.read()

    try:
        text = extract_text(filename, file_bytes)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))

    if not text or not text.strip():
        raise HTTPException(status_code=400, detail="Could not extract any text from this file")

    uploaded_materials_collection.insert_one({
        "userId": current_user["_id"],
        "fileName": filename,
        "extractedText": text[:MAX_TEXT_CHARS],
        "uploadedAt": datetime.now(timezone.utc),
    })

    prompt = _build_mcq_prompt(text, num_questions)

    try:
        raw_questions = generate_json(prompt)
    except RuntimeError as exc:
        raise HTTPException(status_code=502, detail=str(exc))

    if not isinstance(raw_questions, list):
        raise HTTPException(status_code=502, detail="Gemini returned an unexpected response shape")

    # Only keep well-formed questions -- don't trust the model's output blindly.
    valid_questions = []
    for q in raw_questions:
        options = q.get("options") if isinstance(q, dict) else None
        correct = q.get("correctAnswer") if isinstance(q, dict) else None
        if (
            isinstance(q, dict)
            and isinstance(q.get("question"), str)
            and isinstance(options, list) and len(options) == 4
            and correct in options
            and isinstance(q.get("explanation"), str)
        ):
            valid_questions.append({
                "question": q["question"],
                "options": options,
                "correctAnswer": correct,
                "explanation": q["explanation"],
            })

    if not valid_questions:
        raise HTTPException(status_code=502, detail="Gemini did not return any usable questions")

    quiz_doc = {
        "userId": current_user["_id"],
        "sourceFileName": filename,
        "questions": valid_questions,
        "createdAt": datetime.now(timezone.utc),
    }
    result = quizzes_collection.insert_one(quiz_doc)

    # Correct answers/explanations are withheld until submission.
    public_questions = [
        {"index": i, "question": q["question"], "options": q["options"]}
        for i, q in enumerate(valid_questions)
    ]

    return {
        "quizId": str(result.inserted_id),
        "sourceFileName": filename,
        "questions": public_questions,
    }


@router.post("/submit")
def submit_quiz(payload: QuizSubmitRequest, current_user: dict = Depends(get_current_user)):
    try:
        quiz_oid = ObjectId(payload.quizId)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid quizId")

    quiz = quizzes_collection.find_one({"_id": quiz_oid})
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    if quiz["userId"] != current_user["_id"]:
        raise HTTPException(status_code=403, detail="This quiz does not belong to you")

    questions = quiz["questions"]
    answers = payload.answers

    feedback = []
    correct_count = 0
    for i, q in enumerate(questions):
        given = answers[i] if i < len(answers) else None
        is_correct = given == q["correctAnswer"]
        if is_correct:
            correct_count += 1
        feedback.append({
            "question": q["question"],
            "yourAnswer": given,
            "correctAnswer": q["correctAnswer"],
            "isCorrect": is_correct,
            "explanation": q["explanation"],
        })

    total = len(questions)
    score = round((correct_count / total) * 100, 1) if total else 0

    quiz_attempts_collection.insert_one({
        "quizId": quiz_oid,
        "userId": current_user["_id"],
        "answers": answers,
        "score": score,
        "submittedAt": datetime.now(timezone.utc),
    })

    return {
        "score": score,
        "correctCount": correct_count,
        "totalQuestions": total,
        "feedback": feedback,
    }
