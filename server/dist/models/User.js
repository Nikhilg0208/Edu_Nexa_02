"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
// Define the user schema using the Mongoose Schema constructor
var userSchema = new mongoose_1.default.Schema({
    // Define the name field with type String, required, and trimmed
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    // Define the email field with type String, required, and trimmed
    email: {
        type: String,
        required: true,
        trim: true,
    },
    // Define the password field with type String and required
    password: {
        type: String,
        required: true,
    },
    // Define the role field with type String and enum values of "Admin", "Student", or "Visitor"
    accountType: {
        type: String,
        enum: ["Admin", "Student", "Instructor"],
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    approved: {
        type: Boolean,
        default: true,
    },
    additionalDetails: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
    },
    courses: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    image: {
        type: String,
    },
    courseProgress: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "courseProgress",
        },
    ],
    // Add timestamps for when the document is created and last modified
}, { timestamps: true });
// Export the Mongoose model for the user schema, using the name "user"
exports.User = mongoose_1.default.model("User", userSchema);
