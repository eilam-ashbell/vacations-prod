import { useEffect, useState } from "react";
import config from "../../../Utils/Config";
import "./FollowBtn.css";


interface FollowBtnProps {
    numberOfFollowers: number;
    isFollow: number;
}

function FollowBtn(props: FollowBtnProps): JSX.Element {

    const [isFollow, setIsFollow] = useState<number>(0)
    const [followersCount, setFollowersCount] = useState<number>(0)

    useEffect(() => {
        setIsFollow(props.isFollow)
        setFollowersCount(props.numberOfFollowers)
    }, [])

    function handleFollow() {
        if (isFollow === 0) {
            setIsFollow(1)
            setFollowersCount(followersCount + 1)
        } else {
            setIsFollow(0)
            setFollowersCount(followersCount - 1)
        }
    }

    return (
        <div className="FollowBtn" onClick={handleFollow}>
            <div className={isFollow === 0 ? "content" : "content heart-active"}>
                <span className={isFollow === 0 ? "text" : "text heart-active"}>Like</span>
                <span className={isFollow === 0 ? "numb" : "numb heart-active"}>
                    {followersCount}
                </span>
                <span className={isFollow === 0 ? "heart" : "heart heart-active"}
                    style={{ backgroundImage: `url(${config.serverStaticsIcons}img.png)` }}
                ></span>
            </div>
        </div>
    );
}

export default FollowBtn;
