#!/bin/bash

# Explicitly source profile files
source ~/.bashrc || source ~/.profile

# Ensure Node.js tools are in the PATH
export PATH=$HOME/.nvm/versions/node/v22.14.0/bin:$PATH

# Debugging output
echo "Current PATH: $PATH"
which pm2
which npm
pwd

# Delete current deploy
cd ../
pm2 del ecosystem.config.js 

# Install shared dependencies and build
cd ./shared
npm i
npm run build

# Setup backend api 
cd ../backend
npm i
rm -Rf dist
npm run build
npm run migrate:up:test
cd ..
pm2 start ecosystem.config.js --only backend --env test

# Setup frontend website
cd ./frontend
npm i
rm -Rf .next
npm run build:test
cd ..
pm2 start ecosystem.config.js --only frontend --env test

# Restart nginx
sudo systemctl restart postgresql.service
