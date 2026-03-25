#!/bin/bash

# SUNRISE INDUSTRIES - Local Development Server Startup Script

echo "🌅 SUNRISE INDUSTRIES - Starting Local Development Environment"
echo "=================================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if running from correct directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the WEBSITES directory"
    exit 1
fi

# Start backend
echo -e "${BLUE}Starting Flask Backend...${NC}"
cd backend

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 is not installed"
    exit 1
fi

# Install Python dependencies if needed
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install requirements
pip install -r requirements.txt > /dev/null 2>&1

# Start Flask server in background
python3 app.py &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend started on http://127.0.0.1:5000${NC}"

cd ..

# Start frontend
echo -e "${BLUE}Starting React Frontend...${NC}"
cd frontend

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    kill $BACKEND_PID
    exit 1
fi

# Install npm dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies (this may take a few minutes)..."
    npm install > /dev/null 2>&1
fi

# Start React development server
env -u HOST BROWSER=none npm start &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend starting on http://127.0.0.1:3000${NC}"

cd ..

echo ""
echo -e "${GREEN}=================================================="
echo "🎉 Development Environment Started!"
echo "=================================================="
echo -e "Backend API:  ${BLUE}http://127.0.0.1:5000${NC}"
echo -e "Frontend:     ${BLUE}http://127.0.0.1:3000${NC}"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "=================================================="
echo ""

# Wait for both processes
wait
