# Deployment Guide - Vercel (Frontend) + Render (Backend)

This guide will deploy your app on Vercel (Frontend) and Render (Backend) - **completely FREE!**

---

## Prerequisites

1. **GitHub Account** ✅ (Already have code pushed)
2. **Vercel Account** - Sign up at https://vercel.com (free, uses GitHub)
3. **Render Account** - Sign up at https://render.com (free)
4. **Groq API Key** - Get from https://console.groq.com
5. **SECRET_KEY** - Run: `python -c "import secrets; print(secrets.token_hex(32))"`

---

## STEP 1: Deploy Backend on Render

### 1.1: Create Render Account
- Go to: https://render.com
- Click "Sign Up"
- Choose "GitHub" to sign up
- Authorize GitHub access

### 1.2: Connect Your Repository
1. Dashboard → Click **"New +"** → **"Web Service"**
2. Select **"Build and deploy from a Git repository"**
3. Click **"Connect account"** (GitHub)
4. Find and select **`medai-project`** repository
5. Click **"Connect"**

### 1.3: Configure Backend Service

Fill in these settings:

```
Name: medai-backend
Environment: Python 3
Region: Oregon (us-west)
Branch: main
Build Command: pip install -r requirements.txt
Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
```

**Important:** Make sure the root path is set to `backend/` or the start command area shows it's looking at backend/main.py

### 1.4: Add Environment Variables

Before deploying, scroll down and add these in "Environment":

```
GROQ_API_KEY = [your Groq API key]
SECRET_KEY = [your generated secret key]
ALGORITHM = HS256
```

### 1.5: Deploy
- Click **"Create Web Service"**
- Wait for deployment (takes 2-3 minutes)
- You'll get a URL like: `https://medai-backend.onrender.com`
- **Save this URL!** You need it for the frontend

#### Check Backend Status
- Click on your service
- Go to "Logs" tab to see if it started correctly

---

## STEP 2: Deploy Frontend on Vercel

### 2.1: Create Vercel Account
- Go to: https://vercel.com
- Click "Sign Up"
- Choose "GitHub"
- Authorize GitHub access

### 2.2: Deploy Project
1. Dashboard → Click **"Add New..."** → **"Project"**
2. Import **`medai-project`** repository
3. Click **"Import"**

### 2.3: Configure Frontend
1. For "Root Directory" - select: **`frontend`**
2. Framework: **React**
3. Build Command: `npm run build` (should auto-detect)
4. Output Directory: `dist` (should auto-detect)

### 2.4: Add Environment Variables
Before deploying, add in "Environment Variables":

```
Name: VITE_API_URL
Value: https://medai-backend.onrender.com
(Use the URL you got from Render backend)
```

### 2.5: Deploy
- Click **"Deploy"**
- Wait for deployment (takes 1-2 minutes)
- You'll get a URL like: `https://medai-frontend.vercel.app`
- **This is your live app!** 🎉

---

## You're Live! 🚀

**Your URLs:**
- **Frontend:** `https://medai-frontend.vercel.app` ← Click here!
- **Backend API:** `https://medai-backend.onrender.com`

---

## How to Test

1. Visit your frontend URL
2. Login (any username works in demo mode)
3. Try uploading a PDF
4. Chat with AI

---

## Make Updates Later

To update your app:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

**Both Vercel and Render automatically redeploy!** ✨

---

## Troubleshooting

### Backend not starting on Render
- Go to service → "Logs" tab
- Check if `GROQ_API_KEY` is set correctly

### Frontend can't connect to backend
- Check browser console (F12 → Console)
- Verify `VITE_API_URL` is set to correct Render backend URL
- Make sure backend service shows "Live" status

### Need to update backend URL in frontend?
- Go to Vercel project → Settings → Environment Variables
- Edit `VITE_API_URL`
- Vercel auto-redeploys

### FAISS storage warning
- Uploads won't persist between restarts
- For production: use Pinecone or S3 storage

---

## Free Tier Limits

**Render (Backend):**
- Sleeps after 15 min of inactivity (free tier)
- First request takes 30 sec to wake up
- Upgrade to paid for always-on

**Vercel (Frontend):**
- 100 GB bandwidth/month
- Unlimited projects
- Always running

---

## Next Steps

1. ✅ Backend deployed on Render
2. ✅ Frontend deployed on Vercel
3. ✅ Environment variables configured
4. ✅ Auto-redeploy on git push
5. 🎉 App is live!

Enjoy your deployed app!
