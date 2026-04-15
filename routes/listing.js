const express=require("express");
const router=express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingsSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");


// Validation Middleware
const validateListing = (req, res, next) => {
    const { error } = listingsSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
} 


// New Route
router.get("/new",(req,res) =>
{
    res.render("listings/new.ejs");
});

// Index Route

router.get("/", wrapAsync(async (req, res) => 
    {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { listings: allListing });
}));


// Show Route
router.get("/:id", wrapAsync(async (req, res) => 
    {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    // if (!listing) {
    //     return res.status(404).send("Listing not found");
    // }
        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }
    res.render("listings/show.ejs", { listing });
}));

// Create Route
router.post("/", validateListing, wrapAsync(async (req, res, next) => 
    {
    let listing = req.body.listing; 
    const newListing = await Listing.create(listing);
    req.flash("success", "Listing created successfully!");
    res.redirect("/listings");
}));


 // Edit Route
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const editlisting = await Listing.findById(id);
    // if (!editlisting) {
    //     return res.status(404).send("Listing not found");
    // }
    if (!editlisting) 
        {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    req.flash("success", "Listing updated successfully!");
    res.render("listings/edit.ejs", { listing: editlisting });
}));

// Update Route
router.put("/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = req.body.listing;
     const updatedListing = await Listing.findByIdAndUpdate(id, listing, { new: true, runValidators: true });
     req.flash("success", "Listing updated successfully!");
     res.redirect(`/listings/${updatedListing._id}`);
    }));


// Delete Route
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
}));


module.exports=router;