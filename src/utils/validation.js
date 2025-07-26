const validators = require('validator'); 

const validateSignUpData = (req,res,next)=>{
    const{firstName,lastName,email,password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid!");
    }
    else if(!validators.isEmail(email)){
        throw new Error("Email is not valid!");
    }
    else if(!validators.isStrongPassword(password)){
        throw new Error("Your password is too weak!");
    }
};

module.exports = {
validateSignUpData
};