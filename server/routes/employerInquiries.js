// server/routes/employerInquiries.js
const router = require('express').Router();
const EmployerInquiry = require('../models/EmployerInquiry');

router.post('/', async (req, res) => {
  try {
    const inquiry = new EmployerInquiry(req.body);
    await inquiry.save();
    res.status(201).json({ message: 'Employer inquiry submitted', inquiry });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to submit employer inquiry' });
  }
});

module.exports = router;
