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

<<<<<<< HEAD
// GET /api/skills        → getAllSkills (protected)
// GET /api/skills/ → getAllSkills (public)
// POST /api/skills       → addSkill
// DELETE /api/skills/:id → deleteSkill
// PUT /api/skills/:id    → updateSkill
=======
  DESIGN DECISION (IMPORTANT):
  - GET skills → PUBLIC (portfolio needs it)
  - POST / PUT / DELETE → ADMIN ONLY
*/
>>>>>>> 7bff0db949058847184bd6c924022742500ac7ff

// ✅ PUBLIC – portfolio, homepage, etc.
router.get("/", getAllSkills);

// 🔒 ADMIN ONLY
router.post("/", protect, addSkill);
router.put("/:id", protect, updateSkill);
router.delete("/:id", protect, deleteSkill);

module.exports = router;
