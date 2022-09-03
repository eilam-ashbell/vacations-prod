import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { IdNotFoundError } from "../4-models/client-errors";
import VacationFollowersModel from "../4-models/vacation-followers-model";
import VacationModel from "../4-models/vacation-model";
import { v4 as uuid } from "uuid";
import safeDelete from "../2-utils/safe-delete";
import config from "../2-utils/config";

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
    // Handle image
    if (vacation.image) {
        const extension = vacation.image.name.substring(
            vacation.image.name.lastIndexOf(".")
        ); // extract image extension
        vacation.imageName = uuid() + extension; // save new image name in vacation object
        await vacation.image.mv(config.imagesFolderPath + vacation.imageName); // move image to images folder
        delete vacation.image; // delete image before saving
    }
    // Add to DB
    const sql = `INSERT INTO vacations
                    VALUES(DEFAULT, '${vacation.destination}', '${vacation.description}',
                     '${vacation.imageName}', '${vacation.startDate}', '${vacation.endDate}',
                     '${vacation.price}')`;
    const result: OkPacket = await dal.execute(sql);
    vacation.vacationId = result.insertId;
    return vacation;
}

// Update a vacation
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
    // Handle image
    if (vacation.image) {
        await safeDelete(config.imagesFolderPath + vacation.imageName); // Delete the previous image
        const extension = vacation.image.name.substring(
            vacation.image.name.lastIndexOf(".")
        ); // extract image extension
        vacation.imageName = uuid() + extension;
        await vacation.image.mv(config.imagesFolderPath + vacation.imageName); // move image to images folder
        delete vacation.image; // delete image before saving
    }
    const sql = `UPDATE vacations SET
                    destination = '${vacation.destination}',
                    description = '${vacation.description}',
                    imageName = '${vacation.imageName}',
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
    // Find image name of the desired vacation in the DB
    const findImageName = `SELECT imageName FROM vacations
                            WHERE vacationId = ${vacationId}`;
    const imageNameResult = await dal.execute(findImageName);
    // extract the image name from the result
    const imageNameToDelete = imageNameResult[0].imageName;
    // delete image from HD
    await safeDelete(config.imagesFolderPath + imageNameToDelete); // Delete the previous image
    // delete vacation from DB
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
