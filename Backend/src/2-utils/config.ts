class Config {
    public port = 3000;
    public mysql = {
        mysqlHost: "127.0.0.1",
        mysqlUser: "root",
        mysqlPassword: "eashbell6311",
        mysqlDatabase: "vacations",
    };
    public imagesFolderPath = "./src/1-assets/images/";
    public devMode = true;
}

const config = new Config();

export default config;
