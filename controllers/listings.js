const Listing = require("../models/listing.js");
const Review = require('../models/review');

module.exports.index =async (req,res)=> {
const allListings= await Listing.find({});
 res.render("listings/index",{allListings});
}


module.exports.renderNewForm= (req,res)=> {
        res.render("./listings/new.ejs")
 }

 
 module.exports.showListing=async (req,res)=> {
            let {id} =req.params;
            const listing= await Listing.findById(id).populate("owner").populate(
              {
                 path: "reviews",
                 populate: {
                     path: "author" // if you're storing the user who made the review
                 }
             }
            );
            if(!listing){
              req.flash("error","listing you requested for does not exist");
              res.redirect("/listings")
            }
            res.render("./listings/show.ejs",{listing,  currUserId: req.user?._id?.toString()});
         }



//create new list after submission of create listing form from new.ejs
 module.exports.createListing=async (req,res,next)=> {
          let url=req.file.path;
          let filename=req.file.filename;
          console.log(url , "...", filename);
          
          const newListing= new Listing(req.body.listing);
        //   console.log(req.user);
          newListing.owner=req.user._id;
          newListing.image={url, filename};
         
          await newListing.save();
         req.flash("success","new listing created");
         console.log(newListing);
         res.redirect("/listings");
     }

module.exports.renderEditForm=async (req,res)=> {
        let {id} =req.params;
         const listing= await Listing.findById(id)
         if(!listing){
            req.flash("error","listing you requested for does not exist");
            res.redirect("/listings")
          }
         let originalImageUrl=listing.image.url;
          originalImageUrl =  originalImageUrl.replace("/upload", "/upload/w_300/e_blur");
          res.render("./listings/edit.ejs", {listing, originalImageUrl})
        }


 module.exports.updateListing =async (req,res)=> {
          let {id} =req.params;
          let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});
           
          if(typeof req.file !=="undefined"){
          let url=req.file.path;
          let filename=req.file.filename;
          listing.image={ url, filename};
          await listing.save();
        }
           req.flash("success", "listing updated");
        //    console.log(Listing.image);
           res.redirect(`/listings/${id}`);
        }


module.exports.destroyListing=async (req,res) =>{
          let{id} =req.params;
           // Optional: Delete associated reviews manually
          const listing = await Listing.findById(id);
          await Review.deleteMany({ _id: { $in: listing.reviews } });
          const deletedListing= await Listing.findByIdAndDelete(id);
          console.log(deletedListing);
          req.flash("success", "listing deleted");
          res.redirect("/listings");  
}