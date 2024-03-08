const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminModel=require('../models/admin.model') 

// ADMIN LOGIN API 
router.post('/login',async(request,response)=>{
    const { user_name, password } = request.body;
    const payLoad = { user_name};
    const jwtToken = jwt.sign(payLoad, "SECRET_KEY");
    try{
      
    const adminList=await AdminModel.find({user_name:user_name});
      if(adminList.length==0){
        response.status(400);
        response.send("You are not an admin");
      }
      else {
        const isPasswordMatches = await bcrypt.compare(password, adminList[0].password);
        if (isPasswordMatches) {
          response.send({ jwtToken });
        } else {
          response.status(400);
          response.send("Invalid password For Admin");
        }
      }
      }
    catch(err){
      response.status(500).json(err);
    }
})

router.post('/register',async(req,res)=>{
    const {body}=req;
    try{
     if (!body.password || !body.user_name) {
       return res.status(400).json('Missing required field: name');
     }
     
    const getAdmin=await AdminModel.find({user_name:body.user_name});

    console.log(body.password);
     if(getAdmin.length>0){
      return  res.status(500).json("User already present Please Login");
     }
     const hashPassword = await bcrypt.hash(body.password, 10);
     const newAdmin={user_name:body.user_name,password:hashPassword}
     const newItem = new AdminModel(newAdmin); 
     await newItem.save();
     res.status(200).json("Admin Registered");
    }
    catch(err){
      console.log("Error in Admin Registration")
     res.status(400).json("Error in Registration");
    }
})


module.exports=router;

