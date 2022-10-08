"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var salt = "We-Want-A-Vacation";
function hash(plainText) {
    // if there is no text > don't do anything
    if (!plainText)
        return null;
    // Salt and Hash the input string and return it
    return crypto_1.default.createHmac("sha512", salt).update(plainText).digest("hex");
}
exports.default = hash;
