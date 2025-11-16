# Environment Variables Setup Guide

This project uses a **centralized `.env` file** in the project root directory for easier management.

## Quick Setup

1. **Create `.env` file in project root**:
   ```bash
   cp .env.example .env
   ```

2. **Fill in your environment variables** in the root `.env` file

3. **Run the setup script** to sync to backend and frontend:
   ```bash
   npm run setup-env
   ```

## Environment Variables Structure

### Root `.env` File Location
```
A/
├── .env              ← Main environment file (create this)
├── .env.example      ← Template file
├── backend/
│   └── .env          ← Auto-generated from root (optional)
└── frontend/
    └── .env          ← Auto-generated from root (optional)
```

## Required Variables

### Backend Variables
```env
PORT=5000                                    # Backend server port
MONGO_URI=mongodb://localhost:27017/blogapp  # MongoDB connection string
JWT_SECRET=your-secret-key-here              # JWT signing secret
JWT_EXPIRE=7d                                # JWT token expiration
CLOUDINARY_CLOUD_NAME=your-cloud-name        # Cloudinary cloud name
CLOUDINARY_API_KEY=your-api-key              # Cloudinary API key
CLOUDINARY_API_SECRET=your-api-secret        # Cloudinary API secret
```

### Frontend Variables
```env
REACT_APP_API_URL=http://localhost:5000/api  # Backend API URL
REACT_APP_TINYMCE_API_KEY=your-api-key       # TinyMCE API key (optional)
```

## How It Works

### Backend
- The backend automatically reads from the **root `.env` file** first
- Falls back to `backend/.env` if root `.env` doesn't exist
- Configured in `backend/server.js`

### Frontend
- React apps require `.env` files in the `frontend` directory
- The `setup-env.js` script automatically syncs `REACT_APP_*` variables from root to `frontend/.env`
- Run `npm run setup-env` after updating root `.env`

## Setup Script

The `setup-env.js` script:
- Reads variables from root `.env`
- Extracts backend variables (excludes `REACT_APP_*`)
- Extracts frontend variables (only `REACT_APP_*`)
- Creates/updates `backend/.env` and `frontend/.env`

**Run it whenever you update the root `.env` file:**
```bash
npm run setup-env
```

## Getting API Keys

### MongoDB
- **Local**: Install MongoDB locally or use default connection string
- **Atlas**: Sign up at https://www.mongodb.com/cloud/atlas
  - Create a free cluster
  - Get connection string
  - Update `MONGO_URI` in `.env`

### Cloudinary
1. Sign up at https://cloudinary.com/ (free tier available)
2. Go to Dashboard
3. Copy:
   - Cloud Name
   - API Key
   - API Secret
4. Add to root `.env`

### TinyMCE (Optional)
1. Sign up at https://www.tiny.cloud/ (free tier available)
2. Get your API key from dashboard
3. Add to root `.env` as `REACT_APP_TINYMCE_API_KEY`

## Example `.env` File

```env
# Backend Configuration
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/blogapp?retryWrites=true&w=majority
JWT_SECRET=my-super-secret-jwt-key-12345
JWT_EXPIRE=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=my-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456

# Frontend Configuration
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_TINYMCE_API_KEY=abcdefghijklmnopqrstuvwxyz123456
```

## Troubleshooting

### Backend can't read environment variables
- Ensure root `.env` file exists
- Check that variables don't have quotes (unless needed)
- Restart the backend server after changing `.env`

### Frontend can't connect to backend
- Run `npm run setup-env` after updating root `.env`
- Check `REACT_APP_API_URL` in `frontend/.env`
- Ensure backend server is running
- Restart frontend dev server

### Variables not updating
- Run `npm run setup-env` to sync changes
- Restart both servers after updating `.env`
- Clear browser cache if frontend issues persist

## Security Notes

⚠️ **Never commit `.env` files to version control!**

- `.env` files are already in `.gitignore`
- Use `.env.example` as a template (without real values)
- Use strong, unique values for `JWT_SECRET` in production
- Keep your API keys secure and rotate them regularly

## Production Deployment

For production:
1. Set environment variables in your hosting platform (Heroku, Vercel, AWS, etc.)
2. Don't rely on `.env` files in production
3. Use platform-specific environment variable management
4. Ensure all required variables are set in production environment


