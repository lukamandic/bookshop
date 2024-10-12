#!/bin/bash

set -e

echo "Building the React app..."
cd frontend
npm install
npm run build

echo "Transferring build files to the backend build folder..."
cd ..
rm -rf backend/build
mkdir -p backend/build
cp -r frontend/dist/* backend/build/

echo "Starting the Go server..."
cd backend
go run main.go &

echo "Starting the revisions server..."
cd ../revisions
go run main.go &

# Wait for all background processes to finish
wait