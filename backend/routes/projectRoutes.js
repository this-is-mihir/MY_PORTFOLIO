const express = require("express");
const router = express.Router();
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");

// 🔹 Base path: /api/projects (from index.js)
//    Yaha sirf relative paths rakho

// GET /api/projects
router.get("/", getAllProjects);

// GET /api/projects/:id
router.get("/:id", getProjectById);

// POST /api/projects  (protected)
router.post("/", protect, createProject);

// PUT /api/projects/:id  (protected)
router.put("/:id", protect, updateProject);

// DELETE /api/projects/:id  (protected)
router.delete("/:id", protect, deleteProject);

module.exports = router;
