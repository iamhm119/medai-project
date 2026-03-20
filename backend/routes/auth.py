from fastapi import APIRouter
from jose import jwt
from datetime import datetime, timedelta
from config import SECRET_KEY, ALGORITHM

router = APIRouter()

def create_token(data: dict) -> str:
    to_encode = data.copy()
    to_encode["exp"] = datetime.utcnow() + timedelta(hours=24)
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/login")
def login(username: str, role: str):
    token = create_token({"username": username, "role": role})
    return {"access_token": token, "token_type": "bearer", "role": role}