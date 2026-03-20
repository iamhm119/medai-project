# Deployment Guide - Railway

This guide will help you deploy the MedAI project to Railway in minutes.

## Prerequisites

1. **GitHub Account** - Push your code to GitHub
2. **Railway Account** - Sign up at https://railway.app
3. **API Keys**:
   - Groq API Key (from https://console.groq.com)
   - Generate a strong SECRET_KEY for JWT

## Step 1: Prepare Your Repository

### 1.1 Initialize Git (if not already done)
```bash
cd /e/medai-project
git init
git add .
git commit -m "Initial commit"
```

### 1.2 Create a .gitignore file
```bash
# Backend
backend/venv/
backend/__pycache__/
backend/.env
backend/faiss_index/
backend/*.db

# Frontend
frontend/node_modules/
frontend/dist/
frontend/.env
frontend/.env.local
```

### 1.3 Push to GitHub
```bash
# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/medai-project.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Railway

### 2.1 Connect Railway to GitHub
1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Railway will auto-detect both services (Dockerfile in backend and frontend)

### 2.2 Configure Backend Service

Railway will create two services: `backend` and `frontend`

**For Backend Service:**
1. Click on the backend service
2. Go to "Variables"
3. Add these environment variables:
   - `GROQ_API_KEY`: Your Groq API key
   - `SECRET_KEY`: Generate with: `openssl rand -hex 32` or use: `python -c "import secrets; print(secrets.token_hex(32))"`
   - `ALGORITHM`: `HS256`

4. Optional - Set Port explicitly:
   - Go to "Settings" → Set PORT to `8000`

### 2.3 Configure Frontend Service

**For Frontend Service:**
1. Click on the frontend service
2. Go to "Variables"
3. Add environment variable:
   - `VITE_API_URL`: This will be your backend URL from Railway
   - Format: `https://your-backend-url.railway.app` (Railway auto-generates this)

4. Set "Start Command" in Settings:
   ```
   serve -s dist -l 3000
   ```

## Step 3: Get Your URLs

After deployment completes:
- **Backend URL**: Will be shown in Railway dashboard (e.g., `https://medai-backend.railway.app`)
- **Frontend URL**: Will be shown in Railway dashboard (e.g., `https://medai-frontend.railway.app`)

## Step 4: Update Frontend with Backend URL

Once you have the backend URL:

1. Go to frontend service → Variables
2. Update `VITE_API_URL` to your backend URL
3. Railway will automatically redeploy

## Troubleshooting

### Backend won't start
- Check logs: Click backend → "Logs" tab
- Verify all environment variables are set
- Ensure `GROQ_API_KEY` is correct

### Frontend can't connect to backend
- Ensure `VITE_API_URL` is set correctly in frontend Variables
- Check browser console for CORS errors
- Verify backend is running and accessible

### FAISS index not persisting
- Railway instances are ephemeral. Consider:
  - Option A: Store FAISS index in cloud storage (S3, Supabase)
  - Option B: Recreate index on each deployment
  - For now, uploads will work but won't persist between restarts

## Scaling & Production Considerations

1. **Database**: Currently using in-memory storage. For production:
   - Add PostgreSQL via Railway
   - Store session/user data persistently

2. **File Storage**: PDFs are temporary. For production:
   - Add AWS S3 or similar for file storage
   - Store file references in database

3. **FAISS Index**: Currently local. For production:
   - Consider: Pinecone, Weaviate, or other vector DB
   - Or backup FAISS index to cloud storage

## Monitoring & Logs

Railway provides:
- **Logs tab**: Real-time application logs
- **Metrics tab**: CPU, memory, requests
- **Deployments tab**: See all deployment history

## Update & Redeploy

To update and redeploy:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Railway automatically redeploys when you push to main!

## Support

- Railway Docs: https://docs.railway.app
- Project Issues: Check Railway logs for debugging
