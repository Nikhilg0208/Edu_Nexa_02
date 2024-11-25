"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseProgress = void 0;
var mongoose_1 = require("mongoose");
var courseProgressSchema = new mongoose_1.default.Schema({
    courseID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Course",
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
    },
    completedVideos: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "SubSection",
        },
    ],
});
exports.CourseProgress = mongoose_1.default.model("CourseProgress", courseProgressSchema);
