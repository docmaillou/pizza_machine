import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialIcons as Icon } from '@expo/vector-icons';

// Import screens
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import ReceiptScreen from './src/screens/ReceiptScreen';
import ReportsScreen from './src/screens/ReportsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import OrderHistoryScreen from './src/screens/OrderHistoryScreen';

// Import theme
import { theme } from './src/theme/theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Dashboard') {
                        iconName = 'dashboard';
                    } else if (route.name === 'Payment') {
                        iconName = 'payment';
                    } else if (route.name === 'Reports') {
                        iconName = 'assessment';
                    } else if (route.name === 'Settings') {
                        iconName = 'settings';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Payment" component={PaymentScreen} />
            <Tab.Screen name="Reports" component={ReportsScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <SafeAreaProvider>
            <PaperProvider theme={theme}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="Login"
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="MainTabs" component={MainTabs} />
                        <Stack.Screen name="Receipt" component={ReceiptScreen} />
                        <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </SafeAreaProvider>
    );
} 