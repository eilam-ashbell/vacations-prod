import express, { NextFunction, Request, Response } from "express";
import VacationModel from "../4-models/vacation-model";
import vacationLogic from "../5-logic/vacationLogic";

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
    "/api/vacations/:userId",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userId = +request.params.userId;
            const vacations = await vacationLogic.getAllVacationsForUser(
                userId
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
