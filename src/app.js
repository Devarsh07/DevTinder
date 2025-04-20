const express = require('express');
const app = express();

//Handling the request from the port 7777 By request Handlers Middlewares always must remember using of Middleware orders matters;

app.use("/user",(req,res,next) => {
    console.log("Route Handler 1 for user");
    res.send("Response from 1st Route handler");
    next();
    //res.send("Response from 2nd Route handler");
},
(req,res,next) =>{
    console.log(("Route hander 2 for user"));
    //res.send("Response from 2nd Route handler");
    next();
},
(req,res,next) =>{
    console.log("Route handler 3 for user");
    //res.send("Response from 3rd Route handler");
    next();
}
)


app.listen(7777,() => {
    console.log('Server is listening on port 7777')
});