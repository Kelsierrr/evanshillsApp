const router = require("express").Router();
const Job = require("../models/Job");

// GET /api/jobs - Get all jobs

router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
);

// POST /api/jobs - Create a new job
router.post("/", async (req, res) => {
  const { title, company, location, description } = req.body;

  if (!title || !company || !location || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newJob = new Job({ title, company, location, description });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: "Failed to create job" });
  }
});

module.exports = router;