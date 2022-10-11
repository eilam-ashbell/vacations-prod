class Config {
    public port = 3000;
    public mysql = {
        mysqlHost: "localhost",
        mysqlPort: "3306",
        mysqlUser: "root",
        mysqlPassword: "eashbell6311",
        mysqlDatabase: "vacations",
    };
    public imagesFolderPath = "/home/ubuntu/vacations-prod/Backend/build/1-assets/images/";
    public devMode = true;
}

const config = new Config();

export default config;
