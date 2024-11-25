"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_js_1 = require("../middleware/auth.js");
var profile_js_1 = require("../controllers/profile.js");
var profileRoutes = express_1.default.Router();
// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
profileRoutes.delete("/deleteProfile", auth_js_1.auth, profile_js_1.deleteAccount);
profileRoutes.put("/updateProfile", auth_js_1.auth, profile_js_1.updateProfile);
profileRoutes.get("/getUserDetails", auth_js_1.auth, profile_js_1.getAllUserDetails);
// Get Enrolled Courses
profileRoutes.get("/getEnrolledCourses", auth_js_1.auth, profile_js_1.getEnrolledCourses);
profileRoutes.put("/updateDisplayPicture", auth_js_1.auth, profile_js_1.updateDisplayPicture);
profileRoutes.get("/instructorDashboard", auth_js_1.auth, auth_js_1.isInstructor, profile_js_1.instructorDashboard);
exports.default = profileRoutes;
