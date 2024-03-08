const mongoose=require('mongoose');

const ItemModel=mongoose.model('items',new mongoose.Schema({
  user_name:{type:String,requied:true},
  item_id:{type:String,required:true},
  order_status:{type:String,requied:true}
}));

module.exports=ItemModel; 
