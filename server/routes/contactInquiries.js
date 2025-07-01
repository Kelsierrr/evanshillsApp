// server/routes/contactInquiries.js
const router = require('express').Router();
const ContactInquiry = require('../models/ContactInquiry');

router.post('/', async (req, res) => {
  try {
    const inquiry = new ContactInquiry(req.body);
    await inquiry.save();
    res.status(201).json({ message: 'Contact inquiry submitted', inquiry });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to submit contact inquiry' });
  }
});

module.exports = router;
