const Listing = require("../models/listing");
const { cloudinary } = require("../cloudConfig");
const { geocodeLocation } = require("../utils/geocoding");

const deleteCloudinaryImage = async (filename) => {
    if (filename) {
        try {
            await cloudinary.uploader.destroy(filename);
        } catch (err) {
            console.warn("Cloudinary cleanup failed:", err.message);
        }
    }
};

// show controller
// controllers/listings.js
module.exports.index=async (req, res) => 
    {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { listings: allListing });
};
module.exports.renderNewForm=(req,res) =>
    {
    res.render("listings/new.ejs");
};

//show controller
// controllers/listings.js
module.exports.showListing=async (req, res) => 
    {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({ path: "reviews", 
     populate: { path: "author" } })
    .populate("owner");

        if (!listing) 
        {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }
    res.render("listings/show.ejs", { listing });
};

//Create controller
// controllers/listings.js
module.exports.createListing=async (req, res, next) => 
    {
    let listing = req.body.listing; 
    const newListing = new Listing(listing);
    newListing.owner = req.user._id;
    newListing.geometry = await geocodeLocation(listing.location, listing.country);
    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }
    await newListing.save();
    req.flash("success", "Listing created successfully!");
    res.redirect(`/listings/${newListing._id}`);
};


 // Edit controller
// controllers/listings.js
module.exports.renderEditForm=async (req, res) => {
    let { id } = req.params;
    const editlisting = await Listing.findById(id);
   
    if (!editlisting) 
        {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing: editlisting });
}

// Update controller
// controllers/listings.js
module.exports.updateListing=async (req, res) =>
     {
      let { id } = req.params;
      let listing = req.body.listing;
      listing.geometry = await geocodeLocation(listing.location, listing.country);
      const updatedListing = await Listing.findByIdAndUpdate(id, listing, { new: true, runValidators: true });
      if (req.file) {
        const oldFilename = updatedListing.image && updatedListing.image.filename;
        updatedListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
        await updatedListing.save();
        await deleteCloudinaryImage(oldFilename);
      }
     req.flash("success", "Listing updated successfully!");
     res.redirect(`/listings/${updatedListing._id}`);
    };
    
// Delete controller
// controllers/listings.js
module.exports.deleteListing=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    await deleteCloudinaryImage(listing && listing.image && listing.image.filename);
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
};
