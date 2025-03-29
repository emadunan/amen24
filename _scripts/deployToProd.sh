#!/bin/bash

# Explicitly source profile files
source ~/.bashrc || source ~/.profile

# Ensure Node.js tools are in the PATH
export PATH=$HOME/.nvm/versions/node/v22.14.0/bin:$PATH

cp ./backend/dist ./backend/build
cp ./frontend/.next ./frontend/build

pm2 del ecosystem.config.js

pm2 start ecosystem.config.js --env production