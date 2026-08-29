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
🌐 Live Project
🔗 Frontend / Live Application

https://mini-crm-lake.vercel.app

🔗 Backend API

https://mini-crm-server-l4s9.onrender.com

🔗 GitHub Repository

https://github.com/nishandhineePalanivel/FUTURE_FS_02

📌 Project Overview

The Client Lead Management System (Mini CRM) is a full-stack web application designed to help businesses manage customer inquiries and leads efficiently.

When a potential customer submits an inquiry through the public contact form, the lead is stored in MongoDB Atlas and becomes available to authorized administrators through a secure CRM dashboard.

The administrator can:

View incoming leads
Search and filter leads
Update lead status
Add follow-up notes
Schedule follow-up dates
Track lead activity
View dashboard analytics
Manage individual leads
Securely access the CRM using admin authentication

This project implements the requirements of Future Interns – Full Stack Web Development Task 2 (2026).

✨ Key Features
🔐 Secure Admin Authentication
JWT-based authentication
Bcrypt password hashing
Protected admin dashboard
Protected lead management APIs
Unauthorized users cannot access protected lead data
📝 Public Lead Contact Form

Website visitors can submit their details through the public contact form.

The form collects:

Name
Email
Phone
Company
Message
Lead Source

Submitted leads are stored in MongoDB.

📊 Dashboard Analytics

The admin dashboard provides real-time statistics such as:

Total Leads
New Leads
Contacted Leads
Converted Leads
Conversion Rate
📋 Lead Management

Administrators can:

View all leads
Search leads
Filter leads
View individual lead details
Update lead information
Delete leads
Track lead status
🔄 Lead Status Workflow

The CRM supports the following lead pipeline:

New → Contacted → Converted

Additional statuses:

Follow-up
Lost
🗓️ Follow-up Management

Administrators can:

Schedule follow-up dates
Add follow-up notes
View previous interaction notes
Delete notes when required
⏱️ Timestamp Tracking

The system tracks:

Lead creation date
Lead update date
Note creation date
Last contacted date
🛠️ Technology Stack
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
JSON Web Token (JWT)
Bcrypt.js
Deployment
Vercel – Frontend
Render – Backend
Development Tools
Visual Studio Code
Git
GitHub
Postman
🏗️ Project Architecture
FUTURE_FS_02/
│
├── client/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── index.html
│   └── vite.config.js
│
├── server/
│   │
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── package.json
│   └── server.js
│
├── .gitignore
├── package.json
├── vercel.json
└── README.md
🔌 REST API
Public Endpoint
Create Lead
POST /api/leads

This endpoint allows website visitors to submit a new inquiry.

🔐 Authentication Endpoints
Admin Login
POST /api/auth/login

Authenticates the administrator and returns a JWT token.

Verify Admin
GET /api/auth/me

Verifies the currently authenticated administrator.

🔒 Protected Lead Endpoints

The following endpoints require:

Authorization: Bearer <JWT_TOKEN>
Get Dashboard Analytics
GET /api/leads/analytics/summary
Get All Leads
GET /api/leads

Supported query parameters:

search
status
source
page
limit
Get Individual Lead
GET /api/leads/:id
Update Lead
PUT /api/leads/:id
Update Lead Status
PATCH /api/leads/:id/status
Add Follow-up Note
POST /api/leads/:id/notes
Delete Follow-up Note
DELETE /api/leads/:id/notes/:noteId
Delete Lead
DELETE /api/leads/:id
🗄️ Database

The application uses MongoDB Atlas for persistent data storage.

Each lead can contain:

Name
Email
Phone
Company
Message
Source
Status
Notes
Follow-up Date
Last Contacted Date
Created Date
Updated Date

The database schema also provides validation for important fields such as email format and allowed lead statuses.

⚙️ Installation & Local Development
1. Clone the Repository
git clone https://github.com/nishandhineePalanivel/FUTURE_FS_02.git
cd FUTURE_FS_02
2. Backend Setup

Navigate to the server folder:

cd server

Install dependencies:

npm install

Create a .env file inside the server folder.

Backend Environment Variables
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
ADMIN_EMAIL=<your-admin-email>
ADMIN_PASSWORD=<your-admin-password>
CLIENT_URL=https://mini-crm-lake.vercel.app

Create the initial admin account:

npm run create-admin

Start the backend:

npm run dev

Backend:

http://localhost:5000
3. Frontend Setup

Open another terminal.

Navigate to the client folder:

cd client

Install dependencies:

npm install

Create:

client/.env

Add:

VITE_API_URL=https://mini-crm-server-l4s9.onrender.com/api

Start the frontend:

npm run dev

Frontend:

http://localhost:5173
🔐 Environment Variables & Security

The application uses environment variables for sensitive configuration.

Backend
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
ADMIN_EMAIL=<your-admin-email>
ADMIN_PASSWORD=<your-admin-password>
CLIENT_URL=https://mini-crm-lake.vercel.app
Frontend
VITE_API_URL=https://mini-crm-server-l4s9.onrender.com/api

⚠️ Security Notice: Never commit .env files, MongoDB credentials, passwords, JWT secrets, API keys, or other sensitive information to GitHub.

🚀 Deployment
Frontend – Vercel

The React frontend is deployed on Vercel.

Live Application

https://mini-crm-lake.vercel.app

Frontend API configuration:

VITE_API_URL=https://mini-crm-server-l4s9.onrender.com/api
Backend – Render

The Node.js + Express backend is deployed on Render.

Backend URL

https://mini-crm-server-l4s9.onrender.com

API Base URL

https://mini-crm-server-l4s9.onrender.com/api

Nishandhinee Palanivel

Electronics and Communication Engineering
Full Stack Web Development – Future Interns Task 2
