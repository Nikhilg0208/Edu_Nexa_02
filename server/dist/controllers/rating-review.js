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
exports.getAllRatingReview = exports.getAverageRating = exports.createRating = void 0;
var mongoose_1 = require("mongoose");
var Course_js_1 = require("../models/Course.js");
var RatingandReview_js_1 = require("../models/RatingandReview.js");
// Create a new rating and review
var createRating = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, rating, review, courseId, courseDetails, alreadyReviewed, ratingReview, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                userId = req.user.id;
                _a = req.body, rating = _a.rating, review = _a.review, courseId = _a.courseId;
                return [4 /*yield*/, Course_js_1.Course.findOne({
                        _id: courseId,
                        studentsEnroled: { $elemMatch: { $eq: userId } },
                    })];
            case 1:
                courseDetails = _b.sent();
                if (!courseDetails) {
                    return [2 /*return*/, res.status(404).json({
                            success: false,
                            message: "Student is not enrolled in this course",
                        })];
                }
                return [4 /*yield*/, RatingandReview_js_1.RatingAndReview.findOne({
                        user: userId,
                        course: courseId,
                    })];
            case 2:
                alreadyReviewed = _b.sent();
                if (alreadyReviewed) {
                    return [2 /*return*/, res.status(403).json({
                            success: false,
                            message: "Course already reviewed by user",
                        })];
                }
                return [4 /*yield*/, RatingandReview_js_1.RatingAndReview.create({
                        rating: rating,
                        review: review,
                        course: courseId,
                        user: userId,
                    })];
            case 3:
                ratingReview = _b.sent();
                // Add the rating and review to the course
                return [4 /*yield*/, Course_js_1.Course.findByIdAndUpdate(courseId, {
                        $push: {
                            ratingAndReviews: ratingReview,
                        },
                    })];
            case 4:
                // Add the rating and review to the course
                _b.sent();
                return [4 /*yield*/, courseDetails.save()];
            case 5:
                _b.sent();
                return [2 /*return*/, res.status(201).json({
                        success: true,
                        message: "Rating and review created successfully",
                        ratingReview: ratingReview,
                    })];
            case 6:
                error_1 = _b.sent();
                console.error(error_1);
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        message: "Internal server error",
                        error: error_1.message,
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.createRating = createRating;
// Get the average rating for a course
var getAverageRating = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courseId, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                courseId = req.body.courseId;
                return [4 /*yield*/, RatingandReview_js_1.RatingAndReview.aggregate([
                        {
                            $match: {
                                course: new mongoose_1.default.Types.ObjectId(courseId), // Convert courseId to ObjectId
                            },
                        },
                        {
                            $group: {
                                _id: null,
                                averageRating: { $avg: "$rating" },
                            },
                        },
                    ])];
            case 1:
                result = _a.sent();
                if (result.length > 0) {
                    return [2 /*return*/, res.status(200).json({
                            success: true,
                            averageRating: result[0].averageRating,
                        })];
                }
                // If no ratings are found, return 0 as the default rating
                return [2 /*return*/, res.status(200).json({ success: true, averageRating: 0 })];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        message: "Failed to retrieve the rating for the course",
                        error: error_2.message,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAverageRating = getAverageRating;
// Get all rating and reviews
var getAllRatingReview = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allReviews, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, RatingandReview_js_1.RatingAndReview.find({})
                        .sort({ rating: "desc" })
                        .populate({
                        path: "user",
                        select: "firstName lastName email image", // Specify the fields you want to populate from the "Profile" model
                    })
                        .populate({
                        path: "course",
                        select: "courseName", //Specify the fields you want to populate from the "Course" model
                    })
                        .exec()];
            case 1:
                allReviews = _a.sent();
                res.status(200).json({
                    success: true,
                    data: allReviews,
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        message: "Failed to retrieve the rating and review for the course",
                        error: error_3.message,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllRatingReview = getAllRatingReview;
