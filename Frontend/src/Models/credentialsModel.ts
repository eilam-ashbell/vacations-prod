class CredentialModel {
    public username: string;
    public password: string;

    public constructor(user: CredentialModel) {
        this.username = user.username;
        this.password = user.password;
    }
}

export default CredentialModel;
