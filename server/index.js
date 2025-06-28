const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

//enable CORS and JSON parsing

app.use(cors());
app.use(express.json());
app.use('/api/jobs', require('./routes/jobs'));


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