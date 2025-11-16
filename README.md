# MERN Stack Blog Application

A full-stack blog application built with MongoDB, Express, React, and Node.js. Features user authentication, blog creation with rich text editing, image uploads, and public/private visibility controls.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Blog Management**: Create, read, update, and delete blog posts
- **Rich Text Editor**: TinyMCE integration for formatted content
- **Image Upload**: Cloudinary integration for featured images
- **Privacy Controls**: Public and private blog visibility options
- **Responsive Design**: Modern UI built with Tailwind CSS

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Cloudinary for image storage
- Multer for file uploads

### Frontend
- React 18
- React Router for navigation
- TinyMCE for rich text editing
- Axios for API calls
- Tailwind CSS for styling
- React Toastify for notifications

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image uploads)
- TinyMCE API key (free tier available)

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd A
```

### 2. Environment Setup

Create a `.env` file in the **project root directory** (not in backend or frontend):

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

**Note**: You can copy `.env.example` to `.env` and fill in your values.

After creating the root `.env` file, run the setup script to sync environment variables:

```bash
npm run setup-env
```

This will automatically create/update `backend/.env` and `frontend/.env` files from the root `.env`.

### 3. Backend Setup

```bash
cd backend
npm install
```

The backend will automatically read from the root `.env` file (with fallback to `backend/.env`).

### 4. Frontend Setup

```bash
cd ../frontend
npm install
```

**Note**: For TinyMCE, you'll need to get a free API key from [TinyMCE](https://www.tiny.cloud/). Sign up for a free account and add your API key to the root `.env` file. The editor will work without an API key in development mode, but you'll see a warning message.

## Running the Application

### Option 1: Run Both Servers Together (Recommended)

From the project root:

```bash
npm run dev
```

This will start both backend and frontend servers concurrently.

### Option 2: Run Servers Separately

**Start MongoDB**: Make sure MongoDB is running on your system. If using MongoDB Atlas, ensure your connection string is correct in the root `.env` file.

**Start Backend Server**:
```bash
cd backend
npm run dev
```
The backend server will run on `http://localhost:5000`

**Start Frontend Development Server** (in a new terminal):
```bash
cd frontend
npm start
```
The frontend will run on `http://localhost:3000`

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

## Project Structure

```
A/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Blog.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── blogs.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   └── cloudinary.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── MyBlogs.js
│   │   │   ├── Editor.js
│   │   │   └── BlogDetail.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Usage

1. **Register/Login**: Create an account or login to access protected features
2. **Create Blog**: Click "New Post" to create a blog with title, content, featured image, and visibility settings
3. **View Blogs**: 
   - Home page shows all public blogs
   - My Blogs page shows your own blogs (public and private)
4. **Edit/Delete**: Manage your blogs from the My Blogs page
5. **Privacy**: Set blogs as public (visible to everyone) or private (only visible to you)

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens for secure authentication
- Protected routes on both frontend and backend
- Input validation using express-validator
- CORS enabled for cross-origin requests

## Notes

- For production, ensure all environment variables are properly set
- Use a strong JWT_SECRET in production
- Configure CORS properly for your domain
- Set up proper error logging and monitoring
- Consider rate limiting for API endpoints

## License

This project is open source and available under the MIT License.

