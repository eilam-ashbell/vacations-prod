import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/credentialsModel";
import authService from "../../../Services/AuthService";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>()
    const navigate = useNavigate()

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials)
            // notify message
            navigate("/home")

        } catch (err: any) {
            // notify message
        }
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit(send)}>
                <div className="input-label-wrapper">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" autoComplete="username" {...register("username", {
                        required: { value: true, message: "Username is required" },
                        minLength: { value: 4, message: "Username is too short" },
                        maxLength: { value: 50, message: "Username is too long" }
                    })} />
                    <span className="hint">{formState.errors.username?.message}</span>
                </div>
                <div className="input-label-wrapper">
                    <input type="password" id="password" autoComplete="current-password" {...register("password", {
                        required: { value: true, message: "Password is required" },
                        minLength: { value: 4, message: "Password is too short" },
                        maxLength: { value: 50, message: "Password is too long" }
                    })} />
                    <span className="hint">{formState.errors.password?.message}</span>
                </div>
                <button>Login</button>

            </form>
        </div>
    );
}

export default Login;
