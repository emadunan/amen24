#!/bin/bash
set -e  # Exit immediately if any command fails

echo "Starting Production Deployment..."

# Load user profile to ensure correct environment
source ~/.bashrc || source ~/.profile

# Ensure Node.js tools are in the PATH
export PATH=$HOME/.nvm/versions/node/v22.14.0/bin:$PATH

# Load production environment variables from .env.production
export $(grep -v '^#' /home/emad/projects/amen24prod/apps/backend/.env.production | xargs)

# Verify required tools
command -v node >/dev/null 2>&1 || { echo >&2 "Node.js is not installed. Aborting."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo >&2 "NPM is not installed. Aborting."; exit 1; }
command -v pm2 >/dev/null 2>&1 || { echo >&2 "PM2 is not installed. Aborting."; exit 1; }

# Navigate to the project directory
cd /home/emad/projects/amen24prod || { echo "Project directory not found"; exit 1; }

# Stop current PM2 services
pm2 del backend-prod frontend-prod || echo "No existing PM2 processes found"

# Install shared dependencies
cd packages/shared
rm -rf node_modules dist
npm install
npm run build
cd ..

# Install ui dependencies
cd ui
rm -rf node_modules dist
npm install
npm run build
cd ../..

# Setup backend API
cd apps/backend
rm -rf node_modules dist
npm install
npm run build

# Create backup folder if it doesn't exist
mkdir -p /home/emad/db_backups_prod

# Generate timestamped backup file
BACKUP_FILE="/home/emad/db_backups_prod/${DB_NAME}_backup_$(date +%F_%H-%M-%S).sql"

# Perform the backup
echo -e "\n📦 Backing up production database to: \n$BACKUP_FILE\n"
PGPASSWORD=$DB_PASSWORD pg_dump -U "$DB_USERNAME" -h "$DB_HOST" -d "$DB_NAME" > "$BACKUP_FILE"

echo "Backup complete!"

# Drop and recreate production database
echo "Resetting production database..."
PGPASSWORD=$DB_PASSWORD psql -U "$DB_USERNAME" -h "$DB_HOST" -c "DROP DATABASE IF EXISTS $DB_NAME;"
PGPASSWORD=$DB_PASSWORD psql -U "$DB_USERNAME" -h "$DB_HOST" -c "CREATE DATABASE $DB_NAME OWNER $DB_USERNAME;"

npm run migrate:up:prod
npm run seed:prod

cd ../..
pm2 start ecosystem.config.js --only backend --env production

# Setup frontend website
cd apps/frontend
rm -rf node_modules .next
npm install
npm run build
cd ../..
pm2 start ecosystem.config.js --only frontend --env production

# Rename the processes manually
pm2 restart backend --name backend-prod
pm2 restart frontend --name frontend-prod

# Restart necessary services
sudo systemctl restart postgresql.service
sudo systemctl restart nginx.service

echo "Production Deployment Completed Successfully!"
