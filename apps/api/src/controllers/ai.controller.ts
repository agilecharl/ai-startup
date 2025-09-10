import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import ollama from 'ollama';
import * as db from '../config/db';

interface DatabaseRecord {
  id: number;
}

class AiController {
  // Helper method to validate ObjectId format
  private static isValidObjectId(id: string): boolean {
    return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
  }
  public static async getCrews(req: Request, res: Response): Promise<void> {
    try {
      const crew_id = req.query.id;
      let params = '';

      if (crew_id) {
        // Validate crew_id to prevent SQL injection
        if (typeof crew_id !== 'string' || !/^\d+$/.test(crew_id)) {
          res.status(400).json({
            error: 'Invalid crew ID format',
            message: 'Crew ID must be a valid number',
          });
          return;
        }
        params = ` WHERE id = '${crew_id}'`;
      }

      const crews = await db.getPgRecords('central.ai_crews', params);
      res.status(200).json(crews || []);
    } catch (error) {
      console.error('Error fetching crews:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: 'Failed to fetch crews',
      });
    }
  }

  public static async insertCrew(req: Request, res: Response): Promise<void> {
    try {
      // Validate crew content
      if (
        !req.body?.crew ||
        typeof req.body.crew !== 'string' ||
        req.body.crew.trim().length === 0
      ) {
        res.status(400).json({
          error: 'Invalid crew content',
          message: 'Crew name is required and must be a non-empty string',
        });
        return;
      }

      const record = {
        crew: req.body.crew.trim(),
        crew_type: req.body.crew_type || null,
        description: req.body.description || null,
      };

      const newCrew = await db.createPgRecord('central.ai_crews', record);

      res.status(201).json(newCrew);
    } catch (error) {
      console.error('Error creating crew:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: 'Failed to create crew',
      });
    }
  }

  public static async updateCrew(req: Request, res: Response): Promise<void> {
    const crew_id = req.params.crew_id;
    const crew = req.body.crew;
    const crew_type = req.body.crew_type;
    const description = req.body.description;

    if (crew_id) {
      const record = {
        crew: crew,
        crew_type: crew_type,
        description: description,
      };

      const updatedCrew = await db.updatePgRecord(
        'central.ai_crews',
        crew_id,
        record
      );

      res.status(200).json(updatedCrew);
    } else {
      res.status(400).json({ message: 'Invalid crew' });
    }
  }

  public static async getAgents(req: Request, res: Response): Promise<void> {
    const crew_id = req.query.crew_id;
    const agent_id = req.query.id;
    let params = ' WHERE 1=1 ';

    if (crew_id) {
      params = params + ` AND crew_id = ${crew_id}`;
    }

    if (agent_id) {
      params = params + ` AND id = ${agent_id}`;
    }

    const agents = await db.getPgRecords('central.ai_agents', params);
    res.status(200).json(agents);
  }

  public static async insertAgent(req: Request, res: Response): Promise<void> {
    if (req.body.agent) {
      const record = {
        agent: req.body.agent,
        crew_id: req.body.crew_id,
        role: req.body.role,
        goal: req.body.goal,
        backstory: req.body.backstory,
        llm: req.body.llm,
        tools: req.body.tools,
        max_iter: req.body.max_iter,
      };

      const newAgent = await db.createPgRecord('central.ai_agents', record);

      res.status(201).json(newAgent);
    } else {
      res.status(400).json({ message: 'Invalid agent' });
    }
  }

  public static async updateAgent(req: Request, res: Response): Promise<void> {
    if (req.body.agent) {
      const record = {
        agent: req.body.agent,
        crew_id: req.body.crew_id,
        role: req.body.role,
        goal: req.body.goal,
        backstory: req.body.backstory,
        llm: req.body.llm,
        tools: req.body.tools,
        max_iter: req.body.max_iter,
      };

      const updatedAgent = await db.updatePgRecord(
        'central.ai_agents',
        req.params.agent_id,
        record
      );

      res.status(200).json(updatedAgent);
    } else {
      res.status(400).json({ message: 'Invalid agent' });
    }
  }

  public static async getTasks(req: Request, res: Response): Promise<void> {
    const agent_id = req.query.agent_id;
    const task_id = req.query.id;
    let params = ' WHERE 1=1 ';

    if (agent_id) {
      params = params + ` AND agent_id = ${agent_id}`;
    }

    if (task_id) {
      params = params + ` AND id = ${task_id}`;
    }

    const tasks = await db.getPgRecords('central.ai_tasks', params);
    res.status(200).json(tasks);
  }

  public static async insertTask(req: Request, res: Response): Promise<void> {
    if (req.body.task) {
      const record = {
        task: req.body.task,
        agent_id: req.body.agent_id,
        description: req.body.description,
        expected_output: req.body.expected_output,
      };

      const newTask = await db.createPgRecord('central.ai_tasks', record);

      res.status(201).json(newTask);
    } else {
      res.status(400).json({ message: 'Invalid task' });
    }
  }

  public static async updateTask(req: Request, res: Response): Promise<void> {
    if (req.params.task_id) {
      const record = {
        task: req.body.task,
        agent_id: req.body.agent_id,
        description: req.body.description,
        expected_output: req.body.expected_output,
      };

      const updatedTask = await db.updatePgRecord(
        'central.ai_tasks',
        req.params.task_id,
        record
      );

      res.status(200).json(updatedTask);
    } else {
      res.status(400).json({ message: 'Invalid task' });
    }
  }

  private static readonly ollamaResponse = async (message: string) => {
    return await ollama
      .chat({
        model: 'qwen2.5',
        messages: [{ role: 'user', content: message }],
      })
      .then((response: any) => {
        return response;
      })
      .catch((error: any) => {
        console.log('Ollama error', error);
        return error;
      });
  };

  public static async generate(req: Request, res: Response): Promise<void> {
    try {
      await AiController.ollamaResponse(req.body.message as string).then(
        async (response: any) => {
          const title = req.body.title
            ? req.body.title
            : (req.body.message.substring(0, 250) as string);
          const url = req.body.url as string;
          const content = req.body.page_content as string;

          let message = req.body.message as string;
          message = message.replace(/'/g, '');

          let search = message.substring(0, 2900);
          let searchSQL = search.replace(/'/g, '');

          searchSQL = searchSQL.replace(/[^\x00-\x7F]/g, '');

          if (!message) {
            res.status(400).json({ error: 'Message is required' });
          }

          let codeId = 0;
          let searchId = 0;

          await db
            .getPgRecords(
              'central.codes',
              ` WHERE code = 'LLM' ` +
                `   AND category_id IN (SELECT category_id ` +
                `                         FROM central.categories ` +
                `                        WHERE category = 'Search Types')`
            )
            .then((codes: any) => {
              codeId = codes[0].id;
            });

          await db
            .getPgRecords('central.searches', ` WHERE search = '${searchSQL}' `)
            .then(async (searches: any) => {
              if (searches.length > 0) {
                searchId = searches[0].id;
              } else {
                const createdSearches = await db.createPgRecord(
                  'central.searches',
                  {
                    search: searchSQL,
                    search_type: codeId,
                  }
                );

                const createdSearchesArray =
                  createdSearches as DatabaseRecord[];
                searchId = createdSearchesArray[0].id;
              }
            });

          try {
            const collection = await db.openMongoConnection();

            const searchDocument = {
              url: url,
              search_id: searchId,
              search: searchSQL,
              title: title,
              search_type: codeId,
              result: response,
              content: content,
              created_on: new Date(),
            };

            const insertResult = await collection.insertOne(searchDocument);
            console.log(
              'Inserted document with _id: ',
              insertResult.insertedId
            );

            res.status(200).json({ content: response.message.content });
          } catch (mongoError) {
            console.log('MongoDB insert error', mongoError);
            // Return the response even if MongoDB insert fails
            res.status(200).json({
              content: response.message.content,
              warning: 'Response generated but not saved to MongoDB',
            });
          }
        }
      );
    } catch (error) {
      console.log('Error', error);

      res.status(500).send({
        message: 'INTERNAL SERVER ERROR',
        result: error,
      });
    }
  }

  public static async getResponses(req: Request, res: Response): Promise<void> {
    try {
      const mongoDatabase = req.query.mongoDatabase;
      const mongoCollection = req.query.mongoCollection;
      const searchId = req.query.search_id;
      const url = req.query.url;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : 100;
      const sort = req.query.sort ? (req.query.sort as string) : 'created_on';
      const order = req.query.order ? (req.query.order as string) : 'desc';
      const sortOrder = order === 'asc' ? 1 : -1;

      const collection = await db.openMongoConnection(
        mongoDatabase as string,
        mongoCollection as string
      );

      const query: any = {};

      if (searchId) {
        query.search_id = parseInt(searchId as string, 10);
      }

      if (url) {
        query.url = url;
      }

      const responses = await collection
        .find(query)
        .sort({ [sort]: sortOrder })
        .limit(limit)
        .toArray();

      res.status(200).json(responses);
    } catch (error) {
      console.log(
        'Error connecting to MongoDB or retrieving responses:',
        error
      );

      // Check if it's a MongoDB connection error
      if (
        error instanceof Error &&
        (error.message.includes('ECONNREFUSED') ||
          error.message.includes('connection') ||
          error.message.includes('timeout'))
      ) {
        res.status(503).send({
          message: 'DATABASE CONNECTION ERROR',
          error:
            'Unable to connect to MongoDB. Please ensure MongoDB is running.',
          result: error.message,
        });
      } else {
        res.status(500).send({
          message: 'INTERNAL SERVER ERROR',
          result: error,
        });
      }
    }
  }

  public static async getResponse(req: Request, res: Response): Promise<void> {
    try {
      const responseId = req.params.id;
      const collection = await db.openMongoConnection();

      const query: any = {};

      if (responseId) {
        // Validate ObjectId format before using it
        if (!AiController.isValidObjectId(responseId)) {
          res.status(400).json({
            message: 'Invalid ObjectId format',
            error: 'The provided ID is not a valid MongoDB ObjectId',
          });
          return;
        }
        query._id = new ObjectId(responseId);
      }

      const response = await collection.findOne(query);
      res.status(200).json(response);
    } catch (error) {
      console.log('Error retrieving response:', error);

      // Check if it's a MongoDB connection error
      if (
        error instanceof Error &&
        (error.message.includes('ECONNREFUSED') ||
          error.message.includes('connection') ||
          error.message.includes('timeout'))
      ) {
        res.status(503).send({
          message: 'DATABASE CONNECTION ERROR',
          error:
            'Unable to connect to MongoDB. Please ensure MongoDB is running.',
          result: error.message,
        });
      } else {
        res.status(500).send({
          message: 'INTERNAL SERVER ERROR',
          result: error,
        });
      }
    }
  }

  public static async updateResponse(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const collection = await db.openMongoConnection();
      const responseId = req.params.id;

      const query: any = {};

      if (responseId) {
        // Validate ObjectId format before using it
        if (!AiController.isValidObjectId(responseId)) {
          res.status(400).json({
            message: 'Invalid ObjectId format',
            error: 'The provided ID is not a valid MongoDB ObjectId',
          });
          return;
        }
        query._id = new ObjectId(responseId);
      }

      const response = await collection.findOne(query);

      if (response) {
        const search = req.body.search;
        const result = req.body.result;
        const task = req.body.task;

        if (search) {
          const searchRecord = await db.getPgRecords(
            'central.searches',
            ` WHERE search = '${search}'`
          );

          if (Array.isArray(searchRecord) && searchRecord.length === 0) {
            const newSearchRecord = await db.createPgRecord(
              'central.searches',
              {
                search: search.substring(0, 2900),
                search_type: response.search_type,
              }
            );

            const newSearchRecordArray = newSearchRecord as DatabaseRecord[];
            response.search_id = newSearchRecordArray[0].id;
          }
        }

        const updateDocument = {
          $set: {
            search: search,
            search_id: response.search_id,
            result: result,
            status: 'archived',
            task: task,
            updated_on: new Date(),
          },
        };

        await collection.updateOne(query, updateDocument);

        res.status(200).json({ message: 'AI response updated' });
      } else {
        res.status(400).json({ message: 'Invalid response' });
      }
    } catch (error) {
      console.log('Error', error);
      res.status(500).send({
        message: 'INTERNAL SERVER ERROR',
        result: error,
      });
    }
  }

  public static async getViews(req: Request, res: Response): Promise<void> {
    const view_id = req.query.id;
    const url = req.query.url;
    let params = '';

    if (view_id) {
      params = ` WHERE id = '${
        typeof view_id === 'object' ? JSON.stringify(view_id) : String(view_id)
      }'`;
    }

    if (url) {
      const weblinkRecords = (await db.getPgRecords(
        'central.weblinks',
        ` WHERE url = '${
          typeof url === 'object' ? JSON.stringify(url) : String(url)
        }'`
      )) as any[];

      if (weblinkRecords.length > 0) {
        params += `${params ? ' AND ' : ' WHERE '} url = '${
          weblinkRecords[0].id
        }'`;
      } else {
        db.createPgRecord('central.weblinks', {
          url: typeof url === 'object' ? JSON.stringify(url) : String(url),
        });
        params += `${
          params ? ' AND ' : ' WHERE '
        } url = (SELECT id FROM central.weblinks WHERE url = '${
          typeof url === 'object' ? JSON.stringify(url) : String(url)
        }')`;
      }
    }

    const views = await db.getPgRecords('central.views', params);

    res.status(200).json(views);
  }

  public static async insertView(req: Request, res: Response): Promise<void> {
    if (req.body.view) {
      let urlId = null;

      if (req.body.url) {
        const weblinkRecords = (await db.getPgRecords(
          'central.weblinks',
          ` WHERE url = '${req.body.url}'`
        )) as any[];

        if (weblinkRecords.length > 0) {
          urlId = weblinkRecords[0].id;
        } else {
          const newWeblink = (await db.createPgRecord('central.weblinks', {
            url: req.body.url,
          })) as DatabaseRecord[];
          urlId = newWeblink[0].id;
        }
      }

      const viewRecord = {
        view: req.body.view,
        url: urlId,
      };

      const newView = await db.createPgRecord('central.views', viewRecord);

      res.status(201).json(newView);
    } else {
      res.status(400).json({ message: 'Invalid view' });
    }
  }

  public static async updateView(req: Request, res: Response): Promise<void> {
    if (req.body.view && req.params.view_id) {
      let urlId = null;

      if (req.body.url) {
        const weblinkRecords = (await db.getPgRecords(
          'central.weblinks',
          ` WHERE url = '${req.body.url}'`
        )) as any[];

        if (weblinkRecords.length > 0) {
          urlId = weblinkRecords[0].id;
        } else {
          const newWeblink = (await db.createPgRecord('central.weblinks', {
            url: req.body.url,
          })) as DatabaseRecord[];
          urlId = newWeblink[0].id;
        }
      }

      const viewRecord = {
        view: req.body.view,
        url: urlId,
      };

      const updatedView = await db.updatePgRecord(
        'central.views',
        req.params.view_id,
        viewRecord
      );

      res.status(200).json(updatedView);
    } else {
      res.status(400).json({ message: 'Invalid view' });
    }
  }

  public static async getTemplates(req: Request, res: Response): Promise<void> {
    const template_id = req.query.id;
    let params = '';

    if (template_id) {
      params = ` WHERE id = '${
        typeof template_id === 'object'
          ? JSON.stringify(template_id)
          : String(template_id)
      }'`;
    }

    const templates = await db.getPgRecords('central.prompt_templates', params);
    res.status(200).json(templates);
  }

  public static async insertTemplate(
    req: Request,
    res: Response
  ): Promise<void> {
    if (req.body.template) {
      const record = {
        template: req.body.template,
      };

      const newTemplate = await db.createPgRecord(
        'central.prompt_templates',
        record
      );

      res.status(201).json(newTemplate);
    } else {
      res.status(400).json({ message: 'Invalid template' });
    }
  }

  public static async updateTemplate(
    req: Request,
    res: Response
  ): Promise<void> {
    if (req.body.template && req.params.template_id) {
      const record = {
        template: req.body.template,
      };

      const updatedTemplate = await db.updatePgRecord(
        'central.prompt_templates',
        req.params.template_id,
        record
      );

      res.status(200).json(updatedTemplate);
    } else {
      res.status(400).json({ message: 'Invalid template' });
    }
  }

  public static async getTools(req: Request, res: Response): Promise<void> {
    const tool_id = req.query.id;
    let params = '';

    if (tool_id) {
      params = ` WHERE id = '${
        typeof tool_id === 'object' ? JSON.stringify(tool_id) : String(tool_id)
      }'`;
    }

    const tools = await db.getPgRecords('central.ai_tools', params);
    res.status(200).json(tools);
  }

  public static async insertTool(req: Request, res: Response): Promise<void> {
    if (req.body.tool) {
      const record = {
        tool: req.body.tool,
        description: req.body.description || '',
        tool_type: req.body.tool_type || 'crewai',
      };

      const newtool = await db.createPgRecord('central.ai_tools', record);

      res.status(201).json(newtool);
    } else {
      res.status(400).json({ message: 'Invalid tool' });
    }
  }
}

export default AiController;
