class UserModel {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public userName: string;
    public password: string;
    public roleId: number;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.userName = user.userName;
        this.password = user.password;
        this.roleId = user.roleId;
    }
}

export default UserModel;
