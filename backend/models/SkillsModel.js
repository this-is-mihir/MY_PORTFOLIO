const mongoose=require('mongoose');

const SkillsSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  logo:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  }
});


const Skill = mongoose.models.Skill || mongoose.model("Skill", SkillsSchema);

module.exports = Skill;
