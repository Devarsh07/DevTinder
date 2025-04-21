const express = require('express');
const app = express();
const {adminAuth,userAuth}= require("./middlewares/auth");

app.get("/user",(req,res,next)=>{
    throw new Error("This is an user error");//anything written below the err will not be executed
    console.log("User route is working");
    res.send("User route is working");
});

//catching the err by using wildcard route handler also called a middleware:
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something wrong happened in user route");
    }
})


app.listen(7777,() => {
    console.log('Server is listening on port 7777')
});