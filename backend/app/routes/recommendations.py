from fastapi import APIRouter, Depends, HTTPException

from app.dependencies import get_current_user
from app.services.gap_analysis import compute_gaps
from app.services.course_catalogue import get_all_courses
from app.services.gemini_client import generate_json

router = APIRouter(prefix="/recommendations", tags=["recommendations"])


def _build_prompt(job_role: str, skill_gaps: list, courses: list) -> str:
    gaps_with_shortfall = [g for g in skill_gaps if g["gap"] > 0]

    if gaps_with_shortfall:
        gap_lines = "\n".join(
            f"- {g['skill']} (domain: {g['domain']}): required level {g['requiredLevel']}, "
            f"current level {g['currentLevel']}, gap {g['gap']}"
            for g in gaps_with_shortfall
        )
    else:
        gap_lines = "No outstanding skill gaps -- all required skills are already met."

    course_lines = "\n".join(
        f"- id: {c.get('id')}, title: {c.get('title')}, domain: {c.get('domain')}, "
        f"skillTags: {c.get('skillTags')}, level: {c.get('level')}, "
        f"durationHrs: {c.get('durationHrs')}"
        for c in courses
    )

    return f"""You are recommending training courses to a government official.

Job role: {job_role}

Skill gaps, largest first:
{gap_lines}

Available courses:
{course_lines}

Pick the TOP 5 courses from the list above that would best close this
person's skill gaps. Respond with ONLY a JSON array (no other text before
or after it), where each item has exactly these two fields:
- "id": the exact course id from the list above
- "justification": one short sentence explaining why this course was picked

Order the array from most to least recommended. Only use ids that appear
in the course list above.
"""


@router.get("")
def get_recommendations(current_user: dict = Depends(get_current_user)):
    gap_result = compute_gaps(current_user)
    courses = get_all_courses()

    if not courses:
        raise HTTPException(status_code=404, detail="No courses in the catalogue yet")

    prompt = _build_prompt(gap_result["jobRole"], gap_result["skillGaps"], courses)

    try:
        raw_recommendations = generate_json(prompt)
    except RuntimeError as exc:
        raise HTTPException(status_code=502, detail=str(exc))

    if not isinstance(raw_recommendations, list):
        raise HTTPException(status_code=502, detail="Gemini returned an unexpected response shape")

    # Don't trust the model to echo back full course details accurately --
    # look each id up against our own data and drop anything it hallucinated.
    courses_by_id = {c.get("id"): c for c in courses}
    enriched = []
    for rec in raw_recommendations:
        course = courses_by_id.get(rec.get("id"))
        if not course:
            continue
        enriched.append({**course, "justification": rec.get("justification")})

    return {
        "jobRole": gap_result["jobRole"],
        "recommendations": enriched[:5],
    }
