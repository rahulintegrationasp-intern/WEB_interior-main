require("dotenv").config();
const express = require('express');
const app = express();
const connection = require("./db");
const cors = require('cors');
const bodyParser = require('body-parser');

const cloudinary = require('cloudinary').v2;

const projectRoutes = require('./routes/project');
const formRoutes = require('./routes/form');
const authRoutes = require('./routes/auth');

connection();

cloudinary.config({
    cloud_name: process.env.CN,
    api_key: process.env.AK,
    api_secret: process.env.AS
});

// ── Security headers (helmet-style manual set; install helmet for full coverage) ──
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self' https://res.cloudinary.com data:; style-src 'self' 'unsafe-inline'"
  );
  next();
});

// ── CORS — restrict to the configured client origin ───────────────────────
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server (no origin) and whitelisted origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: '1mb' }));
app.use(bodyParser.json({ limit: '1mb' }));

app.use("/api/project", projectRoutes);
app.use("/api/form", formRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}...`));
