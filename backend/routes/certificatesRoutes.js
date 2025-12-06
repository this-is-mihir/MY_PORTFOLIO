const express=require("express");
const { getCertificates, createCertificate, updateCertificate, deleteCertificate } = require("../controllers/certificatesController");
const {protect} = require("../middleware/authMiddleware")

const router=express.Router();

router.get('/certificate',getCertificates);
router.post('/certificate',protect,createCertificate);
router.put('/certificate/:id',protect,updateCertificate);
router.delete('/certificate/:id',protect,deleteCertificate);

module.exports=router;
