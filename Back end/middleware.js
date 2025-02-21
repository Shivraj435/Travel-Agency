module.exports.isLoggedIn=(req,res,next)=>{
    console.log(req.user);
    if(!req.isAuthenticated()){
        console.log("not logged in");
    }
    next();
};