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
exports.deleteSection = exports.updateSection = exports.createSection = void 0;
var Course_js_1 = require("../models/Course.js");
var Section_js_1 = require("../models/Section.js");
// CREATE a new section
var createSection = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, sectionName, courseId, newSection, updatedCourse, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, sectionName = _a.sectionName, courseId = _a.courseId;
                // Validate the input
                if (!sectionName || !courseId) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "Missing required properties",
                        })];
                }
                return [4 /*yield*/, Section_js_1.Section.create({ sectionName: sectionName })];
            case 1:
                newSection = _b.sent();
                return [4 /*yield*/, Course_js_1.Course.findByIdAndUpdate(courseId, {
                        $push: {
                            courseContent: newSection._id,
                        },
                    }, { new: true })
                        .populate({
                        path: "courseContent",
                        populate: {
                            path: "subSection",
                        },
                    })
                        .exec()];
            case 2:
                updatedCourse = _b.sent();
                // Return the updated course object in the response
                res.status(200).json({
                    success: true,
                    message: "Section created successfully",
                    updatedCourse: updatedCourse,
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                // Handle errors
                res.status(500).json({
                    success: false,
                    message: "Internal server error",
                    error: error_1.message,
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createSection = createSection;
// UPDATE a section
var updateSection = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, sectionName, sectionId, courseId, section, course, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, sectionName = _a.sectionName, sectionId = _a.sectionId, courseId = _a.courseId;
                return [4 /*yield*/, Section_js_1.Section.findByIdAndUpdate(sectionId, { sectionName: sectionName }, { new: true })];
            case 1:
                section = _b.sent();
                return [4 /*yield*/, Course_js_1.Course.findById(courseId)
                        .populate({
                        path: "courseContent",
                        populate: {
                            path: "subSection",
                        },
                    })
                        .exec()];
            case 2:
                course = _b.sent();
                console.log(course);
                res.status(200).json({
                    success: true,
                    message: section,
                    data: course,
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.error("Error updating section:", error_2);
                res.status(500).json({
                    success: false,
                    message: "Internal server error",
                    error: error_2.message,
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateSection = updateSection;
// DELETE a section
var deleteSection = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, sectionId, courseId, section, course, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                _a = req.body, sectionId = _a.sectionId, courseId = _a.courseId;
                return [4 /*yield*/, Course_js_1.Course.findByIdAndUpdate(courseId, {
                        $pull: {
                            courseContent: sectionId,
                        },
                    })];
            case 1:
                _b.sent();
                return [4 /*yield*/, Section_js_1.Section.findById(sectionId)];
            case 2:
                section = _b.sent();
                console.log(sectionId, courseId);
                if (!section) {
                    return [2 /*return*/, res.status(404).json({
                            success: false,
                            message: "Section not found",
                        })];
                }
                // Delete the associated subsections
                return [4 /*yield*/, SubSection.deleteMany({ _id: { $in: section.subSection } })];
            case 3:
                // Delete the associated subsections
                _b.sent();
                return [4 /*yield*/, Section_js_1.Section.findByIdAndDelete(sectionId)];
            case 4:
                _b.sent();
                return [4 /*yield*/, Course_js_1.Course.findById(courseId)
                        .populate({
                        path: "courseContent",
                        populate: {
                            path: "subSection",
                        },
                    })
                        .exec()];
            case 5:
                course = _b.sent();
                res.status(200).json({
                    success: true,
                    message: "Section deleted",
                    data: course,
                });
                return [3 /*break*/, 7];
            case 6:
                error_3 = _b.sent();
                console.error("Error deleting section:", error_3);
                res.status(500).json({
                    success: false,
                    message: "Internal server error",
                    error: error_3.message,
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.deleteSection = deleteSection;
