import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { IdNotFoundError } from "../4-models/client-errors";
import VacationFollowersModel from "../4-models/vacation-foloowers-model";
import VacationModel from "../4-models/vacation-model";

// GET all vacations data
async function getAllVacations(): Promise<VacationModel[]> {
    const sql = `SELECT * FROM vacations`;
    const vacations = await dal.execute(sql);
    return vacations;
}

// GET all vacation for a specific user with followers data
async function getAllVacationsForUser(
    userId: number
): Promise<VacationFollowersModel[]> {
    const sql = `SELECT DISTINCT V.*,
	                EXISTS(SELECT * FROM followers 
                    WHERE vacationId = F.vacationId AND userId = ${userId}) AS isFollowing,
	                COUNT(F.userId) AS followersCount
                    FROM vacations as V LEFT JOIN followers as F
                    ON V.vacationId = F.vacationId
                    GROUP BY vacationId
                    ORDER BY isFollowing DESC`;
    const vacations = await dal.execute(sql);
    return vacations;
}

// Add a vacation
async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    const sql = `INSERT INTO vacations
                    VALUES(DEFAULT, '${vacation.destination}', '${vacation.description}',
                     '${vacation.image}', '${vacation.startDate}', '${vacation.endDate}',
                     '${vacation.price}')`;
    const result: OkPacket = await dal.execute(sql);
    vacation.vacationId = result.insertId;
    return vacation;
}

// Update a vacation
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
    const sql = `UPDATE vacations SET
                    destination = '${vacation.destination}',
                    description = '${vacation.description}',
                    image = '${vacation.image}',
                    startDate = '${vacation.startDate}',
                    endDate = '${vacation.endDate}',
                    price = '${vacation.price}'
                    WHERE vacations.vacationId = ${vacation.vacationId}`;
    const result: OkPacket = await dal.execute(sql);
    if (result.affectedRows === 0)
        throw new IdNotFoundError(vacation.vacationId);
    return vacation;
}

// Delete a vacation
async function deleteVacation(vacationId: number): Promise<void> {
    const sql = `DELETE
                      FROM vacations
                      WHERE vacationId = ${vacationId}`;
    const result: OkPacket = await dal.execute(sql);
    if (result.affectedRows === 0) throw new IdNotFoundError(vacationId);
}

export default {
    getAllVacations,
    getAllVacationsForUser,
    addVacation,
    updateVacation,
    deleteVacation,
};
