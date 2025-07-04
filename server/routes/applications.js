const router      = require('express').Router();
const multer      = require('multer');
const path        = require('path');
const authUser    = require('../middleware/authUser');
const Application = require('../models/Application');

// Configure Multer storage to /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename:    (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random()*1e9);
    const ext    = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + unique + ext);
  }
});
const upload = multer({ storage });

// **NEW**: GET /api/applications — list this user’s applications
router.get('/', authUser, async (req, res) => {
  try {
    const apps = await Application
      .find({ userId: req.user.sub })
      .populate('jobId', 'title company location')
      .sort({ appliedAt: -1 });
    return res.json(apps);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// POST /api/applications — multipart form
router.post(
  '/', authUser,
  upload.single('resume'), 
  async (req, res) => {
    try {
      // Build application data
      const { jobId, name, email, phone, coverLetter } = req.body;
      const resumeUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

      const app = new Application({
        userId: req.user.sub,
         jobId, name, email, phone, coverLetter, resumeUrl });
      await app.save();
      res.status(201).json({ message: 'Application submitted', application: app });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Failed to submit application' });
    }
  }
);

module.exports = router;

