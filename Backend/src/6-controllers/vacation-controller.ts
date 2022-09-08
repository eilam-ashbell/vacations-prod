import express, { NextFunction, Request, Response } from "express";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import VacationModel from "../4-models/vacation-model";
import vacationLogic from "../5-logic/vacation-logic";

const router = express.Router();

// GET all vacations data
router.get(
    "/api/vacations",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const vacations = await vacationLogic.getAllVacations();
            response.json(vacations);
        } catch (err: any) {
            next(err);
        }
    }
);

// GET all vacation for a specific user with followers data
router.get(
    "/api/vacations/:useruuid",
    verifyLoggedIn,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userUuid = request.params.useruuid;
            const vacations = await vacationLogic.getAllVacationsForUser(
                userUuid
            );
            response.json(vacations);
        } catch (err: any) {
            next(err);
        }
    }
);

// Add a vacation
router.post(
    "/api/vacations",
    verifyAdmin,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            // get image file from the front
            request.body.image = request.files?.image;

            const vacation = new VacationModel(request.body);
            const addedVacation = await vacationLogic.addVacation(vacation);
            response.status(201).json(addedVacation);
        } catch (err: any) {
            next(err);
        }
    }
);

// Update a vacation
router.put(
    "/api/vacations/:vacationId",
    verifyAdmin,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            // get image file from the front
            request.body.image = request.files?.image;
            // assign vacation ID from URL params to vacation object
            request.body.vacationId = +request.params.vacationId;
            const vacation = new VacationModel(request.body);
            const updatedVacation = await vacationLogic.updateVacation(
                vacation
            );
            response.json(updatedVacation);
        } catch (err: any) {
            next(err);
        }
    }
);

// Delete a vacation
router.delete(
    "/api/vacations/:vacationId",
    verifyAdmin,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const vacationId = +request.params.vacationId;
            await vacationLogic.deleteVacation(vacationId);
            response.sendStatus(204);
        } catch (err: any) {
            next(err);
        }
    }
);
export default router;
