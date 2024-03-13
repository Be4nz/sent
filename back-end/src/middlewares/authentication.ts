import { Request, Response, NextFunction } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import { readUserAuth0Repository, readUserRepository } from '../APIs/repositories';
import { UserModel } from '../models';
require('dotenv').config();

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
			res.status(403).send({ message: 'Unauthorized access' });
			return;
		}
		next();
	};
};

export const checkAdminOrOwn = () => {
	return async (req: Request, res: Response, next: NextFunction) => {
		let user;
		const authPayload = req.auth?.payload;
		const id = req.params.id;
		const auth0_id = req.params.auth0_id;
		if (id) {
			user = await readUserRepository(id);
		} else if (auth0_id) {
			user = await readUserAuth0Repository(auth0_id);
		} else {
			user = req.body as UserModel;
		}
		if (!authPayload || !authPayload.role || authPayload.role !== 'admin') {
			if (!authPayload || !user || authPayload.sub !== user.auth0_id) {
				if (!authPayload || authPayload.sub !== auth0_id) {
					res.status(403).send({ message: 'Unauthorized access' });
					return;
				}
			}
		}
		next();
	};
};
