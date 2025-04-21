// note:
// mongoose.connect return promise thats why we use async and await since the js is synchronous in nature so we have to wait for the connection then we will go forward ok
// as we know without making connection we cant able to move forward thats why we have to wait till the connection has made thats why we use async and await. and also thats why mongoose.connect also made to return a promise for this ok.
const mongoose = require("mongoose");


//here we create a function name connectDB which returned promised bcoz mongoose.connect return promise always
const connectDB = async() =>{
    await mongoose.connect("mongodb+srv://devarshupadhyay7:O8CmY10I81bBdHL5@namastenode.ce1jfxd.mongodb.net/?retryWrites=true&w=majority&appName=NamasteNode");
};


//since as we telling above that this function return promise so, we have to handled the value returned from promised function by then and catch
connectDB()
    .then(() =>{
        console.log("Database connection Established");
    })
    .catch((err)=>{
        console.log("MongoDB Connection ERror!");
    });

