const express = require("express");
const UserRoute = express.Router();
const UserModel = require("../models/user.model")
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
UserRoute.post("/signup",(req,res)=>{
  try {
    let email = req.body.email;
    let myPlaintextPassword= req.body.password;
    bcrypt.hash(myPlaintextPassword,SALT_ROUNDS,async function(err, hash) {
        if(err){
            res.status(500).json({msg:"signup failed"});
        }
        let user = {...req.body,password:hash};
        await UserModel.create(user);
        res.status(201).json({msg:"UserCreated",email:req.body.email,password:req.body.password})
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({msg:"signup error occured,(catch)"});
  }
});
UserRoute.post("/login",async(req,res)=>{
    try {
        let user1 = await UserModel.findOne({email:req.body.email});
         if(user1){
            res.status(404).json({msg:"User Not found"})
        }
        else{
            let myPlaintextPassword1 = req.body.password;
            let hashPassword = user1.password;
            bcrypt.compare( myPlaintextPassword1,hashPassword, function(err, result) {
                // result == false
                if(err){
                    res.status(500).json({msg:"login failed"}); 
                }
                if(result){
                    let data = {userId:user1._id};
                    var token = jwt.sign({data}, JWT_KEY, {expiresIn:"20 mins"});
                    res.status(200).json({msg:"LoginSucessFull",token});
                } else {
                    res.status(401).json({msg:"Invalid credentials"});
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:"Error in login,(catch)"})
    }
})
UserRoute.post("/resetpassword",async(req,res)=>{
   try {
     let user1 = await UserModel.findOne({email:req.query.email});
     console.log(user1);
     if(!user1){
        let myPlaintextPassword = req.body.password;
        bcrypt.hash(myPlaintextPassword,SALT_ROUNDS,async function(err,hash){
            if(err){
                res.status(500).json({msg:"Error in Reset"});
            }
            await UserModel.findByIdAndUpdate(user1._id,{password:hash});
            res.status(200).json({msg:"Password Reset Sucess...",email:req.body.email,password:req.body.password})
        })
     }
   } catch (err) {
    console.log(err);
    res.status(500).json({msg:"Error in Reset Password,(catch)"})
   }
});
module.exports = UserRoute;