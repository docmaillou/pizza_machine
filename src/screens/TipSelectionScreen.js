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

const TipSelectionScreen = ({ navigation, route }) => {
    const { amount } = route.params || { amount: '0,00' };
    const [selectedTip, setSelectedTip] = useState(null);

    // Convert amount string to number for calculations
    const getAmountAsNumber = () => {
        return parseFloat(amount.replace(',', '.'));
    };

    // Format number to currency string
    const formatCurrency = (value) => {
        return value.toFixed(2).replace('.', ',');
    };

    // Calculate tip amounts
    const baseAmount = getAmountAsNumber();
    const tipOptions = [
        { percentage: 15, amount: baseAmount * 0.15 },
        { percentage: 18, amount: baseAmount * 0.18 },
        { percentage: 20, amount: baseAmount * 0.20 },
        { percentage: 30, amount: baseAmount * 0.30 },
    ];

    const handleTipSelection = (tipData) => {
        setSelectedTip(tipData);
    };

    const handleCustomTip = () => {
        Alert.alert(
            'Pourboire personnalisé',
            'Fonctionnalité à venir',
            [{ text: 'OK' }]
        );
    };

    const handleContinue = () => {
        const tipAmount = selectedTip ? selectedTip.amount : 0;
        const totalAmount = baseAmount + tipAmount;
        
        navigation.navigate('Processing', {
            amount: amount,
            tip: formatCurrency(tipAmount),
            total: formatCurrency(totalAmount)
        });
    };

    const handleNoTip = () => {
        navigation.navigate('Processing', {
            amount: amount,
            tip: '0,00',
            total: amount
        });
    };

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#E2E8F0" barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <MaterialIcons name="close" size={24} color="#64748B" />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={styles.content}>
                {/* Icon */}
                <View style={styles.iconContainer}>
                    <MaterialIcons name="favorite-border" size={32} color="#64748B" />
                </View>

                {/* Title */}
                <Text style={styles.title}>Sélectionner le pourboire</Text>

                {/* Amount */}
                <Text style={styles.amount}>{amount} $</Text>

                {/* Tip Options Grid */}
                <View style={styles.tipGrid}>
                    {tipOptions.map((tip, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.tipOption,
                                selectedTip?.percentage === tip.percentage && styles.selectedTipOption
                            ]}
                            onPress={() => handleTipSelection(tip)}
                        >
                            <Text style={[
                                styles.tipPercentage,
                                selectedTip?.percentage === tip.percentage && styles.selectedTipText
                            ]}>
                                {tip.percentage}%
                            </Text>
                            <Text style={[
                                styles.tipAmount,
                                selectedTip?.percentage === tip.percentage && styles.selectedTipText
                            ]}>
                                ({formatCurrency(tip.amount)} $)
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Custom Tip Button */}
                <TouchableOpacity style={styles.customTipButton} onPress={handleCustomTip}>
                    <Text style={styles.customTipText}>Saisir</Text>
                </TouchableOpacity>

                {/* No Tip Button */}
                <TouchableOpacity style={styles.noTipButton} onPress={handleNoTip}>
                    <Text style={styles.noTipText}>Non merci</Text>
                </TouchableOpacity>

                {/* Continue Button */}
                {selectedTip && (
                    <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                        <Text style={styles.continueText}>Continuer</Text>
                    </TouchableOpacity>
                )}
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    backButton: {
        padding: 8,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingTop: 40,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: '#E2E8F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1E293B',
        marginBottom: 20,
        textAlign: 'center',
    },
    amount: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 40,
    },
    tipGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 30,
    },
    tipOption: {
        width: '48%',
        height: 80,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E2E8F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    selectedTipOption: {
        borderColor: '#3B82F6',
        backgroundColor: '#EBF4FF',
    },
    tipPercentage: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 4,
    },
    tipAmount: {
        fontSize: 14,
        color: '#64748B',
    },
    selectedTipText: {
        color: '#3B82F6',
    },
    customTipButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E2E8F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    customTipText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1E293B',
    },
    noTipButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E2E8F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    noTipText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1E293B',
    },
    continueButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#3B82F6',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#3B82F6',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    continueText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});

export default TipSelectionScreen;
