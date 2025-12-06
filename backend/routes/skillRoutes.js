
const express=require('express');
const { getAllSkills, addSkill, deleteSkill, updateSkill } = require('../controllers/skillsController');
const { protect } = require('../middleware/authMiddleware');
const router=express.Router();

router.get('/skill',protect,getAllSkills);
router.get('/skill/public',getAllSkills);
router.post('/skill',protect,addSkill);
router.delete('/skill/:id',protect,deleteSkill);
router.put('/skill/:id',protect,updateSkill);

module.exports=router;