@echo off
REM SUNRISE INDUSTRIES - Local Development Server Startup Script (Windows)

echo.
echo 🌅 SUNRISE INDUSTRIES - Starting Local Development Environment
echo ==================================================
echo.

REM Check if running from correct directory
if not exist "backend" (
    echo ❌ Error: Please run this script from the WEBSITES directory
    pause
    exit /b 1
)

if not exist "frontend" (
    echo ❌ Error: Please run this script from the WEBSITES directory
    pause
    exit /b 1
)

REM Start backend
echo Starting Flask Backend...
cd backend

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed
    pause
    exit /b 1
)

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install requirements
pip install -r requirements.txt >nul 2>&1

REM Start Flask server
start "SUNRISE INDUSTRIES - Backend" python app.py
echo ✓ Backend started on http://localhost:5000
echo.

cd ..

REM Start frontend
echo Starting React Frontend...
cd frontend

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Install npm dependencies if needed
if not exist "node_modules" (
    echo Installing npm dependencies (this may take a few minutes)...
    call npm install
)

REM Start React development server
start "SUNRISE INDUSTRIES - Frontend" cmd /k "set BROWSER=none && npm start"
echo ✓ Frontend starting on http://localhost:3000
echo.

cd ..

echo ==================================================
echo 🎉 Development Environment Started!
echo ==================================================
echo Backend API:  http://localhost:5000
echo Frontend:     http://localhost:3000
echo ==================================================
echo.
pause
