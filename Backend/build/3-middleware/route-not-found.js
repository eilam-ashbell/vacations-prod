"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_errors_1 = require("../4-models/client-errors");
function routeNotFound(request, response, next) {
    var err = new client_errors_1.RouteNotFoundError(request.originalUrl);
    next(err); // Jump to catch all middleware.
}
exports.default = routeNotFound;
