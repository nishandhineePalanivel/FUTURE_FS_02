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

🛠️ Tech Stack
Frontend
React.js
Vite
React Router
Axios
Lucide React
CSS
Backend
Node.js
Express.js
Mongoose
Database
MongoDB Atlas
Authentication
JSON Web Tokens (JWT)
Bcrypt.js
Deployment
Vercel – Frontend
Render – Backend
📂 Repository
FUTURE_FS_02/
├── client/
│   └── React frontend
│
├── server/
│   └── Node.js + Express backend
│
├── README.md
├── package.json
└── vercel.json


⚙️ Local Setup
Clone the repository
git clone https://github.com/nishandhineePalanivel/FUTURE_FS_02.git
cd FUTURE_FS_02
Backend Setup
cd server
npm install
npm run create-admin
npm run dev
Frontend Setup

Open another terminal:

cd client
npm install
npm run dev

Frontend:

http://localhost:5173

Backend:

http://localhost:5000
🔐 Environment Variables

Create server/.env:

PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
ADMIN_EMAIL=<your-admin-email>
ADMIN_PASSWORD=<your-admin-password>
CLIENT_URL=https://mini-crm-lake.vercel.app

Create client/.env:

VITE_API_URL=<your-deployed-render-api-url>/api

Never commit .env files or passwords, API keys, database credentials, or JWT secrets to GitHub.

📋 Future Interns Task 2 Requirements
Requirement	Implementation
Backend system	Node.js + Express.js REST API
Frontend dashboard	React.js CRM dashboard
Database	MongoDB Atlas
Lead listing	Lead management table
Lead status	New, Contacted, Converted
Follow-ups	Follow-up dates and notes
Admin access	JWT authentication
Search & filtering	Lead search and filters
Analytics	Lead and conversion statistics
Timestamp tracking	Created/updated timestamps
👩‍💻 Developed By

Nishandhinee Palanivel

Electronics and Communication Engineering
Full Stack Web Development – Future Interns Task 2
