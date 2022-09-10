import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/userModel";
import authService from "../../../Services/AuthService";
import "./Register.css";

function Register(): JSX.Element {

    const { register, handleSubmit, formState} = useForm<UserModel>()
    const navigate = useNavigate()

    async function send(user: UserModel) {
        try {

            await authService.register(user)
            // notify message
            navigate("/home")

        } catch (err: any) {
            // notify message
        }
    }

    return (
        <div className="Register">
            <form onSubmit={handleSubmit(send)}>
                <div className="input-label-wrapper">
                    <label htmlFor="firstName">First name</label>
                    <input type="text" id="firstName" autoComplete="given-name" {...register("firstName", {
                        required: {value: true, message: "First name is required"},
                        minLength: {value: 2, message: "First name is too short"},
                        maxLength: {value: 50, message: "First name is too long"}
                    })}/>
                    <span className="hint">{formState.errors.firstName?.message}</span>
                </div>
                <div className="input-label-wrapper">
                    <label htmlFor="lastName">Last name</label>
                    <input type="text" id="lastName" autoComplete="family-name" {...register("lastName", {
                        required: {value: true, message: "Last name is required"},
                        minLength: {value: 2, message: "Last name is too short"},
                        maxLength: {value: 50, message: "Last name is too long"}
                    })}/>
                    <span className="hint">{formState.errors.lastName?.message}</span>
                </div>
                <div className="input-label-wrapper">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" autoComplete="username" {...register("username", {
                        required: {value: true, message: "Username is required"},
                        minLength: {value: 4, message: "Username is too short"},
                        maxLength: {value: 50, message: "Username is too long"}
                    })}/>
                    <span className="hint">{formState.errors.username?.message}</span>
                </div>
                <div className="input-label-wrapper">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" autoComplete="new-password" {...register("password", {
                        required: {value: true, message: "Password is required"},
                        minLength: {value: 4, message: "Password is too short"},
                        maxLength: {value: 50, message: "Password is too long"}
                    })}/>
                    <span className="hint">{formState.errors.password?.message}</span>
                </div>
                <button>Register</button>
            </form>
        </div>
    );
}

export default Register;
