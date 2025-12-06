// backend/controllers/profileController.js
const Profile = require("../models/Profile");

// GET /api/profile  -> frontend ko profile bhejna
const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();

    if (!profile) {
      profile = await Profile.create({});
    }

    return res.json(profile);
  } catch (err) {
    console.error("Error in getProfile:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/profile  -> admin se profile update (name, title, avatar, bio, resumeUrl)
const updateProfile = async (req, res) => {
  try {
    const { name, title, avatar, bio, resumeUrl } = req.body;

    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile({});
    }

    if (name !== undefined) profile.name = name;
    if (title !== undefined) profile.title = title;
    if (avatar !== undefined) profile.avatar = avatar;
    if (bio !== undefined) profile.bio = bio;
    if (resumeUrl !== undefined) profile.resumeUrl = resumeUrl;

    await profile.save();

    return res.json({
      message: "Profile updated successfully",
      profile,
    });
  } catch (err) {
    console.error("Error in updateProfile:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ NEW: POST /api/profile/resume  -> PDF upload from admin panel
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No resume file uploaded" });
    }

    // Example: /uploads/resume/resume-123456.pdf
    const filePath = `/uploads/resume/${req.file.filename}`;
    const resumeUrl = `${req.protocol}://${req.get("host")}${filePath}`;

    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile({});
    }

    profile.resumeUrl = resumeUrl;
    await profile.save();

    return res.json({
      message: "Resume uploaded successfully",
      resumeUrl,
    });
  } catch (err) {
    console.error("Error in uploadResume:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProfile, updateProfile, uploadResume };
