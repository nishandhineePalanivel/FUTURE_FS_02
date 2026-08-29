Client Lead Management System (Mini CRM)

A full-stack Client Lead Management System developed for Future Interns – Full Stack Web Development Task 2 (2026).

Live Demo

Live Application:
https://mini-crm-lake.vercel.app

Backend API:
https://mini-crm-server-l4s9.onrender.com

GitHub Repository:
https://github.com/nishandhineePalanivel/FUTURE_FS_02

About the Project

The Client Lead Management System is a full-stack CRM application designed to help businesses manage customer inquiries and leads.

When a potential customer submits an inquiry through the public contact form, the lead is stored in MongoDB and can be managed by an authorized administrator through the CRM dashboard.

The system allows administrators to:

View leads
Search leads
Filter leads
Update lead status
Add follow-up notes
Schedule follow-up dates
View lead details
Delete leads
View dashboard analytics
Features
1. Admin Authentication
Secure admin login
JWT-based authentication
Bcrypt password hashing
Protected dashboard
Protected lead management APIs
2. Public Contact Form

Visitors can submit:

Name
Email
Phone
Company
Message
Lead Source

Submitted information is stored in MongoDB.

3. Lead Management

Administrators can:

View all leads
Search leads
Filter leads
View individual lead details
Edit lead information
Delete leads
4. Lead Status

The main lead workflow is:

New → Contacted → Converted

Additional statuses:

Follow-up
Lost
5. Follow-up Management

Administrators can:

Schedule follow-up dates
Add follow-up notes
View previous notes
Delete notes
6. Dashboard Analytics

The dashboard displays:

Total Leads
New Leads
Contacted Leads
Converted Leads
Conversion Rate
7. Timestamp Tracking

The system tracks:

Lead creation date
Lead update date
Note creation date
Last contacted date
Technology Stack
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
Vercel
Render
Development Tools
Visual Studio Code
Git
GitHub
Postman
Project Structure
FUTURE_FS_02/
|
|-- client/
|   |-- public/
|   |-- src/
|       |-- components/
|       |-- context/
|       |-- pages/
|       |-- services/
|       |-- App.jsx
|       |-- main.jsx
|       |-- index.css
|   |-- package.json
|   |-- index.html
|   |-- vite.config.js
|
|-- server/
|   |-- config/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- utils/
|   |-- package.json
|   |-- server.js
|
|-- .gitignore
|-- package.json
|-- vercel.json
|-- README.md
API Endpoints
Public Endpoint

Create a new lead:

POST /api/leads
Authentication

Admin login:

POST /api/auth/login

Verify admin:

GET /api/auth/me
Protected Lead APIs

All lead management APIs require JWT authentication.

Get analytics:

GET /api/leads/analytics/summary

Get all leads:

GET /api/leads

Get individual lead:

GET /api/leads/:id

Update lead:

PUT /api/leads/:id

Update lead status:

PATCH /api/leads/:id/status

Add follow-up note:

POST /api/leads/:id/notes

Delete follow-up note:

DELETE /api/leads/:id/notes/:noteId

Delete lead:

DELETE /api/leads/:id
Database

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
Installation
Step 1: Clone the Repository
git clone https://github.com/nishandhineePalanivel/FUTURE_FS_02.git
cd FUTURE_FS_02
Step 2: Backend Setup

Navigate to the server folder:

cd server

Install dependencies:

npm install

Create a .env file inside the server folder.

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

Backend runs on:

http://localhost:5000
Step 3: Frontend Setup

Open another terminal.

Navigate to the client folder:

cd client

Install dependencies:

npm install

Create a .env file inside the client folder.

Add:

VITE_API_URL=https://mini-crm-server-l4s9.onrender.com/api

Start the frontend:

npm run dev

Frontend runs on:

http://localhost:5173
Environment Variables
Backend
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
ADMIN_EMAIL=<your-admin-email>
ADMIN_PASSWORD=<your-admin-password>
CLIENT_URL=https://mini-crm-lake.vercel.app
Frontend
VITE_API_URL=https://mini-crm-server-l4s9.onrender.com/api

Important: Never commit .env files, database credentials, passwords, JWT secrets, or API keys to GitHub.

Deployment
Frontend

The React frontend is deployed on Vercel.

Live URL:

https://mini-crm-lake.vercel.app

Backend

The Node.js and Express backend is deployed on Render.

Backend URL:

https://mini-crm-server-l4s9.onrender.com

API Base URL:

https://mini-crm-server-l4s9.onrender.com/api
