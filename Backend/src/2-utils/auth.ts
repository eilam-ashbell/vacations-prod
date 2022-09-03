import { JsonWebTokenError } from "jsonwebtoken";
import UserModel from "../4-models/user-model";
import jwt from "jsonwebtoken";
import RoleModel from "../4-models/role-model";

const secretKey = "weAreOnVacation!";

function generateNewToken(user: UserModel): string {
    // Create object to insert inside the token
    const container = { user };

    // Generate new token
    const token = jwt.sign(container, secretKey, { expiresIn: "1h" });

    return token;
}

function verifyToken(authHeader: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {
            // if there is no auth header > verify fail
            if (!authHeader) {
                resolve(false);
                return;
            }

            // extract the token from the header
            const token = authHeader.substring(7);
            if (!token) {
                resolve(false);
                return;
            }

            // Verify token
            jwt.verify(token, secretKey, (err) => {
                if (err) {
                    resolve(false);
                    return;
                }
            });

            // if token is valid
            resolve(true);
        } catch (err: any) {
            reject(err);
        }
    });

}
function getUserRoleIdFromToken(authHeader: string): number {

    // extract token
    const token = authHeader.substring(7);

    // get user container from token
    const container = jwt.decode(token) as {user: UserModel};

    // get user data from container
    const user = container.user[0];
    
    // get roleId of user
    const role = user.roleId;
    
    return role;
}

export default {
    generateNewToken,
    verifyToken,
    getUserRoleIdFromToken,
};
