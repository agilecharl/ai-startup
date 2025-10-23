# PostgreSQL Configuration for AI Startup Crews
# Copy this file to the location where your Python script expects it

# PostgreSQL Connection Settings (matching your .env file)
POSTGRES_HOST = "localhost"
POSTGRES_PORT = 5432
POSTGRES_DB = "aistartup"
POSTGRES_USER = "aistartup"
POSTGRES_PASSWORD = "aistartup"

# Alternative: You can also use environment variables in Python:
# import os
# POSTGRES_HOST = os.getenv('POSTGRES_HOST', 'localhost')
# POSTGRES_PORT = int(os.getenv('POSTGRES_PORT', 5432))
# POSTGRES_DB = os.getenv('POSTGRES_DB', 'aistartup')
# POSTGRES_USER = os.getenv('POSTGRES_USER', 'aistartup')
# POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD', 'aistartup')

print("✅ PostgreSQL config loaded - using database: aistartup")
print("🤖 Available crews: agile_default, development_crew, business_analysis")