from fastapi import APIRouter, Depends, HTTPException

from app.database import competency_framework_collection
from app.dependencies import get_current_user

router = APIRouter(prefix="/competency", tags=["competency"])


@router.get("/gaps")
def get_competency_gaps(current_user: dict = Depends(get_current_user)):
    job_role = current_user.get("jobRole")
    if not job_role:
        raise HTTPException(
            status_code=400,
            detail="Set jobRole on your profile before requesting a gap analysis",
        )

    framework_docs = list(competency_framework_collection.find({"jobRole": job_role}))
    if not framework_docs:
        raise HTTPException(
            status_code=404,
            detail=f"No competency framework found for job role '{job_role}'",
        )

    user_scores = current_user.get("competencyScores", {})

    skill_gaps = []
    for doc in framework_docs:
        domain = doc.get("domain")
        for req in doc.get("requiredSkills", []):
            skill = req.get("skill")
            required_level = req.get("requiredLevel", 0)
            current_level = user_scores.get(skill, 0)
            gap = round(required_level - current_level, 2)
            skill_gaps.append({
                "domain": domain,
                "skill": skill,
                "requiredLevel": required_level,
                "currentLevel": current_level,
                "gap": gap,
                "status": "met" if gap <= 0 else "gap",
            })

    # Biggest gaps first, so the frontend can show priority areas at the top.
    skill_gaps.sort(key=lambda g: g["gap"], reverse=True)

    total_required = sum(g["requiredLevel"] for g in skill_gaps) or 1
    total_achieved = sum(min(g["currentLevel"], g["requiredLevel"]) for g in skill_gaps)
    overall_readiness_percent = round((total_achieved / total_required) * 100, 1)

    return {
        "jobRole": job_role,
        "overallReadinessPercent": overall_readiness_percent,
        "skillGaps": skill_gaps,
    }
