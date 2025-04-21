const adminAuth = (req,res,next)=>{
    console.log("Admin Auth is getting checked!");
    const tooken = "xyz";
    const isAuthorized = tooken === "xyz";
    if(!isAuthorized){
        res.status(401).send("You are unathorized");
    }
    else{
        next();
    }
}

const userAuth = (req,res,next)=>{
    console.log("User Auth is getting checked!");
    const token = "abc";
    const isAuthorized = token === "abc";
    if(!isAuthorized){
        res.status(401).send("You are unathorized");
    }
    else{
        next();
    }
}

module.exports = {adminAuth,userAuth};//exporting the middlewares to use in app.js file