"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSecondsToDuration = void 0;
var convertSecondsToDuration = function (totalSeconds) {
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = Math.floor((totalSeconds % 3600) % 60);
    if (hours > 0) {
        return "".concat(hours, "h ").concat(minutes, "m");
    }
    else if (minutes > 0) {
        return "".concat(minutes, "m ").concat(seconds, "s");
    }
    else {
        return "".concat(seconds, "s");
    }
};
exports.convertSecondsToDuration = convertSecondsToDuration;
