if(process.env.NODE_ENV !== "production") {                     // to load env variables in development mode only and at the production they will be set in the hosting service
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";    // local mongo server
const dbUrl = process.env.ATLASDB_URL;                 // mongo server from environment variable ( for production use )

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch(err => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SESSION_SECRET,
    },
    touchAfter: 24 * 60 * 60,      // time period in seconds to update session in DB even if it is not modified
});

store.on("error", () => {
    console.log("Error in Mongo Session Store",error);
});

const sessionOptions = {
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week  in milliseconds   => it is used so that cookie get expired after 1 week not on browser close
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
        httpOnly: true,
    },
};

app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());     
app.use(passport.session());                    // to use persistent login sessions
passport.use(new LocalStrategy(User.authenticate()));      // we are using static authenticate method of model in LocalStrategy

passport.serializeUser(User.serializeUser());       // how to store user in session
passport.deserializeUser(User.deserializeUser());     // to remove the user from session

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;      // req.user is provided by passport and it contains the currently logged in user
    next();
});

app.get("/demouser", async (req, res) => {
    let fakeUser = new User({
        email: "student@gmail.com",
        username: "delta_student",
    });

    let registeredUser = await User.register(fakeUser, "mypassword");   // register method is provided by passport-local-mongoose  , method to register new user with hashed password and to check if username already exists
    res.send(registeredUser);
});


// Listing Routes 
app.use("/listings", listingRouter);

// Review Routes 
app.use("/listings/:id/reviews", reviewRouter);         // here :id param stay in app.js and not go to review.js
                                                       // to solve this we use mergeParams true in review.js to access :id param from listing.js

// User Routes
app.use("/", userRouter);

// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "by the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India",
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
    let {statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
    // res.status(statusCode).send(message);
});

app.listen(8080, () => {
    console.log("server is listening to port 8080");
});