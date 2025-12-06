const express = require("express");
const { getCounts } = require("../controllers/countController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route (admin only)
router.get("/", protect, getCounts);

module.exports= router;
