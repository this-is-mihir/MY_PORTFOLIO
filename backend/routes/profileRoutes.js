// backend/routes/profileRoutes.js
const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const {
  getProfile,
  updateProfile,
  uploadResume,
} = require("../controllers/profileController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/* ---------- MULTER STORAGE FOR RESUME PDF ---------- */

// ensure uploads/resume folder exists
const resumeDir = path.join(__dirname, "..", "uploads", "resume");
if (!fs.existsSync(resumeDir)) {
  fs.mkdirSync(resumeDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, resumeDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // .pdf
    cb(null, `resume-${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  // only PDF
  if (
    file.mimetype === "application/pdf" ||
    file.originalname.toLowerCase().endsWith(".pdf")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
});

/* ---------- ROUTES ---------- */

// Public: koi bhi GET kare to profile mile
router.get("/", getProfile);

// Protected: sirf admin (logged in) update kar sake (JSON fields: name, title, avatar, bio, resumeUrl)
router.put("/", protect, updateProfile);

// ✅ NEW: resume upload (multipart/form-data, field name "resume")
router.post(
  "/resume",
  protect,
  upload.single("resume"),
  uploadResume
);

module.exports = router;
