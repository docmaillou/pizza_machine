# Pizza POS Mobile App

A comprehensive mobile point-of-sale (POS) application designed to replace physical Clover payment terminals at pizza delivery locations. This React Native app provides a complete solution for payment processing, tip management, receipt generation, and sales reporting.

## Features

### Core POS Functionality
- **Digital Keypad**: Large, touch-friendly numeric input for order amounts
- **Quick Amount Buttons**: Pre-set common order values for faster processing
- **Multiple Payment Methods**: Support for cash, card, NFC/tap, and mobile payments
- **Tip Management**: Preset tip options (15%, 18%, 20%, 30%) with custom tip entry
- **Real-time Calculations**: Automatic tip and total calculations

### Receipt Management
- **Digital Receipts**: Professional receipt generation with store branding
- **Multiple Delivery Options**: SMS, email, print, and share functionality
- **Receipt Customization**: Configurable store information and receipt content
- **Receipt History**: Complete transaction history with search and filtering

### Reporting & Analytics
- **Sales Dashboard**: Real-time sales overview with key metrics
- **Employee Performance**: Individual sales and tip tracking
- **Payment Method Analysis**: Breakdown by payment type
- **Time-based Reports**: Hourly, daily, weekly, and monthly views
- **Export Functionality**: PDF, CSV, and Excel export options

### User Management
- **Role-based Access**: Driver, cashier, and manager roles
- **Employee Authentication**: Secure PIN-based login system
- **Session Management**: Automatic timeout and logout functionality
- **Activity Tracking**: Complete audit trail of all transactions

### System Features
- **Offline Mode**: Queue transactions when internet is unavailable
- **Data Backup**: Cloud storage integration for data safety
- **Settings Management**: Comprehensive app configuration options
- **System Status**: Real-time monitoring of connectivity and device status

## Screenshots

The app includes the following main screens:
- **Login Screen**: Employee authentication with role-based access
- **Dashboard**: Sales overview, quick actions, and system status
- **Payment Terminal**: Main POS interface with keypad and payment options
- **Receipt Screen**: Transaction completion with receipt delivery options
- **Reports**: Comprehensive analytics and export functionality
- **Order History**: Complete transaction history with search and filtering
- **Settings**: App configuration and system management

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pizza_machine
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies (macOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start the Metro bundler**
   ```bash
   npm start
   ```

5. **Run on Android**
   ```bash
   npm run android
   ```

6. **Run on iOS (macOS only)**
   ```bash
   npm run ios
   ```

### Demo Login Credentials

For testing purposes, the app includes demo employee accounts:

- **Driver**: ID: `001`, PIN: `1234`
- **Cashier**: ID: `002`, PIN: `5678`
- **Manager**: ID: `003`, PIN: `9999`

## Project Structure

```
pizza_machine/
├── App.js                 # Main app component with navigation
├── index.js              # App entry point
├── package.json          # Dependencies and scripts
├── src/
│   ├── screens/          # App screens
│   │   ├── LoginScreen.js
│   │   ├── DashboardScreen.js
│   │   ├── PaymentScreen.js
│   │   ├── ReceiptScreen.js
│   │   ├── ReportsScreen.js
│   │   ├── SettingsScreen.js
│   │   └── OrderHistoryScreen.js
│   └── theme/
│       └── theme.js      # App theme configuration
├── prd.txt              # Product Requirements Document
└── README.md            # This file
```

## Key Technologies

- **React Native**: Cross-platform mobile development
- **React Navigation**: Screen navigation and routing
- **React Native Paper**: Material Design components
- **React Native Vector Icons**: Icon library
- **React Native Safe Area Context**: Safe area handling

## Configuration

### Theme Customization
The app uses a centralized theme system located in `src/theme/theme.js`. You can customize:
- Color scheme
- Typography
- Spacing
- Border radius values

### Store Information
Store details can be configured in the Settings screen:
- Store name and address
- Contact information
- Receipt branding

## Development

### Adding New Features
1. Create new screen components in `src/screens/`
2. Add navigation routes in `App.js`
3. Update the theme if new styling is needed
4. Test on both Android and iOS

### Payment Integration
The app is designed to integrate with various payment processors:
- Stripe
- Square
- Clover
- Custom payment gateways

### Database Integration
For production use, replace mock data with:
- SQLite for local storage
- Cloud databases (Firebase, AWS, etc.)
- REST APIs for server communication

## Production Deployment

### Android
1. Generate signed APK/AAB
2. Configure payment processor credentials
3. Set up production environment variables
4. Test on physical devices

### iOS
1. Configure Apple Developer account
2. Set up App Store Connect
3. Configure payment processor credentials
4. Submit for App Store review

## Security Considerations

- All payment data is encrypted in transit and at rest
- Employee authentication uses secure PIN system
- Session timeout prevents unauthorized access
- Audit logging for all transactions
- PCI DSS compliance for payment processing

## Support

For technical support or feature requests, please contact the development team.

## License

This project is proprietary software. All rights reserved.

---

**Version**: 1.0.0  
**Last Updated**: January 2024  
**Compatibility**: iOS 14+, Android 8.0+ 