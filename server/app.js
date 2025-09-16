// server/app.js
const express  = require('express');
const cors     = require('cors');
const path     = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const ALLOW = [
  'http://localhost:5173',
  'https://evanshills-app.vercel.app',   // <-- your Vercel domain (double-check spelling)
];
app.use(cors({
  origin(origin, cb) {
    if (!origin || ALLOW.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));
app.options('*', cors());

app.use(express.json());

/* ---------- STATIC (uploads) ---------- */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routers
const authRouter           = require('./routes/auth');
const usersRouter          = require('./routes/users');
const jobsRouter           = require('./routes/jobs');
const applicationsRouter   = require('./routes/applications');
const serviceReqRouter     = require('./routes/serviceRequests');
const employerInqRouter    = require('./routes/employerInquiries');
const contactInqRouter     = require('./routes/contactInquiries');


// API routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/applications', applicationsRouter);
app.use('/api/service-requests', serviceReqRouter);
app.use('/api/employer-inquiries', employerInqRouter);
app.use('/api/contact-inquiries', contactInqRouter);

// Health check
app.get('/api', (_req, res) => res.json({ status: 'ok' }));

module.exports = app;
