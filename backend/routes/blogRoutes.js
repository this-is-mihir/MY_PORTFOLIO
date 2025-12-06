const express=require("express");
const {protect}=require("../middleware/authMiddleware");
const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } = require("../controllers/blogController");
const router=express.Router();

router.post("/blog",protect,createBlog);
router.get("/blog",getAllBlogs);
router.get("/blog/:id",getBlogById);
router.put("/blog/:id",protect,updateBlog);
router.delete("/blog/:id",protect,deleteBlog);

module.exports=router;