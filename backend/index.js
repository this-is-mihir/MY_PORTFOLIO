// backend/index.js
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const dbConnect = require("./config/db");

const adminRoutes = require("./routes/adminRoutes");
const skillRoutes = require("./routes/skillRoutes");
const certificateRoutes = require("./routes/certificatesRoutes");
const blogRoutes = require("./routes/blogRoutes");
const projectRoutes = require("./routes/projectRoutes");
const countRoutes = require("./routes/countRoutes");
const contactRoutes = require("./routes/contactRoutes");
const profileRoutes = require("./routes/profileRoutes");
const curriculumRoutes = require("./routes/curriculumRoutes");

const app = express();

dotenv.config();
dbConnect();

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ IMPORTANT: serve /uploads statically (images + resume pdf)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/curriculum", curriculumRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/counts", countRoutes);
app.use("/api/contacts", contactRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
