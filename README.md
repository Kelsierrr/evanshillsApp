EvansHills Recruitment
A full-stack recruitment platform connecting Zimbabwean talent with international employers. Candidates can browse roles, apply with a resume, request service packages, and contact the team. Employers can submit staffing requests. Admin endpoints allow job management.

Table of Contents
Features

Tech Stack

Monorepo Structure

Local Development

Environment Variables

API Overview

Data Models

File Uploads

Testing

Deployment

Troubleshooting

Roadmap

License

Features
Candidate
Browse jobs and view details.

Apply to a job with resume upload (PDF/DOC/DOCX).

Request service packages (Basic / Standard / Premium) from the Job Seekers page.

Submit contact inquiries.

Employer
Submit employer staffing inquiries with company details and headcount.

Admin (foundations in place)
JWT-based auth (register/login).

Job CRUD endpoints (UI optional / in progress).

Protected “My Applications” endpoint for candidates.

Tech Stack
Frontend

React (Vite), React Router

TanStack Query v5

React Hook Form + Zod

Jest + React Testing Library

Backend

Node.js + Express

Mongoose (MongoDB Atlas)

JWT Authentication

Multer for file uploads

Infra

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

Monorepo Structure
bash
Copy
Edit
evanshills/
├─ frontend/                 # Vite + React app
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ Header.jsx, Footer.jsx, ui/
│  │  │  └─ pages/
│  │  │     ├─ Apply.jsx
│  │  │     ├─ Employers.jsx (+ EmployerInquiryForm.jsx)
│  │  │     ├─ Contact.jsx (+ ContactForm.jsx)
│  │  │     └─ ... other pages (Jobs, JobSeekers, Pricing, etc.)
│  │  ├─ services/          # fetch helpers (applications.js, jobs.js, ...)
│  │  ├─ schemas/           # zod schemas
│  │  └─ styles/
│  ├─ vite.config.js
│  ├─ .env (local only)
│  └─ package.json
└─ server/
   ├─ index.js               # Express entry
   ├─ models/
   │  ├─ User.js
   │  ├─ Job.js
   │  ├─ Application.js
   │  ├─ ServiceRequest.js
   │  ├─ EmployerInquiry.js
   │  └─ ContactInquiry.js
   ├─ routes/
   │  ├─ auth.js
   │  ├─ users.js
   │  ├─ jobs.js
   │  ├─ applications.js
   │  ├─ serviceRequests.js
   │  ├─ employerInquiries.js
   │  └─ contactInquiries.js
   ├─ middleware/
   │  └─ auth.js
   ├─ uploads/               # resumes (local dev)
   ├─ .env (server secrets)
   └─ package.json
Local Development
1) Backend (Express)
bash
Copy
Edit
cd server
npm install
# .env → see "Environment Variables"
npm start          # or: node index.js
# if you have nodemon: npm run dev
The API will run on http://localhost:5000.

2) Frontend (Vite + React)
bash
Copy
Edit
cd frontend
npm install
npm run dev
The web app runs on http://localhost:5173.

Local API proxy
vite.config.js proxies /api to http://localhost:5000, so frontend code can simply call fetch('/api/...') in development.

Environment Variables
Backend (server/.env)
ini
Copy
Edit
PORT=5000
MONGO_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<any strong secret>
CORS_ORIGIN=*       # or your frontend origin(s)
Frontend (frontend/.env)
ini
Copy
Edit
# Only needed for production builds/deploys.
# Locally we use the Vite proxy.
VITE_API_BASE=https://<your-render-backend>.onrender.com
The frontend service helpers prepend import.meta.env.VITE_API_BASE || ''.

Local dev: leave VITE_API_BASE empty → calls /api/... (proxy).

Production: set VITE_API_BASE to your Render API URL.

API Overview
Base URL:

Local: http://localhost:5000/api

Prod: https://<render>.onrender.com/api

Auth
POST /api/auth/register
Body: { name, email, password }

POST /api/auth/login
Body: { email, password }
Returns: { token, user }

Include token as header for protected routes:

makefile
Copy
Edit
Authorization: Bearer <JWT>
Jobs
GET /api/jobs — list jobs

POST /api/jobs — admin create

PUT /api/jobs/:id — admin update

DELETE /api/jobs/:id — admin delete

Applications (Candidate)
POST /api/applications (protected, multipart/form-data)
Fields: jobId, name, email, phone, coverLetter, resume (file)

GET /api/applications (protected) — list my applications

Service Requests (Pricing/Packages)
POST /api/service-requests
Body: { packageName, name, email, phone }

Employer Inquiries
POST /api/employer-inquiries
Body: { companyName, contactPerson, email, phone, industry, positions, details }

Contact Inquiries
POST /api/contact-inquiries
Body: { firstName, lastName, email, phone, subject, message, consent }

Sample cURL (Applications – multipart)
bash
Copy
Edit
curl -X POST https://<render>.onrender.com/api/applications \
  -H "Authorization: Bearer <JWT>" \
  -F "jobId=<jobId>" \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "phone=1234567890" \
  -F "coverLetter=Excited to apply..." \
  -F "resume=@/path/to/resume.pdf"
Data Models
User
js
Copy
Edit
{ name, email (unique), passwordHash, role } // role optional (e.g., 'admin')
Job
js
Copy
Edit
{ title, location, category, description, salaryRange, createdAt }
Application
js
Copy
Edit
{ userId, jobId, name, email, phone, coverLetter, resumeUrl, createdAt }
ServiceRequest
js
Copy
Edit
{ packageName, name, email, phone, createdAt }
EmployerInquiry
js
Copy
Edit
{ companyName, contactPerson, email, phone, industry, positions, details, createdAt }
ContactInquiry
js
Copy
Edit
{ firstName, lastName, email, phone, subject, message, consent, createdAt }
File Uploads
Handled via Multer to server/uploads/.

Files are served at /uploads/<filename> by:

js
Copy
Edit
// server/index.js
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
Render note: disk is ephemeral. For production durability, use S3 or similar. (The code is compatible; you’d swap the Multer storage for S3 and save S3 URLs.)

Testing
Frontend Unit Tests
Framework: Jest + React Testing Library

Location: frontend/src/components/pages/__tests__/*

Commands:

bash
Copy
Edit
cd frontend
npm test
We test:

Apply form validation & submit enablement

Employer inquiry form validation & submit enablement

Contact form validation & submit enablement

Jest setup highlights (already configured):

jest-environment-jsdom

setupTests.cjs to load @testing-library/jest-dom and polyfills

CSS stubs via moduleNameMapper

API Tests (optional / recommended)
Use Supertest against Express:

Auth login/register

Jobs CRUD

Applications POST with multipart

Inquiries POST endpoints

Deployment
1) Backend → Render
Create a Web Service from the server/ folder.

Build Command: npm install

Start Command: node index.js

Environment:

PORT=10000 (Render sets this automatically; your server reads process.env.PORT)

MONGO_URI=<Atlas connection string>

JWT_SECRET=<secret>

CORS_ORIGIN=* (or your Vercel domain)

After deploy, note your Render URL: https://<name>.onrender.com

2) Frontend → Vercel
Import the repo, set root to frontend/.

Build Command: npm run build

Output Dir: dist

Environment:

VITE_API_BASE=https://<your-render>.onrender.com

Redeploy. Your site will be live at a Vercel domain (add a custom domain if you like).

Custom Domain (optional)
Vercel: add your domain → update DNS to the Vercel provided records → wait for propagation → HTTPS auto-provisioned.

If you want a subdomain for the API, point it at Render via CNAME or use Render’s custom domain feature.

Troubleshooting
401 “Missing token” when applying:
Ensure you’re logged in; frontend sends Authorization: Bearer <JWT> from localStorage. Re-login to refresh your token.

404 /api/... on production frontend:
Set VITE_API_BASE to your Render origin. In production, there’s no Vite proxy.

CORS errors:
Set CORS_ORIGIN (server) to your Vercel domain (or * for testing).

path is not defined (server):
Ensure const path = require('path') in server/index.js.

File uploads not persisting on Render:
Render disk is ephemeral. Consider moving to S3 for resume storage.

Jest errors about CSS or ESM:
Already addressed in config with CSS stubs and setup files. If you add new asset types, map them to stubs in moduleNameMapper.

Roadmap
Admin dashboard (protected) to manage jobs & review applications.

File storage migration to S3.

Email notifications (e.g., SendGrid) on new applications/inquiries.

OpenAPI/Swagger docs for the API.

E2E tests (Cypress or Playwright).

CI/CD (GitHub Actions): lint, test, and deploy.

License
Copyright © EvansHills Recruitment.
