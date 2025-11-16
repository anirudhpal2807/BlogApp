# How to Run Frontend and Backend

## Quick Start - Run Both Servers Together

From the **project root directory**, run:

```bash
npm run dev
```

This will start both backend and frontend servers simultaneously with colored output:
- **Backend** (blue) - runs on http://localhost:5000
- **Frontend** (green) - runs on http://localhost:3000

## Available Scripts

### From Project Root Directory

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both backend and frontend in development mode |
| `npm run server` | Start only backend server (development mode) |
| `npm run client` | Start only frontend server (development mode) |
| `npm start` | Start both servers in production mode |
| `npm run setup-env` | Sync environment variables from root .env |
| `npm run install-all` | Install all dependencies (root, backend, frontend) |
| `npm run build` | Build frontend for production |

### From Backend Directory

| Command | Description |
|---------|-------------|
| `npm run dev` | Start backend with nodemon (auto-restart) |
| `npm start` | Start backend in production mode |

### From Frontend Directory

| Command | Description |
|---------|-------------|
| `npm run dev` | Start React development server |
| `npm start` | Start React development server (same as dev) |
| `npm run build` | Build for production |

## Step-by-Step Setup

1. **Install dependencies** (first time only):
   ```bash
   npm run install-all
   ```

2. **Set up environment variables**:
   - Create `.env` file in project root
   - Run: `npm run setup-env`

3. **Start both servers**:
   ```bash
   npm run dev
   ```

## Running Servers Separately

If you prefer to run servers in separate terminals:

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

## Troubleshooting

### "concurrently" command not found
Install dependencies in root:
```bash
npm install
```

### Port already in use
- Backend: Change `PORT` in `.env` file
- Frontend: React will prompt to use a different port

### Scripts not working
Make sure you're in the correct directory:
- For `npm run dev` → project root
- For individual servers → respective directories

## Notes

- Backend runs on: http://localhost:5000
- Frontend runs on: http://localhost:3000
- Backend uses nodemon for auto-restart in dev mode
- Frontend uses React's hot-reload in dev mode


