# Mini CRM — Client Lead Management System

A full-stack Client Lead Management System (Mini CRM) built for **Future Interns – Full Stack Web Development, Task 2 (2026)**.

Businesses receive leads through a public contact form, and an authenticated admin manages those leads through a dashboard: searching, filtering, updating status, adding follow-up notes, and tracking simple conversion analytics.

---

## Overview

This is a real, working full-stack application — not a UI mockup. Leads submitted on the public `/contact` page are stored in MongoDB. Admins log in with JWT-based authentication to view, search, filter, edit, and manage those leads from a dashboard styled like a modern SaaS product.

## Features

- Public contact form that creates leads (`status: New` by default)
- Secure admin login (JWT + bcrypt password hashing)
- Protected admin dashboard and lead routes
- Real-time analytics: total leads, new, contacted, converted, conversion rate
- Lead table with search (name, email, company, phone) and filters (status, source)
- Lead details view: contact info, lead info, original message, follow-up notes
- Status pipeline: **New → Contacted → Converted**, with automatic `lastContactedAt` stamping
- Follow-up notes with timestamps, displayed chronologically
- Edit and delete leads, with a confirmation modal before deleting
- Toast notifications for every important action
- Fully responsive — the leads table collapses into cards on mobile
- Clean error handling on both client and server (no leaked stack traces)

## Tech Stack

**Frontend:** React.js, Vite, React Router, Axios, Lucide React icons, plain CSS
**Backend:** Node.js, Express.js, JWT, bcryptjs
**Database:** MongoDB with Mongoose
**Tooling:** dotenv, Git/GitHub

No TypeScript. No unnecessary libraries — the status chart on the dashboard is built with plain CSS instead of pulling in a charting library.

## Project Structure

```
mini-crm/
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable UI: Sidebar, Modal, Badge, Toast, etc.
│   │   ├── pages/            # Route-level pages
│   │   ├── services/         # Axios API layer (api.js, authService.js, leadService.js)
│   │   ├── context/           # AuthContext, ToastContext
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── server/                  # Express backend
│   ├── config/db.js          # MongoDB connection
│   ├── controllers/          # Route logic (auth, leads)
│   ├── middleware/           # JWT auth guard, error handler
│   ├── models/                # Lead.js, Admin.js (Mongoose schemas)
│   ├── routes/                 # authRoutes.js, leadRoutes.js
│   ├── utils/                  # generateToken.js, createAdmin.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── README.md
└── .gitignore
```



## Installation

### Prerequisites
- Node.js (v18+)
- MongoDB running locally, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- Git

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/mini-crm.git
cd mini-crm
```

### 2. Install backend dependencies
```bash
cd server
npm install
```

### 3. Install frontend dependencies
```bash
cd ../client
npm install
```

### 4. Configure environment variables

**server/.env** (copy from `server/.env.example`):
```
MONGO_URI=mongodb://127.0.0.1:27017/mini-crm
JWT_SECRET=replace_with_a_long_random_string
PORT=5000
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=choose_a_strong_password
CLIENT_URL=http://localhost:5173
```

**client/.env** (copy from `client/.env.example`):
```
VITE_API_URL=http://localhost:5000/api
```

> Never commit `.env` files. Only `.env.example` files (with empty values) belong in Git.

### 5. Start MongoDB
If running locally: `mongod` (or start it via your OS service manager). If using Atlas, just make sure `MONGO_URI` points to your cluster.

### 6. Create the first admin account
From the `server` folder:
```bash
npm run create-admin
```
This reads `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env`, hashes the password with bcrypt, and inserts one admin document into MongoDB. The plain-text password is never stored.

### 7. Run the backend
```bash
cd server
npm run dev
```
You should see:
```
✅ MongoDB Connected: <host>/mini-crm
🚀 Server running on http://localhost:5000
```

### 8. Run the frontend
In a separate terminal:
```bash
cd client
npm run dev
```
Visit `http://localhost:5173/contact` to submit a test lead, and `http://localhost:5173/login` to sign in as admin.

---

## API Documentation

### Authentication
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/login` | Public | Log in with email + password, returns a JWT |
| GET | `/api/auth/me` | Private | Returns the logged-in admin's profile |

### Leads
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/leads` | Public | Create a lead (used by the contact form) |
| GET | `/api/leads` | Private | List leads — supports `?search=&status=&source=&page=&limit=` |
| GET | `/api/leads/:id` | Private | Get a single lead |
| PUT | `/api/leads/:id` | Private | Update a lead's fields |
| DELETE | `/api/leads/:id` | Private | Delete a lead |
| PATCH | `/api/leads/:id/status` | Private | Update status (`New`/`Contacted`/`Converted`) |
| POST | `/api/leads/:id/notes` | Private | Add a follow-up note |
| GET | `/api/leads/analytics/summary` | Private | Total / new / contacted / converted / conversion rate |

Private routes require an `Authorization: Bearer <token>` header.

## Authentication

Admin credentials live only in MongoDB, as a bcrypt hash — never in source code. On login, the server verifies the password with `bcrypt.compare()` and issues a JWT signed with `JWT_SECRET`, valid for 7 days. The frontend stores this token in `localStorage` and attaches it to every admin API request via an Axios interceptor. A 401 response (invalid/expired token) automatically logs the admin out and redirects to `/login`.

## Database Schema

**Lead**
```js
{
  name: String,          // required
  email: String,         // required, validated format
  phone: String,
  company: String,
  message: String,
  source: String,         // enum: Website, LinkedIn, Referral, Instagram, Other
  status: String,          // enum: New, Contacted, Converted — default "New"
  notes: [{ text: String, createdAt: Date }],
  lastContactedAt: Date,
  createdAt: Date,          // auto (timestamps)
  updatedAt: Date            // auto (timestamps)
}
```

**Admin**
```js
{
  email: String,     // unique
  password: String,  // bcrypt hash
  name: String
}
```

## Future Improvements

- Email notifications when a new lead comes in
- Multiple admins with role-based access control
- Export leads to CSV
- Advanced analytics (lead trends over time, source performance)
- Reminder system for follow-ups
- WhatsApp / SMS integration

---

## Deployment

**Frontend → Vercel**
1. Push this repo to GitHub.
2. Import the repo into Vercel, set the root directory to `client`.
3. Build command: `npm run build`, output directory: `dist`.
4. Add environment variable: `VITE_API_URL=https://<your-backend>.onrender.com/api`.

**Backend → Render**
1. Create a new Web Service on Render, root directory `server`.
2. Build command: `npm install`, start command: `npm start`.
3. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `PORT` (Render sets this automatically, but keep the fallback), `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CLIENT_URL=https://<your-frontend>.vercel.app`.
4. After the first deploy, run the admin-creation script once (Render Shell): `npm run create-admin`.

**Database → MongoDB Atlas**
1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a database user and allow network access (or `0.0.0.0/0` for simplicity during grading).
3. Copy the connection string into `MONGO_URI` on Render.

The frontend never hardcodes `localhost` — every API call goes through `VITE_API_URL`, so switching between local development and production is just an environment variable change.

## Author

**Your Name**
Final-year Electronics and Communication Engineering student
GitHub: `https://github.com/<your-username>`
LinkedIn: `https://linkedin.com/in/<your-username>`

Built for Future Interns – Full Stack Web Development, Task 2 (2026).
