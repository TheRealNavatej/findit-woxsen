# 🎓 FindIt — Woxsen University Lost & Found Coordination Platform

[![CI & Deployment Build Check](https://github.com/TheRealNavatej/findit-woxsen/actions/workflows/ci.yml/badge.svg)](https://github.com/TheRealNavatej/findit-woxsen/actions/workflows/ci.yml)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/TheRealNavatej/findit-woxsen)

An intelligent, secure campus coordination system designed specifically for **Woxsen University** students, faculty, and campus security staff to report, match, track, and recover lost property.

---

## 🌟 Key Features

- **Smart Keyword & Category Matching Engine:** Calculates multi-factor match percentages across locations, tags, categories, brands, and distinctive features.
- **Role-Based Workflows:**
  - 🎓 **Students:** Report lost/found items, view match suggestions, claim items, message discoverers.
  - 🛡️ **Campus Security:** Verify identity, manage physical security lockers, hand over items, generate audit reports.
  - 🏛️ **Administrators:** Campus-wide statistics, item resolution trends, activity logs, platform moderation.
- **In-Memory Store & MongoDB Atlas Fallback:** Works straight out of the box with realistic seed data and zero mandatory database configuration.
- **Fully Responsive & Modern UI:** Built with React 18, Vite, Tailwind CSS, Lucide Icons, and Plus Jakarta Sans.

---

## 🚀 1-Click Deployment on Render

This repository includes a [`render.yaml`](render.yaml) blueprint:

1. Click the **Deploy to Render** button above, or go to [Render Dashboard](https://dashboard.render.com) → **Blueprints**.
2. Connect this repository (`TheRealNavatej/findit-woxsen`).
3. Render automatically sets up the Node.js web service, generates JWT secrets, runs `npm run build`, and launches the service with automated `/api/health` monitoring.

For complete step-by-step instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

---

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ installed

### Setup & Run
```bash
# Install dependencies and build client
npm run build

# Start the full-stack server
npm start
```
Open [http://localhost:5001](http://localhost:5001) in your browser.

---

## 🔑 Demo & Test Accounts

| Role | Email | Password |
| :--- | :--- | :--- |
| **Student** | `student@woxsen.edu.in` | `Woxsen#Student2026!` |
| **Campus Security** | `security@woxsen.edu.in` | `Woxsen#SecurityHQ99!` |
| **Dean / Admin** | `admin@woxsen.edu.in` | `Woxsen#AdminDean2026*` |

---

## 📦 Deployment Configuration Files Included

- `render.yaml` — Render infrastructure as code blueprint.
- `.github/workflows/ci.yml` — Automated GitHub Actions CI build & health check.
- `Dockerfile` & `docker-compose.yml` — Multi-stage production container.
- `vercel.json` & `netlify.toml` — Frontend zero-config SPA deployment.
