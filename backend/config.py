import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
SECRET_KEY = os.getenv("SECRET_KEY", "change-this-secret-key-in-production")
ALGORITHM = os.getenv("ALGORITHM", "HS256")

if not GROQ_API_KEY:
    print("Warning: GROQ_API_KEY not set. Chat functionality will not work.")