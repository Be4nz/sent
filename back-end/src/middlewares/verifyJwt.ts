import { auth } from 'express-oauth2-jwt-bearer';
require("dotenv").config();

export const verifyJwt = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER,
    tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_ALG,
    jwksUri: process.env.AUTH0_JWKS_URI,
});