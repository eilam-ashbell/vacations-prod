"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config() {
        this.port = 3000;
        this.mysql = {
            mysqlHost: "localhost",
            mysqlPort: "3306",
            mysqlUser: "root",
            mysqlPassword: "eashbell6311",
            mysqlDatabase: "vacations",
        };
        this.imagesFolderPath = __dirname + "../1-assets/images/";
        this.devMode = true;
    }
    return Config;
}());
var config = new Config();
exports.default = config;
