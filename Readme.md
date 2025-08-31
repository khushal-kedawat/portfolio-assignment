# 🚀 MERN Profile App

A production-ready **MERN stack project** built for showcasing **profile, skills, projects, and search functionality**.

- **Backend** → Express + MongoDB (Mongoose), deployed on **Render**
- **Frontend** → React (Vite + TailwindCSS), deployed on **Vercel**
- **Database** → MongoDB Atlas (Cloud)

---

## 🌐 Live Demo
- **Frontend (Vercel)** → [Live App](https://your-frontend.vercel.app)  
- **Backend (Render)** → [API Endpoint](https://your-backend.onrender.com/api/profile)  

---

## 📂 Project Structure
mern-profile-app/
├── backend/ # Express + MongoDB (API + CRUD routes)
├── frontend/ # React (Vite + Tailwind UI)
└── README.md # This documentation


---

## ⚙️ Features
- Profile CRUD (name, email, education, skills, projects, work, links)
- Query projects by skill (`/api/projects?skill=javascript`)
- Top skills endpoint (`/api/skills/top`)
- Global search endpoint (`/api/search?q=...`)
- Health check (`/api/health`)
- Minimal but **clean Tailwind UI**

---

## 🛠️ Tech Stack
- **MongoDB Atlas** (Database)
- **Express.js** (Backend framework)
- **React (Vite)** (Frontend framework)
- **TailwindCSS** (Styling)
- **Render** (Backend hosting)
- **Vercel** (Frontend hosting)

---

## 🚀 Deployment Instructions (for devs)

### 1️⃣ Backend (Render)
1. Go to [Render](https://render.com) → Create **Web Service**
2. Connect the backend repo (`mern-profile-backend`)
3. Set environment variables:
   - `MONGO_URI=your-mongodb-atlas-uri`
   - `PORT=10000`
4. Deploy ✅

### 2️⃣ Frontend (Vercel)
1. Go to [Vercel](https://vercel.com) → New Project
2. Connect the frontend repo (`mern-profile-frontend`)
3. Set environment variable:
   - `VITE_API_URL=https://your-backend.onrender.com/api`
4. Deploy ✅

---

## 👨‍💻 Local Development

Clone the parent repo:
```bash
git clone https://github.com/your-username/mern-profile-app.git
cd mern-profile-app
