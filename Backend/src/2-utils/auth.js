"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secretKey = "weAreOnVacation!";
function generateNewToken(user) {
    // Create container object to insert inside the token
    var container = { user: user };
    // Generate new token
    var token = jsonwebtoken_1.default.sign(container, secretKey, { expiresIn: "1h" });
    return token;
}
function verifyToken(authHeader) {
    return new Promise(function (resolve, reject) {
        try {
            // if there is no auth header > verify fail
            if (!authHeader) {
                resolve(false);
                return;
            }
            // extract the token from the header
            var token = authHeader.substring(7);
            // If the header is empty > verify fail
            if (!token) {
                resolve(false);
                return;
            }
            // Verify token
            jsonwebtoken_1.default.verify(token, secretKey, function (err) {
                if (err) {
                    resolve(false);
                    return;
                }
            });
            // if token is valid
            resolve(true);
        }
        catch (err) {
            reject(err);
        }
    });
}
function getUserRoleIdFromToken(authHeader) {
    // extract token
    var token = authHeader.substring(7);
    // get user container from token
    var container = jsonwebtoken_1.default.decode(token);
    // get user data from container
    var user = container.user;
    // get roleId of user
    var role = user.roleId;
    return role;
}
exports.default = {
    generateNewToken: generateNewToken,
    verifyToken: verifyToken,
    getUserRoleIdFromToken: getUserRoleIdFromToken,
};
