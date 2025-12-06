// backend/models/Profile.js
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Mihir Patel",
    },
    title: {
      type: String,
      default: "FullStack Developer (MERN)",
    },
    avatar: {
      type: String, // image URL (Cloudinary, etc.)
      default: "",
    },
    bio: {
      type: String,
      default:
        "Passionate about building intelligent applications with AI, ML, and modern web technologies. Always exploring the edge of innovation.",
    },
    // ✅ NEW: resume PDF ka URL
    resumeUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
