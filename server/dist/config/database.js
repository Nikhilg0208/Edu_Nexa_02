"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
var mongoose_1 = require("mongoose");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var MONGODB_URL = process.env.MONGODB_URL;
var connect = function () {
    mongoose_1.default
        .connect(MONGODB_URL, {})
        .then(function () { return console.log("DB Connection Successful"); })
        .catch(function (err) {
        console.error("DB Connection Failed");
        console.error(err);
        process.exit(1);
    });
};
exports.connect = connect;
