const express = require('express');
const deleteUser = express.Router();
const userAuth = require('../middlewares/auth');


deleteUser.delete('/deleteProfile',userAuth,(req,res=>{
    try{
        const user = req.user;
        if(!user){
            throw new Error("User is invalid");
        }
        else{
            const id = user._id;
            user.findByIdAnddelete(id);
            res.status(200).send("User deleted successfully!");
        }
    }catch(err){
        res.status(400).send("Error: "+err.message);
    }
}));

module.exports = deleteUser;