const express = require('express');
const app = express();

//Handling the request from the port 7777 By request Handlers Middlewares always must remember using of Middleware orders matters;

app.use("/user",(req,res,next)=>{//app.use take any request from the route matching /user while it is get or put , patch , delete ok
    console.log("Entry level 1 and the first changes happen to the request object");
    next();//this is the most important line in the middleware, if we don't call next() then the request will not go to the next middleware and it will be stuck here.
})
app.get("/user",(req,res,next)=>{
    console.log("Entry level 2 and the second changes happen to the request object");
    next();
})
app.get("/user",(req,res,next)=>{
    console.log("Entry level 3 and the third changes happen to the request object");
    next();
})
app.get("/user",(req,res,next)=>{
    console.log("Entry level 4 and the fourth changes happen to the request object");
    res.send("After performing all the changes on the request by above middlewares, we are sending the response to the client");
    next();//it not gives an err while there is no any next middleware but it is not a good practice to use next() in the last middleware, because it will be confusing for the other developers who will read your code.
})


app.listen(7777,() => {
    console.log('Server is listening on port 7777')
});