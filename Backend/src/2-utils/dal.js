"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var config_1 = __importDefault(require("./config"));
// Creating a connection object:
var connection = mysql_1.default.createPool({
    host: config_1.default.mysql.mysqlHost,
    user: config_1.default.mysql.mysqlUser,
    password: config_1.default.mysql.mysqlPassword,
    database: config_1.default.mysql.mysqlDatabase
});
console.log("We're connected to MySQL");
function execute(sql, values) {
    return new Promise(function (resolve, reject) {
        // Execute the sql on MySQL:
        connection.query(sql, values, function (err, result) {
            // If there is an error: 
            if (err) {
                reject(err);
                return;
            }
            // No error - report data: 
            resolve(result);
        });
    });
}
exports.default = {
    execute: execute
};
