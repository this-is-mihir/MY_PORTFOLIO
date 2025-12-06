const mongoose=require('mongoose');

const blogSchema=new mongoose.Schema({
  image:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  author:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  },
  description:{
    type:String,
    required:true
  }
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

module.exports = Blog;