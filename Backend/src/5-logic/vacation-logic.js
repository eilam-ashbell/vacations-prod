"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dal_1 = __importDefault(require("../2-utils/dal"));
var client_errors_1 = require("../4-models/client-errors");
var uuid_1 = require("uuid");
var safe_delete_1 = __importDefault(require("../2-utils/safe-delete"));
var config_1 = __importDefault(require("../2-utils/config"));
var follower_model_1 = __importDefault(require("../4-models/follower-model"));
// GET all vacations data
function getAllVacations() {
    return __awaiter(this, void 0, void 0, function () {
        var sql, vacations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT * FROM vacations";
                    return [4 /*yield*/, dal_1.default.execute(sql, [])];
                case 1:
                    vacations = _a.sent();
                    return [2 /*return*/, vacations];
            }
        });
    });
}
// GET all vacation for a specific user with followers data
function getAllVacationsForUser(userUuid) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, vacations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT DISTINCT V.*, EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = (SELECT userId FROM users WHERE userUuid = ?)) AS isFollowing, COUNT(F.userId) AS followersCount FROM vacations as V LEFT JOIN followers as F ON V.vacationId = F.vacationId GROUP BY vacationId ORDER BY startDate ASC";
                    return [4 /*yield*/, dal_1.default.execute(sql, [userUuid])];
                case 1:
                    vacations = _a.sent();
                    return [2 /*return*/, vacations];
            }
        });
    });
}
// GET a vacation data
function getVacation(vacationId) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, vacation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT * FROM vacations WHERE vacationId = ?";
                    return [4 /*yield*/, dal_1.default.execute(sql, [vacationId])];
                case 1:
                    vacation = _a.sent();
                    return [2 /*return*/, vacation];
            }
        });
    });
}
// Add a vacation
function addVacation(vacation) {
    return __awaiter(this, void 0, void 0, function () {
        var error, extension, sql, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    error = vacation.validate();
                    if (error)
                        throw new client_errors_1.ValidationError(error);
                    if (!vacation.image) return [3 /*break*/, 2];
                    extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
                    vacation.imageName = (0, uuid_1.v4)() + extension; // Save new image name in vacation object
                    return [4 /*yield*/, vacation.image.mv(config_1.default.imagesFolderPath + vacation.imageName)];
                case 1:
                    _a.sent(); // Move image to images folder
                    delete vacation.image; // Delete image before saving
                    _a.label = 2;
                case 2:
                    sql = "INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)";
                    return [4 /*yield*/, dal_1.default.execute(sql, [
                            vacation.destination,
                            vacation.description,
                            vacation.imageName,
                            vacation.startDate,
                            vacation.endDate,
                            vacation.price,
                        ])];
                case 3:
                    result = _a.sent();
                    vacation.vacationId = result.insertId;
                    return [2 /*return*/, vacation];
            }
        });
    });
}
// Update a vacation
function updateVacation(vacation) {
    return __awaiter(this, void 0, void 0, function () {
        var error, extension, sql, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    error = vacation.validate();
                    if (error)
                        throw new client_errors_1.ValidationError(error);
                    if (!vacation.image) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, safe_delete_1.default)(config_1.default.imagesFolderPath + vacation.imageName)];
                case 1:
                    _a.sent(); // Delete the previous image
                    extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
                    vacation.imageName = (0, uuid_1.v4)() + extension;
                    return [4 /*yield*/, vacation.image.mv(config_1.default.imagesFolderPath + vacation.imageName)];
                case 2:
                    _a.sent(); // Move image to images folder
                    delete vacation.image; // Delete image before saving
                    _a.label = 3;
                case 3:
                    sql = "UPDATE vacations SET destination = ?, description = ?, imageName = ?, startDate = ?, endDate = ?, price = ? WHERE vacations.vacationId = ?";
                    return [4 /*yield*/, dal_1.default.execute(sql, [
                            vacation.destination,
                            vacation.description,
                            vacation.imageName,
                            vacation.startDate,
                            vacation.endDate,
                            vacation.price,
                            vacation.vacationId,
                        ])];
                case 4:
                    result = _a.sent();
                    if (result.affectedRows === 0)
                        throw new client_errors_1.IdNotFoundError(vacation.vacationId);
                    return [2 /*return*/, vacation];
            }
        });
    });
}
// Delete a vacation
function deleteVacation(vacationId) {
    return __awaiter(this, void 0, void 0, function () {
        var findImageName, imageNameResult, imageNameToDelete, sql, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    findImageName = "SELECT imageName FROM vacations WHERE vacationId = ?";
                    return [4 /*yield*/, dal_1.default.execute(findImageName, [vacationId])];
                case 1:
                    imageNameResult = _a.sent();
                    imageNameToDelete = imageNameResult[0].imageName;
                    // Delete image from HD
                    return [4 /*yield*/, (0, safe_delete_1.default)(config_1.default.imagesFolderPath + imageNameToDelete)];
                case 2:
                    // Delete image from HD
                    _a.sent(); // Delete the previous image
                    sql = "DELETE FROM vacations WHERE vacationId = ?";
                    return [4 /*yield*/, dal_1.default.execute(sql, [vacationId])];
                case 3:
                    result = _a.sent();
                    if (result.affectedRows === 0)
                        throw new client_errors_1.IdNotFoundError(vacationId);
                    return [2 /*return*/];
            }
        });
    });
}
// Assign follow for a vacation
function followVacation(vacationId, userUuid) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, follower;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "INSERT INTO followers VALUES ((SELECT userId FROM users WHERE userUuid = ?), ? )";
                    return [4 /*yield*/, dal_1.default.execute(sql, [
                            userUuid,
                            vacationId,
                            userUuid,
                            vacationId,
                        ])];
                case 1:
                    _a.sent();
                    follower = new follower_model_1.default({ "userUuid": userUuid, "vacationId": vacationId });
                    return [2 /*return*/, follower];
            }
        });
    });
}
// Assign un-follow for a vacation
function unFollowVacation(vacationId, userUuid) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "DELETE FROM followers WHERE (userId = (SELECT userId FROM users WHERE userUuid = ?) AND vacationId = ? )";
                    return [4 /*yield*/, dal_1.default.execute(sql, [userUuid, vacationId])];
                case 1:
                    result = _a.sent();
                    if (result.affectedRows === 0)
                        throw new client_errors_1.ClientError(404, "following not found");
                    return [2 /*return*/];
            }
        });
    });
}
// GET vacations data for report
function getVacationsDataToReport() {
    return __awaiter(this, void 0, void 0, function () {
        var sql, vacationsData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT V.vacationId, V.destination, COUNT(F.userId) AS followersCount FROM vacations as V LEFT JOIN followers as F ON V.vacationId = F.vacationId GROUP BY vacationId";
                    return [4 /*yield*/, dal_1.default.execute(sql, [])];
                case 1:
                    vacationsData = _a.sent();
                    return [2 /*return*/, vacationsData];
            }
        });
    });
}
exports.default = {
    getAllVacations: getAllVacations,
    getAllVacationsForUser: getAllVacationsForUser,
    getVacation: getVacation,
    addVacation: addVacation,
    updateVacation: updateVacation,
    deleteVacation: deleteVacation,
    followVacation: followVacation,
    unFollowVacation: unFollowVacation,
    getVacationsDataToReport: getVacationsDataToReport,
};
