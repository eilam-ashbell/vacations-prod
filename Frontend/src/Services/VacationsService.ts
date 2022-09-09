import axios from "axios";
import VacationModel from "../Models/vacationModel";
import { VacationsAction, VacationsActionType, vacationsStore } from "../Redux/VacationsState";
import config from "../Utils/Config";

class VacationService {

    public async getAllVacations(userUuid: string) : Promise<VacationModel[]> {
        let vacations = vacationsStore.getState().vacations;
        if (vacations.length === 0 ) {
            const response = await axios.get<VacationModel[]>(config.routes.getAllVacations + userUuid)
            vacations = response.data
            const action: VacationsAction = {
                payload: vacations,
                type: VacationsActionType.FetchVacations
            }
            vacationsStore.dispatch(action)
        }
        return vacations
    }
}


const vacationsService = new VacationService();

export default vacationsService;