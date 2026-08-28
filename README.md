# Client Lead Management System (Mini CRM)

> A full-stack web application built for managing customer inquiries, lead status tracking, follow-ups, and dashboard analytics. Satisfies **Future Interns – Full Stack Web Development Task 2 (2026)** requirements.

Live Application: [https://mini-crm-lake.vercel.app](https://mini-crm-lake.vercel.app)

---

## Overview

The **Client Lead Management System (Mini CRM)** allows prospective clients to submit inquiries via a public contact form. Inquiries are stored directly in a MongoDB database and made accessible through a protected Admin CRM dashboard. 

Admins can log in securely using JWT authentication to view real-time lead analytics, search/filter lead records, update lead status through defined pipelines (`New` → `Contacted` → `Converted`, plus `Follow-up` & `Lost`), schedule follow-up dates, and maintain audit notes.

---

## Features

- 🔐 **Admin Authentication**: Secure JWT-based login with encrypted credentials (`bcryptjs`) and route protection middleware.
- 📝 **Public Lead Form**: Contact form with validation for name, valid email format, phone format, and lead source selection.
- 📊 **Dashboard Analytics**: Real-time KPI metrics (Total Leads, New, Contacted, Converted, Conversion Rate) computed dynamically from MongoDB.
- 📋 **Lead Listing & Management**: Searchable and filterable lead table displaying Name, Email, Phone, Company, Source, Status, and Creation Date.
- 🔄 **Lead Status Workflow**: Update status across `New`, `Contacted`, `Converted`, `Follow-up`, and `Lost` with automatic timestamp updates.
- 🗓️ **Follow-up Date & Notes**: Schedule follow-up dates and record/delete detailed timestamped interaction notes for each client.
- 🛠️ **Full REST API & Persistence**: Production-ready Express API connected to MongoDB Atlas.

---

## Tech Stack

- **Frontend**: React.js, React Router v6, Vite, Axios, Lucide React, Vanilla CSS
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB Atlas
- **Authentication**: JSON Web Tokens (JWT), Bcrypt.js
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## Project Structure

```text
mini-crm/
├── client/                     # Frontend React Application
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable UI components (Sidebar, Header, Modals, Badges)
│   │   ├── context/           # React Context (AuthContext, ToastContext)
│   │   ├── pages/             # Page Views (ContactPage, LoginPage, DashboardPage, LeadsPage, LeadDetailsPage)
│   │   ├── services/          # Axios API service instances (leadService, authService)
│   │   ├── App.jsx            # Application Router & Protected Routes
│   │   ├── main.jsx           # Application Entry Point
│   │   └── index.css          # Core Styling Tokens & Component Styles
│   ├── index.html
│   ├── package.json
│   ├── vercel.json            # Vercel SPA Routing Configuration
│   └── vite.config.js
│
└── server/                     # Backend Node/Express API
    ├── config/                # Database Connection (db.js)
    ├── controllers/           # Route Controllers (authController.js, leadController.js)
    ├── middleware/            # JWT Auth Middleware & Error Handler
    ├── models/                # Mongoose Schemas (Admin.js, Lead.js)
    ├── routes/                # API Endpoints (authRoutes.js, leadRoutes.js)
    ├── utils/                 # Utility Scripts (generateToken.js, createAdmin.js)
    ├── package.json
    └── server.js              # Express App Server Entry
```

---

## Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/minicrm?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_admin_password
CLIENT_URL=https://your-frontend-domain.vercel.app
```

### Frontend (`client/.env`)
```env
VITE_API_URL=https://your-backend-api.onrender.com/api
```

> **Note**: Never commit `.env` files or secret values to version control.

---

## Installation & Local Development

### 1. Clone the repository
```bash
git clone https://github.com/your-username/mini-crm.git
cd mini-crm
```

### 2. Setup Backend Server
```bash
cd server
npm install

# Create initial admin user in MongoDB
npm run create-admin

# Start development server
npm run dev
```

### 3. Setup Frontend Client
```bash
cd ../client
npm install

# Start Vite development server
npm run dev
```

The frontend will run at `http://localhost:5173` and the API backend at `http://localhost:5000`.

---

## API Endpoints

### Public Endpoints
- `POST /api/leads` - Submit a new customer inquiry.

### Authentication Endpoints
- `POST /api/auth/login` - Admin login, returns JWT token.
- `GET /api/auth/me` - Verify current JWT token and admin identity.

### Protected Lead Management Endpoints *(Requires `Authorization: Bearer <token>`)*
- `GET /api/leads/analytics/summary` - Fetch dashboard statistics.
- `GET /api/leads` - Get leads list (Supports query params: `search`, `status`, `source`, `page`, `limit`).
- `GET /api/leads/:id` - Get details for a single lead.
- `PUT /api/leads/:id` - Update lead fields (`name`, `email`, `phone`, `company`, `message`, `source`, `status`, `followUpDate`).
- `PATCH /api/leads/:id/status` - Quick update lead status.
- `POST /api/leads/:id/notes` - Add a follow-up note to a lead.
- `DELETE /api/leads/:id/notes/:noteId` - Delete a note from a lead.
- `DELETE /api/leads/:id` - Delete a lead record.

---

## Admin Credentials Configuration

Admin credentials are created securely via backend environment variables.
Run the script `npm run create-admin` inside the `server/` directory:
1. Specify `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `server/.env`.
2. Execute `npm run create-admin`.
3. The script hashes the password with `bcryptjs` (10 rounds) and stores the admin in MongoDB.

---

## Deployment Instructions

### Frontend (Vercel)
1. Import the `client/` folder to Vercel.
2. Set Environment Variable: `VITE_API_URL` pointing to your deployed backend URL (e.g. `https://your-app.onrender.com/api`).
3. Deploy. The included `vercel.json` ensures client-side routing works seamlessly without 404s.

### Backend (Render / Railway)
1. Import the `server/` folder to Render Web Service.
2. Set Environment Variables (`MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CLIENT_URL`).
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Execute `node utils/createAdmin.js` (or via environment auto-creation) to set up your initial admin.
