const mongoose = require("mongoose");
require("dotenv").config();

const DB_URI = process.env.MONGO;

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    // already connected
    return;
  }

  try {
    await mongoose.connect(DB_URI, {
      maxPoolSize: 10,   // 🔥 connection pooling
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ MongoDB connected (pooled)");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = dbConnect;
