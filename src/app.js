const express = require('express');
const app = express();
const {adminAuth,userAuth}= require("./middlewares/auth");
const connectDB = require("./config/database");


//since as we telling above that this function return promise so, we have to handled the value returned from promised function by then and catch
connectDB()
    .then(() =>{
        console.log("Database connection Established");
        app.listen(7777,() => {      //now firstly database is connected at line 4 and then server is running at this line.
            console.log('Server is listening on port 7777')
        });
    })
    .catch((err)=>{
        console.log("MongoDB Connection ERror!");
    });


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