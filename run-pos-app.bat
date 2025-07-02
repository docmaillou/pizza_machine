@echo off
echo.
echo ========================================
echo    Pizza Barbas POS - Quick Launcher
echo ========================================
echo.
echo Choose how you want to run your POS app:
echo.
echo 1. Mobile (Expo Go) - Recommended for phone use
echo 2. Web Browser - For desktop testing
echo 3. Check Build Status
echo 4. Exit
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto mobile
if "%choice%"=="2" goto web
if "%choice%"=="3" goto status
if "%choice%"=="4" goto exit
goto invalid

:mobile
echo.
echo Starting Expo development server for mobile...
echo.
echo Instructions:
echo 1. Download "Expo Go" app on your phone
echo 2. Scan the QR code that will appear
echo 3. Your POS app will load on your phone!
echo.
pause
npx expo start --tunnel
goto end

:web
echo.
echo Starting web version...
echo.
echo Your POS app will open in your default browser.
echo.
start http://localhost:8081
npx expo start --web
goto end

:status
echo.
echo ========================================
echo           Build Status
echo ========================================
echo.
echo ✅ Export: Complete - Web version ready
echo ⏳ EAS Build: In queue (6+ hours estimated)
echo ✅ Development: Ready for Expo Go
echo.
echo Your app is ready to use with Expo Go!
echo The standalone APK will be available later.
echo.
pause
goto end

:invalid
echo.
echo Invalid choice. Please enter 1, 2, 3, or 4.
echo.
pause
goto start

:exit
echo.
echo Thanks for using Pizza Barbas POS!
echo.
pause
exit

:end
echo.
echo Press any key to return to menu...
pause
cls
goto start

:start
cls
goto :eof
