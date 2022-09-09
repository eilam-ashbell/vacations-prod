import { useState } from "react";
import config from "../../../Utils/Config";
import "./FollowBtn.css";

function FollowBtn(): JSX.Element {

    const [isLiked, setIsLiked] = useState<number>(0)

    function handleFollow() {
        isLiked === 0 ? setIsLiked(1) : setIsLiked(0)
    }

    return (
        <div className="FollowBtn" onClick={handleFollow}>
                <div className={isLiked === 0 ? "content" : "content heart-active"}>
                    <span className={isLiked === 0 ? "text" : "text heart-active"}>Like</span>
                    <span className={isLiked === 0 ? "numb" : "numb heart-active"}>
                        14
                    </span>
                    <span className={isLiked === 0 ? "heart" : "heart heart-active"}
                    style={{backgroundImage: `url(${config.serverStaticsIcons}img.png)`}}
                    ></span>
                </div>
        </div>
    );
}

export default FollowBtn;
