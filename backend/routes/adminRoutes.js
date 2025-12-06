const express = require("express");
const { loginAdmin } = require("../controllers/adminController");
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

module.exports = router;
