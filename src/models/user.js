//requiring the mongoose library from mongoose
const mongoose = require('mongoose');
const validator  = require('validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
//creation of schema of collection i.e what are the type and what collection have i.e documemnts ok
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required:true,
        maxLength:25,
        minLength:3,
        //update ke time par ye max min kaam nhi karta to isilye hum ek validators banyenge ok
        validate:{
            validator:function(value){
                if(value.length<3 || value.length>25){
                    throw new Error(("Please provide the valid length of first name from 3 to 25 only"));
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
        // validate:{
        //     validator:function(value){
        //         if(!validator.isEmail(value)){
        //             throw new Error("Your Email is Invalid!");
        //         }
        //     }
        // }
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Your Email is Invalid!");
            }
        }
    },
    password : {
        type : String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Your password is weak like you!");
            }
        }
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

userSchema.methods.getjwt = async function(){
    const user = this;
    console.log(user.firstName);
    const token = await jwt.sign({_id:user._id},"DEV072003",{
        expiresIn:"7d",
    });
    return token;
}

userSchema.methods.passwordVerify = async function(passwordInputByUser){
    const user = this;
    const hashPassword = user.password;
    console.log(user.firstName);
    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,hashPassword
    );
    return isPasswordValid;
};

//creation of model of schema for creating multiple instance of that collection ok
const User = mongoose.model("User",userSchema);
        
module.exports = User;