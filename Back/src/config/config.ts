import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 8000,
  mongoUri: process.env.MONGO_URI || "",
  auth0Domain: process.env.AUTH0_DOMAIN || "",
  auth0Audience: process.env.AUTH0_AUDIENCE || ""
};
