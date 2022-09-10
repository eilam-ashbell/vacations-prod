import { useEffect, useState } from "react";
import vacationsService from "../../../Services/VacationsService";
import VacationCard from "../VacationCard/VacationCard";
import "./Vacations.css";
import Pagination from '@mui/material/Pagination';
import VacationForUserModel from "../../../Models/vacationForUserModel";


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
        vacationsService.getAllVacations("1a79f497-94ac-4077-a0c9-20a89ba5410c").then(result => {
            setVacations(result)
        })
        
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
            vacationsToDisplay.map( v => 
                <VacationCard key={v.vacationId} vacationData={v}/>
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
