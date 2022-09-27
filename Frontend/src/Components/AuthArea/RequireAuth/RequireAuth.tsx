import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import "./RequireAuth.css";

interface RequireAuthProps {
    children: JSX.Element
}

function RequireAuth(props: RequireAuthProps): JSX.Element {

    const navigate = useNavigate()
    const location = useLocation()

    return (
        authStore.getState().token ? props.children : <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
}

export default RequireAuth;
