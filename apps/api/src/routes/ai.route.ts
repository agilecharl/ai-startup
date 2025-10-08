import { Router } from 'express';
import AiController from '../controllers/ai.controller';

const configRouter = Router();

/**
 * @swagger
 * /api/ai/crews:
 *   get:
 *     tags: [Crews]
 *     summary: Retrieve all AI crews
 *     description: Returns a list of all available AI crews in the system.
 *     responses:
 *       200:
 *         description: Successfully retrieved AI crews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 *                   example: "AI Crews retrieved successfully"
 */

configRouter.get('/crews', AiController.getCrews);

/**
 * @swagger
 * /api/ai/crew:
 *   post:
 *     tags: [Crews]
 *     summary: Create a new AI crew
 *     description: Creates a new AI crew with the provided configuration.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Marketing Crew"
 *               description:
 *                 type: string
 *                 example: "A crew focused on marketing tasks"
 *     responses:
 *       201:
 *         description: AI crew created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                   example: "AI Crew created successfully"
 */

configRouter.post('/crew', AiController.insertCrew);

/**
 * @swagger
 * /ai/crew/{id}:
 *   put:
 *     summary: Updates ai crew
 *     description: Updates ai crew.
 *     responses:
 *       204:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "AI Crew data"
 */

configRouter.put('/crew/:crew_id', AiController.updateCrew);

/**
 * @swagger
 * /api/ai/agents:
 *   get:
 *     tags: [Agents]
 *     summary: Retrieve all AI agents
 *     description: Returns a list of all available AI agents in the system.
 *     responses:
 *       200:
 *         description: Successfully retrieved AI agents
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 *                   example: "AI Agents retrieved successfully"
 */

configRouter.get('/agents', AiController.getAgents);

/**
 * @swagger
 * /ai/agent:
 *   post:
 *     summary: Creates ai agent
 *     description: Creates ai agent.
 *     responses:
 *       201:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "AI Crew data"
 */

configRouter.post('/agent', AiController.insertAgent);

/**
 * @swagger
 * /ai/agent/{id}:
 *   put:
 *     summary: Updates ai agent
 *     description: Updates ai agent.
 *     responses:
 *       204:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "AI Agent data"
 */

configRouter.put('/agent/:agent_id', AiController.updateAgent);

/**
 * @swagger
 * /ai/tasks:
 *   get:
 *     summary: Retrieve ai tasks
 *     description: Returns ai tasks.
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "AI Tasks data"
 */

configRouter.get('/tasks', AiController.getTasks);

/**
 * @swagger
 * /ai/task:
 *   post:
 *     summary: Creates ai task
 *     description: Creates ai task.
 *     responses:
 *       201:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "AI Crew data"
 */

configRouter.post('/task', AiController.insertTask);

/**
 * @swagger
 * /ai/task/{id}:
 *   put:
 *     summary: Updates ai task
 *     description: Updates ai task.
 *     responses:
 *       201:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "AI Crew data"
 */

configRouter.put('/task/:task_id', AiController.updateTask);

/**
 * @swagger
 * /api/ai/generate:
 *   post:
 *     tags: [AI Generation]
 *     summary: Generate AI response
 *     description: Generate an AI response based on the provided prompt and configuration.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *                 example: "Create a marketing plan for a tech startup"
 *               model:
 *                 type: string
 *                 example: "gpt-4"
 *     responses:
 *       200:
 *         description: AI response generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     response:
 *                       type: string
 *                       example: "Here's your generated marketing plan..."
 *                 message:
 *                   type: string
 *                   example: "AI response generated successfully"
 */

configRouter.post('/generate', AiController.generate);

/**
 * @swagger
 * /ai/responses:
 *   get:
 *     summary: Get AI responses
 *     description: Get AI responses
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "AI responses"
 */

configRouter.get('/responses', AiController.getResponses);

/**
 * @swagger
 * /ai/response/:id:
 *   get:
 *     summary: Get AI response
 *     description: Get AI response
 *     responses:
 *       201:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "AI response"
 */

configRouter.get('/response/:id', AiController.getResponse);

/**
 * @swagger
 * /ai/response/:id:
 *   put:
 *     summary: Update AI response
 *     description: Update AI response
 *     responses:
 *       201:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "AI response"
 */

configRouter.put('/response/:id', AiController.updateResponse);

/**
 * @swagger
 * /ai/views:
 *   get:
 *     summary: Retrieve ai views
 *     description: Returns ai views.
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Views data"
 */

configRouter.get('/views', AiController.getViews);

/**
 * @swagger
 * /ai/view:
 *   post:
 *     summary: Creates ai view
 *     description: Creates ai view.
 *     responses:
 *       201:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "AI View data"
 */

configRouter.post('/view', AiController.insertView);

/**
 * @swagger
 * /ai/view/{id}:
 *   put:
 *     summary: Updates ai view
 *     description: Updates ai view.
 *     responses:
 *       204:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "AI View data"
 */

configRouter.put('/view/:view_id', AiController.updateView);

/**
 * @swagger
 * /ai/templates:
 *   get:
 *     summary: Retrieve ai templates
 *     description: Returns ai templates.
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "AI Templates data"
 */

configRouter.get('/templates', AiController.getTemplates);

/**
 * @swagger
 * /ai/template:
 *   post:
 *     summary: Creates ai template
 *     description: Creates ai template.
 *     responses:
 *       201:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "AI Template data"
 */

configRouter.post('/template', AiController.insertTemplate);

/**
 * @swagger
 * /ai/template/{id}:
 *   put:
 *     summary: Updates ai template
 *     description: Updates ai template.
 *     responses:
 *       204:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "AI Template data"
 */

configRouter.put('/template/:template_id', AiController.updateTemplate);

/**
 * @swagger
 * /ai/tools:
 *   get:
 *     summary: Retrieve ai tools
 *     description: Returns ai tools.
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "AI tools data"
 */

configRouter.get('/tools', AiController.getTools);

/**
 * @swagger
 * /ai/tool:
 *   post:
 *     summary: Creates ai tool
 *     description: Creates ai tool.
 *     responses:
 *       201:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "AI tool data"
 */

configRouter.post('/tool', AiController.insertTool);

export default configRouter;