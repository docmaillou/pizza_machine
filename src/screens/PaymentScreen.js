import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Alert,
    Dimensions,
    Vibration,
} from 'react-native';
import {
    Text,
    Card,
    Button,
    Title,
    Paragraph,
    useTheme,
    Divider,
    Chip,
    IconButton,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const PaymentScreen = ({ navigation }) => {
    const [amount, setAmount] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [selectedTip, setSelectedTip] = useState(null);
    const [customTip, setCustomTip] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '' });
    const theme = useTheme();

    const tipOptions = [
        { label: '15%', value: 0.15 },
        { label: '18%', value: 0.18 },
        { label: '20%', value: 0.20 },
        { label: '30%', value: 0.30 },
    ];

    const paymentMethods = [
        { id: 'cash', label: 'Cash', icon: 'money', color: theme.colors.cash },
        { id: 'card', label: 'Card', icon: 'credit-card', color: theme.colors.card },
        { id: 'nfc', label: 'NFC/Tap', icon: 'nfc', color: theme.colors.nfc },
        { id: 'mobile', label: 'Mobile', icon: 'smartphone', color: theme.colors.mobile },
    ];

    const handleNumberPress = (num) => {
        Vibration.vibrate(50);
        if (num === '00') {
            setAmount(prev => prev + '00');
        } else if (num === '.') {
            if (!amount.includes('.')) {
                setAmount(prev => prev + '.');
            }
        } else if (num === 'clear') {
            setAmount('');
        } else if (num === 'backspace') {
            setAmount(prev => prev.slice(0, -1));
        } else {
            setAmount(prev => prev + num);
        }
    };

    const handleQuickAmount = (quickAmount) => {
        setAmount(quickAmount.toString());
    };

    const calculateTip = () => {
        const subtotal = parseFloat(amount) || 0;
        if (selectedTip) {
            return subtotal * selectedTip;
        } else if (customTip) {
            return parseFloat(customTip) || 0;
        }
        return 0;
    };

    const calculateTotal = () => {
        const subtotal = parseFloat(amount) || 0;
        const tip = calculateTip();
        return subtotal + tip;
    };

    const handlePayment = async () => {
        if (!amount || parseFloat(amount) <= 0) {
            Alert.alert('Error', 'Please enter a valid amount');
            return;
        }

        if (!selectedPaymentMethod) {
            Alert.alert('Error', 'Please select a payment method');
            return;
        }

        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);

            // Generate transaction data
            const transaction = {
                id: Date.now().toString(),
                amount: parseFloat(amount),
                tip: calculateTip(),
                total: calculateTotal(),
                paymentMethod: selectedPaymentMethod,
                customerInfo,
                employee: global.currentEmployee,
                timestamp: new Date().toISOString(),
                status: 'completed',
            };

            // Navigate to receipt screen
            navigation.navigate('Receipt', { transaction });
        }, 2000);
    };

    const formatCurrency = (value) => {
        return `$${parseFloat(value || 0).toFixed(2)}`;
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView style={styles.scrollView}>
                {/* Header */}
                <View style={styles.header}>
                    <Title style={[styles.headerTitle, { color: theme.colors.primary }]}>
                        Payment Terminal
                    </Title>
                    <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
                        {global.currentEmployee?.name} - {global.currentEmployee?.role}
                    </Text>
                </View>

                {/* Amount Display */}
                <Card style={styles.amountCard}>
                    <Card.Content>
                        <Text style={[styles.amountLabel, { color: theme.colors.textSecondary }]}>
                            Amount
                        </Text>
                        <Text style={[styles.amountDisplay, { color: theme.colors.primary }]}>
                            {formatCurrency(amount)}
                        </Text>
                    </Card.Content>
                </Card>

                {/* Quick Amount Buttons */}
                <Card style={styles.quickAmountCard}>
                    <Card.Content>
                        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                            Quick Amounts
                        </Text>
                        <View style={styles.quickAmountGrid}>
                            {[5, 10, 15, 20, 25, 30].map((value) => (
                                <Button
                                    key={value}
                                    mode="outlined"
                                    onPress={() => handleQuickAmount(value)}
                                    style={styles.quickAmountButton}
                                    labelStyle={styles.quickAmountLabel}
                                >
                                    ${value}
                                </Button>
                            ))}
                        </View>
                    </Card.Content>
                </Card>

                {/* Payment Methods */}
                <Card style={styles.paymentMethodCard}>
                    <Card.Content>
                        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                            Payment Method
                        </Text>
                        <View style={styles.paymentMethodGrid}>
                            {paymentMethods.map((method) => (
                                <Button
                                    key={method.id}
                                    mode={selectedPaymentMethod === method.id ? 'contained' : 'outlined'}
                                    onPress={() => setSelectedPaymentMethod(method.id)}
                                    style={[
                                        styles.paymentMethodButton,
                                        selectedPaymentMethod === method.id && { backgroundColor: method.color }
                                    ]}
                                    labelStyle={styles.paymentMethodLabel}
                                    icon={method.icon}
                                >
                                    {method.label}
                                </Button>
                            ))}
                        </View>
                    </Card.Content>
                </Card>

                {/* Tip Section */}
                <Card style={styles.tipCard}>
                    <Card.Content>
                        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                            Tip Options
                        </Text>
                        <View style={styles.tipGrid}>
                            {tipOptions.map((tip) => (
                                <Button
                                    key={tip.value}
                                    mode={selectedTip === tip.value ? 'contained' : 'outlined'}
                                    onPress={() => {
                                        setSelectedTip(tip.value);
                                        setCustomTip('');
                                    }}
                                    style={styles.tipButton}
                                    labelStyle={styles.tipButtonLabel}
                                >
                                    {tip.label}
                                </Button>
                            ))}
                            <Button
                                mode={selectedTip === 0 ? 'contained' : 'outlined'}
                                onPress={() => {
                                    setSelectedTip(0);
                                    setCustomTip('');
                                }}
                                style={styles.tipButton}
                                labelStyle={styles.tipButtonLabel}
                            >
                                No Tip
                            </Button>
                        </View>

                        {/* Custom Tip Input */}
                        <View style={styles.customTipContainer}>
                            <Text style={[styles.customTipLabel, { color: theme.colors.textSecondary }]}>
                                Custom Tip Amount:
                            </Text>
                            <Text style={[styles.customTipAmount, { color: theme.colors.primary }]}>
                                {formatCurrency(customTip)}
                            </Text>
                        </View>
                    </Card.Content>
                </Card>

                {/* Summary */}
                <Card style={styles.summaryCard}>
                    <Card.Content>
                        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                            Transaction Summary
                        </Text>
                        <View style={styles.summaryRow}>
                            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
                                Subtotal:
                            </Text>
                            <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                                {formatCurrency(amount)}
                            </Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
                                Tip:
                            </Text>
                            <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                                {formatCurrency(calculateTip())}
                            </Text>
                        </View>
                        <Divider style={styles.divider} />
                        <View style={styles.summaryRow}>
                            <Text style={[styles.summaryLabel, { color: theme.colors.primary, fontWeight: 'bold' }]}>
                                Total:
                            </Text>
                            <Text style={[styles.summaryValue, { color: theme.colors.primary, fontWeight: 'bold' }]}>
                                {formatCurrency(calculateTotal())}
                            </Text>
                        </View>
                    </Card.Content>
                </Card>

                {/* Process Payment Button */}
                <Button
                    mode="contained"
                    onPress={handlePayment}
                    loading={isProcessing}
                    disabled={isProcessing || !amount || !selectedPaymentMethod}
                    style={styles.processButton}
                    contentStyle={styles.processButtonContent}
                    icon="payment"
                >
                    {isProcessing ? 'Processing...' : 'Process Payment'}
                </Button>
            </ScrollView>

            {/* Digital Keypad */}
            <View style={styles.keypadContainer}>
                <View style={styles.keypad}>
                    {[
                        ['1', '2', '3'],
                        ['4', '5', '6'],
                        ['7', '8', '9'],
                        ['.', '0', '00']
                    ].map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.keypadRow}>
                            {row.map((key) => (
                                <Button
                                    key={key}
                                    mode="contained"
                                    onPress={() => handleNumberPress(key)}
                                    style={styles.keypadButton}
                                    contentStyle={styles.keypadButtonContent}
                                    labelStyle={styles.keypadButtonLabel}
                                >
                                    {key}
                                </Button>
                            ))}
                        </View>
                    ))}
                    <View style={styles.keypadRow}>
                        <Button
                            mode="contained"
                            onPress={() => handleNumberPress('clear')}
                            style={[styles.keypadButton, { backgroundColor: theme.colors.error }]}
                            contentStyle={styles.keypadButtonContent}
                            labelStyle={styles.keypadButtonLabel}
                        >
                            Clear
                        </Button>
                        <Button
                            mode="contained"
                            onPress={() => handleNumberPress('backspace')}
                            style={[styles.keypadButton, { backgroundColor: theme.colors.warning }]}
                            contentStyle={styles.keypadButtonContent}
                            labelStyle={styles.keypadButtonLabel}
                        >
                            ←
                        </Button>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        padding: 16,
    },
    header: {
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        fontSize: 14,
        marginTop: 4,
    },
    amountCard: {
        marginBottom: 16,
        elevation: 4,
    },
    amountLabel: {
        fontSize: 14,
        textAlign: 'center',
    },
    amountDisplay: {
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 8,
    },
    quickAmountCard: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
    quickAmountGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    quickAmountButton: {
        width: (width - 64) / 3 - 8,
        marginBottom: 8,
    },
    quickAmountLabel: {
        fontSize: 14,
    },
    paymentMethodCard: {
        marginBottom: 16,
    },
    paymentMethodGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    paymentMethodButton: {
        width: (width - 64) / 2 - 8,
        marginBottom: 8,
    },
    paymentMethodLabel: {
        fontSize: 12,
    },
    tipCard: {
        marginBottom: 16,
    },
    tipGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    tipButton: {
        width: (width - 64) / 3 - 8,
        marginBottom: 8,
    },
    tipButtonLabel: {
        fontSize: 12,
    },
    customTipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    customTipLabel: {
        fontSize: 14,
    },
    customTipAmount: {
        fontSize: 16,
        fontWeight: '600',
    },
    summaryCard: {
        marginBottom: 16,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
    },
    summaryLabel: {
        fontSize: 14,
    },
    summaryValue: {
        fontSize: 14,
    },
    divider: {
        marginVertical: 8,
    },
    processButton: {
        marginBottom: 16,
        height: 56,
    },
    processButtonContent: {
        height: 56,
    },
    keypadContainer: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
    },
    keypad: {
        gap: 8,
    },
    keypadRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
    },
    keypadButton: {
        flex: 1,
        height: 60,
    },
    keypadButtonContent: {
        height: 60,
    },
    keypadButtonLabel: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default PaymentScreen; 