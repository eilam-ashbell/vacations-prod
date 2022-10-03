class Config {
    public port = 80;
    public mysql = {
        mysqlHost: "localhost",
        mysqlUser: "root",
        mysqlPassword: "",
        mysqlDatabase: "vacations",
    };
    public imagesFolderPath = "./src/1-assets/images/";
    public devMode = true;
}

const config = new Config();

export default config;
