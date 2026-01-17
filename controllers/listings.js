const Listing = require('../models/listing.js');
const axios = require("axios");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            },
        })
        .populate("owner");
        
    if(!listing) {
        req.flash("error", " Requested listing does not exist !");         // it occurs when we try to access deleted listing through url
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {

    try {
        // if(!req.body.listing) {                                             // why writing this because of serve side validation if someone send request directly to url with hoppscoth or postman without sending details in req.body then also listing is saving to prevent that .
        //     throw new ExpressError(400, "Send valid data for listing");     // but we can not write this for every field that's why we use joi npm package to handle validation for server side .
        // }
    
        /* schema validation with joi */
        // let result = listingSchema.validate(req.body);
        // console.log(result);
        // if(result.error) {
        //     throw new ExpressError(400, result.error);
        // }
    
        let url = req.file.path;
        let filename = req.file.filename;
        
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;        // setting owner of listing to currently logged in user
    
        newListing.image = { url, filename };

        // if(!newListing.title) {
        //     throw new ExpressError(400, "title is missing");
        // }
    
        // if(!newListing.description) {
        //     throw new ExpressError(400, "Description is misssing");
        // }

        // Geocoding with OpenStreetMap Nominatim
        const locationQuery = encodeURIComponent(req.body.listing.location);
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${locationQuery}&format=json&limit=1`,
            {
                headers: {
                "User-Agent": "WanderLustApp/1.0 (student project)"
                }
            }
        );

        if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            newListing.geometry = {
                type: 'Point',
                coordinates: [parseFloat(lon), parseFloat(lat)] // [longitude, latitude]
            };

            // Also store as separate fields for easier access
            newListing.latitude = parseFloat(lat);
            newListing.longitude = parseFloat(lon);
        } else {
            // Default to New Delhi if geocoding fails
            newListing.geometry = {
                type: 'Point',
                coordinates: [77.2088, 28.6139]
            };
            newListing.latitude = 28.6139;
            newListing.longitude = 77.2088;
        }
    
        await newListing.save();
        req.flash("success", " New Listing Created !");
        res.redirect("/listings");
    }
    catch (err) {
        next(err);
    }
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Requested listing does not exist !");         // it occurs when we try to access deleted listing through url
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload/", "/upload/w_250/");  // resizing image for edit form display as we do not need high quality image here
    res.render("listings/edit.ejs", {listing , originalImageUrl});
};

module.exports.updateListing = async (req, res) => {
    // if(!req.body.listing) {
    //     throw new ExpressError(400, "Send valid data for listing");
    // }
    let { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true, new: true });
        
    if(typeof req.file !== 'undefined') {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }  
    
    req.flash("success", " Listing Updated !");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", " Listing Deleted !");
    res.redirect("/listings");
};

