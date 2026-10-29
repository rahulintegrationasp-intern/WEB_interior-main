const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Project = require('../models/project');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const path = require('path');

// Allowed MIME types for project images
const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    // Use the original detected format rather than blindly forcing 'png'
    format: async (req, file) => {
      const mime = file.mimetype || "";
      if (mime === "image/jpeg") return "jpg";
      if (mime === "image/webp") return "webp";
      if (mime === "image/gif")  return "gif";
      return "png"; // default / fallback
    },
    public_id: (req, file) => Date.now() + path.extname(file.originalname),
  },
});

// Reject non-image files before they reach Cloudinary
function imageFileFilter(req, file, cb) {
  if (ALLOWED_MIME.has(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", `Unsupported file type: ${file.mimetype}`));
  }
}

const upload = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB cap
});

const VALID_CATEGORIES = new Set(["Residential", "Commercial", "Hospitality"]);

router.post("/", upload.single("pimg"), async (req, res) => {
  try {
    const { name, desc, cat, pimg } = req.body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({ error: "Project name is required" });
    }
    if (!desc || typeof desc !== "string" || desc.trim().length === 0) {
      return res.status(400).json({ error: "Project description is required" });
    }
    if (!cat || !VALID_CATEGORIES.has(cat)) {
      return res.status(400).json({ error: "Category must be Residential, Commercial, or Hospitality" });
    }

    const imagePath = req.file && req.file.path ? req.file.path : pimg;

    if (!imagePath) {
      return res.status(400).json({ error: "Project image is required" });
    }

    const newProject = new Project({
      name: name.trim(),
      desc: desc.trim(),
      cat,
      pimg: imagePath,
    });

    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Project upload error:", error.message);
    res.status(500).json({ error: "Could not save project" });
  }
});

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};
    if (category && category !== 'All') {
      // Escape regex special characters to prevent ReDoS
      const escaped = category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter = { cat: new RegExp(`^${escaped}$`, 'i') };
    }

    const projects = await Project.find(filter);
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch projects' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch project', details: error.message });
  }
});

router.patch('/:id', upload.single('pimg'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, desc, cat } = req.body;

    if (cat && !VALID_CATEGORIES.has(cat)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    project.name = name || project.name;
    project.desc = desc || project.desc;
    project.cat = cat || project.cat;

    if (req.file && req.file.path) {
      project.pimg = req.file.path;
    }

    await project.save();
    res.status(200).json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: 'Could not update project' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await project.deleteOne({ _id: id });
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: 'Could not delete project' });
  }
});

module.exports = router;
