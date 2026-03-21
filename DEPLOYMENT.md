# 🧪 Deployment Guide (Local Development Only)

This project is currently configured for **local execution only**.

---

## 🖥️ Running the Project Locally

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

👉 Runs at:
http://localhost:8000

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

👉 Runs at:
http://localhost:5173

---

## 🔗 Connecting Frontend to Backend

Make sure frontend uses:

```
VITE_API_URL=http://localhost:8000
```

---

## 🔐 Authentication

* Login generates JWT token
* Token stored in localStorage
* Sent via Authorization header

---

## 📄 Features Available Locally

* Login system (role-based)
* PDF upload (admin only)
* RAG-based AI responses
* Chat interface

---

## ⚠️ Important Notes

* Data (FAISS index) is stored locally
* Restarting backend may reset uploaded documents
* No cloud storage configured

---

## 🛠️ Future Deployment (Optional)

For production, you can later deploy using:

* Backend → Cloud server
* Frontend → Static hosting

---

## ✅ Status

✔ Fully functional locally
✔ Ready for testing and development

---

Enjoy building 🚀
