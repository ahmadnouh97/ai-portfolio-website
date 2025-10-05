@echo off
REM Test script for Docker deployment on Windows
echo 🐳 Testing Docker deployment for AI Engineer Portfolio
echo ==================================================

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not running. Please start Docker first.
    exit /b 1
)

echo ✅ Docker is running

REM Check if docker-compose is available
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ docker-compose is not installed
    exit /b 1
)

echo ✅ docker-compose is available

REM Build the image
echo 🔨 Building Docker image...
docker build -t portfolio-test:latest .
if errorlevel 1 (
    echo ❌ Failed to build Docker image
    exit /b 1
)

echo ✅ Docker image built successfully

REM Test health check endpoint
echo 🏥 Testing health check...
docker run -d --name portfolio-test -p 8001:8000 portfolio-test:latest

REM Wait for container to start
echo ⏳ Waiting for container to start...
timeout /t 30 /nobreak >nul

REM Check if container is running
docker ps | findstr portfolio-test >nul
if errorlevel 1 (
    echo ❌ Container failed to start
    docker logs portfolio-test
    docker rm -f portfolio-test
    exit /b 1
)

echo ✅ Container is running

REM Test health endpoint
curl -f http://localhost:8001/health/ >nul 2>&1
if errorlevel 1 (
    echo ❌ Health check endpoint failed
    docker logs portfolio-test
    docker rm -f portfolio-test
    exit /b 1
) else (
    echo ✅ Health check endpoint is working
)

REM Test main page
curl -f http://localhost:8001/ >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Main page might have issues (this could be normal if no data is populated)
) else (
    echo ✅ Main page is accessible
)

REM Cleanup
echo 🧹 Cleaning up...
docker rm -f portfolio-test
docker rmi portfolio-test:latest

echo.
echo 🎉 Docker deployment test completed successfully!
echo You can now deploy using:
echo   docker-compose up -d
echo.
echo Or for development:
echo   docker-compose --profile dev up web-dev