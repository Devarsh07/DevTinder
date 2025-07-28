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
    // gender:{
    //     type:String,
    //     validate:{
    //         validator:function(value){
    //             if(!["male","female","others"].includes(value)){
    //                 throw new Error("Gender is not a valid!");
    //             }
    //         }
    //     }
    // },

    gender: {
        type: String,
        // required:true,
        enum: {
            values: ["male", "female", "others"],
            message: "Gender must be either 'male', 'female', or 'others'."
        }
    },

    photUrl:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg",
        validate:{
            validator:function(value){
                return validator.isURL(value)
            },
            message:"Invalid Url",
        },  
    },
    about:{
        type:String,
        default:"You are the user for now!",
        maxlength:[100,"About must be less than 100 words!"],
        trim:true,
    }
},{timestamps:true})

userSchema.methods.getjwt = function(){
    const user = this;
    console.log(user.firstName);
    const token = jwt.sign({_id:user._id},"@DEV072003$",{
        expiresIn:"7d",
    });
    console.log(token);
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