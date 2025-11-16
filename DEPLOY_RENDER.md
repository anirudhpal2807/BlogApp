# Deploy to Render - Complete Guide

## Prerequisites
- GitHub account
- Render account (free tier available)
- Your code pushed to GitHub repository

## Step 1: Prepare Your Code

### 1.1 Update Backend for Production

The backend is already configured. Make sure:
- `backend/package.json` has `start` script
- Environment variables are set up correctly

### 1.2 Update Frontend API URL

Before deploying, update the frontend to use the backend URL from Render.

## Step 2: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - Ready for deployment"

# Create repository on GitHub, then:
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy Backend to Render

### 3.1 Create Backend Service

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `blog-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

### 3.2 Set Environment Variables (Backend)

Add these in Render dashboard:

```
NODE_ENV=production
PORT=10000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### 3.3 Deploy Backend

- Click "Create Web Service"
- Wait for deployment to complete
- Copy the backend URL (e.g., `https://blog-backend.onrender.com`)

## Step 4: Deploy Frontend to Render

### 4.1 Create Frontend Service

1. Go to Render dashboard
2. Click "New +" → "Static Site"
3. Connect the same GitHub repository
4. Configure:
   - **Name**: `blog-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`

### 4.2 Set Environment Variables (Frontend)

Add these in Render dashboard:

```
REACT_APP_API_URL=https://blog-backend.onrender.com/api
REACT_APP_TINYMCE_API_KEY=your-tinymce-api-key
```

**Important**: Replace `blog-backend.onrender.com` with your actual backend URL from Step 3.3

### 4.3 Deploy Frontend

- Click "Create Static Site"
- Wait for deployment to complete
- Your frontend will be live!

## Step 5: Update CORS in Backend

Make sure your backend allows requests from your frontend domain.

The backend already has CORS enabled, but you may need to update it for production.

## Step 6: Update MongoDB Atlas (if using)

1. Go to MongoDB Atlas
2. Network Access → Add IP Address
3. Add `0.0.0.0/0` (allows all IPs) OR add Render's IP ranges

## Important Notes

### Free Tier Limitations
- Services spin down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds
- 750 hours/month free

### Environment Variables
- Never commit `.env` files to GitHub
- Always set environment variables in Render dashboard
- Backend URL will be different in production

### URLs Structure
- Backend: `https://blog-backend.onrender.com`
- Frontend: `https://blog-frontend.onrender.com`
- API calls: `https://blog-backend.onrender.com/api/...`

## Troubleshooting

### Backend won't start?
- Check environment variables are set correctly
- Verify MongoDB connection string
- Check build logs in Render dashboard

### Frontend can't connect to backend?
- Verify `REACT_APP_API_URL` is correct
- Check backend URL in frontend environment variables
- Ensure backend is deployed and running

### CORS errors?
- Update CORS settings in backend
- Make sure frontend URL is allowed

## Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed on Render
- [ ] Backend environment variables set
- [ ] Backend URL copied
- [ ] Frontend deployed on Render
- [ ] Frontend environment variables set (with backend URL)
- [ ] MongoDB Atlas IP whitelist updated
- [ ] Test registration/login
- [ ] Test blog creation

## Support

If you face issues:
1. Check Render deployment logs
2. Verify all environment variables
3. Test backend API directly: `https://your-backend.onrender.com/api/health`

