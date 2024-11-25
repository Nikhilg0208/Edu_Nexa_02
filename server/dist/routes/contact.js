"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var contact_us_js_1 = require("../controllers/contact-us.js");
var router = express_1.default.Router();
router.post("/contact", contact_us_js_1.contactUsController);
exports.default = router;
