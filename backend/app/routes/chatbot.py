from fastapi import APIRouter, Depends, HTTPException

from app.dependencies import get_current_user
from app.schemas import ChatRequest
from app.services.gap_analysis import compute_gaps
from app.services.gemini_client import generate_text

router = APIRouter(prefix="/chatbot", tags=["chatbot"])


def _build_context(current_user: dict) -> str:
    lines = [f"User's job role: {current_user.get('jobRole') or 'not set'}"]

    try:
        gaps = compute_gaps(current_user)
        shortfalls = [g for g in gaps["skillGaps"] if g["gap"] > 0]
        if shortfalls:
            gap_text = ", ".join(f"{g['skill']} (gap: {g['gap']})" for g in shortfalls)
        else:
            gap_text = "no outstanding gaps"
        lines.append(f"Current skill gaps: {gap_text}")
    except HTTPException:
        lines.append("Current skill gaps: not available (jobRole or framework not set)")

    return "\n".join(lines)


@router.post("")
def chat(payload: ChatRequest, current_user: dict = Depends(get_current_user)):
    context = _build_context(current_user)

    prompt = f"""You are a helpful assistant inside a government capacity-building
platform. Answer the official's question below, using the context about
their role and skill gaps where relevant. Keep the answer concise and practical.

Context:
{context}

Question: {payload.message}
"""

    try:
        reply = generate_text(prompt)
    except RuntimeError as exc:
        raise HTTPException(status_code=502, detail=str(exc))

    return {"reply": reply}
