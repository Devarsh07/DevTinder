const express = require('express');
const app = express();

//Handling the request from the port 7777 By request Handlers Middlewares always must remember using of Middleware orders matters;
app.use("/test",(req,res) => {
    res.send('Hello from the test page');
})
app.use("/users",(req,res) =>{
    res.send('You are the user bro');
})
app.use("/",(req,res) => {
    res.send('Hello from the home page');
})


app.listen(7777,() => {
    console.log('Server is listening on port 7777')
});