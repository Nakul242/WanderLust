const express = require("express");
const router = express.Router({ mergeParams: true });   // to access :id param from app.js
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware.js");
const reviewsController = require("../controllers/reviews");

/** Reviews
 * Post Route for adding review to a listing
 */
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewsController.createReview));

// Delete Route for reviews 
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewsController.destroyReview));

module.exports = router;