import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

// Conditional import for Stripe - only in standalone builds
let StripeProvider;
try {
    if (Constants.appOwnership === 'standalone') {
        StripeProvider = require('@stripe/stripe-react-native').StripeProvider;
    }
} catch (error) {
    console.log('Stripe SDK not available in Expo Go');
}

// Mock StripeProvider for Expo Go
const MockStripeProvider = ({ children }) => {
    return children;
};

// Stripe configuration
const STRIPE_CONFIG = {
    publishableKey: 'pk_test_51NPu6IKPpEaBcmMM6EwgMAU8YV5LNTaFR41e7lsaKrxMPl4hxcUmTYUwKFkjHzaUaCBmv9RnSakRIJUr1oDg0vPz00s1FRS7eW',
    merchantIdentifier: 'merchant.com.pizzabarbas.pos',
};

// Import screens
import PinEntryScreen from './src/screens/PinEntryScreen';
import SaleScreen from './src/screens/SaleScreen';
import TipSelectionScreen from './src/screens/TipSelectionScreen';
import ProcessingScreen from './src/screens/ProcessingScreen';
import PaymentSuccessScreen from './src/screens/PaymentSuccessScreen';
import ReportsScreen from './src/screens/ReportsScreen';
import PaymentMethodScreen from './src/screens/PaymentMethodScreen';
import ContactlessPaymentScreen from './src/screens/ContactlessPaymentScreen';

// Clover-style theme
const theme = {
    colors: {
        primary: '#3B82F6',
        background: '#F8FAFC',
        surface: '#FFFFFF',
        text: '#1E293B',
        onSurface: '#334155',
        outline: '#94A3B8',
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
    },
};

const Stack = createStackNavigator();

export default function App() {
    // Use real StripeProvider in standalone builds, mock in Expo Go
    const StripeWrapper = StripeProvider || MockStripeProvider;

    return (
        <StripeWrapper
            publishableKey="pk_test_51NPu6IKPpEaBcmMM6EwgMAU8YV5LNTaFR41e7lsaKrxMPl4hxcUmTYUwKFkjHzaUaCBmv9RnSakRIJUr1oDg0vPz00s1FFS7eW"
            merchantIdentifier="merchant.com.pizzabarbas.pos"
        >
            <SafeAreaProvider>
                <PaperProvider theme={theme}>
                    <NavigationContainer>
                        <Stack.Navigator
                            initialRouteName="PinEntry"
                            screenOptions={{
                                headerShown: false,
                            }}
                        >
                            <Stack.Screen name="PinEntry" component={PinEntryScreen} />
                            <Stack.Screen name="Sale" component={SaleScreen} />
                            <Stack.Screen name="TipSelection" component={TipSelectionScreen} />
                            <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
                            <Stack.Screen name="ContactlessPayment" component={ContactlessPaymentScreen} />
                            <Stack.Screen name="Processing" component={ProcessingScreen} />
                            <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
                            <Stack.Screen name="Reports" component={ReportsScreen} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </PaperProvider>
            </SafeAreaProvider>
        </StripeWrapper>
    );
}