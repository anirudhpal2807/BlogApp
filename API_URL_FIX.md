# Fix 404 Error - API URL Configuration

## Problem
Request going to `/auth/register` instead of `/api/auth/register`

**Error**: `404 Not Found` on `https://blogapp-erv7.onrender.com/auth/register`

**Should be**: `https://blogapp-erv7.onrender.com/api/auth/register`

## Root Cause
Frontend में `REACT_APP_API_URL` environment variable में `/api` missing है या incorrectly configured है।

## Solution Applied ✅

1. **Updated `api.js`** - Automatically ensures `/api` is included
2. **Added URL validation** - Checks if `/api` exists, adds if missing

## Step 1: Check Frontend Environment Variable

Render Dashboard में frontend service पर जाएं:

1. **Settings** → **Environment**
2. Check `REACT_APP_API_URL` value

**Should be:**
```
REACT_APP_API_URL=https://blogapp-erv7.onrender.com/api
```

**NOT:**
```
REACT_APP_API_URL=https://blogapp-erv7.onrender.com  ❌
```

## Step 2: Update Environment Variable

अगर `/api` missing है:

1. Frontend service → Settings → Environment
2. `REACT_APP_API_URL` edit करें
3. Value update करें:
   ```
   https://blogapp-erv7.onrender.com/api
   ```
4. **Save Changes**
5. Frontend will auto-rebuild

## Step 3: Code Changes

`frontend/src/utils/api.js` में fix add की गई है जो automatically `/api` add करेगा अगर missing है।

## Step 4: Redeploy Frontend

1. Code push करें:
   ```bash
   git add .
   git commit -m "Fix API URL configuration"
   git push
   ```

2. Render में frontend automatically rebuild होगा
3. Wait for deployment to complete

## Verify Configuration

### Frontend Environment Variables Should Be:

```
REACT_APP_API_URL=https://blogapp-erv7.onrender.com/api
REACT_APP_TINYMCE_API_KEY=your-key (optional)
```

### Backend Routes:

- ✅ `/api/auth/register` - Correct
- ✅ `/api/auth/login` - Correct
- ✅ `/api/blogs` - Correct
- ❌ `/auth/register` - Wrong (404 error)

## Test After Fix

1. Frontend URL open करें: https://blogapp-1-3wg3.onrender.com
2. Registration try करें
3. Browser console (F12) → Network tab
4. Request URL check करें:
   - Should be: `https://blogapp-erv7.onrender.com/api/auth/register`
   - Not: `https://blogapp-erv7.onrender.com/auth/register`

## Quick Fix Summary

**Render Dashboard → Frontend Service → Environment:**

Update `REACT_APP_API_URL` to:
```
https://blogapp-erv7.onrender.com/api
```

(Note: `/api` at the end is required!)

Save करें और frontend rebuild होगा! 🚀

