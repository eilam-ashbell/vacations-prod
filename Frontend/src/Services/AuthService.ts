import axios from "axios";
import CredentialsModel from "../Models/credentialsModel";
import UserModel from "../Models/userModel";
import { AuthAction, AuthActionType, authStore } from "../Redux/AuthState";
import config from "../Utils/Config";

class AuthService {
    // Register
    public async register(user: UserModel): Promise<void> {
        // Send user object to server, get back token
        const response = await axios.post<string>(config.routes.register, user);

        // Extract token
        const token = response.data;

        // Save token in AuthState
        const action: AuthAction = {
            type: AuthActionType.Register,
            payload: token,
        };
        authStore.dispatch(action);
    }

    // Login
    public async login(credentials: CredentialsModel): Promise<void> {
        // Send credentials to server
        const response = await axios.post<string>(
            config.routes.login,
            credentials
        );

        // Extract token
        const token = response.data;

        // Save token in AuthState
        const action: AuthAction = {
            type: AuthActionType.Login,
            payload: token,
        };
        authStore.dispatch(action);
    }

    // Logout
    public logout(): void {
        // Delete token from AuthState
        const action: AuthAction = {
            type: AuthActionType.Logout,
        };
        authStore.dispatch(action);
    }
}

const authService = new AuthService();
export default authService;
