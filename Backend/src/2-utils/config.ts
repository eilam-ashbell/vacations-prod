class Config {
    public port = 7678;
    public mysql = {
        mysqlHost: "containers-us-west-82.railway.app",
        mysqlUser: "root",
        mysqlPassword: "y4n1qxQfZDno4rbauVj0",
        mysqlDatabase: "railway",
    };
    public imagesFolderPath = "./src/1-assets/images/";
    public devMode = true;
}

const config = new Config();

export default config;
