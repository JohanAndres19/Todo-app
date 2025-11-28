import { expressjwt as jwt } from "express-jwt";
import jwks from "jwks-rsa";
import { config } from "../config/config.ts";

export const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    jwksUri: `https://${config.auth0Domain}/.well-known/jwks.json`,
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5
  }) as any,
  audience: config.auth0Audience,
  issuer: `https://${config.auth0Domain}/`,
  algorithms: ["RS256"]
});
