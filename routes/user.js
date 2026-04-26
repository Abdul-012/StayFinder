const express=require("express");
const router=express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userscontroller = require("../controllers/users.js");


// replacing the old code with the new code for better readability and maintainability
// using router.route() method to chain the routes for the same path

// Render Signup Route 

router.route("/signup")
    .get(userscontroller.renderSignup)
    .post(wrapAsync(userscontroller.Signup));

// // Render Signup Route
// router.get("/",userscontroller.renderSignup);

// // Signup Route
// router.post("/signup",wrapAsync(userscontroller.Signup));

// Render Login Route
router.route("/login")
    .get(userscontroller.renderLogin)
    .post(saveRedirectUrl, passport.authenticate("local", 
    { 
     failureRedirect: "/login", failureFlash: true 
    }),userscontroller.login);



// // Login Route
// router.get("/login",userscontroller.renderLogin);

// // Login Route authentication
// router.post("/login",saveRedirectUrl,passport.authenticate("local", 
//     { 
//      failureRedirect: "/login", failureFlash: true 
//     }),userscontroller.login);

// Logout Route
router.get("/logout",userscontroller.logout);
    


module.exports=router;
