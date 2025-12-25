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

// Base mount: /api/skills   (already defined in index.js)
//
// index.js:
// app.use("/api/skills", skillRoutes)

// GET /api/skills        → getAllSkills (protected)
// GET /api/skills/ → getAllSkills (public)
// POST /api/skills       → addSkill
// DELETE /api/skills/:id → deleteSkill
// PUT /api/skills/:id    → updateSkill

router.get("/", protect, getAllSkills);      // secured list
router.get("/public", getAllSkills);         // public list

router.post("/", protect, addSkill);

router.delete("/:id", protect, deleteSkill);

router.put("/:id", protect, updateSkill);

module.exports = router;
