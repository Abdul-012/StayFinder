const express=require("express");
const app=express();
const mongoose=require("mongoose")
const path=require("path")
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');



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


// Listings Route
app.get("/Listings", async (req,res) =>
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
app.post("/listings", async (req, res) => 
    {
    try 
        {
            let listing = req.body.listing; // Use req.body.listing to get the correct fields
            const newListing = await Listing.create(listing);
            // res.redirect(`/listings/${newListing._id}`);
            res.redirect("/listings");
        } 
        catch (err) 
        {
            console.error("Error creating listing:", err);
            res.status(500).send("Error creating listing");
        }
    });

       // Show Route
app.get("/listings/:id", async (req, res) => 
    {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        return res.status(404).send("Listing not found");
    }
    res.render("listings/show.ejs", { listing });
});



 // Edit Route
app.get("/listings/:id/edit", async (req,res) =>
{
    let { id } = req.params;
    const editlisting = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing: editlisting});
});

// Update Route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let listing = req.body.listing;
     const updatedListing = await Listing.findByIdAndUpdate(id, listing, { new: true, runValidators: true });
     res.redirect(`/listings/${updatedListing._id}`);
    } );

// Delete Route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

//Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});