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

dotenv.config();
dbConnect();

const app = express();
const PORT = process.env.PORT || 5000;

/* -----------------------------------
      🔥 CORS FIX (Render + Local)
----------------------------------- */
// allow both http/https and with/without www variants commonly used
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "http://localhost:3000",
  "https://mihirpatel.fun",
  "https://www.mihirpatel.fun",
  "https://portfolio-frontend-m36u.onrender.com", // example
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests without origin (POSTMAN / mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // allow same-origin (when browser sends full host header)
    const originHost = origin.replace(/^https?:\/\//, "").replace(/\/$/, "");
    if (allowedOrigins.some((o) => o.includes(originHost))) return callback(null, true);
    // fallback: allow (you can tighten this later)
    return callback(new Error("CORS blocked: Origin not allowed"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* -----------------------------------
         Static File Serve (Uploads)
----------------------------------- */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

  // Only serve index.html for non-API GET requests (so API still works)
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) return next();
    res.sendFile(path.join(frontBuildPath, "index.html"), (err) => {
      if (err) next(err);
    });
  });
} else {
  console.warn(
    "⚠️ Frontend build not found. Place React build in './build' or './client/build'."
  );

  // SAFE fallback: if someone hits common client-side routes directly (like /login),
  // redirect them to the root with a hash route so client can handle via HashRouter.
  // This prevents the plain 404 "Not Found" page and allows immediate access.
  const clientRoutes = [
    "/",
    "/login",
    "/admin",
    "/admin/*",
    "/projects",
    "/projects/*",
    "/blog",
    "/blog/*",
    "/about",
    "/contact",
    "/skills",
    "/services",
    "/curriculum",
  ];

  app.get(clientRoutes, (req, res) => {
    // Build a hash path from original url: "/login" -> "/#/login"
    const original = req.path || "/";
    // If root, redirect to root (no hash required)
    if (original === "/") return res.redirect(302, "https://mihirpatel.fun/");

    // Ensure we preserve any nested paths (like /projects/123)
    const hashPath = `#${original}`;
    const redirectTo = `https://mihirpatel.fun/${hashPath}`;
    console.log(`Redirecting ${req.path} -> ${redirectTo} (no build present)`);
    return res.redirect(302, redirectTo);
  });
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
  // If headers already sent, delegate
  if (res.headersSent) return next(err);
  res.status(500).json({ message: "Internal Server Error" });
});

/* -----------------------------------
                Server
----------------------------------- */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
