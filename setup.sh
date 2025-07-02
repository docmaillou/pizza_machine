#!/bin/bash

echo "🍕 Pizza POS App Setup"
echo "======================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Check if React Native CLI is installed
if ! command -v react-native &> /dev/null; then
    echo "📱 Installing React Native CLI..."
    npm install -g @react-native-community/cli
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Start the Metro bundler: npm start"
echo "2. Run on Android: npm run android"
echo "3. Run on iOS: npm run ios (macOS only)"
echo ""
echo "Demo login credentials:"
echo "- Driver: ID: 001, PIN: 1234"
echo "- Cashier: ID: 002, PIN: 5678"
echo "- Manager: ID: 003, PIN: 9999"
echo ""
echo "For more information, see README.md" 