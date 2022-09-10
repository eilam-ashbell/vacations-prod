class Config {
    public serverUrl = "http://localhost:3001/";
    public serverStaticsImages = this.serverUrl + "static/images/"
    public serverStaticsIcons = this.serverUrl + "static/icons/"
    public routes = {
        getAllVacations: this.serverUrl + "api/vacations/",
        addFollower: this.serverUrl + "/api/followers",
        removeFollower: this.serverUrl + "/api/followers",
        register: this.serverUrl + "api/auth/register",
        login: this.serverUrl + "api/auth/login",
    }
}

const config = new Config();

export default config;
