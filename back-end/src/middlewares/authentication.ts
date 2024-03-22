import { Request, Response, NextFunction } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import { readUserByIdRepository } from '../APIs/repositories';
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
			res.status(403).send('Unauthorized access');
			return;
		}
		next();
	};
};

export const checkOwnership = (resourceType: string) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const authPayload = req.auth?.payload;

		if (authPayload?.role === 'admin') {
			return next();
		}

		try {
			let isOwner = false;
			switch (resourceType) {
				case 'users':
					const id = req.params.id;
					const auth0_id = req.params.auth0_id;

					if (auth0_id) {
						isOwner = auth0_id === authPayload?.sub;
					} else if (id) {
						const user = await readUserByIdRepository(id);
						isOwner = user.auth0_id === authPayload?.sub;
					}
					break;
				default:
					break;
			}

			if (isOwner) {
				return next();
			}

			throw new Error('Unauthorized access');
		} catch (error) {
			console.log(error);
			res.status(403).send('Unauthorized access');
		}
	};
};
