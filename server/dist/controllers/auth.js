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
exports.sum = exports.changePassword = exports.sendotp = exports.login = exports.signup = void 0;
var bcrypt_1 = require("bcrypt");
var User_js_1 = require("../models/User.js");
var OTP_js_1 = require("../models/OTP.js");
var jsonwebtoken_1 = require("jsonwebtoken");
var otp_generator_1 = require("otp-generator");
var mailSender_js_1 = require("../utils/mailSender.js");
var passwordUpdate_js_1 = require("../mail/templates/passwordUpdate.js");
var Profile_js_1 = require("../models/Profile.js");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
// Signup Controller for Registering USers
var signup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp, existingUser, response, hashedPassword, approved, profileDetails, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword, accountType = _a.accountType, contactNumber = _a.contactNumber, otp = _a.otp;
                // Check if All Details are there or not
                if (!firstName ||
                    !lastName ||
                    !email ||
                    !password ||
                    !confirmPassword ||
                    !otp) {
                    return [2 /*return*/, res.status(403).send({
                            success: false,
                            message: "All Fields are required",
                        })];
                }
                // Check if password and confirm password match
                if (password !== confirmPassword) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "Password and Confirm Password do not match. Please try again.",
                        })];
                }
                return [4 /*yield*/, User_js_1.User.findOne({ email: email })];
            case 1:
                existingUser = _b.sent();
                if (existingUser) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "User already exists. Please sign in to continue.",
                        })];
                }
                return [4 /*yield*/, OTP_js_1.OTP.find({ email: email }).sort({ createdAt: -1 }).limit(1)];
            case 2:
                response = _b.sent();
                // console.log(response)
                if (response.length === 0) {
                    // OTP not found for the email
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "The OTP is not valid",
                        })];
                }
                else if (otp !== response[0].otp) {
                    // Invalid OTP
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "The OTP is not valid",
                        })];
                }
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 3:
                hashedPassword = _b.sent();
                approved = "";
                approved === "Instructor" ? (approved = false) : (approved = true);
                return [4 /*yield*/, Profile_js_1.Profile.create({
                        gender: null,
                        dateOfBirth: null,
                        about: null,
                        contactNumber: null,
                    })];
            case 4:
                profileDetails = _b.sent();
                return [4 /*yield*/, User_js_1.User.create({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        contactNumber: contactNumber,
                        password: hashedPassword,
                        accountType: accountType,
                        approved: approved,
                        additionalDetails: profileDetails._id,
                        image: "",
                    })];
            case 5:
                user = _b.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        user: user,
                        message: "User registered successfully",
                    })];
            case 6:
                error_1 = _b.sent();
                console.error(error_1);
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        message: "User cannot be registered. Please try again.",
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.signup = signup;
// Login controller for authenticating users
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, token, options, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                // Check if email or password is missing
                if (!email || !password) {
                    // Return 400 Bad Request status code with error message
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "Please Fill up All the Required Fields",
                        })];
                }
                return [4 /*yield*/, User_js_1.User.findOne({ email: email }).populate("additionalDetails")];
            case 1:
                user = _b.sent();
                // If user not found with provided email
                if (!user) {
                    // Return 401 Unauthorized status code with error message
                    return [2 /*return*/, res.status(401).json({
                            success: false,
                            message: "User is not Registered with Us Please SignUp to Continue",
                        })];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 2:
                // Generate JWT token and Compare Password
                if (_b.sent()) {
                    token = jsonwebtoken_1.default.sign({ email: user.email, id: user._id, role: user.role }, process.env.JWT_SECRET, {
                        expiresIn: "24h",
                    });
                    // Save token to user document in database
                    user.token = token;
                    user.password = undefined;
                    options = {
                        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                        httpOnly: true,
                    };
                    res.cookie("token", token, options).status(200).json({
                        success: true,
                        token: token,
                        user: user,
                        message: "User Login Success",
                    });
                }
                else {
                    return [2 /*return*/, res.status(401).json({
                            success: false,
                            message: "Password is incorrect",
                        })];
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.error(error_2);
                // Return 500 Internal Server Error status code with error message
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        message: "Login Failure Please Try Again",
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
// Send OTP For Email Verification
var sendotp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, checkUserPresent, otp, result, otpPayload, otpBody, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                email = req.body.email;
                return [4 /*yield*/, User_js_1.User.findOne({ email: email })];
            case 1:
                checkUserPresent = _a.sent();
                // to be used in case of signup
                // If user found with provided email
                if (checkUserPresent) {
                    // Return 401 Unauthorized status code with error message
                    return [2 /*return*/, res.status(401).json({
                            success: false,
                            message: "User is Already Registered",
                        })];
                }
                otp = otp_generator_1.default.generate(6, {
                    upperCaseAlphabets: false,
                    lowerCaseAlphabets: false,
                    specialChars: false,
                });
                return [4 /*yield*/, OTP_js_1.OTP.findOne({ otp: otp })];
            case 2:
                result = _a.sent();
                console.log("Result is Generate OTP Func");
                console.log("OTP", otp);
                console.log("Result", result);
                while (result) {
                    otp = otp_generator_1.default.generate(6, {
                        upperCaseAlphabets: false,
                    });
                }
                otpPayload = { email: email, otp: otp };
                return [4 /*yield*/, OTP_js_1.OTP.create(otpPayload)];
            case 3:
                otpBody = _a.sent();
                console.log("OTP Body", otpBody);
                res.status(200).json({
                    success: true,
                    message: "OTP Sent Successfully",
                    otp: otp,
                });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                console.log(error_3.message);
                return [2 /*return*/, res.status(500).json({ success: false, error: error_3.message })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.sendotp = sendotp;
// Controller for Changing Password
var changePassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userDetails, _a, oldPassword, newPassword, isPasswordMatch, encryptedPassword, updatedUserDetails, emailResponse, error_4, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 9, , 10]);
                return [4 /*yield*/, User_js_1.User.findById(req.user.id)];
            case 1:
                userDetails = _b.sent();
                _a = req.body, oldPassword = _a.oldPassword, newPassword = _a.newPassword;
                return [4 /*yield*/, bcrypt_1.default.compare(oldPassword, userDetails.password)];
            case 2:
                isPasswordMatch = _b.sent();
                if (!isPasswordMatch) {
                    // If old password does not match, return a 401 (Unauthorized) error
                    return [2 /*return*/, res
                            .status(401)
                            .json({ success: false, message: "The password is incorrect" })];
                }
                return [4 /*yield*/, bcrypt_1.default.hash(newPassword, 10)];
            case 3:
                encryptedPassword = _b.sent();
                return [4 /*yield*/, User_js_1.User.findByIdAndUpdate(req.user.id, { password: encryptedPassword }, { new: true })];
            case 4:
                updatedUserDetails = _b.sent();
                _b.label = 5;
            case 5:
                _b.trys.push([5, 7, , 8]);
                return [4 /*yield*/, (0, mailSender_js_1.mailSender)(updatedUserDetails.email, "Password for your account has been updated", (0, passwordUpdate_js_1.passwordUpdated)(updatedUserDetails.email, "Password updated successfully for ".concat(updatedUserDetails.firstName, " ").concat(updatedUserDetails.lastName)))];
            case 6:
                emailResponse = _b.sent();
                console.log("Email sent successfully:", emailResponse.response);
                return [3 /*break*/, 8];
            case 7:
                error_4 = _b.sent();
                // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
                console.error("Error occurred while sending email:", error_4);
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        message: "Error occurred while sending email",
                        error: error_4.message,
                    })];
            case 8: 
            // Return success response
            return [2 /*return*/, res
                    .status(200)
                    .json({ success: true, message: "Password updated successfully" })];
            case 9:
                error_5 = _b.sent();
                // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
                console.error("Error occurred while updating password:", error_5);
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        message: "Error occurred while updating password",
                        error: error_5.message,
                    })];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.changePassword = changePassword;
var sum = function (a, b) {
    return a + b;
};
exports.sum = sum;
