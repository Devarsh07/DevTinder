const express = require('express');
const app = express();

//Handling the request from the port 7777 By request Handlers Middlewares always must remember using of Middleware orders matters;

app.use("/user",(req,res) => {
    res.send('Hello from the dashboard page');
})

app.get('/user',(req,res) => {
    res.send("Heelo from user's home page");
})

app.post('/user',(req,res) => {
    res.send('User Created Successfully');
})
app.delete('/user',(req,res) => {
    res.send(('User Deleted Successfully'));
})


app.listen(7777,() => {
    console.log('Server is listening on port 7777')
});