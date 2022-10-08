"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from "express";
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var catch_all_1 = __importDefault(require("./3-middleware/catch-all"));
var route_not_found_1 = __importDefault(require("./3-middleware/route-not-found"));
var vacation_controller_1 = __importDefault(require("./6-controllers/vacation-controller"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var auth_controller_1 = __importDefault(require("./6-controllers/auth-controller"));
var sanitize_1 = __importDefault(require("./3-middleware/sanitize"));
// Create server object
var server = (0, express_1.default)();
// // Securing DoS attacks
// server.use("/api/", expressRateLimit({
//     windowMs: 100, // Window time
//     max: 1, // Max request per window time
//     message: "Too many requests" // Message to alert when detecting more then max requests over window time
// }))
// Allow cors
server.use((0, cors_1.default)());
// Read the body json object
server.use(express_1.default.json());
server.use('/static', express_1.default.static('src/1-assets'));
// Sanitize tags from requests
server.use(sanitize_1.default);
// Auth
server.use("/", auth_controller_1.default);
// Handle files
server.use((0, express_fileupload_1.default)());
// Routes requests to controllers
server.use("/", vacation_controller_1.default);
// Routes requests to controllers
server.use("/", auth_controller_1.default);
// Route not found
server.use("*", route_not_found_1.default);
// Catch all middleware
server.use(catch_all_1.default);
server.listen(process.env.PORT, function () { return console.log('Listening on http://localhost: + ${process.env.PORT}'); });
