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

# Install all dependencies and build backend, frontend, and admin site
# Install all
npm run install:all

# Clean old PM2 processes
pm2 del backend-test frontend-test || echo "No existing PM2 processes found"

# Clean old builds
npm run clean

# Build packages
npm run build:packages

# Build backend
npm run build:backend

# Start backend (so frontend can fetch from it)
pm2 start ecosystem.config.js --only backend --env test
pm2 restart backend --name backend-test

# Wait a bit to make sure backend is up (important)
sleep 5

# Build frontend
npm run build:frontend:test

# Build admin
npm run build:admin:test

# Start frontend
pm2 start ecosystem.config.js --only frontend --env test
pm2 restart frontend --name frontend-test

# Redeploy Adminsite
sudo rm -Rf /var/www/html/assets/ /var/www/html/index.html /var/www/html/vite.svg
sudo cp -ru /home/emad/projects/amen24test/apps/admin/dist/* /var/www/html/

# Restart services (nginx etc.)
sudo systemctl restart nginx.service

# (Skip postgresql restart unless you really need it)
# sudo systemctl restart postgresql.service

echo "✅ Test Deployment Completed Successfully!"
