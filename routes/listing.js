const express=require("express");
const router=express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const { isloggedIn,isOwner,validateListing} = require("../middleware.js");

const listingscontroller = require("../controllers/listings.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const ExpressError = require("../utils/ExpressError.js");

const imageFileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (allowedTypes.includes(file.mimetype)) {
        return cb(null, true);
    }

    cb(new ExpressError(400, "Only JPG, JPEG, and PNG image files are allowed."));
};

const upload = multer({ storage, fileFilter: imageFileFilter });


// replacing the old code with the new code for better readability and maintainability 
// using router.route() method to chain the routes for the same path
// Index Route

router.route("/")
    .get(wrapAsync(listingscontroller.index))
    .post(isloggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingscontroller.createListing));

// New Route
router.get("/new",isloggedIn,(listingscontroller.renderNewForm));

// Show Route
router.route("/:id")
      .get(wrapAsync(listingscontroller.showListing))
      .put(isloggedIn,isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingscontroller.updateListing))
      .delete(isloggedIn, isOwner, wrapAsync(listingscontroller.deleteListing));



 // Edit Route
router.get("/:id/edit", isloggedIn,isOwner, wrapAsync(listingscontroller.renderEditForm));


// // New Route
// router.get("/new",isloggedIn,(listingscontroller.renderNewForm));

// // Index Route

// router.get("/", wrapAsync(listingscontroller.index));


// // Show Route
// router.get("/:id", wrapAsync(listingscontroller.showListing));

// // Create Route
// router.post("/", isloggedIn, validateListing, wrapAsync(listingscontroller.createListing));


//  // Edit Route
// router.get("/:id/edit", isloggedIn,isOwner, wrapAsync(listingscontroller.renderEditForm));

// // Update Route
// router.put("/:id", isloggedIn,isOwner, validateListing, wrapAsync(listingscontroller.updateListing));


// // Delete Route
// router.delete("/:id", isloggedIn, isOwner, wrapAsync(listingscontroller.deleteListing));


module.exports=router;
