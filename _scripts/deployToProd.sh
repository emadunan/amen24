#!/bin/bash
set -e  # Exit immediately if any command fails

echo "Starting Production Deployment..."

# Load user profile to ensure correct environment
source ~/.bashrc || source ~/.profile

# Ensure Node.js tools are in the PATH
export PATH=$HOME/.nvm/versions/node/v22.14.0/bin:$PATH

# Verify required tools
command -v node >/dev/null 2>&1 || { echo >&2 "Node.js is not installed. Aborting."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo >&2 "NPM is not installed. Aborting."; exit 1; }
command -v pm2 >/dev/null 2>&1 || { echo >&2 "PM2 is not installed. Aborting."; exit 1; }

# Navigate to the project directory
cd /home/emad/projects/amen24prod || { echo "Project directory not found"; exit 1; }

# Stop current PM2 services
pm2 del ecosystem.config.js || echo "No existing PM2 processes found"

# Install shared dependencies
cd shared
rm -rf node_modules dist  # Clean old dependencies and builds
npm install
npm run build
cd ..

# Setup backend API
cd backend
rm -rf node_modules dist
npm install
npm run build
npm run migrate:up:prod  # Apply migrations for test database
cd ..
pm2 start ecosystem.config.js --only backend --env production

# Setup frontend website
cd frontend
rm -rf node_modules .next
npm install
npm run build
cd ..
pm2 start ecosystem.config.js --only frontend --env production

# Restart necessary services
sudo systemctl restart postgresql.service
sudo systemctl restart nginx.service

echo "Production Deployment Completed Successfully!"
