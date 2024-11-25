"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var payments_js_1 = require("../controllers/payments.js");
var paymentRoutes = express_1.default.Router();
paymentRoutes.post("/capturePayment", payments_js_1.capturePayment);
// router.post("/verifySignature", verifySignature)
exports.default = paymentRoutes;
