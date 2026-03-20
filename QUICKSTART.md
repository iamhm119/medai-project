# Quick Start Guide

## Local Development

### Using Python Virtual Environment

**Backend:**
```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend will be available at: http://localhost:8000

**Frontend (in a new terminal):**
```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at: http://localhost:5173

### Using Docker Compose

Requirements: Docker & Docker Compose installed

```bash
# Create a .env file in the root directory
echo "GROQ_API_KEY=your_groq_api_key_here" > .env
echo "SECRET_KEY=$(python -c 'import secrets; print(secrets.token_hex(32))')" >> .env

# Build and run
docker-compose up --build

# Access:
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

## Project Structure

```
medai-project/
├── backend/
│   ├── main.py              # FastAPI app entry
│   ├── config.py            # Configuration
│   ├── requirements.txt      # Python dependencies
│   ├── Dockerfile           # Docker image for backend
│   ├── middleware/          # Auth middleware
│   ├── routes/              # API routes (auth, chat, upload)
│   ├── services/            # Business logic (embeddings)
│   └── faiss_index/         # Vector store (local)
├── frontend/
│   ├── src/                 # React components
│   ├── public/              # Static files
│   ├── package.json         # Node dependencies
│   ├── vite.config.js       # Vite configuration
│   ├── Dockerfile           # Docker image for frontend
│   └── index.html           # Entry HTML
├── docker-compose.yml       # Docker Compose config
├── DEPLOYMENT.md            # Deployment guide
├── .gitignore               # Git ignore rules
└── README.md                # Project documentation
```

## API Endpoints

### Authentication
- `POST /login` - Login with username and role
- `GET /protected` - Test protected endpoint

### Chat
- `POST /chat` - Send message to AI

### Upload
- `POST /upload` - Upload PDF for processing (admin only)

See http://localhost:8000/docs for full API documentation

## Environment Variables

### Backend (.env)
```
GROQ_API_KEY=your_groq_api_key_here
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

## Next Steps

1. Install Docker: https://docs.docker.com/install
2. Create GitHub repository
3. Follow DEPLOYMENT.md for Railway setup
4. Monitor logs and metrics in Railway dashboard
