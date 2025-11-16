# TinyMCE API Key Setup Guide

## Problem
TinyMCE editor shows a warning: "A valid API key is required to continue using TinyMCE"

## Solution: Get Free TinyMCE API Key

### Step 1: Sign Up for TinyMCE Cloud (Free)
1. Go to: https://www.tiny.cloud/
2. Click "Get Started Free" or "Sign Up"
3. Create a free account (no credit card required)

### Step 2: Get Your API Key
1. After signing up, go to your Dashboard
2. Navigate to "API Keys" section
3. Copy your API key (it will look like: `abcdefghijklmnopqrstuvwxyz123456`)

### Step 3: Add API Key to Your Project

**Option A: Add to Root .env File (Recommended)**

1. Open or create `.env` file in project root (`C:\MERN_project\A\.env`)
2. Add this line:
   ```env
   REACT_APP_TINYMCE_API_KEY=your-actual-api-key-here
   ```
3. Replace `your-actual-api-key-here` with your actual API key from TinyMCE

**Option B: Add Directly to Frontend .env**

1. Open or create `frontend\.env` file
2. Add:
   ```env
   REACT_APP_TINYMCE_API_KEY=your-actual-api-key-here
   ```

### Step 4: Sync Environment Variables
If you added to root `.env`, run:
```bash
npm run setup-env
```

### Step 5: Restart Frontend Server
1. Stop the current frontend server (Ctrl+C)
2. Start it again:
   ```bash
   cd frontend
   npm run dev
   ```

### Step 6: Refresh Browser
- Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- The warning should disappear and editor should work

## Quick Example .env File

Your root `.env` file should look like this:

```env
# Backend Configuration
PORT=5000
MONGO_URI=mongodb://localhost:27017/blogapp
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Frontend Configuration
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_TINYMCE_API_KEY=your-tinymce-api-key-here
```

## Troubleshooting

**Still seeing the warning?**
- Make sure you restarted the frontend server after adding the API key
- Check that the API key is correct (no extra spaces)
- Verify the `.env` file is in the correct location
- Clear browser cache and hard refresh

**Editor still not working?**
- Check browser console for errors (F12)
- Verify the API key is valid in TinyMCE dashboard
- Make sure you're using the correct environment variable name: `REACT_APP_TINYMCE_API_KEY`

## Alternative: Development Mode (Temporary)

If you need to test immediately without an API key, you can use TinyMCE in development mode, but it will have limitations. Contact me if you need this option.


