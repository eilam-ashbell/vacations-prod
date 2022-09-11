import axios from "axios";
import FollowerModel from "../Models/followerModel";
import VacationForUserModel from "../Models/vacationForUserModel";
import {
    VacationsAction,
    VacationsActionType,
    vacationsStore,
} from "../Redux/VacationsState";
import config from "../Utils/Config";

class VacationService {
    public async getAllVacations(
        userUuid: string
    ): Promise<VacationForUserModel[]> {
        let vacations = vacationsStore.getState().vacations;
        if (vacations.length === 0) {
            const response = await axios.get<VacationForUserModel[]>(
                config.routes.getAllVacations + userUuid
            );
            vacations = response.data;
            const action: VacationsAction = {
                payload: vacations,
                type: VacationsActionType.FetchVacations,
            };
            vacationsStore.dispatch(action);
        }
        return vacations;
    }

    public async addFollower(
        userUuid: string,
        vacation: VacationForUserModel
    ): Promise<FollowerModel> {
        const follower = new FollowerModel({
            userUuid: userUuid,
            vacationId: vacation.vacationId,
        });
        const response = await axios.post<FollowerModel>(
            config.routes.addFollower,
            follower
        );
        const addedFollower = response.data;
        vacation.followersCount++
        vacation.isFollowing = 1
        const action: VacationsAction = {
            type: VacationsActionType.UpdateVacation,
            payload: vacation,
        };
        vacationsStore.dispatch(action);
        return addedFollower;
    }

    public async removeFollower(
        userUuid: string,
        vacation: VacationForUserModel
    ): Promise<void> {
        const follower = new FollowerModel({
            userUuid: userUuid,
            vacationId: vacation.vacationId,
        });        
        await axios.delete<void>(
            config.routes.removeFollower,
            {data: follower}
        );
        // const removedFollower = response.data;
        vacation.followersCount--
        vacation.isFollowing = 0
        const action: VacationsAction = {
            type: VacationsActionType.UpdateVacation,
            payload: vacation,
        };
        vacationsStore.dispatch(action);
        // return removedFollower;
    }
}

const vacationsService = new VacationService();

export default vacationsService;
