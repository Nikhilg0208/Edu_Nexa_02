"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubSection = void 0;
var mongoose_1 = require("mongoose");
var SubSectionSchema = new mongoose_1.default.Schema({
    title: { type: String },
    timeDuration: { type: String },
    description: { type: String },
    videoUrl: { type: String },
});
exports.SubSection = mongoose_1.default.model("SubSection", SubSectionSchema);
