import express, { NextFunction, Request, Response } from "express";
import CredentialModel from "../4-models/crdentioals-model";
import UserModel from "../4-models/user-model";
import authLogic from "../5-logic/auth-logic";

const router = express.Router();

// register user
router.post(
    "/api/auth/register",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const user = new UserModel(request.body);
            const token = await authLogic.register(user);
            response.status(201).json(token);
        } catch (err: any) {
            next(err);
        }
    }
);

// login user
router.post(
    "/api/auth/login",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const credentials = new CredentialModel(request.body)
            const token = await authLogic.login(credentials)
            response.json(token);
        } catch (err: any) {
            next(err);
        }
    }
);

export default router;