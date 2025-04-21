const express = require('express');
const app = express();
const {adminAuth,userAuth}= require("./middlewares/auth");
//Handling the request from the port 7777 By request Handlers Middlewares always must remember using of Middleware orders matters;

//Steps which are followed:
//1)pehle hum check karenge ki /admin authorized hai ya nhi,
//2)fir hum koi bhi action karsakenge through admin after checking that it is an admin.


app.use("/admin",adminAuth);
app.use("/user",userAuth);

app.post("/user/login",(req,res,next)=>{//we dont have to authenticate for login coz anybody can login;
    res.send("You are logged in!");
    next();
})

app.get("/user/data",(req,res,next)=>{//here we have to check that the data sent by the authorized user or not
    res.send("User data is sent!");
    next();
})

app.get("/admin/getAllData",(req,res,next)=>{
    res.send("All data sent !");
    next();
})
app.get("/admin/deleteAllData",(req,res,next)=>{//this middlewares delete the all the data after getting an api to delete all the data
    res.send("All data is deleted !");
    next();
})


app.listen(7777,() => {
    console.log('Server is listening on port 7777')
});