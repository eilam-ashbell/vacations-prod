"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../2-utils/config"));
function catchAll(err, request, response, next) {
    if (config_1.default.devMode) {
        // Log error to console:
        console.log(err);
        // Get status code:
        var statusCode = err.status ? err.status : 500;
        // Return error to frontend:
        response.status(statusCode).send(err.message);
    }
    else {
        // Get status code:
        var statusCode = err.status ? err.status : 500;
        // Return error to frontend:
        response
            .status(statusCode)
            .send("It's looks like there was an error.. Please try again");
    }
}
exports.default = catchAll;
