
const express=require("express");
const router=express.Router();
const User=require("../models/user");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");
const listingController = require("../controllers/listing.js"); 

const userController =require("../controllers/users.js")

router.get("/", listingController.index); 
router.route("/signup")
.get( userController.signupForm)
.post(wrapAsync(userController.signup));



//login
router.route("/login")
.get(userController.renderLoginForm)
.post(
    saveRedirectUrl, 
    passport.authenticate("local", {
        failureRedirect:"/login",
        failureFlash:true, 
    }) 
, userController.login
);


router.get("/logout",userController.logout);
module.exports=router;