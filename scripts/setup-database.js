#!/usr/bin/env node

import { config } from '../apps/api/src/config.js';
import pg from 'pg';
import fs from 'fs';
import path from 'path';

const { Pool } = pg;

async function setupDatabase() {
  console.log('🚀 Setting up AI Startup Database...\n');
  
  const pool = new Pool({
    user: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    host: config.POSTGRES_HOST,
    database: config.POSTGRES_DB,
    port: Number(config.POSTGRES_PORT),
  });

  try {
    const client = await pool.connect();
    
    // Read and execute initialization script
    const initScript = fs.readFileSync(
      path.join(process.cwd(), 'scripts', 'init-db.sql'), 
      'utf8'
    );
    
    console.log('📝 Executing database initialization script...');
    await client.query(initScript);
    
    // Verify setup
    const crewsResult = await client.query('SELECT COUNT(*) as crew_count FROM ai_crews WHERE is_active = true');
    const logsResult = await client.query('SELECT COUNT(*) as log_count FROM execution_logs');
    
    console.log('✅ Database setup completed successfully!');
    console.log(`   Created ai_crews table with ${crewsResult.rows[0].crew_count} active crews`);
    console.log(`   Created execution_logs table (${logsResult.rows[0].log_count} records)`);
    
    // List available crews
    const crews = await client.query('SELECT name, description FROM ai_crews WHERE is_active = true ORDER BY name');
    console.log('\n🤖 Available Crews:');
    crews.rows.forEach(crew => {
      console.log(`   • ${crew.name}: ${crew.description}`);
    });
    
    client.release();
    await pool.end();
    
  } catch (error) {
    console.log('❌ Database setup failed:');
    console.log(`   Error: ${error.message}`);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Solution:');
      console.log('   1. Start PostgreSQL: docker-compose up -d postgres');
      console.log('   2. Or install PostgreSQL locally and start the service');
    } else if (error.code === '28P01') {
      console.log('\n💡 Solution:');
      console.log('   1. Check your .env file credentials');
      console.log('   2. Ensure POSTGRES_USER and POSTGRES_PASSWORD are correct');
    } else if (error.code === '3D000') {
      console.log('\n💡 Solution:');
      console.log('   1. Create the database first:');
      console.log('      psql -U postgres -c "CREATE DATABASE aistartup;"');
      console.log('   2. Or check the POSTGRES_DB value in .env');
    }
    
    process.exit(1);
  }
}

setupDatabase().catch(console.error);