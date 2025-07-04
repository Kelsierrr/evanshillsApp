const express = require('express');
const authRouter    = require('./routes/auth');
const authMiddleware = require('./middleware/auth');
const cors = require('cors');
const path    = require('path'); 
require('dotenv').config();
const mongoose = require('mongoose');


const app = express();

//enable CORS and JSON parsing

app.use(cors());
app.use(express.json());
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', authRouter);
app.use('/api/jobs', require('./routes/jobs'));
//app.use('/api/jobs/:id', require('./routes/jobs'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/service-requests', require('./routes/serviceRequests'));
app.use('/api/employer-inquiries', require('./routes/employerInquiries'));
app.use('/api/contact-inquiries', require('./routes/contactInquiries'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    }
    );

// Health check endpoint
app.get('/api', (req, res) => {
    res.json({ status: 'ok', message: 'API is running' });
});

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});