# 🍕 Pizza Barbas POS - Offline Usage Guide

## Quick Start (No Development Server Required)

### Option 1: Mobile App (Recommended) 📱
1. **Double-click `run-pos-app.bat`** and choose option 1
2. **Download Expo Go** on your phone:
   - Android: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
3. **Scan the QR code** that appears in the terminal
4. **Your POS app loads instantly** on your phone!

### Option 2: Web Browser 🌐
1. **Double-click `run-pos-app.bat`** and choose option 2
2. **Your app opens** in your default web browser
3. **Use all POS features** directly in the browser

### Option 3: Standalone APK (Coming Soon) 📦
- **EAS Build in progress** - estimated 6+ hours
- **No Expo Go required** - install directly on phone
- **Fully independent** - works without any servers

## Features Available ✅

- ✅ **Complete POS Interface** - Professional point of sale design
- ✅ **Payment Processing** - Simulate card and cash payments
- ✅ **Tip Calculation** - Automatic tip calculation and display
- ✅ **Invoice Generation** - Create detailed receipts
- ✅ **Email/SMS Sharing** - Send invoices to customers
- ✅ **Offline Functionality** - Works without internet once loaded

## Build Status 📋

| Method | Status | Description |
|--------|--------|-------------|
| **Expo Go** | ✅ Ready | Use with mobile app - instant access |
| **Web Export** | ✅ Complete | Browser version available |
| **Standalone APK** | ⏳ Building | Independent mobile app (6+ hours) |

## Troubleshooting 🔧

### If the mobile version doesn't work:
1. Make sure your phone and computer are on the same WiFi network
2. Try using the `--tunnel` option (already included in the batch file)
3. Check that Expo Go is properly installed on your phone

### If the web version doesn't work:
1. Make sure no other apps are using port 8081
2. Try refreshing your browser
3. Check that Node.js is properly installed

### If you get build errors:
1. Run `npm install` to ensure all dependencies are installed
2. Make sure you're connected to the internet
3. Try restarting the development server

## Commands Reference 💻

If you prefer using the command line directly:

```bash
# For mobile (with QR code)
npx expo start --tunnel

# For web browser
npx expo start --web

# Check build status
eas build:list

# Export for offline use
npx expo export
```

## Next Steps 🚀

1. **Test all POS features** on your phone using Expo Go
2. **Wait for the APK build** to complete for standalone installation
3. **Customize the app** by modifying the source code
4. **Deploy to production** when ready

---

**Need Help?** 
- Check the terminal output for detailed error messages
- Ensure all dependencies are installed with `npm install`
- Make sure Expo CLI is up to date with `npm install -g @expo/cli`

**Version:** 1.0.0  
**Last Updated:** $(Get-Date -Format "yyyy-MM-dd")
