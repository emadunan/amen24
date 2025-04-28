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
pm2 start ecosystem.config.js --only backend --env test --name backend-test

# Give backend a few seconds to start
sleep 5

# Build frontend and admin for test
npm run build:frontend:test

# Start frontend
pm2 start ecosystem.config.js --only frontend --env test --name frontend-test

# Deploy admin site to /var/www/html
sudo rm -rf /var/www/html/*
sudo cp -ru /home/emad/projects/amen24test/apps/admin/dist/* /var/www/html/

# Restart nginx
sudo systemctl restart nginx.service

echo "✅ Test Deployment Completed Successfully!"
