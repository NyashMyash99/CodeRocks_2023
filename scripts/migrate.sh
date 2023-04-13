#!/bin/sh

set -o allexport && source ../.env && set +o allexport

echo "Applying Postgres migrations..."
cd ../apps/server || echo "Path to 'server' folder was not found"
npx prisma db push

echo "All migrations applied!"
