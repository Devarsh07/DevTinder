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

app.get("/user",async (req,res,next)=>{
    const userEmail = req.body.gmail;//here extracting the email from req.body which are passing from postman
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

app.delete("/delete",async (req,res,next)=>{
    const id = req.body._id;
    try{
        const user = await User.findById(id);
        if(!user){
            res.send("User of this id does not exist !");
        }
        else{
            await User.findByIdAndDelete(id);
            res.send("User deleted successfully");
        }
    }catch(err){
        res.status(401).send("Something Went Wrong i.e "+ err.message);
    }
});
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
        const isUpdateAllowed = Object.keys(updates).every((k)=>//fir updates mein unhi chijon ko update karo jo aalowed_updates mein hai
        ALLOWED_UPDATES.includes(k)); 

        if(!isUpdateAllowed){
            throw new Error("Updates failed please change your fields!");
        }
    
        await User.findByIdAndUpdate(id,updates,{new:true},{runValidators:true});
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
