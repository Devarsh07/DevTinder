const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const User = require('../models/user');
const validator = require('validator');

profileRouter.get('/userProfile',userAuth,async (req,res)=>{
    try{
        const {email} = req.body;//here extracting the email from req.body which are passing from postman
        if(!validator.isEmail(email)){
            throw new Error("Required email Is Invalid!");
        }
        else{
            console.log("iamhere");
            const user = await User.find({email:email});// here we are  finding the same "userEmail" from the field name "email" in Model called User
            if(!user){
                throw new Error("there is an error to find the user!");
            }
            else{
                console.log("aagya hoon");
                res.send(user);
            }
        }
    }catch(err){
        res.status(400).send("Error is : "+err.message);
    }
})

//update anything yoou want :
profileRouter.patch("/updateUser",async (req,res,next)=>{
    const id = req.body._id;
    const updates = req.body;
    delete updates.id;
    try{
        //creating an api level validations:
        const ALLOWED_UPDATES = ["photUrl","gender","firstName","lastName","about"];//maine define kardi ki kaun kaun si cheeje update karni hai
        const isUpdateAllowed = Object.keys(updates).every((k)=>//fir updates mein unhi chijon ko update karo jo allowed_updates mein hai
        ALLOWED_UPDATES.includes(k)); 

        if(!isUpdateAllowed){
            throw new Error("Updates failed please change your fields!");
        }
    
        await User.findByIdAndUpdate({_id:id},updates,{new:true,runValidators:true});
        res.send("Updated successfully");
    }catch(err){
        res.status(401).send("Update is not possible and the err is "+err.message);
    }
})
module.exports = profileRouter;