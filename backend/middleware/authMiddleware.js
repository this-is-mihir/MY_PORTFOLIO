// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// ✅ Strict Admin protection (unchanged)
const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await Admin.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      return next();
    }

    return res.status(401).json({ message: "Not authorized, no token" });
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// ✅ OPTIONAL auth (public + admin both allowed)
const optionalProtect = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await Admin.findById(decoded.id).select("-password");
    }
  } catch (error) {
    // ❌ token fail hua to bhi public request allow
    req.user = null;
  }

  next();
};

// ✅ Admin check (unchanged)
const isAdmin = (req, res, next) => {
  if (req.user) {
    return next();
  }
  return res.status(403).json({ message: "Access denied." });
};

module.exports = { protect, optionalProtect, isAdmin };
