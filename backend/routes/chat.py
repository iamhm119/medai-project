from fastapi import APIRouter, Depends
from middleware.auth_middleware import get_current_user
from services.rag import get_response

router = APIRouter()

@router.get("/chat")
def chat(query: str, user=Depends(get_current_user)):
    return get_response(query, user["role"])