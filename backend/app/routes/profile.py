from fastapi import APIRouter, Depends

from app.database import users_collection
from app.dependencies import get_current_user
from app.schemas import UserOut, ProfileUpdate
from app.serializers import user_doc_to_out

router = APIRouter(prefix="/profile", tags=["profile"])


@router.get("", response_model=UserOut)
def get_profile(current_user: dict = Depends(get_current_user)):
    return user_doc_to_out(current_user)


@router.put("", response_model=UserOut)
def update_profile(payload: ProfileUpdate, current_user: dict = Depends(get_current_user)):
    update_data = payload.model_dump(exclude_unset=True)

    if update_data:
        users_collection.update_one({"_id": current_user["_id"]}, {"$set": update_data})

    updated_user = users_collection.find_one({"_id": current_user["_id"]})
    return user_doc_to_out(updated_user)
