const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const { validateReview, isloggedIn, isReviewAuthor } = require("../middleware.js");

const reviewscontroller = require("../controllers/reviews.js");

// Reviews
router.post("/",isloggedIn, validateReview, wrapAsync(reviewscontroller.createReview)
);

// Delete Review Route
router.delete("/:reviewId", isloggedIn, isReviewAuthor, wrapAsync(reviewscontroller.deleteReview)
);
module.exports = router;   
