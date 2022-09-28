"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = exports.UnauthorizedError = exports.ValidationError = exports.RouteNotFoundError = exports.IdNotFoundError = exports.ClientError = void 0;
var ClientError = /** @class */ (function () {
    function ClientError(status, message) {
        this.status = status;
        this.message = message;
    }
    return ClientError;
}());
exports.ClientError = ClientError;
var IdNotFoundError = /** @class */ (function (_super) {
    __extends(IdNotFoundError, _super);
    function IdNotFoundError(id) {
        return _super.call(this, 404, "id ".concat(id, " not found")) || this;
    }
    return IdNotFoundError;
}(ClientError));
exports.IdNotFoundError = IdNotFoundError;
var RouteNotFoundError = /** @class */ (function (_super) {
    __extends(RouteNotFoundError, _super);
    function RouteNotFoundError(route) {
        return _super.call(this, 404, "route ".concat(route, " not found")) || this;
    }
    return RouteNotFoundError;
}(ClientError));
exports.RouteNotFoundError = RouteNotFoundError;
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(message) {
        return _super.call(this, 400, message) || this;
    }
    return ValidationError;
}(ClientError));
exports.ValidationError = ValidationError;
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError(message) {
        return _super.call(this, 401, message) || this;
    }
    return UnauthorizedError;
}(ClientError));
exports.UnauthorizedError = UnauthorizedError;
var ForbiddenError = /** @class */ (function (_super) {
    __extends(ForbiddenError, _super);
    function ForbiddenError(message) {
        return _super.call(this, 403, message) || this;
    }
    return ForbiddenError;
}(ClientError));
exports.ForbiddenError = ForbiddenError;
