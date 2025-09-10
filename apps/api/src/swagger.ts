import swaggerJSDoc, { Options } from "swagger-jsdoc";
import { config } from "./config";

const apiUrl = `http://${config.HOST}:${config.PORT}`;

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: process.env.SWAGGER_TITLE || "Default Title",
        version: process.env.SWAGGER_VERSION || "1.0.0",
        description: process.env.SWAGGER_DESCRIPTION || "Default Description",
    },
    servers: [
        {
            url: `http://${process.env.HOST}:${process.env.PORT}`,
            description: process.env.SWAGGER_SERVER_DESCRIPTION || "Default Server Description",
        },
    ],
};

export default swaggerDefinition;