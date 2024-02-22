import { Request, Response, NextFunction } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import { readUserRepository } from '../APIs/repositories';
import { User } from '../models';
require("dotenv").config();

export const verifyJwt = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER,
    tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_ALG,
    jwksUri: process.env.AUTH0_JWKS_URI,
});

export const checkRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const authPayload = req.auth?.payload;
        if (!authPayload || !authPayload.role || authPayload.role !== role) {
            res.status(403).send({message: "Unauthorized access"});
            return;
        }
        next();
    };
}

export const checkAdminOrOwn = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        let user;
        const authPayload = req.auth?.payload;
        const id = req.params.id;
        if (id) {
            user = await readUserRepository(id);
        } else {
            user = req.body as User;
        }
        if (!authPayload || !authPayload.role || authPayload.role !== "admin") {
            if (!authPayload || !user || authPayload.sub !== user.auth0_id) {
                res.status(403).send({message: "Unauthorized access"});
                return;
            }
        }
        next();
    };
}