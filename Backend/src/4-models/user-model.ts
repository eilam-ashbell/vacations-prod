import Joi from "joi";

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

    private static validationSchema = Joi.object({
        userId: Joi.number().optional().positive().integer(),
        userUuid: Joi.string().optional().max(50),
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        username: Joi.string().required().min(4).max(50),
        password: Joi.string().required().length(128),
        roleId: Joi.number().optional().positive().integer(),
    });

    public validate(): string {
        const result = UserModel.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default UserModel;
