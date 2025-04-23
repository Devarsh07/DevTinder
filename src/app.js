const express = require('express');
const app = express();
const {adminAuth,userAuth}= require("./middlewares/auth");
const connectDB = require("./config/database");
const User = require("./models/user");

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
app.post("/signUp", async(req,res,next)=>{
    const userObj = {
        firstName : "lashkare",
        lastName : "Taliban",
        email : "lashkare@taliban.com",
        password : "12345",
        age : 21,
        gender : "Not defined",
        // _id : 12345675432345633565, always try to dont crerate an id lets take mogoDB create itself
    }
    
    const user = new User(userObj);//here the instance we have created named user is the new document with these fields.
    try{
        await user.save();
        res.send("Database Updated Successfully");    
    }catch(err){
        res.status(400).send("There is a problem in updating the database i.e "+ err.message);
    }
});
