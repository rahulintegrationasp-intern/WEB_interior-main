const express = require("express");
const router = express.Router();
require("dotenv").config();

/**
 * POST /api/auth/login
 * Validates admin credentials stored in environment variables.
 * Credentials must NEVER be hardcoded — set ADMIN_EMAIL and ADMIN_PASSWORD in .env
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error("[auth] ADMIN_EMAIL or ADMIN_PASSWORD not set in environment");
    return res.status(503).json({ error: "Auth service not configured." });
  }

  if (email.trim() === adminEmail && password === adminPassword) {
    return res.status(200).json({ ok: true });
  }

  return res.status(401).json({ error: "Invalid credentials." });
});

module.exports = router;
