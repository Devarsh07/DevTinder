const express = require('express');
const app = express();

//Handling the request from the port 7777 By request Handlers Middlewares always must remember using of Middleware orders matters;

//Steps which are followed:
//1)pehle hum check karenge ki /admin authorized hai ya nhi,
//2)fir hum koi bhi action karsakenge through admin after checking that it is an admin.



app.use("/admin",(req,res,next)=>{//authorization checking
    const token = "xyz"
    const isAuthorized = token === "xyz";
    if(!isAuthorized){
        res.status(401).send("You are unauthorized");
    }
    else{
        console.log("You are authorized to do admin works!");
        next();//if it was an admin then call to next middlewares for action 
    }
})

app.get("/admin/data",(req,res,next)=>{
    res.send("All data sent !");
    next();
})
app.get("/admin/delete",(req,res,next)=>{//this middlewares delete the all the data after getting an api to delete all the data
    res.send("All data is deleted !");
    next();
})


app.listen(7777,() => {
    console.log('Server is listening on port 7777')
});