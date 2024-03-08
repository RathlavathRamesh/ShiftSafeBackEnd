const express = require('express');
const router = express.Router();
const ItemModel=require('../models/user.model');

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
            console.log("dhfhdf");
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

router.get('/getItem',async(req,res)=>{
    const {body}=req;
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
        console.log("Error in Fetchinig the Data: ",err);
        res.status(500).send('Error retrieving data');
      }
})


module.exports = router;