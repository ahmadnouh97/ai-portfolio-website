#!/bin/bash

# Test script for Docker deployment
set -e

echo "🐳 Testing Docker deployment for AI Engineer Portfolio"
echo "=================================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

echo "✅ Docker is running"

# Check if docker-compose is available
if ! command -v docker-compose > /dev/null 2>&1; then
    echo "❌ docker-compose is not installed"
    exit 1
fi

echo "✅ docker-compose is available"

# Build the image
echo "🔨 Building Docker image..."
docker build -t portfolio-test:latest . || {
    echo "❌ Failed to build Docker image"
    exit 1
}

echo "✅ Docker image built successfully"

# Test health check endpoint
echo "🏥 Testing health check..."
docker run -d --name portfolio-test -p 8001:8000 portfolio-test:latest

# Wait for container to start
echo "⏳ Waiting for container to start..."
sleep 30

# Check if container is running
if ! docker ps | grep -q portfolio-test; then
    echo "❌ Container failed to start"
    docker logs portfolio-test
    docker rm -f portfolio-test
    exit 1
fi

echo "✅ Container is running"

# Test health endpoint
if curl -f http://localhost:8001/health/ > /dev/null 2>&1; then
    echo "✅ Health check endpoint is working"
else
    echo "❌ Health check endpoint failed"
    docker logs portfolio-test
    docker rm -f portfolio-test
    exit 1
fi

# Test main page
if curl -f http://localhost:8001/ > /dev/null 2>&1; then
    echo "✅ Main page is accessible"
else
    echo "⚠️  Main page might have issues (this could be normal if no data is populated)"
fi

# Cleanup
echo "🧹 Cleaning up..."
docker rm -f portfolio-test
docker rmi portfolio-test:latest

echo ""
echo "🎉 Docker deployment test completed successfully!"
echo "You can now deploy using:"
echo "  docker-compose up -d"
echo ""
echo "Or for development:"
echo "  docker-compose --profile dev up web-dev"