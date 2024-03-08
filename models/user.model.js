const mongoose=require('mongoose');

const UserModel=mongoose.model('user',new mongoose.Schema({
        user_name:{type:String,required:true},
        password:{type:String,required:true}
}));


module.exports=UserModel;