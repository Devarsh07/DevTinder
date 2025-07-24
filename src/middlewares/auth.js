const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async(req,res,next)=>{
    try{
        const cookies = req.cookies;
        const {token} = cookies;
        if(!token){
            throw new Error("Token is Invalid!")
        }
        let decodedData;
        try{
            decodedData = await jwt.verify(token,"@DEV072003$");
        }catch(err){
            throw new Error("You are not verified user,please go and Login!");
        }

        const {_id} = decodedData;

        console.log(_id);

        const user = await User.findById(_id);

        console.log(user);

        if(!user){
            throw new Error("You are not allowd to this , Please go and login!");
        }
        else{
            const name = await user.firstName;
        }
        req.user = user;//saving user in reqest:
        next();
    }catch(err){
        res.status(400).send("Error: "+err.message);
    }
}

module.exports = {userAuth};//exporting the middlewares to use in app.js file