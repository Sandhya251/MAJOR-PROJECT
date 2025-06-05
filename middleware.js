const ExpressError=require("./utils/ExpressError.js");
const {listingSchema} =require("./schema.js");
const {reviewSchema} =require("./schema.js");

const Listing=require("./models/listing.js")
module.exports.isLoggedIn= (req,res, next) => {
    if(!req.isAuthenticated()) {
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged in to create listing")
    
    return res.redirect("/login");
}
next();
}



module.exports.saveRedirectUrl= (req,res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}







module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You don't have permission to do that!");
        return res.redirect(`/listings/${id}`);
    }

    next();
};





//validating server side &validation schema as middleware     for listing object
module.exports.validateListing =(req,res,next)=>{
    //if there is an uploaded file, manually add its info into req.body.listing
    if (req.file) {
        if (!req.body.listing) {
            req.body.listing = {};
        }
        req.body.listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }
    
    let {error}= listingSchema.validate(req.body);
    if(error) {
        let errMsg=error.details.map(el => el.message).join(",");  //to print all details in error
        throw new ExpressError(400,errMsg)
    }
    else{
        next();
    }
}


//validate review by server side
module.exports.validateReview= (req,res,next) => {
    let {error} =reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map(el => el.message).join(",");  //to print all details in error
        throw new ExpressError(400,errMsg)
    }
    else{
        next();
    }
}



  