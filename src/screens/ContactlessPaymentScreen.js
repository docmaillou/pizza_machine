import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Alert,
    Animated,
    Platform
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

// Conditional import for Stripe hook
let useStripe;
try {
    if (Constants.appOwnership === 'standalone') {
        useStripe = require('@stripe/stripe-react-native').useStripe;
    }
} catch (error) {
    console.log('Stripe SDK not available in Expo Go');
}

// Mock useStripe hook for Expo Go
const mockUseStripe = () => ({
    initPaymentSheet: async () => ({ error: null }),
    presentPaymentSheet: async () => ({ error: null }),
    confirmPayment: async () => ({ error: null, paymentIntent: { status: 'succeeded' } }),
    createPaymentMethod: async () => ({ error: null, paymentMethod: { id: 'pm_mock' } }),
});
import NFCPaymentService from '../services/NFCPaymentService';
import StripePaymentService from '../services/StripePaymentService';

const ContactlessPaymentScreen = ({ navigation, route }) => {
    const { amount, tip, total, paymentType } = route.params || {};
    const [isProcessing, setIsProcessing] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    // Use real or mock useStripe hook
    const stripeHook = useStripe || mockUseStripe;
    const stripe = stripeHook();

    // Animation for the contactless icon
    const pulseAnimation = useRef(new Animated.Value(1)).current;
    const waveAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        startPaymentProcess();
        startAnimations();

        return () => {
            cleanup();
        };
    }, []);

    const startAnimations = () => {
        // Pulse animation for the main icon
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnimation, {
                    toValue: 1.2,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnimation, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        );

        // Wave animation for the contactless waves
        const wave = Animated.loop(
            Animated.timing(waveAnimation, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            })
        );

        pulse.start();
        wave.start();
    };

    const startPaymentProcess = async () => {
        setIsListening(true);

        switch (paymentType) {
            case 'contactless':
                await startContactlessPayment();
                break;
            case 'apple_pay':
                await processApplePayPayment();
                break;
            case 'google_pay':
                await processGooglePayPayment();
                break;
            default:
                await startContactlessPayment();
        }
    };

    const startContactlessPayment = async () => {
        setStatusMessage('Approchez votre carte ou téléphone...');

        try {
            if (Constants.appOwnership === 'standalone') {
                // Use real NFC service in standalone builds
                await NFCPaymentService.startPaymentListener(
                    total || amount,
                    handlePaymentSuccess,
                    handlePaymentError
                );
            } else {
                // Simulate NFC payment in Expo Go
                setTimeout(() => {
                    const success = Math.random() > 0.1; // 90% success rate
                    if (success) {
                        handlePaymentSuccess({
                            success: true,
                            paymentMethod: 'nfc_card',
                            transactionId: `NFC_${Date.now()}`
                        });
                    } else {
                        handlePaymentError('Carte non reconnue');
                    }
                }, 3000);
            }
        } catch (error) {
            handlePaymentError('Erreur lors du démarrage du paiement sans contact');
        }
    };

    const processApplePayPayment = async () => {
        setStatusMessage('Authentifiez avec Touch ID ou Face ID...');
        setIsProcessing(true);

        try {
            if (Constants.appOwnership === 'standalone') {
                // Use real Stripe service in standalone builds
                const result = await StripePaymentService.processApplePayPayment(
                    total || amount,
                    stripe
                );

                if (result.success) {
                    handlePaymentSuccess({
                        success: true,
                        paymentMethod: 'apple_pay',
                        transactionId: result.transactionId
                    });
                } else {
                    handlePaymentError(result.error);
                }
            } else {
                // Simulate Apple Pay payment in Expo Go
                setTimeout(() => {
                    const success = Math.random() > 0.1; // 90% success rate
                    if (success) {
                        handlePaymentSuccess({
                            success: true,
                            paymentMethod: 'apple_pay',
                            transactionId: `APPLE_${Date.now()}`
                        });
                    } else {
                        handlePaymentError('Paiement Apple Pay refusé');
                    }
                }, 2000);
            }
        } catch (error) {
            handlePaymentError('Erreur lors du paiement Apple Pay');
        }
    };

    const processGooglePayPayment = async () => {
        setStatusMessage('Confirmez le paiement Google Pay...');
        setIsProcessing(true);

        try {
            if (Constants.appOwnership === 'standalone') {
                // Use real Stripe service in standalone builds
                const result = await StripePaymentService.processGooglePayPayment(
                    total || amount,
                    stripe
                );

                if (result.success) {
                    handlePaymentSuccess({
                        success: true,
                        paymentMethod: 'google_pay',
                        transactionId: result.transactionId
                    });
                } else {
                    handlePaymentError(result.error);
                }
            } else {
                // Simulate Google Pay payment in Expo Go
                setTimeout(() => {
                    const success = Math.random() > 0.1; // 90% success rate
                    if (success) {
                        handlePaymentSuccess({
                            success: true,
                            paymentMethod: 'google_pay',
                            transactionId: `GOOGLE_${Date.now()}`
                        });
                    } else {
                        handlePaymentError('Paiement Google Pay refusé');
                    }
                }, 2000);
            }
        } catch (error) {
            handlePaymentError('Erreur lors du paiement Google Pay');
        }
    };

    const handlePaymentSuccess = (result) => {
        setIsProcessing(false);
        setIsListening(false);
        setStatusMessage('Paiement réussi!');

        // Create transaction object for success screen
        const transaction = {
            id: result.transactionId || `TXN${Date.now()}`,
            amount: amount.replace(',', '.'),
            amountFormatted: amount,
            tip: tip ? tip.replace(',', '.') : '0.00',
            tipFormatted: tip || '0,00',
            total: (total || amount).replace(',', '.'),
            totalFormatted: total || amount,
            employeeId: 'Caisse',
            timestamp: new Date(),
            paymentMethod: result.paymentMethod || 'contactless',
            status: 'completed',
            cardInfo: result.cardData
        };

        // Navigate to success screen after a brief delay
        setTimeout(() => {
            navigation.replace('PaymentSuccess', {
                transaction
            });
        }, 1500);
    };

    const handlePaymentError = (error) => {
        setIsProcessing(false);
        setIsListening(false);

        Alert.alert(
            'Erreur de paiement',
            error || 'Le paiement a échoué. Veuillez réessayer.',
            [
                {
                    text: 'Réessayer',
                    onPress: () => {
                        setIsProcessing(false);
                        startPaymentProcess();
                    },
                },
                {
                    text: 'Retour',
                    onPress: () => navigation.goBack(),
                    style: 'cancel',
                },
            ]
        );
    };

    const cleanup = async () => {
        try {
            await NFCPaymentService.stopPaymentListener();
        } catch (error) {
            console.error('Error during cleanup:', error);
        }
    };

    const handleCancel = async () => {
        await cleanup();
        navigation.goBack();
    };

    const getPaymentIcon = () => {
        switch (paymentType) {
            case 'apple_pay':
                return <Ionicons name="logo-apple" size={64} color="#000" />;
            case 'google_pay':
                return <Ionicons name="logo-google" size={64} color="#4285F4" />;
            default:
                return <MaterialIcons name="contactless" size={64} color="#10B981" />;
        }
    };

    const getPaymentTitle = () => {
        switch (paymentType) {
            case 'apple_pay':
                return 'Apple Pay';
            case 'google_pay':
                return 'Google Pay';
            default:
                return 'Paiement sans contact';
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#1E293B" barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                    <MaterialIcons name="close" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{getPaymentTitle()}</Text>
            </View>

            {/* Content */}
            <View style={styles.content}>
                {/* Amount Display */}
                <View style={styles.amountContainer}>
                    <Text style={styles.amountLabel}>Montant à payer</Text>
                    <Text style={styles.amountValue}>{total || amount} $</Text>
                </View>

                {/* Payment Icon with Animation */}
                <View style={styles.iconContainer}>
                    <Animated.View
                        style={[
                            styles.iconWrapper,
                            {
                                transform: [{ scale: pulseAnimation }],
                            },
                        ]}
                    >
                        {getPaymentIcon()}
                    </Animated.View>

                    {/* Animated waves for contactless */}
                    {paymentType === 'contactless' && (
                        <Animated.View
                            style={[
                                styles.waveContainer,
                                {
                                    opacity: waveAnimation,
                                },
                            ]}
                        >
                            <View style={[styles.wave, styles.wave1]} />
                            <View style={[styles.wave, styles.wave2]} />
                            <View style={[styles.wave, styles.wave3]} />
                        </Animated.View>
                    )}
                </View>

                {/* Status Message */}
                <Text style={styles.statusMessage}>{statusMessage}</Text>

                {/* Instructions */}
                <View style={styles.instructionsContainer}>
                    {paymentType === 'contactless' && (
                        <>
                            <Text style={styles.instructionText}>
                                • Approchez votre carte ou téléphone du lecteur
                            </Text>
                            <Text style={styles.instructionText}>
                                • Maintenez jusqu'à confirmation
                            </Text>
                            <Text style={styles.instructionText}>
                                • Ne retirez pas avant la fin
                            </Text>
                        </>
                    )}
                    {paymentType === 'apple_pay' && (
                        <>
                            <Text style={styles.instructionText}>
                                • Utilisez Touch ID ou Face ID pour confirmer
                            </Text>
                            <Text style={styles.instructionText}>
                                • Votre paiement est sécurisé et crypté
                            </Text>
                        </>
                    )}
                    {paymentType === 'google_pay' && (
                        <>
                            <Text style={styles.instructionText}>
                                • Confirmez le paiement sur votre appareil
                            </Text>
                            <Text style={styles.instructionText}>
                                • Votre paiement est sécurisé
                            </Text>
                        </>
                    )}
                </View>

                {/* Processing Indicator */}
                {isProcessing && (
                    <View style={styles.processingContainer}>
                        <Text style={styles.processingText}>Traitement en cours...</Text>
                    </View>
                )}
            </View>

            {/* Cancel Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.cancelPaymentButton}
                    onPress={handleCancel}
                    disabled={isProcessing}
                >
                    <Text style={styles.cancelPaymentButtonText}>Annuler le paiement</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E293B',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    cancelButton: {
        padding: 8,
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    amountContainer: {
        alignItems: 'center',
        marginBottom: 60,
    },
    amountLabel: {
        fontSize: 16,
        color: '#94A3B8',
        marginBottom: 8,
    },
    amountValue: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    iconContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    iconWrapper: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#334155',
        alignItems: 'center',
        justifyContent: 'center',
    },
    waveContainer: {
        position: 'absolute',
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wave: {
        position: 'absolute',
        borderWidth: 2,
        borderColor: '#10B981',
        borderRadius: 100,
    },
    wave1: {
        width: 140,
        height: 140,
    },
    wave2: {
        width: 160,
        height: 160,
    },
    wave3: {
        width: 180,
        height: 180,
    },
    statusMessage: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 30,
    },
    instructionsContainer: {
        alignItems: 'flex-start',
    },
    instructionText: {
        fontSize: 16,
        color: '#94A3B8',
        marginBottom: 8,
        textAlign: 'left',
    },
    processingContainer: {
        marginTop: 30,
    },
    processingText: {
        fontSize: 16,
        color: '#10B981',
        textAlign: 'center',
    },
    footer: {
        padding: 20,
    },
    cancelPaymentButton: {
        backgroundColor: '#475569',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        alignItems: 'center',
    },
    cancelPaymentButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});

export default ContactlessPaymentScreen;
