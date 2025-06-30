const router = require('express').Router();
const ServiceRequest = require('../models/ServiceRequest');

// POST /api/service-requests — submit a service package request
router.post('/', async (req, res) => {
  try {
    const reqData = new ServiceRequest(req.body);
    await reqData.save();
    res.status(201).json({ message: 'Request submitted', request: reqData });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to submit request' });
  }
});

// 👉 Add this GET /api/service-requests route:
router.get('/', async (req, res) => {
    try {
      const requests = await ServiceRequest.find().sort({ requestedAt: -1 });
      res.json(requests);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch service requests' });
    }
  });

module.exports = router;
