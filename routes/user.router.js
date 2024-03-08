const express = require('express');
const router = express.Router();
const UserModel=require('../models/user.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//USER LOGIN API 
router.post('/login',async(request,response)=>{
  const { user_name, password } = request.body;
  const payLoad = { user_name};
  const jwtToken = jwt.sign(payLoad, "SECRET_KEY");
  try{
    let user=null
    user=await UserModel.find({user_name:user_name});
    if(user.length==0){
      response.status(400);
      response.send("Invalid user");
    }
    else {
      const isPasswordMatches = await bcrypt.compare(password, user[0].password);
      if (isPasswordMatches) {
        response.send({ jwtToken });
      } else {
        response.status(400);
        response.send("Invalid password");
      }
    }
    }
  catch(err){
    response.status(500).json(err);
  }
})



// User Registration API 
router.post('/register',async(req,res)=>{
    const {body}=req;
    console.log(body)
    try{
     if (!body.password || !body.user_name) {
       return res.status(400).json('Missing required field: name');
     }
     let getUser=null;
     getUser=await UserModel.find({user_name:body.user_name});
     if(getUser.length>0){
      return  res.status(500).json("User already present Please Login");
     }
     const hashPassword = await bcrypt.hash(body.password, 10);

     const newUser={user_name:body.user_name,password:hashPassword}
     const newItem = new UserModel(newUser); 
     await newItem.save();
     res.status(200).json("User Registered");
    }
    catch(err){
     res.status(400).json("Error in Registration");
    }
});

module.exports = router;