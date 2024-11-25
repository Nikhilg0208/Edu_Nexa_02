"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
var mongoose_1 = require("mongoose");
// Define the Courses schema
var coursesSchema = new mongoose_1.default.Schema({
    courseName: { type: String },
    courseDescription: { type: String },
    instructor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    whatYouWillLearn: {
        type: String,
    },
    courseContent: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Section",
        },
    ],
    ratingAndReviews: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "RatingAndReview",
        },
    ],
    price: {
        type: Number,
    },
    thumbnail: {
        type: String,
    },
    tag: {
        type: [String],
        required: true,
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        // required: true,
        ref: "Category",
    },
    studentsEnroled: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
    ],
    instructions: {
        type: [String],
    },
    status: {
        type: String,
        enum: ["Draft", "Published"],
    },
    createdAt: { type: Date, default: Date.now },
});
// Export the Courses model
exports.Course = mongoose_1.default.model("Course", coursesSchema);
