const express = require('express');
const app = express();
const {userAuth}= require("./middlewares/auth");
const connectDB = require("./config/database");
const User = require("./models/user");
const {validateSignUpData} = require('./utils/validation');
const bcrypt = require('bcrypt');
const validator = require('validator');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");

app.use(express.json())//parsing the json data to js object

app.use(cookieParser());//parsing the comming cookie from the user

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

app.post("/login",async(req,res,next)=>{
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

app.get("/profile",userAuth,async (req,res,next)=>{
    try{
        const user = req.user;
        const name = await user.firstName;
        res.status(200).send("Welcome "+name+"!");
    }catch(err){
        res.status(400).send("Error: "+err.message);
    }
});

app.post("/sendConnectionRequest",userAuth,(req,res,next)=>{
    try{
        const user = req.user;
        const {firstName,lastName} = user;
        res.status(200).send("Connection is sent by "+firstName+" "+lastName+"!");
    }catch(err){
        res.status(400).send("Error: "+err.message);
    }
})

app.get("/user",async (req,res,next)=>{
    const userEmail = req.body.email;//here extracting the email from req.body which are passing from postman
    try{
        const user = await User.find({email : userEmail});// here we are  finding the same "userEmail" from the field name "email" in Model called User
        if(user.length === 0){
            res.send("No any user found");
        }
        else{
            res.send(user);
        }
    }catch(err){
        res.status(401).send("Something went wrong to find the user!");
    }
});

app.get("/allUser",async (req,res,next)=>{
    try{
        const user = await User.find({});
        if(user.length === 0){
            res.send("No any user found");
        }
        else{
            res.send(user);
        }
    }catch(err){
        res.status(401).send("Something went wrong to find the user!");
    }

});

app.get("/byId",async(req,res,next)=>{
    const id = req.body._id;//must remember this "_id" chahe jo ho but jo tum req.body mein from frontend bhej rhe ho wahi hona chahiye not neccessary ki wo schema jaisa hi ho , ok
    try{
        const user = await User.findById(id);
        if(!user){
            res.send("No any id is found of this type");
        }
        else{
            res.send(user);
        }
    }catch(err){
        res.status(401).send("Something went wrong to find the user by id and the err is" + err.message);
    }
    
});

app.delete("/delete",userAuth,async(req,res,next)=>{
    // const {id} = req.body;
    try{
        const user = req.user;
        if(!user){
            throw new Error("User not found!");
        }
        else{
            console.log("in delete api");
            const id = user.id;
            await User.findByIdAndDelete(id);
            res.status(200).send("User Deletedd Successfully");
        }
    }catch(err){
        res.status(400).send("Error: "+err.message);
    }
})

app.patch("/update",async (req,res,next)=>{
    const id = req.body.id;
    const data = req.body.firstName;
    try{
        await User.findByIdAndUpdate(id,{firstName:data},{runValidators:true});
        res.send("Updated Successfully");
    }catch(err){
        res.status(401).send("Something,Something i.e "+ err.message);
    }
});

//update anything yoou want :
app.patch("/updateAny",async (req,res,next)=>{
    const id = req.body.id;
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

app.patch("/updateByEmail",async (req,res,next)=>{
    const email = req.body.email;
    const updates = req.body;
    try{
        await User.findOneAndUpdate({email:email},updates,{new:true});
        res.send("Updates successfully");
    }catch(err){
        res.status(401).res("Something wrong and the error is "+err.message);
    }
})
