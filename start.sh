#!/bin/bash
echo "Starting MongoDB container..."
docker-compose up -d mongo

# Wait for MongoDB to be fully operational
echo "Waiting for MongoDB to become ready..."
until docker exec mongo mongo --username root --password secret --authenticationDatabase admin --eval "db.stats()" &> /dev/null; do
    echo -n "."
    sleep 1
done
echo "MongoDB is ready."

echo "Installing the dependencies..."
npm install

echo "Running test cases"
npm run test

sleep 10


echo "Preparing the data..."
node src/app/config/seedData.js

echo "Building the application"
npm run build

echo "Building and starting the app container..."
docker-compose up -d --build app

echo "All services started successfully."
