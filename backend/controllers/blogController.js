const Blog=require('../models/blogModel');  

exports.createBlog=async(req,res)=>{
  try {
    const blog=new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};

exports.getAllBlogs=async(req,res)=>{
  try {
    const blogs=await Blog.find().sort({ order: 1, _id: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};

exports.getBlogById=async(req,res)=>{
  try {
    const blog=await Blog.findById(req.params.id);
    if(!blog){
      return res.status(404).json({message:"Blog not found"});
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};

exports.updateBlog=async(req,res)=>{
    try {
        const blog=await Blog.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!blog){
            return res.status(404).json({message:"Blog not found"});
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

exports.deleteBlog=async(req,res)=>{
    try {
        const blog=await Blog.findByIdAndDelete(req.params.id);
        if(!blog){
            return res.status(404).json({message:"Blog not found"});
        }
        res.status(204).json({
            message:"Blog deleted successfully"
        });
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

exports.reorderBlogs = async (req, res) => {
  const { orderedIds } = req.body;
  try {
    for (let i = 0; i < orderedIds.length; i++) {
      await Blog.findByIdAndUpdate(orderedIds[i], { order: i });
    }
    res.status(200).json({ message: "Blogs reordered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
