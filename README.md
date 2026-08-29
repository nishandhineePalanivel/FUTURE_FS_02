# Client Lead Management System (Mini CRM)

A full-stack Client Lead Management System built as part of Future Interns – Full Stack Web Development Task 2 (2026).

**Live Demo:** [mini-crm-lake.vercel.app](https://mini-crm-lake.vercel.app)  
**Backend API:** [mini-crm-server-l4s9.onrender.com](https://mini-crm-server-l4s9.onrender.com)

---

## About

This CRM application helps businesses manage customer inquiries and leads. Visitors submit inquiries through a public contact form; admins manage those leads through a protected dashboard.

---

## Features

- **Admin Authentication** — JWT-based login, bcrypt password hashing, protected routes
- **Public Contact Form** — Captures name, email, phone, company, message, and lead source
- **Lead Management** — View, search, filter, edit, and delete leads
- **Lead Status Workflow** — New → Contacted → Converted (also: Follow-up, Lost)
- **Follow-up Management** — Schedule dates, add/view/delete notes
- **Dashboard Analytics** — Total, New, Contacted, Converted leads + Conversion Rate
- **Timestamp Tracking** — Created, updated, last contacted, and note dates

---

## Tech Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Frontend    | React.js, Vite, React Router, Axios, Lucide React |
| Backend     | Node.js, Express.js, Mongoose     |
| Database    | MongoDB Atlas                     |
| Auth        | JWT, Bcrypt.js                    |
| Deployment  | Vercel (frontend), Render (backend) |

---

## Project Structure

```
FUTURE_FS_02/
├── client/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── services/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
├── .gitignore
├── package.json
├── vercel.json
└── README.md
```

---

## API Endpoints

### Public
| Method | Endpoint    | Description      |
|--------|-------------|------------------|
| POST   | /api/leads  | Submit a new lead |

### Auth
| Method | Endpoint       | Description      |
|--------|----------------|------------------|
| POST   | /api/auth/login | Admin login      |
| GET    | /api/auth/me   | Verify admin     |

### Protected (JWT required)
| Method | Endpoint                          | Description          |
|--------|-----------------------------------|----------------------|
| GET    | /api/leads/analytics/summary      | Dashboard analytics  |
| GET    | /api/leads                        | Get all leads        |
| GET    | /api/leads/:id                    | Get single lead      |
| PUT    | /api/leads/:id                    | Update lead          |
| PATCH  | /api/leads/:id/status             | Update status        |
| POST   | /api/leads/:id/notes              | Add follow-up note   |
| DELETE | /api/leads/:id/notes/:noteId      | Delete note          |
| DELETE | /api/leads/:id                    | Delete lead          |

---

## Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/nishandhineePalanivel/FUTURE_FS_02.git
cd FUTURE_FS_02
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file inside `server/`:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
CLIENT_URL=https://mini-crm-lake.vercel.app
```

```bash
npm run create-admin   # seed admin account
npm run dev            # starts on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd client
npm install
```

Create a `.env` file inside `client/`:
```env
VITE_API_URL=https://mini-crm-server-l4s9.onrender.com/api
```

```bash
npm run dev   # starts on http://localhost:5173
```

> ⚠️ Never commit `.env` files or credentials to GitHub.

---

## Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | https://mini-crm-lake.vercel.app |
| Backend | Render | https://mini-crm-server-l4s9.onrender.com |

---

## Author

**Nishandhine Palanivel**  
[GitHub](https://github.com/nishandhineePalanivel) · [LinkedIn](https://linkedin.com/in/nishandhinee-palanivel) · [LeetCode](https://leetcode.com/u/nishandhineeValarmathi)
