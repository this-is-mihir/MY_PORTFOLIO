// routes/skillRoutes.js
const express = require("express");
const {
  getAllSkills,
  addSkill,
  deleteSkill,
  updateSkill,
} = require("../controllers/skillsController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/*
  Base mount: /api/skills
  index.js:
  app.use("/api/skills", skillRoutes);

  DESIGN DECISION (IMPORTANT):
  - GET skills → PUBLIC (portfolio needs it)
  - POST / PUT / DELETE → ADMIN ONLY
*/

// ✅ PUBLIC – portfolio, homepage, etc.
router.get("/", getAllSkills);

// 🔒 ADMIN ONLY
router.post("/", protect, addSkill);
router.put("/:id", protect, updateSkill);
router.delete("/:id", protect, deleteSkill);

module.exports = router;
