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

Backend: http://localhost:8000

**Frontend (new terminal):**
```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173

---

## Project Structure

```
medai-project/
├── backend/
│   ├── main.py              # FastAPI app
│   ├── config.py            # Configuration
│   ├── requirements.txt      # Python dependencies
│   ├── render.yaml          # Render deployment config
│   ├── middleware/          # Auth middleware
│   ├── routes/              # API routes
│   └── services/            # Business logic
├── frontend/
│   ├── src/                 # React components
│   ├── vercel.json          # Vercel deployment config
│   ├── package.json         # Node dependencies
│   ├── vite.config.js       # Vite config
│   └── index.html           # Entry point
├── DEPLOYMENT.md            # Deployment guide
└── QUICKSTART.md            # This file
```

---

## Deploy to Production

### Frontend: Deploy on Vercel
1. Go to https://vercel.com
2. Import your GitHub repo
3. Set root directory to `frontend`
4. Add `VITE_API_URL` environment variable
5. Deploy!

### Backend: Deploy on Render
1. Go to https://render.com
2. Create new Web Service
3. Select your GitHub repo
4. Set root path to `backend`
5. Add environment variables
6. Deploy!

See **DEPLOYMENT.md** for detailed step-by-step instructions.

---

## Environment Variables

### Backend (.env or Render)
```
GROQ_API_KEY=your_key_here
SECRET_KEY=your_secret_here
ALGORITHM=HS256
```

### Frontend (.env or Vercel)
```
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## API Endpoints

- `POST /login` - Login
- `POST /chat` - Send message
- `POST /upload` - Upload PDF (admin only)

See http://localhost:8000/docs for full API docs
