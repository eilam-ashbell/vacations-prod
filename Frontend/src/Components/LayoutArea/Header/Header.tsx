import "./Header.css";
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/userModel";
import { authStore } from "../../../Redux/AuthState";

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

// interface HeaderProps {
//     fullName: string;
// }

function Header(): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    const navigate = useNavigate()

    useEffect(() => {

        setUser(authStore.getState().user)

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user)
        })

        return () => unsubscribe()
        
    }, [])

    return (
        <div className="Header">
            <h3>My Vacations</h3>

            <div className="user-data">
                {
                    !user &&
                    <>
                        <div className="login-out-wrapper">
                            <button
                                className="login-btn"
                                onClick={() => navigate("/login")}>
                                Login
                            </button>
                            <button
                                className="register-btn"
                                onClick={() => navigate("/register")}>
                                Register
                            </button>
                        </div>
                    </>
                }
                {
                    user &&
                    <>
                        <Avatar  {...stringAvatar(user.firstName + " " + user.lastName)} />
                        <span>{user.firstName + " " + user.lastName}</span>
                        <button className="sign-out-btn" onClick={() => navigate("/logout")}>Logout</button>
                    </>
                }
            </div>
        </div>
    );
}

export default Header;
