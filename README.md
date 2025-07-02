# Pizza Barbas POS

A React Native point-of-sale application that replicates the **exact Clover POS interface** for "Pizza Barbas" restaurant. This app features a complete French-language interface with touchless payment capabilities via phone contacts.

## 🚀 Features

### 📱 Clover-Style Interface
- **PIN Entry Screen**: Blue interface with "PIZZA BARBAS" branding and numeric keypad
- **Sales Entry Screen**: Clean "Vente" interface with amount display and keypad
- **Processing Screen**: "Traitement..." with animated loading indicators
- **Reports Dashboard**: Complete "Rapports" with sales overview and employee data

### 💳 Payment Processing
- Card payments simulation
- NFC/Contactless payment support
- Touchless payment via phone contacts
- Real-time transaction processing
- 90% success rate simulation

### 📊 Reports & Analytics
- **Aperçu des ventes** (Sales Overview)
- **Ventes par employé** (Employee Sales)
- Real-time financial data
- French-formatted currency (€ with comma decimals)
- Device tracking and session management

### 🔐 Authentication
- 4-digit PIN authentication
- Role-based access (Manager, Cashier, Driver, Admin)
- Session management

## 🛠️ Technical Stack

- **React Native** 0.79.5
- **Expo SDK** 53.0.16
- **React Navigation** 6.x
- **React Native Paper** (Material Design components)
- **@expo/vector-icons** (Material Icons)
- **French Language Support**

## 📱 Screenshots Match

The app **exactly replicates** the Clover POS interface shown in your screenshots:

1. **Screen 1**: Blue PIN entry with "PIZZA BARBAS" title
2. **Screen 2**: White sales entry with "Vente" header and amount keypad
3. **Screen 3**: Processing screen with "Traitement..." text
4. **Screen 4-5**: Reports screens with French financial data

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on device
# Scan QR code with Expo Go app
```

## 🎮 Demo Credentials

Use any 4-digit PIN to access the app:
- `1234` - Manager
- `5678` - Cashier  
- `9999` - Driver
- `0000` - Admin

## 📝 Usage Flow

1. **PIN Entry**: Enter 4-digit PIN → Navigate to Sales
2. **Sales Entry**: Enter amount → Process payment
3. **Processing**: Automatic payment simulation → Success/Error
4. **Reports**: View sales data and employee performance

## 🎯 Key Features Implemented

### French Interface
- All text in French (Vente, Traitement, Rapports, etc.)
- French date/time formatting
- European currency formatting (€ with commas)

### Clover-Style Design
- Exact color schemes from screenshots
- Matching typography and spacing
- Authentic button layouts and icons
- Professional POS appearance

### Mock Data Service
- Realistic transaction simulation
- Employee sales tracking
- Financial reporting
- Device information (ID: C045UO35160275)

### Touchless Payments
- NFC/Contactless payment simulation
- Phone contact integration ready
- Multiple payment method support

## 🏗️ Architecture

```
src/
├── screens/
│   ├── PinEntryScreen.js      # Authentication screen
│   ├── SaleScreen.js          # Payment entry screen
│   ├── ProcessingScreen.js    # Payment processing
│   └── ReportsScreen.js       # Analytics dashboard
└── services/
    └── MockDataService.js     # Data simulation service
```

## 🎨 Design System

- **Primary Blue**: #1E40AF (PIN screen background)
- **Light Gray**: #F8FAFC (Main app background)
- **White**: #FFFFFF (Card backgrounds)
- **Text Dark**: #1E293B
- **Text Light**: #64748B
- **Success Green**: #10B981
- **Error Red**: #EF4444

## 📱 Responsive Design

- Optimized for tablet/POS terminal screens
- Touch-friendly button sizes
- Professional POS layout
- Portrait orientation optimized

## 🔧 Configuration

The app includes:
- Babel configuration for React Native
- Metro bundler setup
- Expo configuration
- ESLint setup

## 🚀 Deployment Ready

- Production-ready configuration
- Offline operation support
- Mock data for testing
- Error handling and validation

---

**Built for Pizza Barbas** - A professional POS solution replicating the Clover interface with French localization and touchless payment capabilities. 