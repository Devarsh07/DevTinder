const express = require('express');
const authRouter = express.Router();
const {validateSignUpData} = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const validator = require('validator');

authRouter.post("/signUp",async(req,res,next)=>{
    const {firstName,lastName,email,password} = req.body;

    try{
        //Validation of data:
        validateSignUpData(req);

        //encryption of password:
        const passwordHash = await bcrypt.hash(password,10);//10 is the salting layer i.e it represent that how much layer of encryption will be provided to my password:

        const user = new User({
            firstName,
            lastName,
            email,
            password:passwordHash
        });
    await user.save();
        res.send("User added succesfully!");
    }catch(err){
        res.status(400).send("Error saving the user: "+err.message);
    }                                                               
    
    //
});


authRouter.post("/login",async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        if(!validator.isEmail(email)){
            throw new Error("Email is invalid!");
        }
        const user = await User.findOne({email : email});

        if(!user){
            throw new Error("User is not present in DB!");
        }
        const isPasswordValid = await user.passwordVerify(password);

        if(isPasswordValid){

            //jwt token creation:
            const _id = user._id;
           const token = user.getjwt();//sign in with jwt with the user id and giving the token a secret key:

            //add the token to cookie and send the response to the browser/user:
            res.cookie("token",token);//sending the token to the user or client or the browser

            res.send("Login Successfully!");
        }
        else{
            throw new Error("Invalid user email and Password!");
        }
    }catch(err){
        res.status(400).send("Error: "+err.message);
    }
});

authRouter.post("/logout",(req,res)=>{
    try{
        res.cookie("token",null,{
            expires:new Date(Date.now()),
        })
        res.send("You are Logout!!");
    }catch(err){
        throw new Error("logout is not possible!");
    }
});


module.exports = authRouter;