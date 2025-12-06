const Contact=require('../models/contactModel');

const createContact=async(req,res)=>{
    try {
        const {name,email,message}=req.body;
        const newContact=new Contact({name,email,message});
        await newContact.save();
        res.status(201).json({message:'Contact created successfully'});
    } catch (error) {
        res.status(500).json({message:'Error creating contact'});
    }
};

const getContact=async(req,res)=>{
    try {
        const totalContacts = await Contact.find();
        res.status(200).json({ totalContacts });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching counts' });
    }
};
const deleteContact=async(req,res)=>{
    try {
        const { id } = req.params;
        await Contact.findByIdAndDelete(id);
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting contact' });
    }
};

module.exports={createContact,getContact,deleteContact};
