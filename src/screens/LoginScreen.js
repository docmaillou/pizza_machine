import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import {
    TextInput,
    Button,
    Text,
    Card,
    Title,
    Paragraph,
    useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LoginScreen = ({ navigation }) => {
    const [employeeId, setEmployeeId] = useState('');
    const [pin, setPin] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();

    // Mock employee data - in real app, this would come from a database
    const employees = [
        { id: '001', pin: '1234', name: 'John Driver', role: 'driver' },
        { id: '002', pin: '5678', name: 'Sarah Cashier', role: 'cashier' },
        { id: '003', pin: '9999', name: 'Mike Manager', role: 'manager' },
    ];

    const handleLogin = async () => {
        if (!employeeId || !pin) {
            Alert.alert('Error', 'Please enter both Employee ID and PIN');
            return;
        }

        setIsLoading(true);

        // Simulate API call delay
        setTimeout(() => {
            const employee = employees.find(
                (emp) => emp.id === employeeId && emp.pin === pin
            );

            if (employee) {
                // Store employee info in global state or AsyncStorage
                global.currentEmployee = employee;
                navigation.replace('MainTabs');
            } else {
                Alert.alert('Error', 'Invalid Employee ID or PIN');
            }
            setIsLoading(false);
        }, 1000);
    };

    const handleQuickLogin = (id, pinCode) => {
        setEmployeeId(id);
        setPin(pinCode);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.content}>
                    {/* Logo and Title */}
                    <View style={styles.header}>
                        <Icon name="local-pizza" size={80} color={theme.colors.primary} />
                        <Title style={[styles.title, { color: theme.colors.primary }]}>
                            Pizza POS
                        </Title>
                        <Paragraph style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                            Employee Login
                        </Paragraph>
                    </View>

                    {/* Login Form */}
                    <Card style={styles.card}>
                        <Card.Content>
                            <TextInput
                                label="Employee ID"
                                value={employeeId}
                                onChangeText={setEmployeeId}
                                mode="outlined"
                                style={styles.input}
                                keyboardType="numeric"
                                left={<TextInput.Icon icon="badge" />}
                            />
                            <TextInput
                                label="PIN"
                                value={pin}
                                onChangeText={setPin}
                                mode="outlined"
                                style={styles.input}
                                secureTextEntry
                                keyboardType="numeric"
                                maxLength={4}
                                left={<TextInput.Icon icon="lock" />}
                            />
                            <Button
                                mode="contained"
                                onPress={handleLogin}
                                loading={isLoading}
                                disabled={isLoading}
                                style={styles.loginButton}
                                contentStyle={styles.loginButtonContent}
                            >
                                Login
                            </Button>
                        </Card.Content>
                    </Card>

                    {/* Quick Login Buttons for Demo */}
                    <View style={styles.quickLogin}>
                        <Text style={[styles.quickLoginTitle, { color: theme.colors.textSecondary }]}>
                            Quick Login (Demo)
                        </Text>
                        <View style={styles.quickLoginButtons}>
                            <Button
                                mode="outlined"
                                onPress={() => handleQuickLogin('001', '1234')}
                                style={styles.quickButton}
                                labelStyle={styles.quickButtonLabel}
                            >
                                Driver
                            </Button>
                            <Button
                                mode="outlined"
                                onPress={() => handleQuickLogin('002', '5678')}
                                style={styles.quickButton}
                                labelStyle={styles.quickButtonLabel}
                            >
                                Cashier
                            </Button>
                            <Button
                                mode="outlined"
                                onPress={() => handleQuickLogin('003', '9999')}
                                style={styles.quickButton}
                                labelStyle={styles.quickButtonLabel}
                            >
                                Manager
                            </Button>
                        </View>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
                            Version 1.0.0
                        </Text>
                        <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
                            © 2024 Pizza POS
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 16,
    },
    subtitle: {
        fontSize: 16,
        marginTop: 8,
    },
    card: {
        marginBottom: 24,
        elevation: 4,
    },
    input: {
        marginBottom: 16,
    },
    loginButton: {
        marginTop: 8,
        height: 50,
    },
    loginButtonContent: {
        height: 50,
    },
    quickLogin: {
        marginBottom: 24,
    },
    quickLoginTitle: {
        textAlign: 'center',
        marginBottom: 16,
        fontSize: 14,
    },
    quickLoginButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    quickButton: {
        flex: 1,
        marginHorizontal: 4,
    },
    quickButtonLabel: {
        fontSize: 12,
    },
    footer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    footerText: {
        fontSize: 12,
        marginBottom: 4,
    },
});

export default LoginScreen; 