-- AI Startup Database Initialization Script
-- This script sets up the required tables for crew configuration

-- Create extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ai_crews table for storing crew configurations
CREATE TABLE IF NOT EXISTS ai_crews (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    agents JSONB NOT NULL,
    tasks JSONB,
    process VARCHAR(50) DEFAULT 'sequential',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ai_crews_name ON ai_crews(name) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_ai_crews_active ON ai_crews(is_active);

-- Create trigger for updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ai_crews_updated_at BEFORE UPDATE ON ai_crews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample crew configurations
INSERT INTO ai_crews (name, description, agents, tasks, process, is_active) VALUES
(
    'agile_default',
    'Default agile task management crew for prioritization and simplification',
    '[
        {
            "role": "Prioritizer",
            "goal": "Prioritize tasks for maximum gain with minimum effort",
            "backstory": "Expert in identifying high-ROI tasks quickly and efficiently",
            "tools": ["task_analysis", "web_search"],
            "verbose": true
        },
        {
            "role": "Simplifier",
            "goal": "Simplify complex tasks into actionable steps",
            "backstory": "Specialist in breaking down complex problems into manageable components",
            "tools": ["decision_simplifier", "progress_tracker"],
            "verbose": true
        }
    ]',
    '[
        {
            "description": "Analyze and prioritize the given tasks based on effort vs impact",
            "expected_output": "A prioritized list with effort/impact scores and reasoning",
            "agent": "Prioritizer"
        },
        {
            "description": "Simplify the top-priority tasks into clear, actionable steps",
            "expected_output": "Step-by-step breakdown with clear next actions",
            "agent": "Simplifier"
        }
    ]',
    'sequential',
    true
),
(
    'development_crew',
    'Software development focused crew for technical tasks',
    '[
        {
            "role": "Tech Lead",
            "goal": "Provide technical guidance and architecture decisions",
            "backstory": "Senior developer with expertise in modern software architecture",
            "tools": ["web_search", "task_analysis"],
            "verbose": true
        },
        {
            "role": "Developer",
            "goal": "Implement solutions and write quality code",
            "backstory": "Experienced developer focused on clean, maintainable code",
            "tools": ["decision_simplifier"],
            "verbose": true
        }
    ]',
    '[
        {
            "description": "Review technical requirements and suggest architecture approach",
            "expected_output": "Technical approach with architecture recommendations",
            "agent": "Tech Lead"
        },
        {
            "description": "Break down implementation into development tasks",
            "expected_output": "Detailed implementation plan with task breakdown",
            "agent": "Developer"
        }
    ]',
    'sequential',
    true
),
(
    'business_analysis',
    'Business analysis and strategy crew',
    '[
        {
            "role": "Business Analyst",
            "goal": "Analyze business requirements and market opportunities",
            "backstory": "Expert in business analysis with market research experience",
            "tools": ["web_search", "task_analysis"],
            "verbose": true
        },
        {
            "role": "Strategy Advisor",
            "goal": "Provide strategic recommendations and action plans",
            "backstory": "Senior strategist with experience in startup growth",
            "tools": ["decision_simplifier", "progress_tracker"],
            "verbose": true
        }
    ]',
    '[
        {
            "description": "Analyze the business opportunity and market landscape",
            "expected_output": "Business analysis report with market insights",
            "agent": "Business Analyst"
        },
        {
            "description": "Develop strategic recommendations and action plan",
            "expected_output": "Strategic action plan with prioritized initiatives",
            "agent": "Strategy Advisor"
        }
    ]',
    'sequential',
    true
);

-- Create execution_logs table for tracking crew executions
CREATE TABLE IF NOT EXISTS execution_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    crew_name VARCHAR(100) NOT NULL,
    execution_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    execution_end TIMESTAMP,
    status VARCHAR(50) DEFAULT 'running',
    input_data TEXT,
    output_data TEXT,
    error_message TEXT,
    duration_seconds INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for execution logs
CREATE INDEX IF NOT EXISTS idx_execution_logs_crew_name ON execution_logs(crew_name);
CREATE INDEX IF NOT EXISTS idx_execution_logs_status ON execution_logs(status);
CREATE INDEX IF NOT EXISTS idx_execution_logs_created_at ON execution_logs(created_at);

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO aistartup;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO aistartup;

-- Display setup completion message
DO $$
BEGIN
    RAISE NOTICE 'AI Startup database initialized successfully!';
    RAISE NOTICE 'Created tables: ai_crews, execution_logs';
    RAISE NOTICE 'Inserted % sample crews', (SELECT COUNT(*) FROM ai_crews WHERE is_active = true);
END $$;