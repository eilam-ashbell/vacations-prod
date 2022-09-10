import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { UnauthorizedError, ValidationError } from "../4-models/client-errors";
import UserModel from "../4-models/user-model";
import auth from "../2-utils/auth";
import CredentialModel from "../4-models/credentials-model";
import hash from "../2-utils/cyber";
import { v4 as uuid } from "uuid";

async function register(user: UserModel): Promise<string> {
    // Hash user password
    user.password = hash(user.password);

    // Assign UUID to user
    user.userUuid = uuid();

    // Assign roleId to user
    user.roleId = 2;

    // Validate user data
    const error = user.validate();
    if (error) throw new ValidationError(error);

    // Insert new user data to DB if username is not already exist 
    const sql =
        "INSERT INTO users(userUuid, firstName, lastName, username, password) SELECT * FROM (SELECT ? as userUuid, ? as firstName, ? as lastName, ? as username, ? as password) AS new_value WHERE NOT EXISTS ( SELECT username FROM users WHERE username = ? ) LIMIT 1;";
    const result: OkPacket = await dal.execute(sql, [ user.userUuid, user.firstName, user.lastName, user.username, user.password, user.username, ]);
    // if username already exist > throw new error
    if (result.affectedRows === 0)
        throw new ValidationError("username is already exist, please choose a different one");

    // Delete user's password from user object
    delete user.password;
    delete user.userId;

    // Generate new token fo the user
    const token = auth.generateNewToken(user);

    return token;
}

async function login(credentials: CredentialModel): Promise<string> {

    // Hash user password
    credentials.password = hash(credentials.password);
    console.log(credentials);
    
    // Validate user data
    const error = credentials.validate();
    if (error) throw new ValidationError(error);

    // Get user by username and password
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";

    const users = await dal.execute(sql, [
        credentials.username,
        credentials.password,
    ]);
    console.log(users);
    
    if (users.length === 0)
        throw new UnauthorizedError("Incorrect username or password");

    // Extract the user from result
    const user = users[0];

    // Delete password from user object
    delete user.password;
    delete user.userId;

    // Generate new token
    const token = auth.generateNewToken(user);
    return token;
}

export default {
    register,
    login,
};
