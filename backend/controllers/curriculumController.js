// backend/controllers/curriculumController.js
const Education = require("../models/Education");
const Experience = require("../models/Experience");

// GET /api/curriculum  -> education + experience
const getCurriculum = async (req, res) => {
  try {
    const education = await Education.find().sort({ year: -1, createdAt: -1 });
    const experience = await Experience.find().sort({ createdAt: -1 });

    res.json({ education, experience });
  } catch (err) {
    console.error("Error fetching curriculum:", err);
    res.status(500).json({ message: "Failed to fetch curriculum" });
  }
};

// POST /api/curriculum/education
const addEducation = async (req, res) => {
  try {
    const { degree, year, institution, details } = req.body;

    const edu = await Education.create({ degree, year, institution, details });
    res.status(201).json(edu);
  } catch (err) {
    console.error("Error adding education:", err);
    res.status(500).json({ message: "Failed to add education" });
  }
};

// POST /api/curriculum/experience
const addExperience = async (req, res) => {
  try {
    const { title, years, tech, details } = req.body;

    const exp = await Experience.create({ title, years, tech, details });
    res.status(201).json(exp);
  } catch (err) {
    console.error("Error adding experience:", err);
    res.status(500).json({ message: "Failed to add experience" });
  }
};

// UPDATE Education
const updateEducation = async (req, res) => {
  try {
    const edu = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(edu);
  } catch (err) {
    console.error("Error updating education:", err);
    res.status(500).json({ message: "Failed to update education" });
  }
};

// DELETE Education
const deleteEducation = async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ message: "Education removed" });
  } catch (err) {
    console.error("Error deleting education:", err);
    res.status(500).json({ message: "Failed to delete education" });
  }
};

// UPDATE Experience
const updateExperience = async (req, res) => {
  try {
    const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(exp);
  } catch (err) {
    console.error("Error updating experience:", err);
    res.status(500).json({ message: "Failed to update experience" });
  }
};

// DELETE Experience
const deleteExperience = async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: "Experience removed" });
  } catch (err) {
    console.error("Error deleting experience:", err);
    res.status(500).json({ message: "Failed to delete experience" });
  }
};

module.exports = {
  getCurriculum,
  addEducation,
  addExperience,
  updateEducation,
  deleteEducation,
  updateExperience,
  deleteExperience,
};
