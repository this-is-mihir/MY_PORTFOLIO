// backend/routes/curriculumRoutes.js
const express = require("express");
const router = express.Router();

const {
  getCurriculum,
  addEducation,
  addExperience,
  updateEducation,
  deleteEducation,
  updateExperience,
  deleteExperience,
} = require("../controllers/curriculumController");

// GET all education + experience
router.get("/", getCurriculum);

// ADD
router.post("/education", addEducation);
router.post("/experience", addExperience);

// UPDATE
router.put("/education/:id", updateEducation);
router.put("/experience/:id", updateExperience);

// DELETE
router.delete("/education/:id", deleteEducation);
router.delete("/experience/:id", deleteExperience);

module.exports = router;
