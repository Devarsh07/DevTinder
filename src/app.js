const express = require('express');
const app = express();

//Handling the request from the port 7777 By request Handlers Middlewares always must remember using of Middleware orders matters;

app.use("/user",(req,res,next)=>{//app.use take any request from the route matching /user while it is get or put , patch , delete ok
    console.log("Entry level 1 and the first changes happen to the request object");
    next();//this is the most important line in the middleware, if we don't call next() then the request will not go to the next middleware and it will be stuck here.
})
app.get("/user",(req,res,next)=>{//this is the chain of middlewares which changes the request and at last send the response to the client.
    console.log("Do anything with the request");
    next();
},
(req,res,next)=>{
    console.log("Do anything with your request again");
    next();
},
(req,res,next)=>{
    console.log("Do anything with your request again and again");
    res.send("Afetr making all the changes to request here is the response to the client");
    next();
}
)


app.listen(7777,() => {
    console.log('Server is listening on port 7777')
});