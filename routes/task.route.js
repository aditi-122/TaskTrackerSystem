const express = require("express");
const TaskRoute = express.Router();
const authMw = require("../middleware/auth.middleware")
const TaskModel = require("../models/task.model");
TaskRoute.post("/login",(req,res)=>{
    if(!req.isAuthenticated()){
       res.status(401).json({msg:"User Not logged in"});
    }
    else{

    }
})
TaskRoute.post("/add", authMw, async (req, res) => {
    try {
        let task = { ...req.body, owner: req.body.userId };
        let task1 = await TaskModel.create(task);
        res.status(201).json({ msg: "task created", task1 });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error in Creating Task,(catch)" });
    }
})
TaskRoute.get("/get", authMw, async (req, res) => {
    try {
        let tasks = await TaskModel.find({ owner: req.body.userId });
        if (tasks.length == 0) {
            res.status(201).json({ msg: "No Task Found", tasks })
        }
        else {
            res.status(200).json({ msg: "Tasks found", tasks });
        }
    } catch (error) {
        console.log(err);
        console.log(error);
    }
});
TaskRoute.get("/public/get", async (req, res) => {
    try {
        let tasks = await TaskModel.find({ isPublic: true });
        if (tasks.length == 0) {
            res.status(500).json({ msg: "No Public Task Found" });
        }
        else {
            res.status(200).json({ msg: "Public Tasks found", tasks });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error in getting public tasks,(catch)" });
    }
})
TaskRoute.get("/collaborator/get", authMw, async (req, res) => {
    try {
        let tasks = await TaskModel.find({ collaborator: req.body.userId });
        if (tasks.length == 0) {
            res.status(200).json({ msg: "No CoLLaborator Tasks Found" });
        }
        else {
            res.status(200).json({ msg: "Collaborator Task List", tasks });
        }
    } catch (error) {
        console.log(err);
        res.status(500).json({ msg: "Error in getting tasks,(catch)" });
    }
})
TaskRoute.get("/pending", authMw, async (req, res) => {
    try {
        let tasks = await TaskModel.find({ owner: req.body.userId });
        let pendingTasks = tasks.filter(el => el.deadline < Date.now());
        if (pendingTasks.length == 0) {
            res.status(200).json({ msg: "No collaborator pending tasks found" });
        } else {
            res.status(200).json({ msg: "Collaborator Task List", pendingTasks });
        }
    } catch (err) {
        console.log({ msg: "Error in getting pending tasks,(catch)" });
        console.log(err);
        res.status(500).json({ msg: "Error in getting pending tasks,(catch)" });
    }
});
TaskRoute.patch("/update/:id",async (req,res) => {
  try {
    let tasks = await TaskModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json({msg:"Task Updated",tasks});
  } catch (err) {
    console.log(err);
    res.status(500).json({msg:"Error in updating task,(catch)"})
  }
})
TaskRoute.delete("/delete/:id",async(req,res)=>{
   try {
    let tasks = await TaskModel.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:"Task deleted", tasks});
   } catch (err) {
     res.status(500).json({msg:"Error in deleted route"});
   }
})    
module.exports = TaskRoute;