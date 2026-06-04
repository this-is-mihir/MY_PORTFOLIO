const express = require("express");
const { loginAdmin } = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const Admin = require("../models/Admin");

const router = express.Router();

// ✅ TEMP ROUTE: default admin create karne ke liye
// GET /api/admin/create-default-admin
router.get("/create-default-admin", async (req, res) => {
  try {
    const admin = await Admin.create({
      email: "patelmihir0367@gmail.com",
      password: "08290", // plain text, controller bhi plain text compare kar raha hai
    });

    res.json({ message: "Default admin created", admin });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating admin", error: err.message });
  }
});

// POST /api/admin/login
router.post("/login", loginAdmin);

// GET /api/admin/verify — validate stored token on page load
// protect middleware verifies JWT; if invalid/expired it auto-returns 401
router.get("/verify", protect, (req, res) => {
  res.json({ valid: true, email: req.user.email });
});

module.exports = router;
