"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config() {
        this.port = 3000;
        this.mysql = {
            mysqlHost: "ec2-18-183-6-194.ap-northeast-1.compute.amazonaws.com",
            mysqlUser: "root",
            mysqlPassword: "eashbell6311",
            mysqlDatabase: "vacations",
        };
        this.imagesFolderPath = "./src/1-assets/images/";
        this.devMode = true;
    }
    return Config;
}());
var config = new Config();
exports.default = config;
