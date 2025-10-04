@echo off
REM Build script for Tailwind CSS on Windows

echo Building Tailwind CSS...

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js first.
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo npm is not installed. Please install npm first.
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

REM Build CSS for production
echo Building production CSS...
npm run build-css-prod

echo Tailwind CSS build complete!
echo Generated file: static/css/output.css