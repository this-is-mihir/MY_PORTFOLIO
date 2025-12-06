const mongoose=require('mongoose');

const certificateSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    issuer:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    img:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('Certificate',certificateSchema);