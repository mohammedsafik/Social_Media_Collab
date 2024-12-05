@echo off
echo Installing backend dependencies...
cd backend
call npm install

echo.
echo Installing frontend dependencies...
cd ../frontend
call npm install

echo.
echo Setup complete! To start the application:
echo 1. Start the backend: cd backend && npm run dev
echo 2. In a new terminal: cd frontend && npm start
