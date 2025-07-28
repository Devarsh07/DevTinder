const validators = require('validator'); 

const validateSignUpData = (req)=>{
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

const validateAllowedUpdates = (req)=>{
    const allowedUpdates = [
        "firstName",
        "lastName",
        "photoUrl",
        "age",
        "gender",
        "about",
        "skills"
    ]

    const isEditedAllowed = Object.keys(req.body).every((fields)=>allowedUpdates.includes(fields));

    return isEditedAllowed;
}

module.exports = {
validateSignUpData,validateAllowedUpdates
};