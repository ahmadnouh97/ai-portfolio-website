#!/bin/bash

# Build script for Tailwind CSS
echo "Building Tailwind CSS..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Build CSS for production
echo "Building production CSS..."
npm run build-css-prod

echo "Tailwind CSS build complete!"
echo "Generated file: static/css/output.css"