"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config() {
        this.port = 3001;
        this.mysql = {
            mysqlHost: "localhost",
            mysqlUser: "root",
            mysqlPassword: "",
            mysqlDatabase: "vacations",
        };
        this.imagesFolderPath = "./src/1-assets/images/";
        this.devMode = true;
    }
    return Config;
}());
var config = new Config();
exports.default = config;
