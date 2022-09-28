"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var UserModel = /** @class */ (function () {
    function UserModel(user) {
        this.userId = user.userId;
        this.userUuid = user.userUuid;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.roleId = user.roleId;
    }
    UserModel.prototype.validate = function () {
        var _a;
        var result = UserModel.validationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    UserModel.validationSchema = joi_1.default.object({
        userId: joi_1.default.number().optional().positive().integer(),
        userUuid: joi_1.default.string().optional().max(50),
        firstName: joi_1.default.string().required().min(2).max(50),
        lastName: joi_1.default.string().required().min(2).max(50),
        username: joi_1.default.string().required().min(4).max(50),
        password: joi_1.default.string().required().length(128),
        roleId: joi_1.default.number().optional().positive().integer(),
    });
    return UserModel;
}());
exports.default = UserModel;
