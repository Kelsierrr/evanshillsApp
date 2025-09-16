// server/app.js
const express  = require('express');
const cors     = require('cors');
const path     = require('path');
const mongoose = require('mongoose');
require('dotenv').config();


// Routers
const authRouter           = require('./routes/auth');
const usersRouter          = require('./routes/users');
const jobsRouter           = require('./routes/jobs');
const applicationsRouter   = require('./routes/applications');
const serviceReqRouter     = require('./routes/serviceRequests');
const employerInqRouter    = require('./routes/employerInquiries');
const contactInqRouter     = require('./routes/contactInquiries');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/applications', applicationsRouter);
app.use('/api/service-requests', serviceReqRouter);
app.use('/api/employer-inquiries', employerInqRouter);
app.use('/api/contact-inquiries', contactInqRouter);

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

module.exports = app;
