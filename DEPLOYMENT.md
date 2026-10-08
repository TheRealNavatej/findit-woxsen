# 🚀 FindIt — Woxsen University Deployment Guide

This guide provides step-by-step instructions for deploying the **FindIt Woxsen University Lost & Found Platform** to the public internet.

---

## 🏗️ Architecture Overview

- **Frontend:** React 18 + Vite + Tailwind CSS + Lucide Icons
- **Backend:** Node.js + Express (ES Modules)
- **Database:** MongoDB Atlas (with seamless fallback to built-in in-memory store if DB is omitted)
- **Security:** JWT authentication, bcrypt passwords, CORS headers, SPA routing fallback

---

## ⚠️ Important: Git Initialization
When pushing this repository to GitHub, make sure you initialize git inside the `findit-woxsen` project folder:
```bash
cd findit-woxsen
git init
git add .
git commit -m "Initial commit for FindIt Woxsen deployment"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

---

## 🌟 Method 1: All-In-One Unified Deployment (Recommended)
*Deploy both frontend and backend on a single free cloud web service (e.g. Render, Railway).*

### Option A: 1-Click Blueprint on Render (Easiest)
Because this repository includes a [`render.yaml`](render.yaml) blueprint file:
1. Push your repository to **GitHub**.
2. Sign in to [Render.com](https://render.com).
3. Click **"Blueprints"** in the top navigation → **"New Blueprint Instance"**.
4. Select your GitHub repository.
5. Render reads `render.yaml` automatically, provisions the Node service, generates `JWT_SECRET`, configures `/api/health`, runs the build, and launches your app!

### Option B: Manual Web Service on Render
1. Push your code to GitHub.
2. Sign in to [Render.com](https://render.com).
3. Click **"New +"** → **"Web Service"**.
4. Connect your GitHub repository.
5. Configure the following settings:
   - **Name:** `findit-woxsen`
   - **Environment:** `Node`
   - **Region:** Any (e.g., Singapore or Frankfurt)
   - **Branch:** `main`
   - **Root Directory:** *(leave blank / repository root)*
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/api/health`
6. Add **Environment Variables**:
   | Variable | Value | Notes |
   | :--- | :--- | :--- |
   | `NODE_ENV` | `production` | Enables production optimizations |
   | `PORT` | `10000` | (Default on Render) |
   | `JWT_SECRET` | `woxsen_findit_secret_key_2026_production` | Your secure token signing key |
   | `MONGODB_URI` | *(Optional)* | Paste your MongoDB Atlas URI, or leave blank to use the built-in memory store |
7. Click **"Create Web Service"**. Render will run `npm run build` (compiles the client) and `npm start` (serves both API and client at `https://findit-woxsen.onrender.com`).


---

### Option B: Deploy on Railway (Free / Hobby)
1. Sign in to [Railway.app](https://railway.app).
2. Click **"New Project"** → **"Deploy from GitHub repo"**.
3. Select your repository.
4. Go to **Settings**:
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
5. Go to **Variables** and add:
   - `JWT_SECRET=woxsen_findit_secret_key_2026_production`
   - `NODE_ENV=production`
6. Click **Generate Domain** under Networking.

---

## ⚡ Method 2: Split Deployment (Vercel Frontend + Render Backend)

If you prefer deploying the frontend and backend on separate platforms:

### Step 1: Deploy Backend on Render
1. Create a new **Web Service** on Render.
2. Set **Root Directory:** `server`
3. Set **Build Command:** `npm install`
4. Set **Start Command:** `npm start`
5. Set Environment Variables:
   - `PORT=5001`
   - `NODE_ENV=production`
   - `JWT_SECRET=woxsen_findit_secret_key_2026_production`
   - `CLIENT_URL=https://your-frontend-app.vercel.app` *(update after Step 2)*
6. Copy your public backend URL: `https://findit-backend.onrender.com`.

### Step 2: Deploy Frontend on Vercel
1. Sign in to [Vercel.com](https://vercel.com).
2. Click **"Add New"** → **"Project"** and select your repository.
3. Configure project settings:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. In **Environment Variables**, add:
   - `VITE_API_URL=https://findit-backend.onrender.com/api`
5. Click **"Deploy"**. Vercel will build and assign your live URL (e.g. `https://findit-woxsen.vercel.app`).
6. Go back to Render and update `CLIENT_URL` with your Vercel URL.

---

## 📋 Required Environment Variables Reference

### Backend (`server/.env`):
| Variable | Required? | Example Value | Description |
| :--- | :---: | :--- | :--- |
| `PORT` | Yes | `5001` or `10000` | Port the Express server listens on |
| `NODE_ENV` | Yes | `production` | Application runtime environment |
| `JWT_SECRET` | Yes | `woxsen_findit_secret_key_2026_production` | Secret string used to sign JWT auth tokens |
| `MONGODB_URI` | Optional | `mongodb+srv://user:pass@cluster.mongodb.net/findit` | MongoDB connection string (falls back to memory store if omitted) |
| `CLIENT_URL` | Optional | `https://findit-woxsen.vercel.app` | Allowed CORS origin when frontend is hosted separately |

### Frontend (`client/.env`):
| Variable | Required? | Example Value | Description |
| :--- | :---: | :--- | :--- |
| `VITE_API_URL` | Optional | `https://your-api.onrender.com/api` | API Base URL. Leave empty if using Method 1 (single server) |

---

## 🐳 Method 3: Containerized Deployment (Docker / VPS / Cloud Run)

### Using Docker
```bash
# Build the production image
docker build -t findit-woxsen .

# Run container on port 5001
docker run -p 5001:5001 -e JWT_SECRET=woxsen_findit_secret_key_2026_production findit-woxsen
```

### Using Docker Compose
```bash
docker-compose up --build -d
```
Access the application at `http://localhost:5001`.

---

## 📂 Deployment Configuration Files Included

| File | Purpose | Platform |
| :--- | :--- | :--- |
| [`render.yaml`](render.yaml) | Infrastructure as code blueprint with automated health checks | Render.com |
| [`.github/workflows/ci.yml`](.github/workflows/ci.yml) | Automated build verification and health test on push | GitHub Actions |
| [`Dockerfile`](Dockerfile) | Multi-stage production container build | Docker / Railway / Fly / AWS / GCP |
| [`docker-compose.yml`](docker-compose.yml) | Multi-container orchestration | Docker Compose / VPS |
| [`vercel.json`](vercel.json) | Monorepo Vite frontend build & SPA rewrite routing | Vercel |
| [`netlify.toml`](netlify.toml) | Frontend publish directory & SPA rewrite rules | Netlify |

---

## 🧪 Post-Deployment Verification Checklist

After deploying your public URL:
1. Open your live URL in a browser.
2. Confirm the home page renders the **"Official Woxsen University Lost & Found Coordination Platform"** badge.
3. Check the public view: confirm **Why We Built FindIt**, **Purpose**, **Uses**, and **Campus Statistics** are visible, while active item listings are protected behind authentication.
4. Click **Sign In** and authenticate using one of the university test accounts:
   - **Student:** `student@woxsen.edu.in` / `Woxsen#Student2026!`
   - **Campus Security:** `security@woxsen.edu.in` / `Woxsen#SecurityHQ99!`
   - **Admin Dean:** `admin@woxsen.edu.in` / `Woxsen#AdminDean2026*`
5. Once signed in, confirm the live campus items feed and marketplace are visible.
6. Test registering a new account with the **Male** / **Female** picture selector.

