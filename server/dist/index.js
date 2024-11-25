"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_js_1 = require("./routes/user.js");
var contact_js_1 = require("./routes/contact.js");
var course_js_1 = require("./routes/course.js");
var payments_js_1 = require("./routes/payments.js");
var profile_js_1 = require("./routes/profile.js");
var cookie_parser_1 = require("cookie-parser");
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var express_fileupload_1 = require("express-fileupload");
var cloudinary_js_1 = require("./config/cloudinary.js");
var database_js_1 = require("./config/database.js");
var app = (0, express_1.default)();
dotenv_1.default.config();
var PORT = process.env.PORT || 4000;
dotenv_1.default.config();
(0, database_js_1.connect)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
(0, cloudinary_js_1.cloudinaryConnect)();
app.use("/api/v1/auth", user_js_1.default);
app.use("/api/v1/profile", profile_js_1.default);
app.use("/api/v1/course", course_js_1.default);
app.use("/api/v1/payment", payments_js_1.default);
app.use("/api/v1/reach", contact_js_1.default);
app.get("/", function (req, res) {
    return res.json({
        success: true,
        message: "Your server is up and running ...",
    });
});
app.listen(PORT, function () {
    console.log("App is listening at ".concat(PORT));
});
