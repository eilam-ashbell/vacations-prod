import config from "../../../Utils/Config";
import FollowBtn from "../FollowBtn/FollowBtn";
import "./VacationCard.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import VacationForUserModel from "../../../Models/vacationForUserModel";


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

    return (
        <div className="VacationCard">
            <div 
            className="bg-image"
            style={bgImageStyle} 
            >
                <FollowBtn numberOfFollowers={props.vacationData.followersCount} isFollow={props.vacationData.isFollowing}/>
                <h3>{props.vacationData.destination}</h3>
            </div>
            <div className="card-body">
                <span className="vacation-dates"><span className="from-date">{formatDate(props.vacationData.startDate)}</span>
                <KeyboardArrowRightIcon/>
                <span className="till-date">{formatDate(props.vacationData.endDate)}</span></span>
                <hr></hr>
                <p className="vacation-description">{props.vacationData.description}
                </p>
            </div>
        </div>
    );
}

export default VacationCard;
