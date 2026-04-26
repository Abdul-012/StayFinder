const User=require("../models/user.js");

// Render Signup controller
module.exports.renderSignup= (req,res) =>
{
    res.render("users/signup.ejs");
}
//signup controller
module.exports.Signup=async (req,res,next) =>
{
    try 
    {
        let { username, password, email } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err) 
            {
                return next(err);
            }
        req.flash("success", "welcome to StayFinder!");
        res.redirect("/listings");
    } )
}
    catch (err) 
    {
        req.flash("error", err.message);
        console.error(err);
        res.redirect("/signup");
    }
};

// Render Login controller
module.exports.renderLogin=(req,res) =>
{
    res.render("users/login.ejs");
};

// Logout controller
module.exports.logout=(req,res, next) =>
{
    req.logout(function(err) 
    {
        if (err) 
         { 
            return next(err); 
         }
        req.flash("success", "Logged out successfully!");
        res.redirect("/listings");
    });
};


// Login controller is handled in the route file using passport.authenticate middleware
module.exports.login=  async(req,res) => 
    {
        req.flash("success", "Welcome back!");
        const redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    };
