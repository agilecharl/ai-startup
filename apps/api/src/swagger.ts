// Swagger configuration for AI Startup API
import { config } from './config';

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: process.env.SWAGGER_TITLE || "AI Startup API",
        version: process.env.SWAGGER_VERSION || "1.0.0",
        description: process.env.SWAGGER_DESCRIPTION || "A comprehensive API for AI startup operations including crews, agents, tasks, templates, and AI response generation",
        contact: {
            name: "API Support",
            email: "support@ai-startup.com"
        }
    },
    servers: [
        {
            url: `http://${config.HOST}:${config.PORT}`,
            description: process.env.SWAGGER_SERVER_DESCRIPTION || "Development Server",
        },
    ],
    tags: [
        {
            name: "Crews",
            description: "Operations related to AI crews management"
        },
        {
            name: "Agents", 
            description: "Operations related to AI agents management"
        },
        {
            name: "Tasks",
            description: "Operations related to AI tasks management"
        },
        {
            name: "AI Generation",
            description: "Operations for generating AI responses"
        },
        {
            name: "Templates",
            description: "Operations related to AI templates management"
        },
        {
            name: "Tools",
            description: "Operations related to AI tools management"
        },
        {
            name: "Views",
            description: "Operations related to AI views management"
        }
    ]
};

export default swaggerDefinition;