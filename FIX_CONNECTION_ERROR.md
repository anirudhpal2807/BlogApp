# Fix ERR_CONNECTION_REFUSED Error

## Problem
Backend server is not running on port 5000, causing registration and API calls to fail.

## Solution Steps

### Step 1: Check MongoDB is Running

**Option A: Local MongoDB**
```bash
# Check if MongoDB service is running
# Windows: Open Services (services.msc) and check "MongoDB" service
# Or check if mongod.exe is running
```

**Option B: MongoDB Atlas (Cloud)**
- Make sure your MONGO_URI in .env is correct
- Format: `mongodb+srv://username:password@cluster.mongodb.net/blogapp`

### Step 2: Verify .env File

Check your root `.env` file has:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/blogapp
# OR for Atlas:
# MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/blogapp
```

### Step 3: Start Backend Server

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

You should see:
```
MongoDB connected successfully
Server running on port 5000
```

### Step 4: Start Frontend Server

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 5: Test Connection

Open browser: http://localhost:5000/api/health
Should see: `{"message":"Server is running"}`

## Quick Fix Commands

```bash
# 1. Sync environment files
npm run setup-env

# 2. Start backend (in one terminal)
cd backend
npm run dev

# 3. Start frontend (in another terminal)
cd frontend
npm run dev
```

## Common Issues

### MongoDB Connection Error
- **Local MongoDB**: Start MongoDB service
- **Atlas**: Check connection string, whitelist IP address

### Port Already in Use
- Change PORT in .env to 5001 or another port
- Update REACT_APP_API_URL in frontend .env

### Still Not Working?
1. Check backend terminal for error messages
2. Verify .env file exists and has correct values
3. Make sure MongoDB is accessible

