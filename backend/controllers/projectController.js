const Project=require("../models/projectModel");

const getAllProjects=async(req,res)=>{
  try {
    const projects=await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({message:"Error fetching projects"});
  }
};

const getProjectById=async(req,res)=>{
  const {id}=req.params;
  try {
    const project=await Project.findById({_id:id});
    if(!project){
      return res.status(404).json({message:"Project not found"});
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({message:"Error fetching project"});
  }
};

const createProject=async(req,res)=>{
  const newProject=new Project(req.body);
  try {
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({message:"Error creating project"});
  }
};

const updateProject=async(req,res)=>{
  const {id}=req.params;
  try {
    const updatedProject=await Project.findByIdAndUpdate(id,req.body,{new:true});
    if(!updatedProject){
      return res.status(404).json({message:"Project not found"});
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({message:"Error updating project"});
  }
};

const deleteProject=async(req,res)=>{
  const {id}=req.params;
  try {
    const deletedProject=await Project.findByIdAndDelete(id);
    if(!deletedProject){
      return res.status(404).json({message:"Project not found"});
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({message:"Error deleting project"});
  }
};

module.exports={
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
