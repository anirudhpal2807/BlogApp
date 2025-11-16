# Render Deployment - Step by Step

## 🚀 Quick Deployment Guide

### Part 1: Prepare Your Code

#### 1. Make sure your code is ready:
```bash
# Check if git is initialized
git status

# If not, initialize git
git init
git add .
git commit -m "Ready for deployment"
```

#### 2. Push to GitHub:
```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

### Part 2: Deploy Backend

#### Step 1: Create Backend Service
1. Go to https://render.com
2. Sign up/Login (use GitHub for easy connection)
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Select your repository

#### Step 2: Configure Backend
- **Name**: `blog-backend` (or any name you like)
- **Environment**: `Node`
- **Region**: Choose closest to you
- **Branch**: `main` (or your main branch)
- **Root Directory**: Leave empty (or `backend` if you want)
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`
- **Plan**: Free

#### Step 3: Add Environment Variables
Click "Advanced" → "Add Environment Variable" and add:

```
NODE_ENV = production
PORT = 10000
MONGO_URI = mongodb+srv://your-username:password@cluster.mongodb.net/blogapp?retryWrites=true&w=majority
JWT_SECRET = your-secret-key-here
JWT_EXPIRE = 7d
CLOUDINARY_CLOUD_NAME = your-cloudinary-cloud-name
CLOUDINARY_API_KEY = your-cloudinary-api-key
CLOUDINARY_API_SECRET = your-cloudinary-api-secret
FRONTEND_URL = https://your-frontend-name.onrender.com
```

**Important**: 
- Replace all `your-*` values with your actual values
- You'll get `FRONTEND_URL` after deploying frontend (can update later)

#### Step 4: Deploy
- Click **"Create Web Service"**
- Wait 5-10 minutes for first deployment
- Copy your backend URL (e.g., `https://blog-backend.onrender.com`)

#### Step 5: Test Backend
Open in browser: `https://your-backend-name.onrender.com/api/health`
Should see: `{"message":"Server is running"}`

---

### Part 3: Deploy Frontend

#### Step 1: Create Frontend Service
1. In Render dashboard, click **"New +"** → **"Static Site"**
2. Connect the same GitHub repository

#### Step 2: Configure Frontend
- **Name**: `blog-frontend` (or any name)
- **Branch**: `main`
- **Root Directory**: Leave empty
- **Build Command**: `cd frontend && npm install && npm run build`
- **Publish Directory**: `frontend/build`

#### Step 3: Add Environment Variables
Click "Environment" and add:

```
REACT_APP_API_URL = https://your-backend-name.onrender.com/api
REACT_APP_TINYMCE_API_KEY = your-tinymce-api-key
```

**Important**: Replace `your-backend-name` with your actual backend service name from Part 2.

#### Step 4: Deploy
- Click **"Create Static Site"**
- Wait 5-10 minutes for build
- Your frontend will be live!

#### Step 5: Update Backend CORS
1. Go back to your backend service
2. Go to "Environment" tab
3. Update `FRONTEND_URL` to your frontend URL:
   ```
   FRONTEND_URL = https://your-frontend-name.onrender.com
   ```
4. Click "Save Changes" (will auto-redeploy)

---

### Part 4: Update MongoDB Atlas

1. Go to MongoDB Atlas dashboard
2. Click "Network Access"
3. Click "Add IP Address"
4. Click "Allow Access from Anywhere" (adds `0.0.0.0/0`)
   - OR add Render's specific IP ranges
5. Click "Confirm"

---

### Part 5: Test Your Deployment

1. **Test Backend**: 
   - Visit: `https://your-backend.onrender.com/api/health`
   - Should return: `{"message":"Server is running"}`

2. **Test Frontend**:
   - Visit: `https://your-frontend.onrender.com`
   - Should see your blog app

3. **Test Registration**:
   - Try creating an account
   - Should work if everything is configured correctly

---

## 🔧 Troubleshooting

### Backend Issues

**Problem**: Backend won't start
- ✅ Check all environment variables are set
- ✅ Verify MongoDB connection string is correct
- ✅ Check build logs in Render dashboard

**Problem**: MongoDB connection error
- ✅ Whitelist IP in MongoDB Atlas
- ✅ Check connection string format
- ✅ Verify database name in connection string

### Frontend Issues

**Problem**: Can't connect to backend
- ✅ Verify `REACT_APP_API_URL` is correct
- ✅ Check backend is deployed and running
- ✅ Ensure backend URL includes `/api` at the end

**Problem**: CORS errors
- ✅ Update `FRONTEND_URL` in backend environment variables
- ✅ Backend will auto-redeploy after saving

### General Issues

**Problem**: Services are slow
- ⚠️ Free tier spins down after 15 min inactivity
- ⚠️ First request after spin-down takes ~30 seconds
- 💡 Consider upgrading to paid plan for always-on

**Problem**: Build fails
- ✅ Check build logs in Render
- ✅ Verify all dependencies in package.json
- ✅ Ensure build commands are correct

---

## 📝 Important URLs

After deployment, you'll have:
- **Backend**: `https://your-backend-name.onrender.com`
- **Frontend**: `https://your-frontend-name.onrender.com`
- **API Health**: `https://your-backend-name.onrender.com/api/health`

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Backend service created on Render
- [ ] Backend environment variables set
- [ ] Backend deployed successfully
- [ ] Backend URL copied
- [ ] Frontend service created on Render
- [ ] Frontend environment variables set (with backend URL)
- [ ] Frontend deployed successfully
- [ ] MongoDB Atlas IP whitelisted
- [ ] Backend CORS updated with frontend URL
- [ ] Tested registration
- [ ] Tested login
- [ ] Tested blog creation

---

## 🎉 You're Done!

Your blog application is now live on Render!

**Next Steps**:
- Share your frontend URL with others
- Monitor your services in Render dashboard
- Check logs if any issues occur

