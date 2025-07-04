const router = require("express").Router();
const Job = require("../models/Job");
const auth = require('../middleware/auth');

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
router.post("/", auth, async (req, res) => {
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

// GET /api/jobs/:id - Get a job by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/jobs/:id - Update a job by ID

router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { title, company, location, description } = req.body;

  if (!title || !company || !location || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { title, company, location, description },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/jobs/:id - Delete a job by ID
router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;