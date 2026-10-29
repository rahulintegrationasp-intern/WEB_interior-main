const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Project = require('../models/project');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const path = require('path');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => 'png',
    public_id: (req, file) => Date.now() + path.extname(file.originalname),
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("pimg"), async (req, res) => {
  try {
    const { name, desc, cat, pimg } = req.body;
    const imagePath = req.file && req.file.path ? req.file.path : pimg;

    if (!imagePath) {
      return res.status(400).json({ error: "Project image is required" });
    }

    const newProject = new Project({
      name,
      desc,
      cat,
      pimg: imagePath,
    });

    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Project upload error:", error.message);
    res.status(500).json({ error: "Could not save project", details: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter =
      category && category !== 'All'
        ? { cat: new RegExp(`^${category}$`, 'i') }
        : {};
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