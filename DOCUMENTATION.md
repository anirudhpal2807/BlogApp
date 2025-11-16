# Complete Documentation - MERN Blog Application

## Table of Contents
1. [Project Overview](#project-overview)
2. [Setup & Installation](#setup--installation)
3. [Environment Variables](#environment-variables)
4. [Running the Application](#running-the-application)
5. [Deployment Guide](#deployment-guide)
6. [Troubleshooting](#troubleshooting)

---

## Project Overview

A full-stack blog application built with MongoDB, Express, React, and Node.js. Features user authentication, blog creation with rich text editing, image uploads, and public/private visibility controls.

### Features
- User Authentication (JWT-based)
- Blog CRUD Operations
- Rich Text Editor (Textarea with HTML support)
- Image Upload (Cloudinary)
- Public/Private Blog Visibility
- Responsive UI (Tailwind CSS)

---

## Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image uploads)
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd A
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables** (see Environment Variables section)

4. **Start the application** (see Running the Application section)

---

## Environment Variables

### Root `.env` File

Create a `.env` file in the project root directory:

```env
# Backend Configuration
PORT=5000
MONGO_URI=mongodb://localhost:27017/blogapp
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Frontend Configuration
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_TINYMCE_API_KEY=your-tinymce-api-key
```

### Sync Environment Variables

After creating root `.env`, run:
```bash
npm run setup-env
```

This will automatically create `backend/.env` and `frontend/.env` files.

---

## Running the Application

### Option 1: Run Both Servers Together

From project root:
```bash
npm run dev
```

### Option 2: Run Servers Separately

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

### Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

---

## Deployment Guide

### Deploy to Render

#### Backend Deployment

1. **Create Backend Service**
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `blog-backend`
     - **Environment**: `Node`
     - **Root Directory**: `backend`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free

2. **Add Environment Variables**
   ```
   NODE_ENV=production
   PORT=10000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   JWT_EXPIRE=7d
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   FRONTEND_URL=https://your-frontend-name.onrender.com
   ```

3. **Deploy and copy backend URL**

#### Frontend Deployment

1. **Create Frontend Service**
   - Click "New +" → "Static Site"
   - Connect same GitHub repository
   - Configure:
     - **Name**: `blog-frontend`
     - **Build Command**: `npm install && cd frontend && npm install && CI=false npm run build`
     - **Publish Directory**: `frontend/build`

2. **Add Environment Variables**
   ```
   REACT_APP_API_URL=https://your-backend-name.onrender.com/api
   REACT_APP_TINYMCE_API_KEY=your-tinymce-key
   ```

3. **Deploy**

#### Important Notes
- Backend URL must include `/api` in `REACT_APP_API_URL`
- Update `FRONTEND_URL` in backend after frontend deployment
- Whitelist IP in MongoDB Atlas (add `0.0.0.0/0`)

---

## Troubleshooting

### Common Issues

#### Backend won't start
- Check MongoDB is running
- Verify `.env` file exists and has correct values
- Check port 5000 is available

#### Frontend can't connect to backend
- Verify `REACT_APP_API_URL` is correct (must end with `/api`)
- Ensure backend is running
- Check CORS settings in backend

#### CORS errors
- Update `FRONTEND_URL` in backend environment variables
- Backend will auto-redeploy after saving

#### 404 errors on frontend
- Check `REACT_APP_API_URL` includes `/api`
- Verify `_redirects` file exists in `frontend/public/`
- Check Publish Directory is `frontend/build`

#### Build errors
- Check build logs in Render dashboard
- Verify all dependencies are installed
- Ensure Node version is compatible

### Getting API Keys

**MongoDB Atlas:**
1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Whitelist IP addresses

**Cloudinary:**
1. Sign up at https://cloudinary.com/
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret

**TinyMCE (Optional):**
1. Sign up at https://www.tiny.cloud/
2. Get API key from dashboard

---

## Project Structure

```
A/
├── backend/
│   ├── models/          # User & Blog models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── utils/           # Cloudinary config
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # Auth context
│   │   ├── pages/       # Page components
│   │   └── utils/       # API utilities
│   └── public/          # Static files
├── .env                 # Environment variables (root)
├── package.json         # Root package.json
└── README.md            # Project readme
```

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Blogs
- `GET /api/blogs` - Get all public blogs
- `GET /api/blogs/my-blogs` - Get current user's blogs (protected)
- `GET /api/blogs/:id` - Get a single blog by ID
- `POST /api/blogs` - Create a new blog (protected)
- `PUT /api/blogs/:id` - Update a blog (protected, author only)
- `DELETE /api/blogs/:id` - Delete a blog (protected, author only)

---

## Security Features

- Passwords hashed with bcrypt
- JWT tokens for authentication
- Protected routes on both frontend and backend
- Input validation using express-validator
- CORS enabled for cross-origin requests

---

## License

This project is open source and available under the MIT License.

