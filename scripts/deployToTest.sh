#!/bin/bash
set -e

echo "🚀 Starting Test Deployment..."

# Load user profile
source ~/.bashrc || source ~/.profile

# Ensure Node.js tools are in the PATH
export PATH=$HOME/.nvm/versions/node/v22.14.0/bin:$PATH

cd /home/emad/projects/amen24test || { echo "❌ Project directory not found"; exit 1; }

# Load backend test environment variables
export $(grep -v '^#' ./apps/backend/.env.test | xargs)

# Check required tools
for tool in node npm pm2; do
  if ! command -v $tool >/dev/null 2>&1; then
    echo "❌ $tool is not installed. Aborting."
    exit 1
  fi
done

# Stop existing PM2 services (ignore errors)
pm2 delete backend-test frontend-test || true

# Clean old builds and dependencies
npm run clean

# Install dependencies
npm run install:all

# Build shared packages
npm run build:packages

# Build and start backend
npm run build:backend

# Create backup folder if it doesn't exist
mkdir -p /home/emad/db_backups_test

# Generate timestamped backup file
BACKUP_FILE="/home/emad/db_backups_test/${DB_NAME}_backup_$(date +%F_%H-%M-%S).sql"

# Perform the backup
echo -e "\n📦 Backing up test database to: \n$BACKUP_FILE\n"
PGPASSWORD=$DB_PASSWORD pg_dump -U "$DB_USERNAME" -h "$DB_HOST" -d "$DB_NAME" -F c -f "$BACKUP_FILE"

# Run database migrations
# Drop and recreate test database
# echo "Resetting test database..."
# PGPASSWORD=$DB_PASSWORD psql -U "$DB_USERNAME" -h "$DB_HOST" -c "DROP DATABASE IF EXISTS $DB_NAME;"
# PGPASSWORD=$DB_PASSWORD psql -U "$DB_USERNAME" -h "$DB_HOST" -c "CREATE DATABASE $DB_NAME OWNER $DB_USERNAME;"

npm --prefix apps/backend run migrate:up:test
# npm --prefix apps/backend run seed:test

# Start backend
pm2 start ecosystem.config.js --only backend --env test

# Give backend a few seconds to start
sleep 5

# Build frontend and admin for test
npm run build:frontend:test

# Start frontend
pm2 start ecosystem.config.js --only frontend --env test


# Rename the processes manually
pm2 restart backend --name backend-test
pm2 restart frontend --name frontend-test

# Deploy admin site to /var/www/html
sudo rm -rf /var/www/html/adminsiteTest/*
sudo cp -ru /home/emad/projects/amen24test/apps/admin/dist/* /var/www/html/adminsiteTest

sudo chown -R www-data:www-data /var/www/html/adminsiteTest
sudo chmod -R 755 /var/www/html/adminsiteTest

# Restart nginx
sudo systemctl restart nginx.service

echo "✅ Test Deployment Completed Successfully!"
