const express=require("express");
const app=express();
const mongoose=require("mongoose")
const path=require("path")
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const { listingsSchema,  reviewSchema} = require("./schema.js");
const Review = require("./models/reviews.js");



const port=8080;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));


//Database Connection
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log("Error connecting to DB", err);
    });
    
//Models
const Listing=require("./models/listing.js")


//Home Route
app.get("/",(req,res)=>{
    res.send("Hello World")
});

// Validation Middleware
const validateListing = (req, res, next) => {
    const { error } = listingsSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}
// review validation middleware
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}



// Listings Route
app.get("/listings", async (req,res) =>
{
    try 
    {
        const allListing = await Listing.find({});
        res.render("listings/index.ejs", { listings: allListing });
    } 
    catch (err) 
    {
        console.error("Error retrieving listings:", err);
        res.status(500).send("Error retrieving listings");
    }
});

// New Route
app.get("/listings/new",(req,res) =>
{
    res.render("listings/new.ejs");
});



// Create Route
app.post("/listings", validateListing, wrapAsync(async (req, res, next) => 
        {
            let listing = req.body.listing; // Use req.body.listing to get the correct fields
            const newListing = await Listing.create(listing);
            res.redirect("/listings");   
            // console.error("Error creating listing:", err);
            // res.status(500).send("Error creating listing");
        })
    );

       // Show Route
app.get("/listings/:id", wrapAsync(async (req, res) => 
    {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews") ;
    if (!listing) {
        return res.status(404).send("Listing not found");
    }
    res.render("listings/show.ejs", { listing });
}));



 // Edit Route
app.get("/listings/:id/edit", wrapAsync(async (req,res) =>
{
    let { id } = req.params;
    const editlisting = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing: editlisting});
}));

// Update Route
app.put("/listings/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = req.body.listing;
     const updatedListing = await Listing.findByIdAndUpdate(id, listing, { new: true, runValidators: true });
     res.redirect(`/listings/${updatedListing._id}`);
    }));


// Delete Route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

//reviews
app.post("/listings/:id/reviews", validateReview,wrapAsync(async (req, res) => 
    {
        let listing = await Listing.findById(req.params.id);
        let review = new Review(req.body.review);
        listing.reviews.push(review);
        await review.save();
        await listing.save();
       // console.log("review added")
        res.redirect(`/listings/${listing._id}`);
        //res.send("Review Added Successfully");
        
       

    }
    )
);
// Delete Review Route
app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req, res) => 
    {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}
)
);


// 404 Error Handling Middleware
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});


// Error Handling Middleware for Express
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  res.status(statusCode).render("listings/error.ejs", { err });
  //res.status(statusCode).send(message);

});




//Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});