// backend/controllers/countController.js
const Project = require("../models/projectModel");
const Skill = require("../models/SkillsModel");
const Blog = require("../models/blogModel");
const Contact = require("../models/contactModel");

// 👇 ye 2 line add karo
const Education = require("../models/Education");
const Experience = require("../models/Experience");

// GET: Count Projects, Skills, Blogs, Contacts, Education, Experience
const getCounts = async (req, res) => {
  try {
    const projectCount = await Project.countDocuments();
    const skillCount = await Skill.countDocuments();
    const blogCount = await Blog.countDocuments();
    const contactCount = await Contact.countDocuments();

    // 👇 new counts
    const educationCount = await Education.countDocuments();
    const experienceCount = await Experience.countDocuments();

    res.json({
      projects: projectCount,
      skills: skillCount,
      blogs: blogCount,
      contacts: contactCount,
      education: educationCount,   // 👈 yahi keys frontend me use karenge
      experience: experienceCount, // 👈
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCounts };
