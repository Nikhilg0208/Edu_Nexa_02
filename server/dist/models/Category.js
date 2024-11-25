"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
var mongoose_1 = require("mongoose");
// Define the Tags schema
var categorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: { type: String },
    courses: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
});
// Export the Tags model
exports.Category = mongoose_1.default.model("Category", categorySchema);
