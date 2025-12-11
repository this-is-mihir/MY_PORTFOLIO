// routes/blogRoutes.js
const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();

// Base mount: /api/blogs (handled in backend/index.js)

// GET /api/blogs
router.get("/", getAllBlogs);

// GET /api/blogs/:id
router.get("/:id", getBlogById);

// POST /api/blogs  (protected)
router.post("/", protect, createBlog);

// PUT /api/blogs/:id  (protected)
router.put("/:id", protect, updateBlog);

// DELETE /api/blogs/:id  (protected)
router.delete("/:id", protect, deleteBlog);

module.exports = router;
