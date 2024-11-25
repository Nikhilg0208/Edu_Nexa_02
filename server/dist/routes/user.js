"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import the required modules
var express_1 = require("express");
var auth_js_1 = require("../controllers/auth.js");
var reset_password_js_1 = require("../controllers/reset-password.js");
var auth_js_2 = require("../middleware/auth.js");
var userRoutes = express_1.default.Router();
// Routes for Login, Signup, and Authentication
// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************
// Route for user login
userRoutes.post("/login", auth_js_1.login);
// Route for user signup
userRoutes.post("/signup", auth_js_1.signup);
// Route for sending OTP to the user's email
userRoutes.post("/sendotp", auth_js_1.sendotp);
// Route for Changing the password
userRoutes.post("/changepassword", auth_js_2.auth, auth_js_1.changePassword);
// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************
// Route for generating a reset password token
userRoutes.post("/reset-password-token", reset_password_js_1.resetPasswordToken);
// Route for resetting user's password after verification
userRoutes.post("/reset-password", reset_password_js_1.resetPassword);
// Export the router for use in the main application
exports.default = userRoutes;
