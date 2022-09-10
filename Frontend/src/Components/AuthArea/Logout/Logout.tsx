import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import "./Logout.css";

function Logout(): JSX.Element {

    const navigate = useNavigate()
    
    useEffect(() => {
        try {
            authService.logout()
            // notify message
            navigate("/login")
        } catch (err: any) {
            // notify message
        }
    }, [])

    return null;
}

export default Logout;
