// server/index.js
const app = require('./app');
const mongoose = require('mongoose');


const { seedJobs } = require('./seedJobs');
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {})
  .then(async () => {
    console.log('Connected to MongoDB');

    if (process.env.SEED_JOBS === 'true') {
      try {
        await seedJobs(); // <-- now a function
      } catch (e) {
        console.error('Seeding failed:', e);
      }
    }

    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });