from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import chat, auth, upload
import os

app = FastAPI(
    title="MedAI API",
    description="Medical AI Assistant API with RAG capabilities",
    version="1.0.0"
)

# Allow CORS from all origins in production (JWT tokens provide security)
# Can be restricted to specific origins via environment variable if needed
allowed_origins = os.getenv("CORS_ORIGINS", "*").split(",") if os.getenv("CORS_ORIGINS") != "*" else ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, tags=["Authentication"])
app.include_router(chat.router, tags=["Chat"])
app.include_router(upload.router, tags=["Upload"])

@app.get("/", tags=["Health"])
def health_check():
    return {"status": "healthy", "service": "MedAI API"}