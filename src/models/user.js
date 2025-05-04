//requiring the mongoose library from mongoose
const mongoose = require('mongoose');

//creation of schema of collection i.e what are the type and what collection have i.e documemnts ok
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required:true,
        max:25,
        min:3,
        //update ke time par ye max min kaam nhi karta to isilye hum ek validators banyenge ok
        validate:{
            validator:function(value){
                if(value.length()<3 || value.length()>25){
                    throw new Error(("This is of firstName is wrong"));
                }
            }
        }
    },
    lastName : {
        type : String,
    },
    email : {
        type : String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
    },
    password : {
        type : String,
        required:true,
    },
    age : {
        type : Number,
        validate:{
            validator:function(value){
                if(value<18 || value>60){
                    throw new Error("the given age is not applicable for this site!");
                }
            }
        }
    },
    gender:{
        type:String,
        validate:{
            validator:function(value){
                if(!["male","female","others"].includes(value)){
                    throw new Error("Gender is not a valid!");
                }
            }
        }
    },
    photUrl:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg",
    },
    about:{
        type:String,
        default:"You are the user for now!",
    }
},{timestamps:true})

//creation of model of schema for creating multiple instance of that collection ok
const User = mongoose.model("User",userSchema);

module.exports = User;