const express=require("express");
const app=express();
const mongoose=require("mongoose")
const path=require("path")
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError=require("./utils/ExpressError.js");
const listings=require("./routes/listing.js")
const reviews=require("./routes/review.js")
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("./models/user.js");
const session = require('express-session');
const flash = require('connect-flash');


// Port
const port=8080;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

const sessionOptions = {
    secret: "majorprojectsecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week   
    }
};

app.use(session(sessionOptions));
app.use(flash());

// Middleware to set local variables for flash messages and current user
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// Mounting the routers
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

// Database Connection
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
const Review=require("./models/reviews.js")

//Home Route
app.get("/",(req,res)=>{
    res.send("Hello World")
});

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

// demo user creation route
app.get("/demouser", async (req, res) => {  
    try {
        const demoUser = new User({ username: "demoUser" });
        const registeredUser = await User.register(demoUser, "password123");
        res.send("Demo user created successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating demo user");
    }
});

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
