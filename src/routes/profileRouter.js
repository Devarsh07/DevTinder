const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const User = require('../models/user');
const validator = require('validator');
const {validateAllowedUpdates} = require('../utils/validation');

profileRouter.get('/profile/view',userAuth,async (req,res)=>{
    try{
        const user = req.user;
        if(!user){
            throw new Error("user is not found!");
        }
        else{
            res.send(user);
        }
    }catch(err){
        res.status(400).send("Error : "+err.message);
    }
});

profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
    try{
        if(!validateAllowedUpdates(req)){
            res.status(400).send("Invalid Edit Request!");
        }
        
        Object.keys(req.body).forEach((keys)=>(loggedInUser[keys] = req.body[keys]));
        
        console.log(loggedInUser);
        await loggedInUser.save();
        res.send(`${loggedInUser.firstName} your profile has been successfully updated`);

    }catch(err){
        res.status(400).send("Error is:"+err.message);
    }
})

module.exports = profileRouter;