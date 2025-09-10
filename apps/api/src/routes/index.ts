import { Router } from 'express';
import aiRouter from './ai.route';

const routes = Router();

routes.use('/ai', aiRouter);

export default routes;