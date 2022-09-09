import config from "../../../Utils/Config";
import FollowBtn from "../FollowBtn/FollowBtn";
import "./VacationCard.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";


function VacationCard(): JSX.Element {

    const imageStyle = {
        backgroundImage: `url(${config.serverStaticsImages}98fac73f-142a-49de-8dae-35424eb60cbc.webp)`
    }

    return (
        <div className="VacationCard">
            <div 
            className="bg-image"
            style={{backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(255, 255, 255, 0)60%), url(${config.serverStaticsImages}98fac73f-142a-49de-8dae-35424eb60cbc.webp)`}} 
            >
                <FollowBtn />
                <h3>Vacation title</h3>
            </div>
            <div className="card-body">
                <span className="vacation-dates"><span className="from-date">17.12.2022</span>
                <KeyboardArrowRightIcon/>
                <span className="till-date">18.04.2023</span></span>
                <hr></hr>
                <p className="vacation-description">this is some description of the vacation. here we can see details about what we will do on the vacation and more...
                </p>
            </div>
        </div>
    );
}

export default VacationCard;
