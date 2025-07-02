# Quick Start Guide - Pizza POS App

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Android Studio (for Android) or Xcode (for iOS)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm start
```

### 3. Run on Device/Emulator

**Android:**
```bash
npm run android
```

**iOS (macOS only):**
```bash
npm run ios
```

## 🧪 Demo Credentials

Use these credentials to test the app:

| Role | Employee ID | PIN |
|------|-------------|-----|
| Driver | 001 | 1234 |
| Cashier | 002 | 5678 |
| Manager | 003 | 9999 |

## 📱 App Features

### Login Screen
- Employee authentication with PIN
- Role-based access control
- Quick login buttons for demo

### Dashboard
- Today's sales overview
- Quick action buttons
- Recent transactions
- System status

### Payment Terminal
- Digital keypad for amount entry
- Quick amount buttons ($5, $10, $15, etc.)
- Multiple payment methods (Cash, Card, NFC, Mobile)
- Tip management (15%, 18%, 20%, 30%, Custom)
- Real-time calculations

### Receipt Screen
- Professional receipt generation
- Multiple delivery options (SMS, Email, Print, Share)
- Transaction summary
- Navigation to new transaction or history

### Reports
- Sales analytics
- Employee performance
- Payment method breakdown
- Export functionality (PDF, CSV, Excel)

### Order History
- Complete transaction history
- Search and filtering
- Detailed transaction information
- Quick access to receipts

### Settings
- Store information configuration
- App preferences
- System information
- Data management options

## 🔧 Troubleshooting

### Common Issues

**Metro bundler not starting:**
```bash
npx react-native start --reset-cache
```

**Android build fails:**
```bash
cd android && ./gradlew clean && cd ..
npm run android
```

**iOS build fails:**
```bash
cd ios && pod install && cd ..
npm run ios
```

### Platform-Specific Setup

**Android:**
1. Install Android Studio
2. Set up Android SDK
3. Create/start Android emulator
4. Run `npm run android`

**iOS (macOS only):**
1. Install Xcode
2. Install CocoaPods: `sudo gem install cocoapods`
3. Run `cd ios && pod install && cd ..`
4. Run `npm run ios`

## 📞 Support

If you encounter any issues:
1. Check the README.md for detailed documentation
2. Ensure all prerequisites are installed
3. Try clearing cache and reinstalling dependencies
4. Check React Native troubleshooting guides

## 🎯 Next Steps

After getting the app running:
1. Explore all screens and features
2. Test different payment scenarios
3. Try the reporting functionality
4. Customize store information in Settings
5. Review the PRD for production requirements

---

**Happy coding! 🍕** 