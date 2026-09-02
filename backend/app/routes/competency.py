from fastapi import APIRouter, Depends

from app.dependencies import get_current_user
from app.services.gap_analysis import compute_gaps

router = APIRouter(prefix="/competency", tags=["competency"])


@router.get("/gaps")
def get_competency_gaps(current_user: dict = Depends(get_current_user)):
    return compute_gaps(current_user)
