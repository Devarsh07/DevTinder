const express = require('express');
const app = express();
const {adminAuth,userAuth}= require("./middlewares/auth");
const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json())//parsing the json data to js object

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
app.post("/signUp",async(req,res,next)=>{
    
    //here req.body have a data in json format which was converted to js object by above middleware and it was pass by postman by post method
    const user = new User(req.body);//here the instance we have created named user is the new document with these fields.

    try{
        await user.save();
        res.send("Database Updated Successfully");    
    }catch(err){
        res.status(400).send("There is a problem in updating the database i.e "+ err.message);
    }
});
