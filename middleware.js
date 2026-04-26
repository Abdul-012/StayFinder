const Listing = require("./models/listing.js");
const Review = require("./models/reviews.js");
const { listingsSchema, reviewSchema } = require("./schema.js");

module.exports.isloggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) 
        {
            req.session.redirectUrl = req.originalUrl; // Store the original URL for redirecting after login
        req.flash("error", "You must be signed in first!");
        return res.redirect("/login");
    }
    next();
};
module.exports.saveRedirectUrl = (req, res, next) => 
    {
    if (req.session.redirectUrl) 
    {
        res.locals.redirectUrl = req.session.redirectUrl; // Make the redirect URL available in res.locals
    }
    next();
};

module.exports.isOwner =async (req, res, next) =>
{
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    if (!listing.owner || !listing.owner.equals(req.user._id)) {
        req.flash("error", "You are not the owner of this listing.");
        return res.redirect(`/listings/${listing._id}`);
    }

    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
        req.flash("error", "Review not found");
        return res.redirect(`/listings/${id}`);
    }

    if (!review.author || !review.author.equals(req.user._id)) {
        req.flash("error", "You are not the author of this review.");
        return res.redirect(`/listings/${id}`);
    }

    next();
};
 // Validation Middleware
 module.exports.validateListing = (req, res, next) => {
     const { error } = listingsSchema.validate(req.body);
     if (error) {
         return res.status(400).send(error.details[0].message);
     }
     next();
 };
// review validation middleware
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};
