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
exports.sendPaymentSuccessEmail = exports.verifyPayment = exports.capturePayment = void 0;
var razorpay_js_1 = require("../config/razorpay.js");
var Course_js_1 = require("../models/Course.js");
var crypto_1 = require("crypto");
var User_js_1 = require("../models/User.js");
var mailSender_js_1 = require("../utils/mailSender.js");
var mongoose_1 = require("mongoose");
var courseEnrollmentEmail_js_1 = require("../mail/templates/courseEnrollmentEmail.js");
var paymentSuccessEmail_js_1 = require("../mail/templates/paymentSuccessEmail.js");
var CourseProgress_js_1 = require("../models/CourseProgress.js");
// Capture the payment and initiate the Razorpay order
var capturePayment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courses, userId, total_amount, _i, courses_1, course_id, course, uid, error_1, options, paymentResponse, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                courses = req.body.courses;
                userId = req.user.id;
                if (courses.length === 0) {
                    return [2 /*return*/, res.json({ success: false, message: "Please Provide Course ID" })];
                }
                total_amount = 0;
                _i = 0, courses_1 = courses;
                _a.label = 1;
            case 1:
                if (!(_i < courses_1.length)) return [3 /*break*/, 6];
                course_id = courses_1[_i];
                course = void 0;
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, Course_js_1.Course.findById(course_id)];
            case 3:
                // Find the course by its ID
                course = _a.sent();
                // If the course is not found, return an error
                if (!course) {
                    return [2 /*return*/, res
                            .status(200)
                            .json({ success: false, message: "Could not find the Course" })];
                }
                uid = new mongoose_1.default.Types.ObjectId(userId);
                if (course.studentsEnroled.includes(uid)) {
                    return [2 /*return*/, res
                            .status(200)
                            .json({ success: false, message: "Student is already Enrolled" })];
                }
                // Add the price of the course to the total amount
                total_amount += course.price;
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({ success: false, message: error_1.message })];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6:
                options = {
                    amount: total_amount * 100,
                    currency: "INR",
                    receipt: Math.random(Date.now()).toString(),
                };
                _a.label = 7;
            case 7:
                _a.trys.push([7, 9, , 10]);
                return [4 /*yield*/, razorpay_js_1.instance.orders.create(options)];
            case 8:
                paymentResponse = _a.sent();
                console.log(paymentResponse);
                res.json({
                    success: true,
                    data: paymentResponse,
                });
                return [3 /*break*/, 10];
            case 9:
                error_2 = _a.sent();
                console.log(error_2);
                res
                    .status(500)
                    .json({ success: false, message: "Could not initiate order." });
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.capturePayment = capturePayment;
// verify the payment
var verifyPayment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var razorpay_order_id, razorpay_payment_id, razorpay_signature, courses, userId, body, expectedSignature;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                razorpay_order_id = (_a = req.body) === null || _a === void 0 ? void 0 : _a.razorpay_order_id;
                razorpay_payment_id = (_b = req.body) === null || _b === void 0 ? void 0 : _b.razorpay_payment_id;
                razorpay_signature = (_c = req.body) === null || _c === void 0 ? void 0 : _c.razorpay_signature;
                courses = (_d = req.body) === null || _d === void 0 ? void 0 : _d.courses;
                userId = req.user.id;
                if (!razorpay_order_id ||
                    !razorpay_payment_id ||
                    !razorpay_signature ||
                    !courses ||
                    !userId) {
                    return [2 /*return*/, res.status(200).json({ success: false, message: "Payment Failed" })];
                }
                body = razorpay_order_id + "|" + razorpay_payment_id;
                expectedSignature = crypto_1.default
                    .createHmac("sha256", process.env.RAZORPAY_SECRET)
                    .update(body.toString())
                    .digest("hex");
                if (!(expectedSignature === razorpay_signature)) return [3 /*break*/, 2];
                return [4 /*yield*/, enrollStudents(courses, userId, res)];
            case 1:
                _e.sent();
                return [2 /*return*/, res.status(200).json({ success: true, message: "Payment Verified" })];
            case 2: return [2 /*return*/, res.status(200).json({ success: false, message: "Payment Failed" })];
        }
    });
}); };
exports.verifyPayment = verifyPayment;
// Send Payment Success Email
var sendPaymentSuccessEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, orderId, paymentId, amount, userId, enrolledStudent, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, orderId = _a.orderId, paymentId = _a.paymentId, amount = _a.amount;
                userId = req.user.id;
                if (!orderId || !paymentId || !amount || !userId) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ success: false, message: "Please provide all the details" })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User_js_1.User.findById(userId)];
            case 2:
                enrolledStudent = _b.sent();
                return [4 /*yield*/, (0, mailSender_js_1.mailSender)(enrolledStudent.email, "Payment Received", (0, paymentSuccessEmail_js_1.paymentSuccessEmail)("".concat(enrolledStudent.firstName, " ").concat(enrolledStudent.lastName), amount / 100, orderId, paymentId))];
            case 3:
                _b.sent();
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                console.log("error in sending mail", error_3);
                return [2 /*return*/, res
                        .status(400)
                        .json({ success: false, message: "Could not send email" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.sendPaymentSuccessEmail = sendPaymentSuccessEmail;
// enroll the student in the courses
var enrollStudents = function (courses, userId, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, courses_2, courseId, enrolledCourse, courseProgress, enrolledStudent, emailResponse, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!courses || !userId) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "Please Provide Course ID and User ID",
                        })];
                }
                _i = 0, courses_2 = courses;
                _a.label = 1;
            case 1:
                if (!(_i < courses_2.length)) return [3 /*break*/, 9];
                courseId = courses_2[_i];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 7, , 8]);
                return [4 /*yield*/, Course_js_1.Course.findOneAndUpdate({ _id: courseId }, { $push: { studentsEnroled: userId } }, { new: true })];
            case 3:
                enrolledCourse = _a.sent();
                if (!enrolledCourse) {
                    return [2 /*return*/, res
                            .status(500)
                            .json({ success: false, error: "Course not found" })];
                }
                console.log("Updated course: ", enrolledCourse);
                return [4 /*yield*/, CourseProgress_js_1.CourseProgress.create({
                        courseID: courseId,
                        userId: userId,
                        completedVideos: [],
                    })];
            case 4:
                courseProgress = _a.sent();
                return [4 /*yield*/, User_js_1.User.findByIdAndUpdate(userId, {
                        $push: {
                            courses: courseId,
                            courseProgress: courseProgress._id,
                        },
                    }, { new: true })];
            case 5:
                enrolledStudent = _a.sent();
                console.log("Enrolled student: ", enrolledStudent);
                return [4 /*yield*/, (0, mailSender_js_1.mailSender)(enrolledStudent.email, "Successfully Enrolled into ".concat(enrolledCourse.courseName), (0, courseEnrollmentEmail_js_1.courseEnrollmentEmail)(enrolledCourse.courseName, "".concat(enrolledStudent.firstName, " ").concat(enrolledStudent.lastName)))];
            case 6:
                emailResponse = _a.sent();
                console.log("Email sent successfully: ", emailResponse.response);
                return [3 /*break*/, 8];
            case 7:
                error_4 = _a.sent();
                console.log(error_4);
                return [2 /*return*/, res.status(400).json({ success: false, error: error_4.message })];
            case 8:
                _i++;
                return [3 /*break*/, 1];
            case 9: return [2 /*return*/];
        }
    });
}); };
