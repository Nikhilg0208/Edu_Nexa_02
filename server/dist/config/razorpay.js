"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = void 0;
var razorpay_1 = require("razorpay");
exports.instance = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});
