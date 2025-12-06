const Skills = require("../models/SkillsModel");

const getAllSkills = async (req, res) => {
  try {
    const skills = await Skills.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: "Error fetching skills", error });
  }
};

const addSkill = async (req, res) => {
  try {
    const newSkill = new Skills(req.body);
    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ message: "Error adding skill", error });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSkill = await Skills.findByIdAndDelete(id);
    if (!deletedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting skill", error });
  }
};

const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSkill = await Skills.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: "Error updating skill", error });
  }
};

module.exports = {
  getAllSkills,
  addSkill,
  deleteSkill,
  updateSkill
};
