"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instructorDashboard = exports.getEnrolledCourses = exports.updateDisplayPicture = exports.getAllUserDetails = exports.deleteAccount = exports.updateProfile = void 0;
var mongoose_1 = require("mongoose");
var Course_js_1 = require("../models/Course.js");
var CourseProgress_js_1 = require("../models/CourseProgress.js");
var Profile_js_1 = require("../models/Profile.js");
var User_js_1 = require("../models/User.js");
var imageUploader_js_1 = require("../utils/imageUploader.js");
var secToDuration_js_1 = require("../utils/secToDuration.js");
// Method for updating a profile
var updateProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, firstName, _c, lastName, _d, dateOfBirth, _e, about, _f, contactNumber, _g, gender, id, userDetails, profile, user, updatedUserDetails, error_1;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _h.trys.push([0, 7, , 8]);
                _a = req.body, _b = _a.firstName, firstName = _b === void 0 ? "" : _b, _c = _a.lastName, lastName = _c === void 0 ? "" : _c, _d = _a.dateOfBirth, dateOfBirth = _d === void 0 ? "" : _d, _e = _a.about, about = _e === void 0 ? "" : _e, _f = _a.contactNumber, contactNumber = _f === void 0 ? "" : _f, _g = _a.gender, gender = _g === void 0 ? "" : _g;
                id = req.user.id;
                return [4 /*yield*/, User_js_1.User.findById(id)];
            case 1:
                userDetails = _h.sent();
                return [4 /*yield*/, Profile_js_1.Profile.findById(userDetails.additionalDetails)];
            case 2:
                profile = _h.sent();
                return [4 /*yield*/, User_js_1.User.findByIdAndUpdate(id, {
                        firstName: firstName,
                        lastName: lastName,
                    })];
            case 3:
                user = _h.sent();
                return [4 /*yield*/, user.save()];
            case 4:
                _h.sent();
                // Update the profile fields
                profile.dateOfBirth = dateOfBirth;
                profile.about = about;
                profile.contactNumber = contactNumber;
                profile.gender = gender;
                // Save the updated profile
                return [4 /*yield*/, profile.save()];
            case 5:
                // Save the updated profile
                _h.sent();
                return [4 /*yield*/, User_js_1.User.findById(id)
                        .populate("additionalDetails")
                        .exec()];
            case 6:
                updatedUserDetails = _h.sent();
                return [2 /*return*/, res.json({
                        success: true,
                        message: "Profile updated successfully",
                        updatedUserDetails: updatedUserDetails,
                    })];
            case 7:
                error_1 = _h.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        error: error_1.message,
                    })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.updateProfile = updateProfile;
var deleteAccount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, _i, _a, courseId, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 9, , 10]);
                id = req.user.id;
                return [4 /*yield*/, User_js_1.User.findById({ _id: id })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({
                            success: false,
                            message: "User not found",
                        })];
                }
                // Delete Assosiated Profile with the User
                return [4 /*yield*/, Profile_js_1.Profile.findByIdAndDelete({
                        _id: new mongoose_1.default.Types.ObjectId(user.additionalDetails),
                    })];
            case 2:
                // Delete Assosiated Profile with the User
                _b.sent();
                _i = 0, _a = user.courses;
                _b.label = 3;
            case 3:
                if (!(_i < _a.length)) return [3 /*break*/, 6];
                courseId = _a[_i];
                return [4 /*yield*/, Course_js_1.Course.findByIdAndUpdate(courseId, { $pull: { studentsEnroled: id } }, { new: true })];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6: 
            // Now Delete User
            return [4 /*yield*/, User_js_1.User.findByIdAndDelete({ _id: id })];
            case 7:
                // Now Delete User
                _b.sent();
                res.status(200).json({
                    success: true,
                    message: "User deleted successfully",
                });
                return [4 /*yield*/, CourseProgress_js_1.CourseProgress.deleteMany({ userId: id })];
            case 8:
                _b.sent();
                return [3 /*break*/, 10];
            case 9:
                error_2 = _b.sent();
                console.log(error_2);
                res
                    .status(500)
                    .json({ success: false, message: "User Cannot be deleted successfully" });
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.deleteAccount = deleteAccount;
var getAllUserDetails = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userDetails, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.user.id;
                return [4 /*yield*/, User_js_1.User.findById(id)
                        .populate("additionalDetails")
                        .exec()];
            case 1:
                userDetails = _a.sent();
                // console.log(userDetails)
                res.status(200).json({
                    success: true,
                    message: "User Data fetched successfully",
                    data: userDetails,
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        message: error_3.message,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUserDetails = getAllUserDetails;
var updateDisplayPicture = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var displayPicture, userId, image, updatedProfile, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                displayPicture = req.files.displayPicture;
                userId = req.user.id;
                return [4 /*yield*/, (0, imageUploader_js_1.uploadImageToCloudinary)(displayPicture, process.env.FOLDER_NAME, 1000, 1000)];
            case 1:
                image = _a.sent();
                return [4 /*yield*/, User_js_1.User.findByIdAndUpdate({ _id: userId }, { image: image.secure_url }, { new: true })];
            case 2:
                updatedProfile = _a.sent();
                res.send({
                    success: true,
                    message: "Image Updated successfully",
                    data: updatedProfile,
                });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        message: error_4.message,
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateDisplayPicture = updateDisplayPicture;
var getEnrolledCourses = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, userDetails, SubsectionLength, i, totalDurationInSeconds, j, courseProgressCount, multiplier, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                userId = req.user.id;
                return [4 /*yield*/, User_js_1.User.findOne({
                        _id: userId,
                    })
                        .populate({
                        path: "courses",
                        populate: {
                            path: "courseContent",
                            populate: {
                                path: "subSection",
                            },
                        },
                    })
                        .exec()];
            case 1:
                userDetails = _a.sent();
                userDetails = userDetails.toObject();
                SubsectionLength = 0;
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < userDetails.courses.length)) return [3 /*break*/, 5];
                totalDurationInSeconds = 0;
                SubsectionLength = 0;
                for (j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                    totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce(function (acc, curr) { return acc + parseInt(curr.timeDuration); }, 0);
                    userDetails.courses[i].totalDuration = (0, secToDuration_js_1.convertSecondsToDuration)(totalDurationInSeconds);
                    SubsectionLength +=
                        userDetails.courses[i].courseContent[j].subSection.length;
                }
                return [4 /*yield*/, CourseProgress_js_1.CourseProgress.findOne({
                        courseID: userDetails.courses[i]._id,
                        userId: userId,
                    })];
            case 3:
                courseProgressCount = _a.sent();
                courseProgressCount = courseProgressCount === null || courseProgressCount === void 0 ? void 0 : courseProgressCount.completedVideos.length;
                if (SubsectionLength === 0) {
                    userDetails.courses[i].progressPercentage = 100;
                }
                else {
                    multiplier = Math.pow(10, 2);
                    userDetails.courses[i].progressPercentage =
                        Math.round((courseProgressCount / SubsectionLength) * 100 * multiplier) / multiplier;
                }
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5:
                if (!userDetails) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "Could not find user with id: ".concat(userDetails),
                        })];
                }
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        data: userDetails.courses,
                    })];
            case 6:
                error_5 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        message: error_5.message,
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.getEnrolledCourses = getEnrolledCourses;
var instructorDashboard = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courseDetails, courseData, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Course_js_1.Course.find({ instructor: req.user.id })];
            case 1:
                courseDetails = _a.sent();
                courseData = courseDetails.map(function (course) {
                    var totalStudentsEnrolled = course.studentsEnroled.length;
                    var totalAmountGenerated = totalStudentsEnrolled * course.price;
                    // Create a new object with the additional fields
                    var courseDataWithStats = {
                        _id: course._id,
                        courseName: course.courseName,
                        courseDescription: course.courseDescription,
                        // Include other course properties as needed
                        totalStudentsEnrolled: totalStudentsEnrolled,
                        totalAmountGenerated: totalAmountGenerated,
                    };
                    return courseDataWithStats;
                });
                res.status(200).json({ courses: courseData });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error(error_6);
                res.status(500).json({ message: "Server Error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.instructorDashboard = instructorDashboard;
