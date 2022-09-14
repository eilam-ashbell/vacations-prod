import { Navigate, Route, Routes } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import Vacations from "../../VacationsArea/Vacations/Vacations";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                {/* Vacations page */}
                <Route path="/home" element={<Vacations />} />
                <Route path="/" element={authStore.getState().token ? <Navigate to="/home" /> : <Navigate to="/login" />} />

                {/* Register */}
                <Route path="/register" element={<Register />} />

                {/* Login */}
                <Route path="/login" element={<Login />} />

                {/* Logout */}
                <Route path="/logout" element={<Logout />} />

                {/* Edit vacation form for admin */}
                <Route path="/edit/:vacationId" element={<EditVacation />} />

                {/* Add vacation form for admin */}
                <Route path="/add" element={<AddVacation />} />

                {/* 404 page */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default Routing;
