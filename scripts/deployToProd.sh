#!/bin/bash
set -e

echo "🚀 Starting Production Deployment..."

# Load user profile
source ~/.bashrc || source ~/.profile

# Ensure Node.js tools are in the PATH
export PATH=$HOME/.nvm/versions/node/v22.14.0/bin:$PATH

cd /home/emad/projects/amen24prod || { echo "❌ Project directory not found"; exit 1; }

# Load backend production environment variables
export $(grep -v '^#' ./apps/backend/.env.production | xargs)

# Check required tools
for tool in node npm pm2; do
  if ! command -v $tool >/dev/null 2>&1; then
    echo "❌ $tool is not installed. Aborting."
    exit 1
  fi
done

# Stop existing PM2 services (ignore errors)
pm2 delete backend-prod frontend-prod || true

# Clean old builds and dependencies
npm run clean

# Install dependencies
npm run install:all

# Build shared packages
npm run build:packages

# Build and start backend
npm run build:backend

# Create backup folder if it doesn't exist
mkdir -p /home/emad/db_backups_prod

# Generate timestamped backup file
BACKUP_FILE="/home/emad/db_backups_prod/${DB_NAME}_backup_$(date +%F_%H-%M-%S).sql"

# Perform the backup
echo -e "\n📦 Backing up production database to: \n$BACKUP_FILE\n"
PGPASSWORD=$DB_PASSWORD pg_dump -U "$DB_USERNAME" -h "$DB_HOST" -d "$DB_NAME" -F c -f "$BACKUP_FILE"

# Run database migrations
# Drop and recreate production database
# echo "Resetting production database..."
# PGPASSWORD=$DB_PASSWORD psql -U "$DB_USERNAME" -h "$DB_HOST" -c "DROP DATABASE IF EXISTS $DB_NAME;"
# PGPASSWORD=$DB_PASSWORD psql -U "$DB_USERNAME" -h "$DB_HOST" -c "CREATE DATABASE $DB_NAME OWNER $DB_USERNAME;"

npm --prefix apps/backend run migrate:up:prod
# npm --prefix apps/backend run normalize:native:prod
# npm --prefix apps/backend run seed:prod

# Start backend
pm2 start ecosystem.config.js --only backend --env production

# Give backend a few seconds to start
sleep 5

# Build frontend and admin for production
npm run build:frontend

# Start frontend
pm2 start ecosystem.config.js --only frontend --env production


# Rename the processes manually
pm2 restart backend --name backend-prod
pm2 restart frontend --name frontend-prod

# Deploy admin site to /var/www/
sudo rm -rf /var/www/admin.amen24.org/*
sudo cp -ru /home/emad/projects/amen24prod/apps/admin/dist/* /var/www/admin.amen24.org

sudo chown -R www-data:www-data /var/www/admin.amen24.org
sudo chmod -R 755 /var/www/admin.amen24.org

# Restart nginx
sudo nginx -t && sudo systemctl restart nginx.service

echo "✅ Production Deployment Completed Successfully!"
