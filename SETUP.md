# Quick Setup Guide

## Step-by-Step Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the **project root directory** (not in backend) with the following content:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/blogapp
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

4. **Sync environment files**:
   ```bash
   npm run setup-env
   ```
   This will create `backend/.env` and `frontend/.env` from the root `.env` file.

5. **MongoDB Setup**:
   - Option A: Install MongoDB locally and ensure it's running
   - Option B: Use MongoDB Atlas (free tier available)
     - Create an account at https://www.mongodb.com/cloud/atlas
     - Create a cluster and get your connection string
     - Update `MONGO_URI` in `.env` with your Atlas connection string

6. **Cloudinary Setup**:
   - Create a free account at https://cloudinary.com/
   - Go to Dashboard and copy your:
     - Cloud Name
     - API Key
     - API Secret
   - Update the Cloudinary credentials in `.env`

7. Start the backend server:
   ```bash
   npm run dev
   ```
   The server should start on `http://localhost:5000`

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. The frontend `.env` file will be automatically created by the setup script. If you need to update it manually, run:
   ```bash
   npm run setup-env
   ```
   
   Or create a `.env` file in the `frontend` directory with:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_TINYMCE_API_KEY=your-tinymce-api-key
   ```

4. **TinyMCE Setup** (Optional but recommended):
   - Sign up for a free account at https://www.tiny.cloud/
   - Get your API key from the dashboard
   - Add it to the `.env` file
   - Note: The editor will work without an API key but will show a warning

5. Start the frontend development server:
   ```bash
   npm start
   ```
   The app should open in your browser at `http://localhost:3000`

### 3. Testing the Application

1. **Register a new account**:
   - Go to http://localhost:3000/register
   - Fill in username, email, and password
   - Click Register

2. **Create a blog post**:
   - After logging in, click "New Post"
   - Fill in the title, content (using the rich text editor)
   - Optionally upload a featured image
   - Choose visibility (Public or Private)
   - Click "Publish Blog"

3. **View your blogs**:
   - Click "My Blogs" to see all your posts
   - Click on a blog to view details
   - Edit or delete blogs from the My Blogs page

4. **View public blogs**:
   - Go to the Home page to see all public blogs
   - Click on any blog to read it

## Troubleshooting

### Backend Issues

- **MongoDB Connection Error**: 
  - Ensure MongoDB is running (if using local MongoDB)
  - Check your `MONGO_URI` in `.env`
  - For Atlas, ensure your IP is whitelisted

- **Port Already in Use**:
  - Change the `PORT` in `.env` to a different port (e.g., 5001)
  - Update `REACT_APP_API_URL` in frontend `.env` accordingly

- **Cloudinary Upload Errors**:
  - Verify your Cloudinary credentials in `.env`
  - Check that your Cloudinary account is active

### Frontend Issues

- **API Connection Error**:
  - Ensure the backend server is running
  - Check `REACT_APP_API_URL` in `.env`
  - Verify CORS is enabled in the backend

- **TinyMCE Warning**:
  - Get a free API key from TinyMCE
  - Add it to `REACT_APP_TINYMCE_API_KEY` in `.env`
  - Restart the development server

- **Build Errors**:
  - Delete `node_modules` and `package-lock.json`
  - Run `npm install` again
  - Clear npm cache: `npm cache clean --force`

## Environment Variables Summary

### Root Directory (.env) - Main Configuration File
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRE` - JWT token expiration (default: 7d)
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

### Frontend (.env) - Auto-generated from root
- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_TINYMCE_API_KEY` - TinyMCE API key (optional)

**Note**: All environment variables should be set in the **root `.env` file**. The `setup-env.js` script automatically syncs them to backend and frontend directories.

## Next Steps

- Customize the UI styling
- Add more features (comments, likes, categories)
- Deploy to production (Heroku, Vercel, AWS, etc.)
- Set up proper error logging
- Add unit and integration tests


