const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingsSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");



// Validation Middleware
const validateListing = (req, res, next) => {
    const { error } = listingsSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
} ;

// review validation middleware
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}

// Reviews
router.post("/", validateReview, wrapAsync(async (req, res) => 
    {
        let listing = await Listing.findById(req.params.id);
        if (!listing) {
           
            return res.status(404).send("Listing not found");
        }

        let review = new Review(req.body.review);
        listing.reviews.push(review);
        await review.save();
        await listing.save();
        req.flash("success", "Review added successfully!");
       // console.log("review added")
        res.redirect(`/listings/${listing._id}`);
        //res.send("Review Added Successfully");
        
       

    }
    )
);

// Delete Review Route
router.delete("/:reviewId", wrapAsync(async (req, res) => 
    {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listings/${id}`);
}
)
);
module.exports = router;   