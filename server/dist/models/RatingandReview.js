"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingAndReview = void 0;
var mongoose_1 = require("mongoose");
// Define the RatingAndReview schema
var ratingAndReviewSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    course: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Course",
        index: true,
    },
});
// Export the RatingAndReview model
exports.RatingAndReview = mongoose_1.default.model("RatingAndReview", ratingAndReviewSchema);
