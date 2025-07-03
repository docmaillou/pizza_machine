import { Alert, Platform, NativeModules } from 'react-native';

// Conditional import with null check
let NfcManager, NfcTech, Ndef;
try {
    if (NativeModules.NfcManager) {
        const nfcModule = require('react-native-nfc-manager');
        NfcManager = nfcModule.default;
        NfcTech = nfcModule.NfcTech;
        Ndef = nfcModule.Ndef;
    }
} catch (error) {
    console.log('NFC module not available:', error);
}

class NFCPaymentService {
    constructor() {
        this.isInitialized = false;
        this.isScanning = false;
        this.paymentCallback = null;
    }

    // Initialize NFC Manager
    async initialize() {
        try {
            if (!NfcManager) {
                throw new Error('NFC module not available');
            }

            const supported = await NfcManager.isSupported();
            if (!supported) {
                throw new Error('NFC not supported on this device');
            }

            await NfcManager.start();
            this.isInitialized = true;
            console.log('NFC Manager initialized successfully');
            return { success: true };
        } catch (error) {
            console.error('NFC initialization failed:', error);
            return {
                success: false,
                error: 'NFC non disponible sur cet appareil'
            };
        }
    }

    // Check if NFC is enabled
    async isNFCEnabled() {
        try {
            if (!NfcManager) {
                return false;
            }
            const enabled = await NfcManager.isEnabled();
            return enabled;
        } catch (error) {
            console.error('Error checking NFC status:', error);
            return false;
        }
    }

    // Start listening for contactless payments
    async startPaymentListener(amount, onPaymentDetected, onError) {
        if (!this.isInitialized) {
            const initResult = await this.initialize();
            if (!initResult.success) {
                onError(initResult.error);
                return;
            }
        }

        if (this.isScanning) {
            console.log('Already scanning for payments');
            return;
        }

        try {
            if (!NfcManager || !NfcTech) {
                onError('NFC module not available');
                return;
            }

            this.isScanning = true;
            this.paymentCallback = onPaymentDetected;

            // Start scanning for NFC tags/cards
            await NfcManager.requestTechnology([NfcTech.Ndef, NfcTech.NfcA, NfcTech.NfcB]);

            // Simulate payment processing for demo
            // In real implementation, this would read payment card data
            setTimeout(async () => {
                if (this.isScanning) {
                    await this.processContactlessPayment(amount);
                }
            }, 2000);

        } catch (error) {
            console.error('Error starting payment listener:', error);
            this.isScanning = false;
            onError('Erreur lors de la détection du paiement');
        }
    }

    // Process contactless payment
    async processContactlessPayment(amount) {
        try {
            // Simulate reading payment card data
            const cardData = {
                type: 'contactless',
                last4: '4242',
                brand: 'visa',
                timestamp: new Date()
            };

            // Stop NFC scanning
            await this.stopPaymentListener();

            // Call payment callback with success
            if (this.paymentCallback) {
                this.paymentCallback({
                    success: true,
                    amount,
                    cardData,
                    paymentMethod: 'contactless'
                });
            }

        } catch (error) {
            console.error('Error processing contactless payment:', error);
            await this.stopPaymentListener();

            if (this.paymentCallback) {
                this.paymentCallback({
                    success: false,
                    error: 'Échec du paiement sans contact'
                });
            }
        }
    }

    // Stop payment listener
    async stopPaymentListener() {
        try {
            if (this.isScanning && NfcManager) {
                await NfcManager.cancelTechnologyRequest();
                this.isScanning = false;
                this.paymentCallback = null;
                console.log('Payment listener stopped');
            }
        } catch (error) {
            console.error('Error stopping payment listener:', error);
        }
    }

    // Clean up NFC resources
    async cleanup() {
        try {
            await this.stopPaymentListener();
            if (this.isInitialized && NfcManager) {
                await NfcManager.stop();
                this.isInitialized = false;
            }
        } catch (error) {
            console.error('Error during NFC cleanup:', error);
        }
    }

    // Check if device supports Apple Pay / Google Pay
    async supportsWalletPayments() {
        if (Platform.OS === 'ios') {
            // Check for Apple Pay support
            return true; // Most modern iOS devices support Apple Pay
        } else {
            // Check for Google Pay support
            return true; // Most modern Android devices support Google Pay
        }
    }

    // Get payment method info
    getPaymentMethodInfo() {
        return {
            nfc: this.isInitialized,
            applePay: Platform.OS === 'ios',
            googlePay: Platform.OS === 'android',
            contactless: true
        };
    }
}

export default new NFCPaymentService();
