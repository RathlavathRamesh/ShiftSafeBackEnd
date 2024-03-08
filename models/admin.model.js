const mongoose=require('mongoose');

const AdminModel=mongoose.model('admin',new mongoose.Schema({
    user_name:{type:String,required:true},
    password:{type:String,required:true},
}));

module.exports=AdminModel;
