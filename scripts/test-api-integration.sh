#!/bin/sh

echo "Starting api integration tests..."

cd ../apps/server || echo "Path to 'server' folder was not found7"
set -o allexport && source ./.env.test && set +o allexport

echo "Starting Docker DB for integration tests..."
npm run test:integration:docker:up

echo "Waiting until postgres is up and running..."
sleep 5

echo "Starting integration tests..."
npm run test:integration

echo "Removing Docker DB for integration tests..."
npm run test:integration:docker:down

echo "Done."
