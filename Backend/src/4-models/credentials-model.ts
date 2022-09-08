import Joi from "joi";

class CredentialModel {
    public username: string;
    public password: string;

    public constructor(user: CredentialModel) {
        this.username = user.username;
        this.password = user.password;
    }

    private static validationSchema = Joi.object({
        username: Joi.string().required().min(4).max(50),
        password: Joi.string().required().length(128),
    });

    public validate(): string {
        const result = CredentialModel.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default CredentialModel;
