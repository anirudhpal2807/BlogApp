# How to Start Backend and Frontend Servers

## Problem: ERR_CONNECTION_REFUSED
This error means the backend server is not running on port 5000.

## Solution: Start Both Servers

### Option 1: Start Both Together (Recommended)

From project root directory:
```bash
npm run dev
```

This starts both backend and frontend servers simultaneously.

### Option 2: Start Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Verify Servers Are Running

### Check Backend (Port 5000):
- Open browser: http://localhost:5000/api/health
- Should see: `{"message":"Server is running"}`

### Check Frontend (Port 3000):
- Open browser: http://localhost:3000
- Should see the blog application

## Common Issues

### Backend won't start?
1. Check MongoDB is running
2. Verify `.env` file exists in project root
3. Check MongoDB connection string in `.env`:
   ```
   MONGO_URI=mongodb://localhost:27017/blogapp
   ```

### Port already in use?
- Backend: Change `PORT` in `.env` file
- Frontend: React will prompt to use different port

### Still getting ERR_CONNECTION_REFUSED?
1. Make sure backend server is running
2. Check backend terminal for errors
3. Verify port 5000 is not blocked by firewall
4. Restart both servers

## Quick Commands

```bash
# Start both servers
npm run dev

# Start only backend
cd backend && npm run dev

# Start only frontend  
cd frontend && npm run dev

# Check if servers are running
netstat -ano | findstr :5000  # Backend
netstat -ano | findstr :3000  # Frontend
```

