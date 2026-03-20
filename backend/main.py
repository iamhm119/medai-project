from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import chat, auth, upload

app = FastAPI(
    title="MedAI API",
    description="Medical AI Assistant API with RAG capabilities",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
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