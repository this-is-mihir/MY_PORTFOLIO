// backend/index.js
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

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

/* -----------------------------------
      🔥 CORS FIX (Render + Local)
----------------------------------- */
const allowedOrigins = [
  "http://localhost:5173",                                  // local frontend
  "https://portfolio-frontend-m36u.onrender.com",           // deployed frontend (example)
  "https://mihirpatel.fun",
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests without origin (POSTMAN / mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS blocked: Origin not allowed"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* -----------------------------------
         Static File Serve (Uploads)
----------------------------------- */
const uploadsPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsPath));



/* -----------------------------------
                Routes (API)
----------------------------------- */
app.use("/api/admin", adminRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/curriculum", curriculumRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/counts", countRoutes);
app.use("/api/contacts", contactRoutes);

/* -----------------------------------
    Serve Frontend Build (SPA fallback)
----------------------------------- */
// Look for build folders in common locations
const possibleBuildPaths = [
  path.join(__dirname, "build"),
  path.join(__dirname, "client", "build"),
];

let frontBuildPath = null;
for (const p of possibleBuildPaths) {
  if (fs.existsSync(p)) {
    frontBuildPath = p;
    break;
  }
}

if (frontBuildPath) {
  console.log("✅ Frontend build found at:", frontBuildPath);

  // Serve static assets
  app.use(express.static(frontBuildPath));

  // IMPORTANT: only serve index.html for non-API GET requests
  app.get("*", (req, res, next) => {
    // If request is for an API route, skip and pass to next handler
    if (req.path.startsWith("/api/")) return next();

    // For any other GET request, serve index.html so React Router handles it
    res.sendFile(path.join(frontBuildPath, "index.html"), (err) => {
      if (err) {
        next(err);
      }
    });
  });
} else {
  console.warn(
    "⚠️ Frontend build not found. Place React build in './build' or './client/build'."
  );
}

/* -----------------------------------
        Root Route (for simple API test)
----------------------------------- */
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

/* -----------------------------------
             Error Handler
----------------------------------- */
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err && err.stack ? err.stack : err);
  res.status(500).json({ message: "Internal Server Error" });
});

/* -----------------------------------
                Server
----------------------------------- */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
