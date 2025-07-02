@echo off
echo 🍕 Pizza POS App Setup
echo ======================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Install dependencies
echo 📦 Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Check if React Native CLI is installed
react-native --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📱 Installing React Native CLI...
    npm install -g @react-native-community/cli
)

echo.
echo 🎉 Setup completed successfully!
echo.
echo Next steps:
echo 1. Start the Metro bundler: npm start
echo 2. Run on Android: npm run android
echo 3. Run on iOS: npm run ios (macOS only)
echo.
echo Demo login credentials:
echo - Driver: ID: 001, PIN: 1234
echo - Cashier: ID: 002, PIN: 5678
echo - Manager: ID: 003, PIN: 9999
echo.
echo For more information, see README.md
pause 