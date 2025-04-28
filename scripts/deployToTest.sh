#!/bin/bash
set -e  # Exit immediately if any command fails

echo "🚀 Starting Test Deployment..."

# Load user profile
source ~/.bashrc || source ~/.profile

# Ensure Node.js tools are in the PATH
export PATH=$HOME/.nvm/versions/node/v22.14.0/bin:$PATH

# Navigate to the project directory
cd /home/emad/projects/amen24test || { echo "Project directory not found"; exit 1; }

# Load backend test environment variables
export $(grep -v '^#' ./apps/backend/.env.test | xargs)

# Verify required tools
for tool in node npm pm2; do
  command -v $tool >/dev/null 2>&1 || { echo >&2 "$tool is not installed. Aborting."; exit 1; }
done

# Stop PM2 services
pm2 del backend-test frontend-test || echo "No existing PM2 processes found"

# Clean old builds
npm run clean

# Install and build all apps and packages
npm run install:all
npm run build:test

# Backup database
mkdir -p /home/emad/db_backups_test
BACKUP_FILE="/home/emad/db_backups_test/${DB_NAME}_backup_$(date +%F_%H-%M-%S).sql"
echo -e "\n📦 Backing up test database to:\n$BACKUP_FILE\n"
PGPASSWORD=$DB_PASSWORD pg_dump -U "$DB_USERNAME" -h "$DB_HOST" -d "$DB_NAME" > "$BACKUP_FILE"
echo "✅ Backup complete!"

# Migrate database
cd apps/backend
npm run migrate:up:test
cd ../..

# Start backend and frontend with PM2
pm2 start ecosystem.config.js --only backend --env test
pm2 start ecosystem.config.js --only frontend --env test

# Rename processes
pm2 restart backend --name backend-test
pm2 restart frontend --name frontend-test

# Redeploy Adminsite
rm -Rf /var/www/html/assets/ /var/www/html/index.html /var/www/html/vite.svg
cp -ru /home/emad/projects/amen24test/apps/admin/dist/* /var/www/html/

# Restart PostgreSQL and Nginx
sudo systemctl restart postgresql.service
sudo systemctl restart nginx.service

echo "✅ Test Deployment Completed Successfully!"
