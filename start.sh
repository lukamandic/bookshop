#!/bin/bash

set -e

echo "Building the React app..."
cd frontend
npm run build

echo "Transferring build files to the backend build folder..."
cd ..
rm -rf backend/build
mkdir -p backend/build
cp -r frontend/dist/* backend/build/

echo "Starting the Go server..."
cd backend
go run main.go