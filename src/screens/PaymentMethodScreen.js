import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Alert,
    Platform
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import NFCPaymentService from '../services/NFCPaymentService';
import StripePaymentService from '../services/StripePaymentService';

const PaymentMethodScreen = ({ navigation, route }) => {
    const { amount, tip, total } = route.params || {};
    const [supportedMethods, setSupportedMethods] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initializePaymentMethods();
    }, []);

    const initializePaymentMethods = async () => {
        try {
            // Initialize payment services
            await NFCPaymentService.initialize();
            await StripePaymentService.initialize();

            // Get supported payment methods
            const methods = await StripePaymentService.getSupportedPaymentMethods();
            const nfcInfo = NFCPaymentService.getPaymentMethodInfo();

            setSupportedMethods({
                ...methods,
                nfc: nfcInfo.nfc,
                applePay: Platform.OS === 'ios' && nfcInfo.applePay,
                googlePay: Platform.OS === 'android' && nfcInfo.googlePay
            });

        } catch (error) {
            console.error('Error initializing payment methods:', error);
            Alert.alert('Erreur', 'Erreur lors de l\'initialisation des méthodes de paiement');
        } finally {
            setLoading(false);
        }
    };

    const handleContactlessPayment = () => {
        navigation.navigate('ContactlessPayment', {
            amount,
            tip,
            total,
            paymentType: 'contactless'
        });
    };

    const handleApplePayPayment = () => {
        navigation.navigate('ContactlessPayment', {
            amount,
            tip,
            total,
            paymentType: 'apple_pay'
        });
    };

    const handleGooglePayPayment = () => {
        navigation.navigate('ContactlessPayment', {
            amount,
            tip,
            total,
            paymentType: 'google_pay'
        });
    };

    const handleCashPayment = () => {
        // Navigate to existing processing screen for cash
        navigation.navigate('Processing', {
            amount,
            tip,
            total,
            paymentMethod: 'cash'
        });
    };

    const handleCardPayment = () => {
        // Navigate to existing processing screen for traditional card
        navigation.navigate('Processing', {
            amount,
            tip,
            total,
            paymentMethod: 'card'
        });
    };

    const handleBack = () => {
        navigation.goBack();
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Initialisation des paiements...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#E2E8F0" barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <MaterialIcons name="arrow-back" size={24} color="#64748B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Méthode de paiement</Text>
            </View>

            {/* Amount Display */}
            <View style={styles.amountContainer}>
                <Text style={styles.amountLabel}>Total à payer</Text>
                <Text style={styles.amountValue}>{total || amount} $</Text>
                {tip && tip !== '0,00' && (
                    <Text style={styles.tipText}>Incluant {tip} $ de pourboire</Text>
                )}
            </View>

            {/* Payment Methods */}
            <View style={styles.methodsContainer}>
                <Text style={styles.sectionTitle}>Choisissez votre méthode de paiement</Text>

                {/* Contactless Payments Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionSubtitle}>Paiements sans contact</Text>
                    
                    {supportedMethods.nfc && (
                        <TouchableOpacity
                            style={[styles.methodButton, styles.contactlessButton]}
                            onPress={handleContactlessPayment}
                        >
                            <View style={styles.methodIcon}>
                                <MaterialIcons name="contactless" size={32} color="#10B981" />
                            </View>
                            <View style={styles.methodInfo}>
                                <Text style={styles.methodTitle}>Carte sans contact</Text>
                                <Text style={styles.methodSubtitle}>Approchez votre carte ou téléphone</Text>
                            </View>
                            <MaterialIcons name="chevron-right" size={24} color="#64748B" />
                        </TouchableOpacity>
                    )}

                    {supportedMethods.applePay && (
                        <TouchableOpacity
                            style={[styles.methodButton, styles.applePayButton]}
                            onPress={handleApplePayPayment}
                        >
                            <View style={styles.methodIcon}>
                                <Ionicons name="logo-apple" size={32} color="#000" />
                            </View>
                            <View style={styles.methodInfo}>
                                <Text style={styles.methodTitle}>Apple Pay</Text>
                                <Text style={styles.methodSubtitle}>Paiement sécurisé avec Touch/Face ID</Text>
                            </View>
                            <MaterialIcons name="chevron-right" size={24} color="#64748B" />
                        </TouchableOpacity>
                    )}

                    {supportedMethods.googlePay && (
                        <TouchableOpacity
                            style={[styles.methodButton, styles.googlePayButton]}
                            onPress={handleGooglePayPayment}
                        >
                            <View style={styles.methodIcon}>
                                <Ionicons name="logo-google" size={32} color="#4285F4" />
                            </View>
                            <View style={styles.methodInfo}>
                                <Text style={styles.methodTitle}>Google Pay</Text>
                                <Text style={styles.methodSubtitle}>Paiement rapide et sécurisé</Text>
                            </View>
                            <MaterialIcons name="chevron-right" size={24} color="#64748B" />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Traditional Payments Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionSubtitle}>Paiements traditionnels</Text>
                    
                    <TouchableOpacity
                        style={[styles.methodButton, styles.cardButton]}
                        onPress={handleCardPayment}
                    >
                        <View style={styles.methodIcon}>
                            <MaterialIcons name="credit-card" size={32} color="#667eea" />
                        </View>
                        <View style={styles.methodInfo}>
                            <Text style={styles.methodTitle}>Carte de crédit/débit</Text>
                            <Text style={styles.methodSubtitle}>Insérez ou glissez votre carte</Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color="#64748B" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.methodButton, styles.cashButton]}
                        onPress={handleCashPayment}
                    >
                        <View style={styles.methodIcon}>
                            <MaterialIcons name="attach-money" size={32} color="#059669" />
                        </View>
                        <View style={styles.methodInfo}>
                            <Text style={styles.methodTitle}>Espèces</Text>
                            <Text style={styles.methodSubtitle}>Paiement en argent comptant</Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color="#64748B" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#64748B',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    backButton: {
        padding: 8,
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1E293B',
    },
    amountContainer: {
        backgroundColor: '#FFFFFF',
        padding: 24,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    amountLabel: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 4,
    },
    amountValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    tipText: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 4,
    },
    methodsContainer: {
        flex: 1,
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1E293B',
        marginBottom: 20,
    },
    section: {
        marginBottom: 24,
    },
    sectionSubtitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#475569',
        marginBottom: 12,
    },
    methodButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    methodIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    methodInfo: {
        flex: 1,
    },
    methodTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E293B',
        marginBottom: 2,
    },
    methodSubtitle: {
        fontSize: 14,
        color: '#64748B',
    },
    contactlessButton: {
        borderColor: '#10B981',
        borderWidth: 2,
    },
    applePayButton: {
        borderColor: '#000',
        borderWidth: 1,
    },
    googlePayButton: {
        borderColor: '#4285F4',
        borderWidth: 1,
    },
    cardButton: {
        borderColor: '#667eea',
        borderWidth: 1,
    },
    cashButton: {
        borderColor: '#059669',
        borderWidth: 1,
    },
});

export default PaymentMethodScreen;
