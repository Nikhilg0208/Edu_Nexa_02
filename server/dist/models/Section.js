"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Section = void 0;
var mongoose_1 = require("mongoose");
// Define the Section schema
var sectionSchema = new mongoose_1.default.Schema({
    sectionName: {
        type: String,
    },
    subSection: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            required: true,
            ref: "SubSection",
        },
    ],
});
// Export the Section model
exports.Section = mongoose_1.default.model("Section", sectionSchema);
