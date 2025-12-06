// backend/models/Experience.js
const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    years: {
      type: String,
      required: true,
      trim: true,
    },
    tech: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Experience = mongoose.model("Experience", experienceSchema);

module.exports = Experience;
