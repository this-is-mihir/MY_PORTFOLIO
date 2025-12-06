const express=require('express');
const { createContact, getContact, deleteContact } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

const router=express.Router();

router.post('/contact',createContact);
router.get('/contact',protect,getContact);
router.delete('/contact/:id',protect,deleteContact);

module.exports=router;
