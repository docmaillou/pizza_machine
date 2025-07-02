import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    StatusBar,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const SaleScreen = ({ navigation }) => {
    const [amount, setAmount] = useState('0,00');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleNumberPress = (number) => {
        if (amount === '0,00') {
            // Starting fresh
            setAmount(number + ',00');
        } else if (amount.endsWith(',')) {
            // In decimal mode, just after comma - add first cent digit
            setAmount(amount + number);
        } else if (amount.includes(',') && !amount.endsWith(',00')) {
            // In decimal mode with some cents already
            const [euros, cents] = amount.split(',');
            if (cents.length === 1) {
                // Add second cent digit
                setAmount(euros + ',' + cents + number);
            } else if (cents.length === 2) {
                // Already have two cents, can't add more in decimal mode
                return;
            }
        } else {
            // In euro mode (ends with ,00) - add to euros
            const [euros] = amount.split(',');
            setAmount((parseInt(euros) * 10 + parseInt(number)) + ',00');
        }
    };

    const handleDoubleZero = () => {
        if (amount === '0,00') {
            setAmount('0,00');
        } else {
            const [euros, cents] = amount.split(',');
            setAmount((parseInt(euros) * 100) + ',' + cents);
        }
    };

    const handleComma = () => {
        // Switch to decimal mode - remove ,00 and add just comma for decimal input
        if (amount.includes(',00')) {
            const euros = amount.replace(',00', '');
            setAmount(euros + ',');
        } else if (!amount.includes(',')) {
            // If no comma at all, add it
            setAmount(amount + ',');
        }
        // If already in decimal mode (has comma but not ,00), do nothing
    };

    const handleBackspace = () => {
        if (amount === '0,00') return;

        if (amount.endsWith(',')) {
            // Remove the comma and go back to euro mode
            setAmount(amount.slice(0, -1) + ',00');
        } else if (amount.includes(',') && !amount.endsWith(',00')) {
            // In decimal mode
            const [euros, cents] = amount.split(',');
            if (cents.length === 2) {
                // Remove last cent digit
                setAmount(euros + ',' + cents.slice(0, 1));
            } else if (cents.length === 1) {
                // Remove the cent digit, go back to just comma
                setAmount(euros + ',');
            }
        } else {
            // In euro mode (ends with ,00)
            const [euros] = amount.split(',');
            if (euros.length > 1) {
                // Remove last euro digit
                setAmount(euros.slice(0, -1) + ',00');
            } else {
                setAmount('0,00');
            }
        }
    };

    const handleClear = () => {
        setAmount('0,00');
    };

    const handlePayment = () => {
        if (amount === '0,00') {
            Alert.alert('Erreur', 'Veuillez entrer un montant');
            return;
        }

        // Navigate to tip selection screen
        navigation.navigate('TipSelection', { amount });
    };

    const handleReports = () => {
        navigation.navigate('Reports');
    };

    const renderKeypadButton = (value, label, onPress, style = {}) => {
        return (
            <TouchableOpacity
                style={[styles.keypadButton, style]}
                onPress={onPress}
                activeOpacity={0.7}
            >
                <Text style={[styles.keypadButtonText, style.textStyle]}>
                    {label || value}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#E2E8F0" barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton}>
                    <MaterialIcons name="menu" size={24} color="#64748B" />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <MaterialIcons name="credit-card" size={20} color="#10B981" />
                    <Text style={styles.titleText}>Vente</Text>
                </View>

                <TouchableOpacity style={styles.reportsButton} onPress={handleReports}>
                    <MaterialIcons name="assessment" size={24} color="#64748B" />
                </TouchableOpacity>
            </View>

            {/* Amount Display */}
            <View style={styles.amountContainer}>
                <Text style={styles.amountText}>{amount} $</Text>
            </View>

            {/* Numeric Keypad */}
            <View style={styles.keypadContainer}>
                <View style={styles.keypadGrid}>
                    <View style={styles.keypadRow}>
                        {renderKeypadButton('1', '1', () => handleNumberPress('1'))}
                        {renderKeypadButton('2', '2', () => handleNumberPress('2'))}
                        {renderKeypadButton('3', '3', () => handleNumberPress('3'))}
                    </View>
                    <View style={styles.keypadRow}>
                        {renderKeypadButton('4', '4', () => handleNumberPress('4'))}
                        {renderKeypadButton('5', '5', () => handleNumberPress('5'))}
                        {renderKeypadButton('6', '6', () => handleNumberPress('6'))}
                    </View>
                    <View style={styles.keypadRow}>
                        {renderKeypadButton('7', '7', () => handleNumberPress('7'))}
                        {renderKeypadButton('8', '8', () => handleNumberPress('8'))}
                        {renderKeypadButton('9', '9', () => handleNumberPress('9'))}
                    </View>
                    <View style={styles.keypadRow}>
                        {renderKeypadButton(',', ',', handleComma, {
                            backgroundColor: '#E2E8F0',
                            textStyle: { fontSize: 28, color: '#475569', fontWeight: 'bold' }
                        })}
                        {renderKeypadButton('0', '0', () => handleNumberPress('0'))}
                        {renderKeypadButton('delete', '⌫', handleBackspace, {
                            backgroundColor: '#F1F5F9',
                            textStyle: { fontSize: 20, color: '#64748B' }
                        })}
                    </View>
                </View>
            </View>

            {/* Instructions */}
            <View style={styles.instructionsContainer}>
                <Text style={styles.instructionsText}>
                    Entrer le montant de la vente
                </Text>
            </View>

            {/* Payment Button */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={[
                        styles.paymentButton,
                        amount === '0,00' && styles.paymentButtonDisabled
                    ]}
                    onPress={handlePayment}
                    disabled={amount === '0,00'}
                    activeOpacity={0.8}
                >
                    <Text style={styles.paymentButtonText}>
                        Continuer avec {amount} $
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    menuButton: {
        padding: 5,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    titleText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1E293B',
    },
    reportsButton: {
        padding: 5,
    },
    amountContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    amountText: {
        fontSize: 72,
        fontWeight: '300',
        color: '#64748B',
        textAlign: 'center',
    },
    keypadContainer: {
        paddingHorizontal: 40,
        paddingBottom: 20,
    },
    keypadGrid: {
        gap: 15,
    },
    keypadRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
    },
    keypadButton: {
        flex: 1,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    keypadButtonText: {
        fontSize: 24,
        fontWeight: '500',
        color: '#1E293B',
        textAlign: 'center',
    },
    instructionsContainer: {
        paddingHorizontal: 40,
        paddingVertical: 20,
        alignItems: 'center',
    },
    instructionsText: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
    },
    bottomContainer: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    paymentButton: {
        backgroundColor: '#3B82F6',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#3B82F6',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    paymentButtonDisabled: {
        backgroundColor: '#CBD5E1',
        shadowOpacity: 0,
        elevation: 0,
    },
    paymentButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default SaleScreen; 