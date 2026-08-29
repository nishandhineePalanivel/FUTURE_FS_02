🚀 Client Lead Management System (Mini CRM)

A full-stack Client Lead Management System (Mini CRM) developed for Future Interns – Full Stack Web Development Task 2 (2026).

The application helps businesses collect, manage, track, and convert customer leads through a secure admin dashboard.

🌐 Live Demo

Frontend:
https://mini-crm-lake.vercel.app

Backend API:
https://mini-crm-server-l4s9.onrender.com

GitHub Repository:
https://github.com/nishandhineePalanivel/FUTURE_FS_02

📌 About the Project

The Client Lead Management System is a full-stack CRM application designed to manage customer inquiries received through a website contact form.

When a potential customer submits the contact form, their information is stored in MongoDB Atlas. Authorized administrators can then log in to the CRM dashboard and manage the leads.

The system supports:

Lead collection
Lead listing
Lead status management
Search and filtering
Follow-up scheduling
Follow-up notes
Lead analytics
Secure admin authentication
Persistent database storage
✨ Features
🔐 Admin Authentication
Secure admin login
JWT-based authentication
Bcrypt password hashing
Protected CRM dashboard
Protected lead management APIs
Unauthorized users cannot access lead data
📝 Public Contact Form

Visitors can submit new leads through the public contact form.

Lead information includes:

Name
Email
Phone
Company
Message
Lead Source
📊 Dashboard Analytics

The admin dashboard displays:

Total Leads
New Leads
Contacted Leads
Converted Leads
Conversion Rate
📋 Lead Management

Admins can:

View all leads
Search leads
Filter leads
View individual lead details
Edit lead information
Delete leads
Track lead status
🔄 Lead Status Management

The main lead pipeline is:

New → Contacted → Converted

Additional statuses:

Follow-up
Lost
🗓️ Follow-up Management

Admins can:

Schedule follow-up dates
Add follow-up notes
View previous notes
Delete notes
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
🏗️ Project Structure
FUTURE_FS_02/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├── server/
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
🔌 API Endpoints
Public API
Create Lead
POST /api/leads

Allows website visitors to submit a new lead.

Authentication APIs
Admin Login
POST /api/auth/login

Authenticates the administrator and returns a JWT token.

Verify Admin
GET /api/auth/me

Verifies the authenticated administrator.

Protected Lead APIs

Protected APIs require:

Authorization: Bearer <JWT_TOKEN>
Get Analytics
GET /api/leads/analytics/summary
Get All Leads
GET /api/leads

Supports:

search
status
source
page
limit
Get Lead
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

The application uses MongoDB Atlas for persistent lead storage.

Each lead contains:

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

The database schema also validates important fields and restricts lead status values.

⚙️ Installation
1. Clone the Repository
git clone https://github.com/nishandhineePalanivel/FUTURE_FS_02.git
cd FUTURE_FS_02
2. Backend Setup

Go to the server folder:

cd server

Install dependencies:

npm install

Create a file named:

.env

inside the server folder.

Add:

PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
ADMIN_EMAIL=<your-admin-email>
ADMIN_PASSWORD=<your-admin-password>
CLIENT_URL=https://mini-crm-lake.vercel.app

Create the admin account:

npm run create-admin

Start the backend:

npm run dev

Backend:

http://localhost:5000
3. Frontend Setup

Open another terminal.

Go to the client folder:

cd client

Install dependencies:

npm install

Create:

.env

inside the client folder.

Add:

VITE_API_URL=https://mini-crm-server-l4s9.onrender.com/api

Start the frontend:

npm run dev

Frontend:

http://localhost:5173
🔐 Environment Variables
Backend
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
ADMIN_EMAIL=<your-admin-email>
ADMIN_PASSWORD=<your-admin-password>
CLIENT_URL=https://mini-crm-lake.vercel.app
Frontend
VITE_API_URL=https://mini-crm-server-l4s9.onrender.com/api

Security: Never commit .env files, database credentials, passwords, JWT secrets, API keys, or other sensitive information to GitHub.

🚀 Deployment
Frontend – Vercel

The React frontend is deployed on Vercel.

Live Application:

https://mini-crm-lake.vercel.app

Backend – Render

The Node.js + Express backend is deployed on Render.

Backend:

https://mini-crm-server-l4s9.onrender.com

API Base URL:

https://mini-crm-server-l4s9.onrender.com/api
