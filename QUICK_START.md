# Quick Start Guide

## Prerequisites Checklist

- [ ] Node.js installed (v14+)
- [ ] MongoDB running (local or Atlas)
- [ ] Cloudinary account created
- [ ] TinyMCE API key (optional, free tier available)

## Installation (5 minutes)

### Backend
```bash
cd backend
npm install
# Create .env file (see README.md for template)
npm run dev
```

### Frontend
```bash
cd frontend
npm install
# Create .env file (see README.md for template)
npm start
```

## Environment File Setup

### Root Directory - Create `.env` file in project root
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/blogapp
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

After creating the root `.env` file, run:
```bash
npm run setup-env
```

This will automatically create `backend/.env` and `frontend/.env` from the root file.

## First Steps

1. Start MongoDB
2. Start backend: `cd backend && npm run dev`
3. Start frontend: `cd frontend && npm start`
4. Open http://localhost:3000
5. Register a new account
6. Create your first blog post!

## Key Features Implemented

✅ User registration and login with JWT
✅ Password hashing with bcrypt
✅ Blog CRUD operations
✅ Rich text editor (TinyMCE)
✅ Image upload (Cloudinary)
✅ Public/Private blog visibility
✅ Responsive UI with Tailwind CSS
✅ Protected routes
✅ Error handling and validation

## Project Structure

```
backend/
  ├── models/          # User & Blog models
  ├── routes/          # API routes
  ├── middleware/      # Auth middleware
  ├── utils/           # Cloudinary config
  └── server.js        # Entry point

frontend/
  ├── src/
  │   ├── components/  # Reusable components
  │   ├── context/     # Auth context
  │   ├── pages/       # Page components
  │   └── utils/       # API utilities
  └── public/          # Static files
```

## Common Commands

```bash
# Backend
npm run dev          # Start with nodemon
npm start            # Start production server

# Frontend
npm start            # Start dev server
npm run build        # Build for production
```

## Troubleshooting

**Backend won't start?**
- Check MongoDB is running
- Verify .env file exists and has correct values
- Check port 5000 is available

**Frontend won't connect?**
- Ensure backend is running
- Check REACT_APP_API_URL in .env
- Clear browser cache

**Images not uploading?**
- Verify Cloudinary credentials
- Check file size (max 5MB)
- Ensure image format is supported

For detailed setup, see SETUP.md
For full documentation, see README.md



