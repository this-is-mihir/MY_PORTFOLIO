const express=require('express');
const router=express.Router();
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
}=require('../controllers/projectController');
const {protect}=require('../middleware/authMiddleware');

router.get('/project',getAllProjects);
router.get('/project/:id',getProjectById);
router.post('/project',protect,createProject);
router.put('/project/:id',protect,updateProject);
router.delete('/project/:id',protect,deleteProject);

module.exports=router;
