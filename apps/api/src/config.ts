import dotenv from "dotenv";

dotenv.config();

export const config = {
    appName: process.env.appName,
    version: process.env.version,
    environment: process.env.environment,
    description: process.env.description,
    PORT: process.env.PORT || 3001,
    HOST: process.env.HOST || "localhost",
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    MONGO_URL: process.env.MONGO_URL,
    MONGO_DB: process.env.MONGO_DB,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_COLLECTION: process.env.MONGO_COLLECTION,

};
