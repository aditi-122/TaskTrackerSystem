const express = require("express");
const TaskRoute = express.Router();
TaskRoute.post("/login",(req,res)=>{
    if(!req.isAuthenticated()){
       res.status(400).json({msg:"User Not login"});
       res.redirect('/auth/google');
    }
    else{
        
    }
})
module.exports = TaskRoute;