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
exports.deleteCourse = exports.getInstructorCourses = exports.getFullCourseDetails = exports.getCourseDetails = exports.getAllCourses = exports.editCourse = exports.createCourse = void 0;
var Category_js_1 = require("../models/Category.js");
var Course_js_1 = require("../models/Course.js");
var CourseProgress_js_1 = require("../models/CourseProgress.js");
var Section_js_1 = require("../models/Section.js");
var User_js_1 = require("../models/User.js");
var imageUploader_js_1 = require("../utils/imageUploader.js");
var secToDuration_js_1 = require("../utils/secToDuration.js");
// Function to create a new course
var createCourse = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, courseName, courseDescription, whatYouWillLearn, price, _tag, category, status_1, _instructions, thumbnail, tag, instructions, instructorDetails, categoryDetails, thumbnailImage, newCourse, categoryDetails2, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                userId = req.user.id;
                _a = req.body, courseName = _a.courseName, courseDescription = _a.courseDescription, whatYouWillLearn = _a.whatYouWillLearn, price = _a.price, _tag = _a.tag, category = _a.category, status_1 = _a.status, _instructions = _a.instructions;
                thumbnail = req.files.thumbnailImage;
                tag = JSON.parse(_tag);
                instructions = JSON.parse(_instructions);
                // console.log("tag", tag)
                // console.log("instructions", instructions)
                // Check if any of the required fields are missing
                if (!courseName ||
                    !courseDescription ||
                    !whatYouWillLearn ||
                    !price ||
                    !tag.length ||
                    !thumbnail ||
                    !category ||
                    !instructions.length) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "All Fields are Mandatory",
                        })];
                }
                if (!status_1 || status_1 === undefined) {
                    status_1 = "Draft";
                }
                return [4 /*yield*/, User_js_1.User.findById(userId, {
                        accountType: "Instructor",
                    })];
            case 1:
                instructorDetails = _b.sent();
                if (!instructorDetails) {
                    return [2 /*return*/, res.status(404).json({
                            success: false,
                            message: "Instructor Details Not Found",
                        })];
                }
                return [4 /*yield*/, Category_js_1.Category.findById(category)];
            case 2:
                categoryDetails = _b.sent();
                if (!categoryDetails) {
                    return [2 /*return*/, res.status(404).json({
                            success: false,
                            message: "Category Details Not Found",
                        })];
                }
                return [4 /*yield*/, (0, imageUploader_js_1.uploadImageToCloudinary)(thumbnail, process.env.FOLDER_NAME)];
            case 3:
                thumbnailImage = _b.sent();
                return [4 /*yield*/, Course_js_1.Course.create({
                        courseName: courseName,
                        courseDescription: courseDescription,
                        instructor: instructorDetails._id,
                        whatYouWillLearn: whatYouWillLearn,
                        price: price,
                        tag: tag,
                        category: categoryDetails._id,
                        thumbnail: thumbnailImage.secure_url,
                        status: status_1,
                        instructions: instructions,
                    })];
            case 4:
                newCourse = _b.sent();
                // Add the new course to the User Schema of the Instructor
                return [4 /*yield*/, User_js_1.User.findByIdAndUpdate({
                        _id: instructorDetails._id,
                    }, {
                        $push: {
                            courses: newCourse._id,
                        },
                    }, { new: true })];
            case 5:
                // Add the new course to the User Schema of the Instructor
                _b.sent();
                return [4 /*yield*/, Category_js_1.Category.findByIdAndUpdate({ _id: category }, {
                        $push: {
                            courses: newCourse._id,
                        },
                    }, { new: true })];
            case 6:
                categoryDetails2 = _b.sent();
                // console.log("HEREEEEEEEE", categoryDetails2)
                // Return the new course and a success message
                res.status(200).json({
                    success: true,
                    data: newCourse,
                    message: "Course Created Successfully",
                });
                return [3 /*break*/, 8];
            case 7:
                error_1 = _b.sent();
                // Handle any errors that occur during the creation of the course
                console.error(error_1);
                res.status(500).json({
                    success: false,
                    message: "Failed to create course",
                    error: error_1.message,
                });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.createCourse = createCourse;
// Edit Course Details
var editCourse = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courseId, updates, course, thumbnail, thumbnailImage, key, updatedCourse, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                courseId = req.body.courseId;
                updates = req.body;
                return [4 /*yield*/, Course_js_1.Course.findById(courseId)];
            case 1:
                course = _a.sent();
                if (!course) {
                    return [2 /*return*/, res.status(404).json({ error: "Course not found" })];
                }
                if (!req.files) return [3 /*break*/, 3];
                thumbnail = req.files.thumbnailImage;
                return [4 /*yield*/, (0, imageUploader_js_1.uploadImageToCloudinary)(thumbnail, process.env.FOLDER_NAME)];
            case 2:
                thumbnailImage = _a.sent();
                course.thumbnail = thumbnailImage.secure_url;
                _a.label = 3;
            case 3:
                // Update only the fields that are present in the request body
                for (key in updates) {
                    if (updates.hasOwnProperty(key)) {
                        if (key === "tag" || key === "instructions") {
                            course[key] = JSON.parse(updates[key]);
                        }
                        else {
                            course[key] = updates[key];
                        }
                    }
                }
                return [4 /*yield*/, course.save()];
            case 4:
                _a.sent();
                return [4 /*yield*/, Course_js_1.Course.findOne({
                        _id: courseId,
                    })
                        .populate({
                        path: "instructor",
                        populate: {
                            path: "additionalDetails",
                        },
                    })
                        .populate("category")
                        .populate("ratingAndReviews")
                        .populate({
                        path: "courseContent",
                        populate: {
                            path: "subSection",
                        },
                    })
                        .exec()];
            case 5:
                updatedCourse = _a.sent();
                res.json({
                    success: true,
                    message: "Course updated successfully",
                    data: updatedCourse,
                });
                return [3 /*break*/, 7];
            case 6:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).json({
                    success: false,
                    message: "Internal server error",
                    error: error_2.message,
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.editCourse = editCourse;
// Get Course List
var getAllCourses = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allCourses, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Course_js_1.Course.find({ status: "Published" }, {
                        courseName: true,
                        price: true,
                        thumbnail: true,
                        instructor: true,
                        ratingAndReviews: true,
                        studentsEnrolled: true,
                    })
                        .populate("instructor")
                        .exec()];
            case 1:
                allCourses = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        data: allCourses,
                    })];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, res.status(404).json({
                        success: false,
                        message: "Can't Fetch Course Data",
                        error: error_3.message,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllCourses = getAllCourses;
// Get One Single Course Details
// exports.getCourseDetails = async (req, res) => {
//   try {
//     const { courseId } = req.body
//     const courseDetails = await Course.findOne({
//       _id: courseId,
//     })
//       .populate({
//         path: "instructor",
//         populate: {
//           path: "additionalDetails",
//         },
//       })
//       .populate("category")
//       .populate("ratingAndReviews")
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "subSection",
//         },
//       })
//       .exec()
//     // console.log(
//     //   "###################################### course details : ",
//     //   courseDetails,
//     //   courseId
//     // );
//     if (!courseDetails || !courseDetails.length) {
//       return res.status(400).json({
//         success: false,
//         message: `Could not find course with id: ${courseId}`,
//       })
//     }
//     if (courseDetails.status === "Draft") {
//       return res.status(403).json({
//         success: false,
//         message: `Accessing a draft course is forbidden`,
//       })
//     }
//     return res.status(200).json({
//       success: true,
//       data: courseDetails,
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }
var getCourseDetails = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courseId, courseDetails, totalDurationInSeconds_1, totalDuration, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                courseId = req.body.courseId;
                return [4 /*yield*/, Course_js_1.Course.findOne({
                        _id: courseId,
                    })
                        .populate({
                        path: "instructor",
                        populate: {
                            path: "additionalDetails",
                        },
                    })
                        .populate("category")
                        .populate("ratingAndReviews")
                        .populate({
                        path: "courseContent",
                        populate: {
                            path: "subSection",
                            select: "-videoUrl",
                        },
                    })
                        .exec()];
            case 1:
                courseDetails = _a.sent();
                if (!courseDetails) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "Could not find course with id: ".concat(courseId),
                        })];
                }
                totalDurationInSeconds_1 = 0;
                courseDetails.courseContent.forEach(function (content) {
                    content.subSection.forEach(function (subSection) {
                        var timeDurationInSeconds = parseInt(subSection.timeDuration);
                        totalDurationInSeconds_1 += timeDurationInSeconds;
                    });
                });
                totalDuration = (0, secToDuration_js_1.convertSecondsToDuration)(totalDurationInSeconds_1);
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        data: {
                            courseDetails: courseDetails,
                            totalDuration: totalDuration,
                        },
                    })];
            case 2:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        message: error_4.message,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCourseDetails = getCourseDetails;
var getFullCourseDetails = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courseId, userId, courseDetails, courseProgressCount, totalDurationInSeconds_2, totalDuration, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                courseId = req.body.courseId;
                userId = req.user.id;
                return [4 /*yield*/, Course_js_1.Course.findOne({
                        _id: courseId,
                    })
                        .populate({
                        path: "instructor",
                        populate: {
                            path: "additionalDetails",
                        },
                    })
                        .populate("category")
                        .populate("ratingAndReviews")
                        .populate({
                        path: "courseContent",
                        populate: {
                            path: "subSection",
                        },
                    })
                        .exec()];
            case 1:
                courseDetails = _a.sent();
                return [4 /*yield*/, CourseProgress_js_1.CourseProgress.findOne({
                        courseID: courseId,
                        userId: userId,
                    })];
            case 2:
                courseProgressCount = _a.sent();
                // console.log("courseProgressCount : ", courseProgressCount)
                if (!courseDetails) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "Could not find course with id: ".concat(courseId),
                        })];
                }
                totalDurationInSeconds_2 = 0;
                courseDetails.courseContent.forEach(function (content) {
                    content.subSection.forEach(function (subSection) {
                        var timeDurationInSeconds = parseInt(subSection.timeDuration);
                        totalDurationInSeconds_2 += timeDurationInSeconds;
                    });
                });
                totalDuration = (0, secToDuration_js_1.convertSecondsToDuration)(totalDurationInSeconds_2);
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        data: {
                            courseDetails: courseDetails,
                            totalDuration: totalDuration,
                            completedVideos: (courseProgressCount === null || courseProgressCount === void 0 ? void 0 : courseProgressCount.completedVideos)
                                ? courseProgressCount === null || courseProgressCount === void 0 ? void 0 : courseProgressCount.completedVideos
                                : [],
                        },
                    })];
            case 3:
                error_5 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        message: error_5.message,
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getFullCourseDetails = getFullCourseDetails;
// Get a list of Course for a given Instructor
var getInstructorCourses = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var instructorId, instructorCourses, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                instructorId = req.user.id;
                return [4 /*yield*/, Course_js_1.Course.find({
                        instructor: instructorId,
                    }).sort({ createdAt: -1 })];
            case 1:
                instructorCourses = _a.sent();
                // Return the instructor's courses
                res.status(200).json({
                    success: true,
                    data: instructorCourses,
                });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error(error_6);
                res.status(500).json({
                    success: false,
                    message: "Failed to retrieve instructor courses",
                    error: error_6.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getInstructorCourses = getInstructorCourses;
// Delete the Course
var deleteCourse = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courseId, course, studentsEnrolled, _i, studentsEnrolled_1, studentId, courseSections, _a, courseSections_1, sectionId, section, subSections, _b, subSections_1, subSectionId, error_7;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 16, , 17]);
                courseId = req.body.courseId;
                return [4 /*yield*/, Course_js_1.Course.findById(courseId)];
            case 1:
                course = _c.sent();
                if (!course) {
                    return [2 /*return*/, res.status(404).json({ message: "Course not found" })];
                }
                studentsEnrolled = course.studentsEnroled;
                _i = 0, studentsEnrolled_1 = studentsEnrolled;
                _c.label = 2;
            case 2:
                if (!(_i < studentsEnrolled_1.length)) return [3 /*break*/, 5];
                studentId = studentsEnrolled_1[_i];
                return [4 /*yield*/, User_js_1.User.findByIdAndUpdate(studentId, {
                        $pull: { courses: courseId },
                    })];
            case 3:
                _c.sent();
                _c.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                courseSections = course.courseContent;
                _a = 0, courseSections_1 = courseSections;
                _c.label = 6;
            case 6:
                if (!(_a < courseSections_1.length)) return [3 /*break*/, 14];
                sectionId = courseSections_1[_a];
                return [4 /*yield*/, Section_js_1.Section.findById(sectionId)];
            case 7:
                section = _c.sent();
                if (!section) return [3 /*break*/, 11];
                subSections = section.subSection;
                _b = 0, subSections_1 = subSections;
                _c.label = 8;
            case 8:
                if (!(_b < subSections_1.length)) return [3 /*break*/, 11];
                subSectionId = subSections_1[_b];
                return [4 /*yield*/, SubSection.findByIdAndDelete(subSectionId)];
            case 9:
                _c.sent();
                _c.label = 10;
            case 10:
                _b++;
                return [3 /*break*/, 8];
            case 11: 
            // Delete the section
            return [4 /*yield*/, Section_js_1.Section.findByIdAndDelete(sectionId)];
            case 12:
                // Delete the section
                _c.sent();
                _c.label = 13;
            case 13:
                _a++;
                return [3 /*break*/, 6];
            case 14: 
            // Delete the course
            return [4 /*yield*/, Course_js_1.Course.findByIdAndDelete(courseId)];
            case 15:
                // Delete the course
                _c.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        message: "Course deleted successfully",
                    })];
            case 16:
                error_7 = _c.sent();
                console.error(error_7);
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        message: "Server error",
                        error: error_7.message,
                    })];
            case 17: return [2 /*return*/];
        }
    });
}); };
exports.deleteCourse = deleteCourse;
