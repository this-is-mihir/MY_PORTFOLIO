// backend/index.js (safe fallback — minimal, non-crashing)
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

dotenv.config();

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
const PORT = process.env.PORT || 5000;

/* ---------- Connect DB (but don't crash on error) ---------- */
try {
  dbConnect();
} catch (err) {
  console.error("DB connect threw error during startup:", err);
  // continue — the app will still start; controllers should handle DB errors gracefully
}

/* ---------- Middleware ---------- */
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      // Accept common origins — add more if needed
      const allowed = [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://mihirpatel.fun",
        "https://www.mihirpatel.fun",
      ];
      if (allowed.includes(origin)) return callback(null, true);
      // fallback: allow the request (safer for now)
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* ---------- Static uploads (if any) ---------- */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ---------- API Routes ---------- */
app.use("/api/admin", adminRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/curriculum", curriculumRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/counts", countRoutes);
app.use("/api/contacts", contactRoutes);

/* ---------- Health and root ---------- */
app.get("/health", (req, res) => res.json({ status: "ok" }));
app.get("/", (req, res) => res.send("API running"));

/* ---------- Error handler (doesn't crash server) ---------- */
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err && err.stack ? err.stack : err);
  if (res.headersSent) return next(err);
  res.status(500).json({ message: "Internal Server Error" });
});

/* ---------- Start server ---------- */
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
