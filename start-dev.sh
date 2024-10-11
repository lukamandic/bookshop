#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Installing dependencies first first"
echo "============CONCURRENTLY=================="
npm install -g concurrently
echo "=========================================="


echo "============AIR==========================="
cd backend
go install github.com/cosmtrek/air@latest
echo "=========================================="

cd ..

# Step 1: Start the frontend and backend with hot reloading
echo "Starting the frontend and backend with hot reloading..."
concurrently --kill-others "cd frontend && npm run dev" "cd backend && air"