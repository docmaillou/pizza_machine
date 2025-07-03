// Payment Configuration
// Replace these with your actual Stripe keys and merchant information

export const STRIPE_CONFIG = {
    // Test keys (replace with your actual test keys)
    publishableKey: 'pk_test_51NPu6IKPpEaBcmMM6EwgMAU8YV5LNTaFR41e7lsaKrxMPl4hxcUmTYUwKFkjHzaUaCBmv9RnSakRIJUr1oDg0vPz00s1FFS7eW', // Your Stripe publishable key

    // Production keys (uncomment and replace when ready for production)
    // publishableKey: 'pk_live_your_live_key_here',

    // Merchant information
    merchantIdentifier: 'merchant.com.pizzabarbas.pos',
    merchantName: 'Pizza Barbas',
    merchantCountryCode: 'CA',
    currency: 'CAD',

    // Test mode (set to false in production)
    testMode: true,
};

export const PAYMENT_CONFIG = {
    // Your business account information
    businessName: 'Pizza Barbas',
    businessAddress: {
        street: '123 Rue Pizza',
        city: 'Montreal',
        province: 'QC',
        postalCode: 'H1A 1A1',
        country: 'Canada'
    },

    // Tax settings
    taxRate: 0.14975, // Quebec tax rate (GST + QST)

    // Payment processing settings
    processingTimeout: 30000, // 30 seconds
    retryAttempts: 3,

    // Supported payment methods
    supportedMethods: {
        cash: true,
        card: true,
        contactless: true,
        applePay: true,
        googlePay: true,
        nfc: true
    }
};

// Backend API configuration (replace with your actual backend)
export const API_CONFIG = {
    // Your backend API base URL
    baseUrl: 'https://your-backend-api.com/api',

    // API endpoints
    endpoints: {
        createPaymentIntent: '/payments/create-intent',
        confirmPayment: '/payments/confirm',
        refundPayment: '/payments/refund',
        getTransactions: '/transactions',
        sendReceipt: '/receipts/send'
    },

    // API timeout
    timeout: 10000, // 10 seconds
};

// NFC Configuration
export const NFC_CONFIG = {
    // NFC reading timeout
    readTimeout: 10000, // 10 seconds

    // Supported NFC technologies
    supportedTechnologies: ['NDEF', 'NfcA', 'NfcB', 'NfcF', 'NfcV'],

    // Card detection settings
    cardDetectionDelay: 2000, // 2 seconds simulation delay

    // Error retry settings
    maxRetries: 3,
    retryDelay: 1000, // 1 second
};

// Development/Demo settings
export const DEMO_CONFIG = {
    // Enable demo mode (simulates payments without real processing)
    enabled: true,

    // Demo payment success rate (0.9 = 90% success rate)
    successRate: 0.9,

    // Demo processing delays
    processingDelay: 2000, // 2 seconds
    nfcDetectionDelay: 2000, // 2 seconds

    // Demo card data
    demoCardData: {
        last4: '4242',
        brand: 'visa',
        type: 'credit'
    }
};
