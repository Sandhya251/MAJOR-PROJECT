const express=require("express");
const router = express.Router({ mergeParams: true });


const Listing = require("../models/listing.js");
const Review = require("../models/review");

const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn}=require("../middleware.js")

const reviewController =require("../controllers/review.js")








//post route for review
router.post("/",isLoggedIn,validateReview, wrapAsync(reviewController.createReview));

 //delete review route
 router.delete("/:reviewId",isLoggedIn, wrapAsync(reviewController.destroyReview))
module.exports=router;