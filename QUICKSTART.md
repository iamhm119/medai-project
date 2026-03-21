# ⚡ Quick Start Guide – MedAI (Local Setup)

This guide will help you run the project locally.

---

## 🚀 Local Development

### 🔹 Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

👉 Backend running at:
http://localhost:8000

👉 API Docs:
http://localhost:8000/docs

---

### 🔹 Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

👉 Frontend running at:
http://localhost:5173

---

## 🔐 Login Flow

* Enter any username
* Select role:

  * **user** → chat only
  * **admin** → upload + chat
  * **doctor** → extended access

👉 Token is stored in browser (localStorage)

---

## 📄 How to Use

1. Login
2. Upload PDF (admin only)
3. Ask questions like:

   * "What is this document about?"
   * "Summarize the resume"
4. AI responds using document context

---

## 📁 Project Structure

```
medai-project/
├── backend/
│   ├── main.py
│   ├── config.py
│   ├── requirements.txt
│   ├── middleware/
│   ├── routes/
│   └── services/
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── QUICKSTART.md
└── DEPLOYMENT.md
```

---

## 🔑 Environment Variables

### Backend (.env)

```
GROQ_API_KEY=your_api_key
SECRET_KEY=your_secret
ALGORITHM=HS256
```

---

### Frontend (.env)

```
VITE_API_URL=http://localhost:8000
```

---

## 📡 API Endpoints

* POST `/login` → Login user
* GET `/chat` → Ask AI
* POST `/upload` → Upload PDF

---

## ⚠️ Notes

* FAISS index is stored locally
* Upload PDF again if backend restarts
* Token required for chat

---

## ✅ Done!

Run backend + frontend → Login → Upload → Chat 🚀
