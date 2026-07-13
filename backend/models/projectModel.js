const mongoose=require("mongoose");

const projectSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  tech:[String],
  githubLink:{
    type:String,
    required:true
  },
  liveDemoLink:{
    type:String,
  },
  order: {
    type: Number,
    default: 0
  }

});

const Project =mongoose.models.Project || mongoose.model("Project", projectSchema);

module.exports = Project;