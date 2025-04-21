const express = require('express');
const app = express();
const {adminAuth,userAuth}= require("./middlewares/auth");

app.get("/user",(req,res,next)=>{
    try{
        throw new Error("Error is created!");
        res.send("user route is working!");//any line below the error line will not be executed
    }
    catch(err){
        console.log("Error is handled in the catch block!");
        res.status(500).send("Error is handled in the catch block!");
    }
});


app.listen(7777,() => {
    console.log('Server is listening on port 7777')
});