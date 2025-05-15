const User = require("../models/user.js");

module.exports.signupForm=(req,res) => {
    res.render("users/signup.ejs");
}


module.exports.signup=async(req,res) =>{
try{
    console.log("BODY:", req.body);

  let {username, email, password} =req.body;
    const newUser= new User({email, username});
    const registeredUser= await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser, (err)=>{
        if(err){
            return next(err)
        }
        req.flash("success", "welcome to wanderlust");
        console.log("Redirecting to listings...");
        res.redirect("/listings");
    })
    
}catch(err){
    req.flash("error",err.message);
    console.log(err);
    res.redirect("/signup");
}
}




module.exports.renderLoginForm=(req,res) => {
    res.render("users/login.ejs");
}


module.exports.login=async(req,res) =>{
    req.flash("success", "welcome back to wanderlust!");
    let redirectUrl=res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
       }


module.exports.logout=(req,res,next) => {
    req.logout((err) =>{
        if(err) {
            return next(err);
        }
        req.flash("success","ypu are logged out!");
        res.redirect("/listings");
    })
}