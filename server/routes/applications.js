// server/routes/applications.js
const router = require('express').Router();
const Application = require('../models/Application');

// POST /api/applications — submit a new application
router.post('/', async (req, res) => {
  try {
    const app = new Application(req.body);
    await app.save();
    res.status(201).json({ message: 'Application submitted', application: app });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to submit application' });
  }
});

module.exports = router;
