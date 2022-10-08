class Config {
    public port = 3000;
    public mysql = {
        mysqlHost: "ec2-18-183-6-194.ap-northeast-1.compute.amazonaws.com",
        mysqlUser: "root",
        mysqlPassword: "eashbell6311",
        mysqlDatabase: "vacations",
    };
    public imagesFolderPath = "./src/1-assets/images/";
    public devMode = true;
}

const config = new Config();

export default config;
