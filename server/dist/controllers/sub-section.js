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
exports.deleteSubSection = exports.updateSubSection = exports.createSubSection = void 0;
var Section_js_1 = require("../models/Section.js");
var Subsection_js_1 = require("../models/Subsection.js");
var imageUploader_js_1 = require("../utils/imageUploader.js");
var createSubSection = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, sectionId, title, description, video, uploadDetails, SubSectionDetails, updatedSection, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, sectionId = _a.sectionId, title = _a.title, description = _a.description;
                video = req.files.video;
                // Check if all necessary fields are provided
                if (!sectionId || !title || !description || !video) {
                    return [2 /*return*/, res
                            .status(404)
                            .json({ success: false, message: "All Fields are Required" })];
                }
                console.log(video);
                return [4 /*yield*/, (0, imageUploader_js_1.uploadImageToCloudinary)(video, process.env.FOLDER_NAME)];
            case 1:
                uploadDetails = _b.sent();
                console.log(uploadDetails);
                return [4 /*yield*/, Subsection_js_1.SubSection.create({
                        title: title,
                        timeDuration: "".concat(uploadDetails.duration),
                        description: description,
                        videoUrl: uploadDetails.secure_url,
                    })];
            case 2:
                SubSectionDetails = _b.sent();
                return [4 /*yield*/, Section_js_1.Section.findByIdAndUpdate({ _id: sectionId }, { $push: { subSection: SubSectionDetails._id } }, { new: true }).populate("subSection")];
            case 3:
                updatedSection = _b.sent();
                // Return the updated section in the response
                return [2 /*return*/, res.status(200).json({ success: true, data: updatedSection })];
            case 4:
                error_1 = _b.sent();
                // Handle any errors that may occur during the process
                console.error("Error creating new sub-section:", error_1);
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        message: "Internal server error",
                        error: error_1.message,
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createSubSection = createSubSection;
var updateSubSection = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, sectionId, subSectionId, title, description, subSection, video, uploadDetails, updatedSection, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                _a = req.body, sectionId = _a.sectionId, subSectionId = _a.subSectionId, title = _a.title, description = _a.description;
                return [4 /*yield*/, Subsection_js_1.SubSection.findById(subSectionId)];
            case 1:
                subSection = _b.sent();
                if (!subSection) {
                    return [2 /*return*/, res.status(404).json({
                            success: false,
                            message: "SubSection not found",
                        })];
                }
                if (title !== undefined) {
                    subSection.title = title;
                }
                if (description !== undefined) {
                    subSection.description = description;
                }
                if (!(req.files && req.files.video !== undefined)) return [3 /*break*/, 3];
                video = req.files.video;
                return [4 /*yield*/, (0, imageUploader_js_1.uploadImageToCloudinary)(video, process.env.FOLDER_NAME)];
            case 2:
                uploadDetails = _b.sent();
                subSection.videoUrl = uploadDetails.secure_url;
                subSection.timeDuration = "".concat(uploadDetails.duration);
                _b.label = 3;
            case 3: return [4 /*yield*/, subSection.save()];
            case 4:
                _b.sent();
                return [4 /*yield*/, Section_js_1.Section.findById(sectionId).populate("subSection")];
            case 5:
                updatedSection = _b.sent();
                console.log("updated section", updatedSection);
                return [2 /*return*/, res.json({
                        success: true,
                        message: "Section updated successfully",
                        data: updatedSection,
                    })];
            case 6:
                error_2 = _b.sent();
                console.error(error_2);
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        message: "An error occurred while updating the section",
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.updateSubSection = updateSubSection;
var deleteSubSection = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, subSectionId, sectionId, subSection, updatedSection, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, subSectionId = _a.subSectionId, sectionId = _a.sectionId;
                return [4 /*yield*/, Section_js_1.Section.findByIdAndUpdate({ _id: sectionId }, {
                        $pull: {
                            subSection: subSectionId,
                        },
                    })];
            case 1:
                _b.sent();
                return [4 /*yield*/, Subsection_js_1.SubSection.findByIdAndDelete({
                        _id: subSectionId,
                    })];
            case 2:
                subSection = _b.sent();
                if (!subSection) {
                    return [2 /*return*/, res
                            .status(404)
                            .json({ success: false, message: "SubSection not found" })];
                }
                return [4 /*yield*/, Section_js_1.Section.findById(sectionId).populate("subSection")];
            case 3:
                updatedSection = _b.sent();
                return [2 /*return*/, res.json({
                        success: true,
                        message: "SubSection deleted successfully",
                        data: updatedSection,
                    })];
            case 4:
                error_3 = _b.sent();
                console.error(error_3);
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        message: "An error occurred while deleting the SubSection",
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteSubSection = deleteSubSection;
