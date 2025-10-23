#!/usr/bin/env node

import dotenv from 'dotenv';
import pg from 'pg';
import { MongoClient } from 'mongodb';

const { Pool } = pg;

// Load environment variables
dotenv.config();

const config = {
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  MONGO_URL: process.env.MONGO_URL,
  MONGO_DB: process.env.MONGO_DB,
};

// Test PostgreSQL connection
async function testPostgreSQL() {
  console.log('🔗 Testing PostgreSQL connection...');
  
  const pool = new Pool({
    user: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    host: config.POSTGRES_HOST,
    database: config.POSTGRES_DB,
    port: Number(config.POSTGRES_PORT),
  });

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time, version() as pg_version');
    
    console.log('✅ PostgreSQL connection successful!');
    console.log(`   Time: ${result.rows[0].current_time}`);
    console.log(`   Version: ${result.rows[0].pg_version.split(' ')[0]} ${result.rows[0].pg_version.split(' ')[1]}`);
    
    // Test ai_crews table
    try {
      const crewsResult = await client.query('SELECT COUNT(*) as crew_count FROM ai_crews WHERE is_active = true');
      console.log(`   Active crews: ${crewsResult.rows[0].crew_count}`);
    } catch (error) {
      console.log('⚠️  ai_crews table not found - run initialization script');
    }
    
    client.release();
    await pool.end();
    
    return true;
  } catch (error) {
    console.log('❌ PostgreSQL connection failed:');
    console.log(`   Error: ${error.message}`);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Solution: Start PostgreSQL service or run docker-compose up');
    } else if (error.code === '28P01') {
      console.log('💡 Solution: Check username/password in .env file');
    } else if (error.code === '3D000') {
      console.log('💡 Solution: Create database or check database name in .env file');
    }
    
    return false;
  }
}

// Test MongoDB connection
async function testMongoDB() {
  console.log('\n🔗 Testing MongoDB connection...');
  
  const client = new MongoClient(config.MONGO_URL, {
    serverSelectionTimeoutMS: 5000,
  });

  try {
    await client.connect();
    const admin = client.db().admin();
    const result = await admin.ping();
    
    console.log('✅ MongoDB connection successful!');
    
    const db = client.db(config.MONGO_DB);
    const collections = await db.listCollections().toArray();
    console.log(`   Database: ${config.MONGO_DB}`);
    console.log(`   Collections: ${collections.length}`);
    
    await client.close();
    return true;
  } catch (error) {
    console.log('❌ MongoDB connection failed:');
    console.log(`   Error: ${error.message}`);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('💡 Solution: Start MongoDB service or run docker-compose up');
    }
    
    return false;
  }
}

// Main test function
async function main() {
  console.log('🚀 AI Startup Database Connection Test\n');
  
  console.log('Configuration:');
  console.log(`   PostgreSQL: ${config.POSTGRES_USER}@${config.POSTGRES_HOST}:${config.POSTGRES_PORT}/${config.POSTGRES_DB}`);
  console.log(`   MongoDB: ${config.MONGO_URL}\n`);
  
  const pgSuccess = await testPostgreSQL();
  const mongoSuccess = await testMongoDB();
  
  console.log('\n📊 Results:');
  console.log(`   PostgreSQL: ${pgSuccess ? '✅ Connected' : '❌ Failed'}`);
  console.log(`   MongoDB: ${mongoSuccess ? '✅ Connected' : '❌ Failed'}`);
  
  if (!pgSuccess || !mongoSuccess) {
    console.log('\n🔧 Quick Fix Commands:');
    console.log('   docker-compose up -d     # Start both databases');
    console.log('   npm run db:setup         # Initialize database schema');
    process.exit(1);
  }
  
  console.log('\n✅ All database connections successful!');
}

main().catch(console.error);