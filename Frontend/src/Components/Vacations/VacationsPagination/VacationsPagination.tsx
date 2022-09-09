import "./VacationsPagination.css";
import Pagination from '@mui/material/Pagination';
import { useEffect } from "react";

const pageSize = 5;

interface VacationsPaginationProps {
    count: number;
}


function VacationsPagination(props: VacationsPaginationProps): JSX.Element {

    

    return (
        <div className="Pagination">
			<Pagination 
            count={props.count} 
            />
        </div>
    );
}

export default VacationsPagination;
