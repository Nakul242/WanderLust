const User = require('../models/user');

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {                        // login method provided by passport to log in the user after signup automatically
            if (err) return next(err);
            req.flash("success", "Welcome to WanderLust!");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to WanderLust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";     // it will be useful when we try to login from a listing page at that time isLoggedIn middleware will not trigger and redirectUrl will not be set in res.locals that's give error so we provide a default value /listings
    res.redirect(redirectUrl);               
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {                           // logout method provided by passport , and we have to pass callback to it (function to be executed after logout)
        if (err) { return next(err); }
        req.flash("success", "You have been logged out!");
        res.redirect("/listings");
    });
};