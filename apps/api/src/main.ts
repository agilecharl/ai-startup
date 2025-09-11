import cors from 'cors';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { config } from './config';
import { mongoClient } from './config/db';
import { globalErrorHandler, notFoundHandler } from './middleware/errorHandler';
import router from './routes';
import swaggerDefinition from './swagger';

const app = express();
const PORT = config.PORT || 3001;

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const specs = swaggerJsdoc({
    definition: swaggerDefinition,
    apis: ['./src/routes/*.ts'], // Path to route files
});

// Initialize MongoDB connection on startup
const initializeConnections = async () => {
    try {
        // MongoDB connection will be established when first needed
        console.log('Database connections initialized');
    } catch (error) {
        console.error('Failed to initialize database connections:', error);
        process.exit(1);
    }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(router);

// Add 404 handler for undefined routes
app.use(notFoundHandler);

// Add global error handler (must be last)
app.use(globalErrorHandler);

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('Received SIGINT. Graceful shutdown...');
    try {
        await mongoClient.close();
        console.log('MongoDB connection closed.');
        process.exit(0);
    } catch (error) {
        console.error('Error during graceful shutdown:', error);
        process.exit(1);
    }
});

process.on('SIGTERM', async () => {
    console.log('Received SIGTERM. Graceful shutdown...');
    try {
        await mongoClient.close();
        console.log('MongoDB connection closed.');
        process.exit(0);
    } catch (error) {
        console.error('Error during graceful shutdown:', error);
        process.exit(1);
    }
});

app.listen(PORT, async () => {
    await initializeConnections();
    console.log(`Server running on http://${config.HOST}:${config.PORT}`);
    console.log(`Swagger docs available at http://${config.HOST}:${config.PORT}/api-docs`);
});

export default app;
