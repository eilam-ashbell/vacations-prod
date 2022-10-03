class Config {
    public serverUrl = "https://43.206.149.169/";
    public serverStaticsImages = this.serverUrl + "static/images/"
    public serverStaticsIcons = this.serverUrl + "static/icons/"
    public routes = {
        getAllVacations: this.serverUrl + "api/vacations/",
        getVacation: this.serverUrl + "api/vacation/",
        addFollower: this.serverUrl + "api/followers",
        removeFollower: this.serverUrl + "api/followers",
        register: this.serverUrl + "api/auth/register",
        login: this.serverUrl + "api/auth/login",
        deleteVacation: this.serverUrl + "api/vacations/",
        updateVacation: this.serverUrl + "api/vacations/",
        addVacation: this.serverUrl + "api/vacation/",
        getReportData: this.serverUrl + "api/report",
    }
    public numOfVacationsOnPage = 9
}

const config = new Config();

export default config;
