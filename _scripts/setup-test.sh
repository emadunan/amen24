# Install shared dependencies and build
cd ../shared
npm i
npm run build

# Setup backend api 
cd ../backend
npm i
rm -Rf dist
npm run build
npm run migrate:up:test
npm run seed:test
cd ..
pm2 start ecosystem.config.js --only backend --env test

# Setup frontend website
cd ./frontend
npm i
rm -Rf .next
npm run build:test
cd ..
pm2 start ecosystem.config.js --only frontend --env test
