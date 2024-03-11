const express = require('express');
const router = express.Router();
const ItemModel=require('../models/item.model');

router.post('/additem',async(req,res)=>{
    try {
        const { body } = req; // Access data from req.body
        const item={...body,"order_status":"ordered"}
        let checkItem=null;
        checkItem=await ItemModel.find({item_id:item.item_id});
        if(checkItem.length>0){
         return  res.status(404).json("Item Already Present")
        }
          if ((!body.item_id) || (!body.user_name)) {
            return res.status(400).json('Missing required field: name');
          }
          const newItem = new ItemModel(item); // Assuming you have an ItemModel defined
          await newItem.save();
           res.status(200).json("item inserted");
        }
       catch (err) {
        console.error('Error saving data:', err);
        res.status(500).json('Error processing request');
      }
})

//Get Specific Item API 

router.post('/getItem',async(req,res)=>{
    const {body}=req;
    console.log(body)
    let searchItem=null
    searchItem=await ItemModel.find({item_id:body.item_id})
    console.log(searchItem)
    if(searchItem.length>0){
      return res.status(200).json(searchItem[0])
    }
    return res.status(500).json("item not found");
})

//Get All the Items API 

router.get('/getItems',async(req,res)=>{
    try{
        const items=await ItemModel.find();
        res.status(200).json(items)
      }
      catch(err){
        res.status(500).send('Error retrieving data',err);
      }
})

router.put('/ubdatestatus',async(req,res)=>{
  const {body}=req
  const itemId=body._id
  const newupdate=body.order_status
  console.log(itemId)
  const updatedItem = await ItemModel.findByIdAndUpdate(
    itemId,
    { $set: { order_status: newupdate } },
    { new: true } 
  );
  if (!updatedItem) {
    return res.status(404).send('Item not found');
  }
  res.status(200).json(updatedItem);
})

module.exports = router;