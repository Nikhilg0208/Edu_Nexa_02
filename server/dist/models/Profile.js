"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
var mongoose_1 = require("mongoose");
// Define the Profile schema
var profileSchema = new mongoose_1.default.Schema({
    gender: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    about: {
        type: String,
        trim: true,
    },
    contactNumber: {
        type: Number,
        trim: true,
    },
});
// Export the Profile model
exports.Profile = mongoose_1.default.model("Profile", profileSchema);
