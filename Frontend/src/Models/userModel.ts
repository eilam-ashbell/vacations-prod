class UserModel {
    public userId: number;
    public userUuid: string;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public roleId: number;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.userUuid = user.userUuid;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.roleId = user.roleId;
    }
}

export default UserModel;