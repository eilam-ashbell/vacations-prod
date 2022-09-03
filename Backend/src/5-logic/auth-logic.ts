import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { UnauthorizedError, ValidationError } from "../4-models/client-errors";
import UserModel from "../4-models/user-model";
import auth from "../2-utils/auth";
import CredentialModel from "../4-models/crdentioals-model";

async function register(user: UserModel): Promise<string> {
    // Validate user data
    const error = user.validate();
    if (error) throw new ValidationError(error);

    // check if username already exist
    const usernameCheck = `SELECT username FROM users
    WHERE username = '${user.username}'`;
    const usernameCheckResult = await dal.execute(usernameCheck);

    // if usename exist > throw an error
    if (usernameCheckResult.length !== 0) {
        throw new ValidationError("username already exist");
    }

    // if username not exist > add user to DB
    const sql = `INSERT INTO users
                    VALUES(DEFAULT,
                    '${user.firstName}',
                    '${user.lastName}',
                    '${user.username}',
                    '${user.password}',
                    DEFAULT)`;
    const result: OkPacket = await dal.execute(sql);

    // assign userId to user object
    user.userId = result.insertId;

    // delete user's password from user object
    delete user.password;

    // generate new token fo the user
    const token = auth.generateNewToken(user);

    return token;
}

async function login(credentials: CredentialModel): Promise<string> {
    
    // Validate user data
    const error = credentials.validate();
    if (error) throw new ValidationError(error);

    // get user by username and password
    const sql = `SELECT * FROM users
                    WHERE username = '${credentials.username}' 
                    AND password = '${credentials.password}'`
    const user = await dal.execute(sql)
    if (user.length === 0) throw new UnauthorizedError("Incorrect username or password");
    
    // delete password from user object
    delete user[0].password;

    // generate new token
    const token = auth.generateNewToken(user)
    return token

}

export default {
    register,
    login,

};
