"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryConnect = void 0;
var cloudinary_1 = require("cloudinary");
var cloudinaryConnect = function () {
    try {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
        console.log("Cloudinary configured successfully");
    }
    catch (error) {
        console.error("Error configuring Cloudinary:", error);
    }
};
exports.cloudinaryConnect = cloudinaryConnect;
