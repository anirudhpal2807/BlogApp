# Registration Error Fix - ERR_CONNECTION_REFUSED

## Problem Fixed ✅
- Backend server was not running
- .env file had wrong variable names
- PORT was set to 3000 instead of 5000

## What Was Fixed

1. **Updated .env file variables:**
   - Changed `DB_CONNECT_STRING` → `MONGO_URI`
   - Changed `JWT_KEY` → `JWT_SECRET`
   - Changed `PORT=3000` → `PORT=5000`
   - Added `JWT_EXPIRE=7d`
   - Added `REACT_APP_API_URL=http://localhost:5000/api`

2. **Fixed MONGO_URI:**
   - Added database name: `blogapp`
   - Full connection string now correct

3. **Started Backend Server:**
   - Backend is now running on port 5000

## Verify It's Working

1. **Check Backend:**
   - Open: http://localhost:5000/api/health
   - Should see: `{"message":"Server is running"}`

2. **Try Registration:**
   - Go to: http://localhost:3000/register
   - Fill in the form
   - Registration should work now!

## If Still Not Working

1. **Check Backend Terminal:**
   - Look for: "MongoDB connected successfully"
   - Look for: "Server running on port 5000"

2. **Restart Servers:**
   ```bash
   # Stop both servers (Ctrl+C)
   # Then restart:
   
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

3. **Check MongoDB Connection:**
   - Verify MongoDB Atlas cluster is running
   - Check if IP is whitelisted in Atlas

## Current .env Configuration

```
PORT=5000
MONGO_URI=mongodb+srv://...@blog.wbbhzpl.mongodb.net/blogapp?appName=BLOG
JWT_SECRET=...
JWT_EXPIRE=7d
REACT_APP_API_URL=http://localhost:5000/api
```

Everything should work now! 🎉

