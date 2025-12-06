// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// ✅ Verify token and attach admin user
const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach admin to request (without password)
      req.user = await Admin.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      return next();
    }

    // No token case
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// ✅ For now, treat every authenticated Admin as "admin"
// (Your Admin model has no `role` field, so don't block here)
const isAdmin = (req, res, next) => {
  if (req.user) {
    // If in future you add role in schema, you can switch back to:
    // if (req.user.role === "admin") next(); else 403...
    return next();
  }
  return res.status(403).json({ message: "Access denied." });
};

module.exports = { protect, isAdmin };
