# CORS Error Fix - Frontend URL Configuration

## Problem
CORS error आ रहा है क्योंकि backend frontend URL को allow नहीं कर रहा।

## Your URLs
- **Backend**: https://blogapp-erv7.onrender.com
- **Frontend**: https://blogapp-1-3wg3.onrender.com

## Solution ✅

Backend में `FRONTEND_URL` environment variable add करना होगा।

## Step 1: Render Dashboard में Backend Service Settings

1. Render dashboard में जाएं
2. अपने **backend service** (blogapp-erv7) पर click करें
3. **Settings** → **Environment**

## Step 2: Environment Variable Add करें

**New Environment Variable:**
- **Key**: `FRONTEND_URL`
- **Value**: `https://blogapp-1-3wg3.onrender.com`

**OR** (अगर multiple frontends हैं):
- **Key**: `FRONTEND_URL`
- **Value**: `https://blogapp-1-3wg3.onrender.com`

## Step 3: Save और Redeploy

1. **Save Changes** पर click करें
2. Backend automatically redeploy होगा
3. Wait for deployment to complete (2-3 minutes)

## Step 4: Verify

1. Backend logs check करें - कोई errors नहीं होनी चाहिए
2. Frontend से API call करें - CORS error नहीं आना चाहिए

## Complete Environment Variables for Backend

Backend service में ये सभी variables होने चाहिए:

```
NODE_ENV=production
PORT=10000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
FRONTEND_URL=https://blogapp-1-3wg3.onrender.com
```

## Code Changes Applied ✅

Backend `server.js` में CORS configuration update की गई है:
- Multiple origins support
- Frontend URL automatically allow होगा
- Credentials support enabled

## Quick Fix Summary

**Render Dashboard → Backend Service → Environment → Add:**

```
FRONTEND_URL = https://blogapp-1-3wg3.onrender.com
```

Save करें और backend auto-redeploy होगा!

## Test After Fix

1. Frontend URL open करें: https://blogapp-1-3wg3.onrender.com
2. Registration/Login try करें
3. Browser console (F12) check करें - CORS error नहीं आना चाहिए

## Troubleshooting

### Still Getting CORS Error?
- ✅ Verify `FRONTEND_URL` is exactly: `https://blogapp-1-3wg3.onrender.com`
- ✅ Check backend redeployed successfully
- ✅ Clear browser cache (Ctrl+F5)
- ✅ Check browser console for exact error message

### Multiple Frontends?
अगर multiple frontend URLs हैं, comma-separated list use करें या code में array add करें।

---

**Important**: Backend redeploy होने के बाद ही CORS fix होगा! 🚀

