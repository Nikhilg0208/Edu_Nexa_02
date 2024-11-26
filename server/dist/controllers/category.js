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
exports.categoryPageDetails = exports.showAllCategories = exports.createCategory = void 0;
var Category_js_1 = require("../models/Category.js");
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
var createCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, description, CategorysDetails, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name_1 = _a.name, description = _a.description;
                if (!name_1) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ success: false, message: "All fields are required" })];
                }
                return [4 /*yield*/, Category_js_1.Category.create({
                        name: name_1,
                        description: description,
                    })];
            case 1:
                CategorysDetails = _b.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        message: "Categorys Created Successfully",
                    })];
            case 2:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(500).json({
                        success: true,
                        message: error_1.message,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createCategory = createCategory;
var showAllCategories = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allCategorys, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Category_js_1.Category.find()];
            case 1:
                allCategorys = _a.sent();
                res.status(200).json({
                    success: true,
                    data: allCategorys,
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        message: error_2.message,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.showAllCategories = showAllCategories;
var categoryPageDetails = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categoryId, selectedCategory, categoriesExceptSelected, len, differentCategory, allCategories, allCourses, mostSellingCourses, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                categoryId = req.body.categoryId;
                return [4 /*yield*/, Category_js_1.Category.findById(categoryId)
                        .populate({
                        path: "courses",
                        match: { status: "Published" },
                        populate: "ratingAndReviews",
                    })
                        .exec()];
            case 1:
                selectedCategory = _a.sent();
                console.log("SELECTED COURSE", selectedCategory);
                // Handle the case when the category is not found
                if (!selectedCategory) {
                    console.log("Category not found.");
                    return [2 /*return*/, res
                            .status(404)
                            .json({ success: false, message: "Category not found" })];
                }
                // Handle the case when there are no courses
                if (selectedCategory.courses.length === 0) {
                    console.log("No courses found for the selected category.");
                    return [2 /*return*/, res.status(404).json({
                            success: false,
                            message: "No courses found for the selected category.",
                        })];
                }
                return [4 /*yield*/, Category_js_1.Category.find({
                        _id: { $ne: categoryId },
                    })];
            case 2:
                categoriesExceptSelected = _a.sent();
                len = categoriesExceptSelected.length;
                console.log("length", len);
                differentCategory = null;
                if (!(len > 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, Category_js_1.Category.findOne(categoriesExceptSelected[getRandomInt(len)]._id)
                        .populate({
                        path: "courses",
                        match: { status: "Published" },
                    })
                        .exec()];
            case 3:
                differentCategory = _a.sent();
                _a.label = 4;
            case 4: return [4 /*yield*/, Category_js_1.Category.find()
                    .populate({
                    path: "courses",
                    match: { status: "Published" },
                })
                    .exec()];
            case 5:
                allCategories = _a.sent();
                allCourses = allCategories.flatMap(function (category) { return category.courses; });
                mostSellingCourses = allCourses
                    .sort(function (a, b) { return b.sold - a.sold; })
                    .slice(0, 10);
                res.status(200).json({
                    success: true,
                    data: {
                        selectedCategory: selectedCategory,
                        differentCategory: differentCategory,
                        mostSellingCourses: mostSellingCourses,
                    },
                });
                return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        message: "Internal server error",
                        error: error_3.message,
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.categoryPageDetails = categoryPageDetails;
