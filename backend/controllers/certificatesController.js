const Certificate=require('../models/certificatesModel');

exports.createCertificate=async(req,res)=>{
    try {
        const {title,issuer,date,img}=req.body;
        const newCertificate=new Certificate({title,issuer,date,img});
        await newCertificate.save();
        res.status(201).json({message:'Certificate created successfully',certificate:newCertificate});
    } catch (error) {
        res.status(500).json({message:'Error creating certificate',error:error.message});
    }
};

exports.getCertificates=async(req,res)=>{
    try {
        const certificates=await Certificate.find();
        res.status(200).json({certificates});
    } catch (error) {
        res.status(500).json({message:'Error fetching certificates',error:error.message});
    }
};

exports.updateCertificate=async(req,res)=>{
    try {
        const {id}=req.params;
        const {title,issuer,date,img}=req.body;
        const updatedCertificate=await Certificate.findByIdAndUpdate(id,{title,issuer,date,img},{new:true});
        if(!updatedCertificate){
            return res.status(404).json({message:'Certificate not found'});
        }
        res.status(200).json({message:'Certificate updated successfully',certificate:updatedCertificate});
    } catch (error) {
        res.status(500).json({message:'Error updating certificate',error:error.message});
    }
};

exports.deleteCertificate=async(req,res)=>{
    try {
        const {id}=req.params;
        const deletedCertificate=await Certificate.findByIdAndDelete(id);
        if(!deletedCertificate){
            return res.status(404).json({message:'Certificate not found'});
        }
        res.status(200).json({message:'Certificate deleted successfully'});
    } catch (error) {
        res.status(500).json({message:'Error deleting certificate',error:error.message});
    }
};

