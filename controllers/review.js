const Review = require("../models/review.js");
const Listing = require("../models/listing.js");


module.exports.createReview  =async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview= new Review(req.body.review);

    listing.reviews.push(newReview);
   newReview.author=req.user._id;
    await newReview.save();

    await listing.save();
    req.flash("success", "review added");
    res.redirect(`/listings/${listing.id}`);
 }


 module.exports.destroyReview  =async(req,res)=>{
    let {id, reviewId} = req.params;

    await Listing.findByIdAndUpdate(id,{$pull :{reviews:reviewId} } )
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "review deleted");
    res.redirect(`/listings/${id}`);
 }