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
exports.updateCourseProgress = void 0;
var CourseProgress_js_1 = require("../models/CourseProgress.js");
var updateCourseProgress = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, courseId, subsectionId, userId, subsection, courseProgress, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, courseId = _a.courseId, subsectionId = _a.subsectionId;
                userId = req.user.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, SubSection.findById(subsectionId)];
            case 2:
                subsection = _b.sent();
                console.log("this is the subsection", subsection);
                if (!subsection) {
                    return [2 /*return*/, res.status(404).json({ error: "Invalid subsection" })];
                }
                return [4 /*yield*/, CourseProgress_js_1.CourseProgress.findOne({
                        courseID: courseId,
                        userId: userId,
                    })];
            case 3:
                courseProgress = _b.sent();
                // console.log("this is the", courseProgress)
                if (!courseProgress) {
                    // If course progress doesn't exist, create a new one
                    return [2 /*return*/, res.status(404).json({
                            success: false,
                            message: "Course progress Does Not Exist",
                        })];
                }
                else {
                    // If course progress exists, check if the subsection is already completed
                    if (courseProgress.completedVideos.includes(subsectionId)) {
                        return [2 /*return*/, res.status(400).json({ error: "Subsection already completed" })];
                    }
                    // Push the subsection into the completedVideos array
                    courseProgress.completedVideos.push(subsectionId);
                }
                // Save the updated course progress
                return [4 /*yield*/, courseProgress.save()];
            case 4:
                // Save the updated course progress
                _b.sent();
                return [2 /*return*/, res.status(200).json({ message: "Course progress updated" })];
            case 5:
                error_1 = _b.sent();
                console.error(error_1);
                return [2 /*return*/, res.status(500).json({ error: "Internal server error" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateCourseProgress = updateCourseProgress;
// exports.getProgressPercentage = async (req, res) => {
//   const { courseId } = req.body
//   const userId = req.user.id
//   if (!courseId) {
//     return res.status(400).json({ error: "Course ID not provided." })
//   }
//   try {
//     // Find the course progress document for the user and course
//     let courseProgress = await CourseProgress.findOne({
//       courseID: courseId,
//       userId: userId,
//     })
//       .populate({
//         path: "courseID",
//         populate: {
//           path: "courseContent",
//         },
//       })
//       .exec()
//     if (!courseProgress) {
//       return res
//         .status(400)
//         .json({ error: "Can not find Course Progress with these IDs." })
//     }
//     console.log(courseProgress, userId)
//     let lectures = 0
//     courseProgress.courseID.courseContent?.forEach((sec) => {
//       lectures += sec.subSection.length || 0
//     })
//     let progressPercentage =
//       (courseProgress.completedVideos.length / lectures) * 100
//     // To make it up to 2 decimal point
//     const multiplier = Math.pow(10, 2)
//     progressPercentage =
//       Math.round(progressPercentage * multiplier) / multiplier
//     return res.status(200).json({
//       data: progressPercentage,
//       message: "Succesfully fetched Course progress",
//     })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ error: "Internal server error" })
//   }
// }
