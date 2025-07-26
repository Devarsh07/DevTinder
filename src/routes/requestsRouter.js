const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../middlewares/auth');

requestRouter.post('/sendConnectionsRequest',userAuth,(req,res)=>{
    try{
        const user = req.user;
        if(!user){
            throw new Error("User is invalid");
        }
        else{
            const {firstName,lastName} = user;
            res.status(200).send("This request is send by "+firstName+" "+lastName);
        }
    }catch(err){
        res.status(400).send("Error : "+err.message);
    }

})

module.exports = requestRouter;