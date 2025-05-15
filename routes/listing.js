const express=require("express");
const router=express.Router();

const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const listingController =require("../controllers/listings.js")

const {isLoggedIn, isOwner, validateListing} =require("../middleware.js");

const multer=require("multer");
const {storage}=require("../cloudConfig.js")
const upload=multer({ storage})

//index route
router
.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn, 
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.createListing));


 


//serves the form for new listsing
   router.get("/new",isLoggedIn, listingController.renderNewForm);


    //show route individual listing
      router
      .route("/:id")
      .get( wrapAsync(listingController.showListing))
      .put(isLoggedIn, isOwner,   upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))   //after submission of edit form
      .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing))  //delete any listing



    //edit any listing after clicking on edit serves the form
     router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm))
     
    
    
   
   
    
    
  
   
    
    module.exports=router;