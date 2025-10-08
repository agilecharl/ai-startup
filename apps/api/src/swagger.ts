// Swagger configuration for AI Startup API

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: process.env.SWAGGER_TITLE || "Default Title",
        version: process.env.SWAGGER_VERSION || "1.0.0",
        description: process.env.SWAGGER_DESCRIPTION || "Default Description",
        contact: {
            name: "API Support",
            email: "support@ai-startup.com"
        }
    },
    servers: [
        {
            url: `http://${process.env.HOST}:${process.env.PORT}`,
            description: process.env.SWAGGER_SERVER_DESCRIPTION || "Default Server Description",
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