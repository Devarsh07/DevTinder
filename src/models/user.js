//requiring the mongoose library from mongoose
const mongoose = require('mongoose');

//creation of schema of collection i.e what are the type and what collection have i.e documemnts ok
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
    },
    lastName : {
        type : String,
    },
    email : {
        type : String,
    },
    password : {
        type : String,
    },
    age : {
        type : Number
    },
    gender : String,
})

//creation of model of schema for creating multiple instance of that collection ok
const User = mongoose.model("User",userSchema);

module.exports = User;