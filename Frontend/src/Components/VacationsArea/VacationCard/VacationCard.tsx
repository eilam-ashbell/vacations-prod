import config from "../../../Utils/Config";
import FollowBtn from "../FollowBtn/FollowBtn";
import "./VacationCard.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import VacationForUserModel from "../../../Models/vacationForUserModel";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material";
import { color } from "@mui/system";
import { VacationsAction, VacationsActionType, vacationsStore } from "../../../Redux/VacationsState";
import { authStore } from "../../../Redux/AuthState";

interface VacationCardProps {
    vacationData: VacationForUserModel;
}

function formatDate(date: string): string {
    const dateObj = new Date(date)
    const formattedDate = dateObj.toLocaleDateString("he-IL");
    return formattedDate
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const bgImageStyle = {
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(255, 255, 255, 0)60%), url(${config.serverStaticsImages + props.vacationData.imageName})`
    }

    const adminBtnStyle = {
        backgroundColor: "white",
        color: "#9c9496",
        boxShadow: "none",
        fontSize: 12,
        textTransform: "capitalize",
        fontFamily: 'roboto',
        borderRadius: "100px",
        '&:hover': {
            backgroundColor: '#9c9496',
            color: '#fff',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
    }

    const adminBtnIconsStyle = {
        width: "14px",
        transform: "translateY(-1px)"
    }

    function handleDelete() {
        const action: VacationsAction = {
            type: VacationsActionType.DeleteVacation,
            payload: props.vacationData.vacationId
        }
        vacationsStore.dispatch(action)
    }

    return (
        <div className="VacationCard">
            <div
                className="bg-image"
                style={bgImageStyle}
            >
                <FollowBtn vacation={props.vacationData} />
                {
                    authStore.getState().user.roleId === 1 &&
                    <div className="admin-wrapper">
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<DeleteIcon sx={adminBtnIconsStyle} />}
                            sx={adminBtnStyle}
                            onClick={handleDelete}>
                            Delete
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<EditIcon fontSize="small" sx={adminBtnIconsStyle} />}
                            sx={adminBtnStyle}
                        // onClick={}
                        >
                            Edit
                        </Button>
                    </div>
                }
                <h3>{props.vacationData.destination}</h3>
            </div>
            <div className="card-body">
                <span className="vacation-dates"><span className="from-date">{formatDate(props.vacationData.startDate)}</span>
                    <KeyboardArrowRightIcon />
                    <span className="till-date">{formatDate(props.vacationData.endDate)}</span></span>
                <hr></hr>
                <p className="vacation-description">{props.vacationData.description}
                </p>
            </div>
        </div>
    );
}

export default VacationCard;
