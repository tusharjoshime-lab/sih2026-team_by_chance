from fastapi import APIRouter, Depends, HTTPException

from app.database import quiz_attempts_collection, users_collection
from app.dependencies import get_current_user, require_admin
from app.services.gap_analysis import compute_gaps

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/employee")
def employee_dashboard(current_user: dict = Depends(get_current_user)):
    user_id = current_user["_id"]

    attempts = list(quiz_attempts_collection.find({"userId": user_id}).sort("submittedAt", -1))
    attempt_count = len(attempts)
    average_score = round(sum(a["score"] for a in attempts) / attempt_count, 1) if attempt_count else 0

    recent_attempts = [
        {
            "quizId": str(a["quizId"]),
            "score": a["score"],
            "submittedAt": a["submittedAt"].isoformat(),
        }
        for a in attempts[:5]
    ]

    gap_summary = None
    if current_user.get("jobRole"):
        try:
            gap_summary = compute_gaps(current_user)
        except HTTPException:
            gap_summary = None  # no framework configured for this role yet

    return {
        "name": current_user.get("name"),
        "jobRole": current_user.get("jobRole"),
        "quizzesTaken": attempt_count,
        "averageScore": average_score,
        "recentAttempts": recent_attempts,
        "competencyGaps": gap_summary,
    }


@router.get("/admin")
def admin_dashboard(current_user: dict = Depends(require_admin)):
    total_users = users_collection.count_documents({})
    all_attempts = list(quiz_attempts_collection.find({}))
    total_attempts = len(all_attempts)
    org_average_score = (
        round(sum(a["score"] for a in all_attempts) / total_attempts, 1)
        if total_attempts else 0
    )

    # Headcount + average readiness per job role, using the same gap logic
    # as the individual dashboard so the numbers are always consistent.
    role_breakdown: dict = {}
    for user in users_collection.find({}):
        role = user.get("jobRole") or "Unspecified"
        bucket = role_breakdown.setdefault(role, {"headcount": 0, "readinessSum": 0, "readinessCount": 0})
        bucket["headcount"] += 1
        if user.get("jobRole"):
            try:
                gaps = compute_gaps(user)
                bucket["readinessSum"] += gaps["overallReadinessPercent"]
                bucket["readinessCount"] += 1
            except HTTPException:
                pass

    role_summary = [
        {
            "jobRole": role,
            "headcount": data["headcount"],
            "averageReadinessPercent": (
                round(data["readinessSum"] / data["readinessCount"], 1)
                if data["readinessCount"] else None
            ),
        }
        for role, data in role_breakdown.items()
    ]

    return {
        "totalUsers": total_users,
        "totalQuizAttempts": total_attempts,
        "orgAverageScore": org_average_score,
        "roleBreakdown": role_summary,
    }
