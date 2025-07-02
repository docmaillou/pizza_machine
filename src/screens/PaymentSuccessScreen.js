import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert,
    TextInput,
    Modal,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import InvoiceService from '../services/InvoiceService';

const PaymentSuccessScreen = ({ navigation, route }) => {
    const { transaction } = route.params || {};
    const [emailModalVisible, setEmailModalVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    if (!transaction) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>Erreur: Données de transaction manquantes</Text>
            </SafeAreaView>
        );
    }

    const handleNewSale = () => {
        navigation.navigate('Sale');
    };

    const handleViewReports = () => {
        navigation.navigate('Reports', {
            newTransaction: transaction
        });
    };

    const handleShareInvoice = async () => {
        setLoading(true);
        try {
            const result = await InvoiceService.shareInvoice(transaction);

            if (result.success) {
                Alert.alert('Succès', result.message);
            } else {
                Alert.alert('Erreur', result.error);
            }
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur inattendue s\'est produite');
        } finally {
            setLoading(false);
        }
    };

    const handleEmailInvoice = () => {
        setEmailModalVisible(true);
    };

    const handleSMSInvoice = async () => {
        setLoading(true);
        try {
            const result = await InvoiceService.sendInvoiceBySMS(transaction, '+14501115415');

            if (result.success) {
                Alert.alert('Succès', result.message);
            } else {
                Alert.alert('Erreur', result.error);
            }
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur inattendue s\'est produite');
        } finally {
            setLoading(false);
        }
    };

    const sendEmailInvoice = async () => {
        if (!email.trim()) {
            Alert.alert('Erreur', 'Veuillez entrer une adresse email');
            return;
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Erreur', 'Veuillez entrer une adresse email valide');
            return;
        }

        setLoading(true);
        try {
            const result = await InvoiceService.sendInvoiceByEmail(transaction, email);

            if (result.success) {
                Alert.alert('Succès', result.message);
                setEmailModalVisible(false);
                setEmail('');
            } else {
                Alert.alert('Erreur', result.error);
            }
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur inattendue s\'est produite');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('fr-FR');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Success Header */}
                <View style={styles.successHeader}>
                    <View style={styles.successIcon}>
                        <Ionicons name="checkmark-circle" size={80} color="#10B981" />
                    </View>
                    <Text style={styles.successTitle}>Paiement réussi !</Text>
                    <Text style={styles.successSubtitle}>Transaction complétée avec succès</Text>
                </View>

                {/* Transaction Details */}
                <View style={styles.transactionCard}>
                    <Text style={styles.cardTitle}>Détails de la transaction</Text>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>ID Transaction:</Text>
                        <Text style={styles.detailValue}>{transaction.id}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Date:</Text>
                        <Text style={styles.detailValue}>{formatDate(transaction.timestamp)}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Heure:</Text>
                        <Text style={styles.detailValue}>{formatTime(transaction.timestamp)}</Text>
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Sous-total:</Text>
                        <Text style={styles.detailValue}>{transaction.amountFormatted} $</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Pourboire:</Text>
                        <Text style={styles.detailValue}>{transaction.tipFormatted} $</Text>
                    </View>

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>TOTAL:</Text>
                        <Text style={styles.totalValue}>{transaction.totalFormatted} $</Text>
                    </View>
                </View>

                {/* Invoice Actions */}
                <View style={styles.invoiceSection}>
                    <Text style={styles.sectionTitle}>Facture</Text>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleShareInvoice}
                        disabled={loading}
                    >
                        <Ionicons name="share-outline" size={24} color="#667eea" />
                        <Text style={styles.actionButtonText}>Partager la facture</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleEmailInvoice}
                        disabled={loading}
                    >
                        <Ionicons name="mail-outline" size={24} color="#667eea" />
                        <Text style={styles.actionButtonText}>Envoyer par email</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleSMSInvoice}
                        disabled={loading}
                    >
                        <Ionicons name="chatbubble-outline" size={24} color="#667eea" />
                        <Text style={styles.actionButtonText}>Envoyer par téléphone</Text>
                    </TouchableOpacity>
                </View>

                {/* Navigation Actions */}
                <View style={styles.navigationSection}>
                    <TouchableOpacity
                        style={[styles.navButton, styles.primaryButton]}
                        onPress={handleNewSale}
                    >
                        <Text style={styles.primaryButtonText}>Nouvelle vente</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.navButton, styles.secondaryButton]}
                        onPress={handleViewReports}
                    >
                        <Text style={styles.secondaryButtonText}>Voir les rapports</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Email Modal */}
            <Modal
                visible={emailModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setEmailModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Envoyer la facture par email</Text>

                        <TextInput
                            style={styles.emailInput}
                            placeholder="Adresse email du client"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setEmailModalVisible(false)}
                                disabled={loading}
                            >
                                <Text style={styles.cancelButtonText}>Annuler</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.sendButton]}
                                onPress={sendEmailInvoice}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" size="small" />
                                ) : (
                                    <Text style={styles.sendButtonText}>Envoyer</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Loading Overlay */}
            {loading && !emailModalVisible && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#667eea" />
                    <Text style={styles.loadingText}>Génération de la facture...</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContent: {
        padding: 20,
    },
    successHeader: {
        alignItems: 'center',
        marginBottom: 30,
    },
    successIcon: {
        marginBottom: 20,
    },
    successTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#10B981',
        marginBottom: 8,
        textAlign: 'center',
    },
    successSubtitle: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
    },
    transactionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 15,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    detailLabel: {
        fontSize: 16,
        color: '#64748B',
    },
    detailValue: {
        fontSize: 16,
        color: '#1E293B',
        fontWeight: '500',
    },
    separator: {
        height: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 15,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        backgroundColor: '#667eea',
        marginHorizontal: -20,
        paddingHorizontal: 20,
        marginBottom: -20,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    invoiceSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 15,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    actionButtonText: {
        fontSize: 16,
        color: '#667eea',
        marginLeft: 12,
        fontWeight: '500',
    },
    navigationSection: {
        gap: 12,
    },
    navButton: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    primaryButton: {
        backgroundColor: '#667eea',
    },
    secondaryButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#667eea',
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#667eea',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        width: '100%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 20,
        textAlign: 'center',
    },
    emailInput: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    modalButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#F1F5F9',
    },
    sendButton: {
        backgroundColor: '#667eea',
    },
    cancelButtonText: {
        fontSize: 16,
        color: '#64748B',
        fontWeight: '500',
    },
    sendButtonText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#FFFFFF',
        marginTop: 10,
        fontSize: 16,
    },
    errorText: {
        fontSize: 16,
        color: '#EF4444',
        textAlign: 'center',
        margin: 20,
    },
});

export default PaymentSuccessScreen;
