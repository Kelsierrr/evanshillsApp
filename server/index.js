// server/index.js
const app = require('./app');
const mongoose = require('mongoose');
const { seedJobs } = require('./seedJobs');

mongoose.connect(process.env.MONGO_URI, {})
  .then(async () => {
    console.log('Connected to MongoDB');
    if (process.env.SEED_JOBS === 'true') {
      await seedJobs();       // <-- only runs when you set SEED_JOBS=true
    }
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));