import { useEffect, useState } from "react";
import vacationsService from "../../../Services/VacationsService";
import VacationCard from "../VacationCard/VacationCard";
import "./Vacations.css";
import Pagination from '@mui/material/Pagination';
import VacationForUserModel from "../../../Models/vacationForUserModel";
import jwtDecode from "jwt-decode";
import { authStore } from "../../../Redux/AuthState";
import UserModel from "../../../Models/userModel";
import { vacationsStore } from "../../../Redux/VacationsState";


function Vacations(): JSX.Element {

    const pageSize = 5
    const [vacations, setVacations] = useState<VacationForUserModel[]>([])
    const [vacationsToDisplay, setVacationsToDisplay] = useState<VacationForUserModel[]>([])
    const [pagination, setPagination] = useState({
        count: 0,
        from: 0,
        to: pageSize
    })


    useEffect(() => {
        const container: { user: UserModel } = jwtDecode(authStore.getState().token)
        const user = container.user
        vacationsService.getAllVacations(user.userUuid).then(result => {
            setVacations(result)
        })

        // const unsubscribe = vacationsStore.subscribe(() => {
        //     setVacations(vacationsStore.getState().vacations)            
        // })


    }, [])

    useEffect(() => {
        const vacationsLength = vacations.length
        const vacationsOnPage = vacations.slice(pagination.from, pagination.to)
        setPagination({ ...pagination, count: vacationsLength })
        setVacationsToDisplay(vacationsOnPage)
    }, [vacations, pagination.from, pagination.to])

    function handlePageChange(event: React.ChangeEvent<unknown>, page: number): void {
        const from = (page - 1) * pageSize;
        const to = (page - 1) * pageSize + pageSize;
        setPagination({ ...pagination, from: from, to: to })
    }

    return (
        <div className="Vacations">
            <div className="vacations-wrapper">
                {
                    vacationsToDisplay.map(v =>
                        <VacationCard key={v.vacationId} vacationData={v} />
                    )
                }

            </div>
            <div className="pagination-wrapper">
                <Pagination
                    count={Math.ceil(vacations.length / pageSize)}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default Vacations;
