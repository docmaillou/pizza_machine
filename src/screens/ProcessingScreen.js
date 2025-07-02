import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Animated,
    Easing,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import mockDataService from '../services/MockDataService';

const ProcessingScreen = ({ navigation, route }) => {
    const { amount, tip = '0,00', total } = route.params || { amount: '0,00', tip: '0,00', total: '0,00' };
    const [fadeAnim] = useState(new Animated.Value(0.3));
    const [scaleAnim] = useState(new Animated.Value(1));

    useEffect(() => {
        // Start loading animation
        const pulseAnimation = Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 1000,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleAnim, {
                        toValue: 1.1,
                        duration: 1000,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(fadeAnim, {
                        toValue: 0.3,
                        duration: 1000,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleAnim, {
                        toValue: 1,
                        duration: 1000,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ]),
            ])
        );

        pulseAnimation.start();

        // Process payment using mock service
        const timer = setTimeout(async () => {
            pulseAnimation.stop();
            await handlePaymentComplete();
        }, 2000); // 2 seconds processing time

        return () => {
            clearTimeout(timer);
            pulseAnimation.stop();
        };
    }, []);

    const handlePaymentComplete = async () => {
        try {
            const finalTotal = total || amount;
            const result = await mockDataService.processPayment(amount, 'card', 'Caisse', tip, finalTotal);

            if (result.success) {
                // Payment successful - navigate to success screen with invoice options
                navigation.replace('PaymentSuccess', {
                    transaction: result.transaction
                });
            } else {
                // Payment failed
                Alert.alert(
                    'Erreur de paiement',
                    result.error || 'Le paiement a échoué. Veuillez réessayer.',
                    [
                        {
                            text: 'Réessayer',
                            onPress: () => navigation.goBack(),
                        },
                    ]
                );
            }
        } catch (error) {
            console.error('Payment processing error:', error);
            Alert.alert(
                'Erreur système',
                'Une erreur inattendue s\'est produite. Veuillez réessayer.',
                [
                    {
                        text: 'Réessayer',
                        onPress: () => navigation.goBack(),
                    },
                ]
            );
        }
    };

    const handleCancel = () => {
        Alert.alert(
            'Annuler le paiement',
            'Êtes-vous sûr de vouloir annuler cette transaction?',
            [
                {
                    text: 'Non',
                    style: 'cancel',
                },
                {
                    text: 'Oui, annuler',
                    onPress: () => navigation.goBack(),
                    style: 'destructive',
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Processing Animation */}
                <View style={styles.animationContainer}>
                    <Animated.View
                        style={[
                            styles.processingCircle,
                            {
                                opacity: fadeAnim,
                                transform: [{ scale: scaleAnim }],
                            },
                        ]}
                    />
                    <Animated.View
                        style={[
                            styles.processingCircleInner,
                            {
                                opacity: fadeAnim,
                                transform: [{ scale: scaleAnim }],
                            },
                        ]}
                    />
                </View>

                {/* Processing Text */}
                <Animated.Text
                    style={[
                        styles.processingText,
                        { opacity: fadeAnim }
                    ]}
                >
                    Traitement...
                </Animated.Text>

                {/* Amount Display */}
                <View style={styles.amountContainer}>
                    <Text style={styles.amountLabel}>Total à payer:</Text>
                    <Text style={styles.amountText}>{total || amount} $</Text>
                    {tip !== '0,00' && (
                        <View style={styles.tipBreakdown}>
                            <Text style={styles.tipText}>Sous-total: {amount} $</Text>
                            <Text style={styles.tipText}>Pourboire: {tip} $</Text>
                        </View>
                    )}
                </View>

                {/* Processing Details */}
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailText}>Connexion au processeur de paiement</Text>
                    <Text style={styles.detailText}>Validation de la transaction</Text>
                    <Text style={styles.detailText}>Finalisation...</Text>
                </View>
            </View>

            {/* Cancel Button (Optional - hidden for authentic Clover experience) */}
            {/* 
            <TouchableOpacity 
                style={styles.cancelButton}
                onPress={handleCancel}
                activeOpacity={0.7}
            >
                <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
            */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    animationContainer: {
        position: 'relative',
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    processingCircle: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#3B82F6',
        backgroundColor: 'transparent',
    },
    processingCircleInner: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#3B82F6',
        opacity: 0.2,
    },
    processingText: {
        fontSize: 32,
        fontWeight: '400',
        color: '#1E293B',
        textAlign: 'center',
        marginBottom: 40,
    },
    amountContainer: {
        alignItems: 'center',
        marginBottom: 40,
        paddingVertical: 20,
        paddingHorizontal: 30,
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
        shadowRadius: 4,
        elevation: 3,
    },
    amountLabel: {
        fontSize: 16,
        color: '#64748B',
        marginBottom: 5,
    },
    amountText: {
        fontSize: 28,
        fontWeight: '600',
        color: '#1E293B',
    },
    tipBreakdown: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        alignItems: 'center',
    },
    tipText: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 2,
    },
    detailsContainer: {
        alignItems: 'center',
        gap: 10,
    },
    detailText: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
    },
    cancelButton: {
        margin: 20,
        paddingVertical: 12,
        paddingHorizontal: 30,
        backgroundColor: '#EF4444',
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default ProcessingScreen; 