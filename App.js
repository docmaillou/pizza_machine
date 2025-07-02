import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import PinEntryScreen from './src/screens/PinEntryScreen';
import SaleScreen from './src/screens/SaleScreen';
import TipSelectionScreen from './src/screens/TipSelectionScreen';
import ProcessingScreen from './src/screens/ProcessingScreen';
import PaymentSuccessScreen from './src/screens/PaymentSuccessScreen';
import ReportsScreen from './src/screens/ReportsScreen';

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
    return (
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
                        <Stack.Screen name="Processing" component={ProcessingScreen} />
                        <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
                        <Stack.Screen name="Reports" component={ReportsScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </SafeAreaProvider>
    );
} 