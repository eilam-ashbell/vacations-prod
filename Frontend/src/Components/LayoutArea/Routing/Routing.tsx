import { Navigate, Route, Routes } from "react-router-dom";
import About from "../../AboutArea/About/About";
import Login from "../../Auth/Login/Login";
import Register from "../../Auth/Register/Register";
import Home from "../../HomeArea/Home/Home";
import Vacations from "../../Vacations/Vacations/Vacations";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/home" element={<Vacations />} />
                <Route path="/about" element={<About />} />
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default Routing;
