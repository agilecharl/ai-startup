import { MongoClient } from 'mongodb';
import pg from 'pg';
import { config } from '../config';

const { Pool } = pg;

const pool = new Pool({
  user: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  host: config.POSTGRES_HOST,
  database: config.POSTGRES_DB,
  port: Number(config.POSTGRES_PORT),
});

const mongoDBConnection = config.MONGO_URL || '';
let mongoDBName = config.MONGO_DB || '';

// Initialize MongoDB client at the top
export const mongoClient = new MongoClient(mongoDBConnection, {
  serverSelectionTimeoutMS: 5000, // 5 second timeout
  connectTimeoutMS: 10000, // 10 second timeout
  socketTimeoutMS: 45000, // 45 second timeout
  maxPoolSize: 10, // Maximum number of connections in the pool
  minPoolSize: 1, // Minimum number of connections in the pool
});

let mongoConnected = false;

// Function to ensure MongoDB connection is established
const ensureMongoConnection = async () => {
  try {
    // Check if the client is connected by attempting to ping
    if (!mongoConnected) {
      await mongoClient.connect();
      mongoConnected = true;

      // Set up event listeners for connection monitoring
      mongoClient.on('close', () => {
        console.log('MongoDB connection closed');
        mongoConnected = false;
      });

      mongoClient.on('error', (error) => {
        console.error('MongoDB connection error:', error);
        mongoConnected = false;
      });
    } else {
      // Test the connection by pinging the database
      await mongoClient.db(mongoDBName).admin().ping();
    }
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    mongoConnected = false;

    // Try to reconnect
    try {
      await mongoClient.close();
      await mongoClient.connect();
      mongoConnected = true;
      console.log('MongoDB reconnected successfully');
    } catch (reconnectError) {
      console.error('Failed to reconnect to MongoDB:', reconnectError);
      throw reconnectError;
    }
  }
};

export const openPgConnection = async () => {
  const client = await pool.connect();
  return client;
};

export const closePgConnection = async (client: any) => {
  await client.release();
};

export const createPgRecord = async (tableName: string, data: any) => {
  const client = await pool.connect();

  try {
    const columns = Object.keys(data).join(',');
    const values = Object.values(data)
      .map((value: any) => {
        let newValue =
          typeof value === 'string' ? value.replace(/'/g, '') : value;

        // Handle arrays for PostgreSQL
        if (Array.isArray(value)) {
          if (value.length === 0) {
            return "'{}'";
          }
          const arrayString = value.map((item) => `"${item}"`).join(',');
          return `'{${arrayString}}'`;
        }

        return `'${newValue}'`;
      })
      .join(',');

    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values}) RETURNING *`;
    const { rows } = await client.query(query);

    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
};

export const updatePgRecord = async (
  tableName: string,
  id: string,
  data: any
) => {
  const client = await pool.connect();

  try {
    const columns = Object.keys(data)
      .map((key) => {
        let newValue =
          typeof data[key] === 'string'
            ? data[key].replace(/'/g, '')
            : data[key];

        // Handle arrays for PostgreSQL
        if (Array.isArray(data[key])) {
          if (data[key].length === 0) {
            return `${key} = '{}'`;
          }
          const arrayString = data[key]
            .map((item: any) => `"${item}"`)
            .join(',');
          return `${key} = '{${arrayString}}'`;
        }

        return `${key} = '${newValue}'`;
      })
      .join(',');

    const query = `UPDATE ${tableName} SET ${columns} WHERE id = ${id} RETURNING *`;

    const { rows } = await client.query(query);

    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
};

export const deletePgRecord = async (tableName: string, data: any) => {
  const client = await pool.connect();

  try {
    const columns = Object.keys(data).join(',');
    const values = Object.values(data)
      .map((value: any) => `'${value}'`)
      .join(',');
    const query = `DELETE FROM ${tableName} WHERE (${columns}) = (${values}) RETURNING *`;
    const { rows } = await client.query(query);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
};

export const getPgRecords = async (
  tableName: any,
  conditions: any,
  columns = '*',
  order = '1'
) => {
  const client = await pool.connect();

  try {
    let query = `SELECT ${columns} FROM ${tableName}`;

    if (conditions) {
      query += ` ${conditions}`;
    }

    // Check if a LIMIT is present in the conditions or order string
    const hasLimit = /limit\s+\d+/i.test(query);

    // If no limit, default to 1000
    if (!hasLimit) {
      query += ` ORDER BY ${order} LIMIT 1000`;
    } else {
      query += ` ORDER BY ${order}`;
    }

    const { rows } = await client.query(query);

    return rows;
  } catch (error) {
    console.log(error);
    return [];
  } finally {
    client.release();
  }
};

export const getMongoDatabases = async () => {
  try {
    await ensureMongoConnection();
    const db = mongoClient.db(mongoDBName);
    const databasesComplete: { name: string; database_type: string }[] = [];

    const databases = await db.admin().listDatabases();
    databases.databases.forEach((database: { name: string }) => {
      databasesComplete.push({
        name: database.name,
        database_type: 'mongo',
      });
    });

    return databasesComplete;
  } catch (error) {
    console.error('Error fetching MongoDB databases:', error);
    // Return empty array instead of throwing to prevent API crashes
    return [];
  }
};

export const getCollectionNames = async (databaseName: string) => {
  try {
    await ensureMongoConnection();
    const db = mongoClient.db(databaseName);
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((collection) => collection.name);
    return collectionNames;
  } catch (error) {
    console.error('Error fetching collection names:', error);
    // Return empty array instead of throwing to prevent API crashes
    return [];
  }
};

export const getMongoDocuments = async (databaseName: string) => {
  try {
    await ensureMongoConnection();
    const db = mongoClient.db(databaseName);
    const collection = db.collection(config.MONGO_COLLECTION || 'documents');
    const documents = await collection.find({}).toArray();
    return documents;
  } catch (error) {
    console.error('Error fetching documents:', error);
    // Return empty array instead of throwing to prevent API crashes
    return [];
  }
};

export const openMongoConnection = async (
  selectedMongoDBName?: string | undefined,
  selectedMongoCollection?: string | undefined
) => {
  let currentMongoDBName = mongoDBName;
  let currentMongoCollection = config.MONGO_COLLECTION;

  await ensureMongoConnection();

  if (selectedMongoDBName) {
    currentMongoDBName = selectedMongoDBName;
  } else if (selectedMongoDBName === 'all') {
    currentMongoDBName = '';
  }

  if (selectedMongoCollection) {
    currentMongoCollection = selectedMongoCollection;
  } else if (selectedMongoCollection === 'all') {
    currentMongoCollection = '';
  }

  const db = mongoClient.db(currentMongoDBName);

  if (!currentMongoCollection) {
    throw new Error('MONGO_COLLECTION is not defined in the configuration.');
  }

  return db.collection(currentMongoCollection);
};

export const closeMongoConnection = async () => {
  if (mongoConnected) {
    await mongoClient.close();
    mongoConnected = false;
    console.log('MongoDB connection closed');
  }
};
