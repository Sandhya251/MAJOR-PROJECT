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
  .get(wrapAsync(listingController.index)) // Show all listings
  .post(
    isLoggedIn,                            // Must be logged in
    upload.single("listing[image]"),       // Upload the image
    validateListing,                       // Validate form data
    wrapAsync(listingController.createListing) // Save new listing
  );



//serves the form for new listsing
router.get("/new",isLoggedIn, listingController.renderNewForm);



//show route individual listing
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) // Show a specific listing
  .put(
    isLoggedIn,
    isOwner,                              // Only owner can edit
    upload.single("listing[image]"),     // Handle image upload
    validateListing,                     // Validate form data
    wrapAsync(listingController.updateListing) // Update in DB
  )
  .delete(
    isLoggedIn,
    isOwner,                              // Only owner can delete
    wrapAsync(listingController.destroyListing) // Remove from DB
  );
  



//edit any listing after clicking on edit serves the form
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm))
  
    
module.exports=router;