const router = require("express").Router();
const jwt = require("jsonwebtoken");
require("dotenv").config(); // ensure you have dotenv installed and configured

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // set this in your .
const JWT_SECRET = process.env.JWT_SECRET; // also set in .env
const EXPIRES_IN = "2h";

router.post("/login", (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ role: "admin" }, JWT_SECRET, {
    expiresIn: EXPIRES_IN,
  });
  res.json({ token });
});

module.exports = router;
