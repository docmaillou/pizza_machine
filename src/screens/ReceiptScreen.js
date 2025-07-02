import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Alert,
    Share,
    Linking,
} from 'react-native';
import {
    Text,
    Card,
    Button,
    Title,
    Paragraph,
    useTheme,
    Divider,
    IconButton,
    TextInput,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ReceiptScreen = ({ route, navigation }) => {
    const { transaction } = route.params;
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [isSending, setIsSending] = useState(false);
    const theme = useTheme();

    const formatCurrency = (value) => {
        return `$${parseFloat(value || 0).toFixed(2)}`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handlePrintReceipt = () => {
        Alert.alert(
            'Print Receipt',
            'Printing functionality would be integrated with thermal receipt printers in production.',
            [{ text: 'OK' }]
        );
    };

    const handleSendSMS = async () => {
        if (!customerPhone) {
            Alert.alert('Error', 'Please enter customer phone number');
            return;
        }

        setIsSending(true);

        // Simulate SMS sending
        setTimeout(() => {
            setIsSending(false);
            Alert.alert(
                'Success',
                `Receipt sent via SMS to ${customerPhone}`,
                [{ text: 'OK' }]
            );
        }, 2000);
    };

    const handleSendEmail = async () => {
        if (!customerEmail) {
            Alert.alert('Error', 'Please enter customer email address');
            return;
        }

        setIsSending(true);

        // Simulate email sending
        setTimeout(() => {
            setIsSending(false);
            Alert.alert(
                'Success',
                `Receipt sent via email to ${customerEmail}`,
                [{ text: 'OK' }]
            );
        }, 2000);
    };

    const handleShareReceipt = async () => {
        try {
            const receiptText = generateReceiptText();
            await Share.share({
                message: receiptText,
                title: 'Pizza POS Receipt',
            });
        } catch (error) {
            Alert.alert('Error', 'Failed to share receipt');
        }
    };

    const generateReceiptText = () => {
        return `
PIZZA POS RECEIPT
================

Transaction ID: ${transaction.id}
Date: ${formatDate(transaction.timestamp)}
Employee: ${transaction.employee?.name}

Subtotal: ${formatCurrency(transaction.amount)}
Tip: ${formatCurrency(transaction.tip)}
Total: ${formatCurrency(transaction.total)}

Payment Method: ${transaction.paymentMethod?.toUpperCase()}

Thank you for your order!
=======================
    `.trim();
    };

    const handleNewTransaction = () => {
        navigation.navigate('Payment');
    };

    const handleViewHistory = () => {
        navigation.navigate('OrderHistory');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView style={styles.scrollView}>
                {/* Header */}
                <View style={styles.header}>
                    <Icon name="receipt" size={60} color={theme.colors.success} />
                    <Title style={[styles.headerTitle, { color: theme.colors.success }]}>
                        Payment Successful!
                    </Title>
                    <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
                        Transaction completed successfully
                    </Text>
                </View>

                {/* Receipt Card */}
                <Card style={styles.receiptCard}>
                    <Card.Content>
                        <View style={styles.receiptHeader}>
                            <Title style={[styles.storeName, { color: theme.colors.primary }]}>
                                PIZZA POS
                            </Title>
                            <Text style={[styles.storeInfo, { color: theme.colors.textSecondary }]}>
                                123 Pizza Street{'\n'}
                                City, State 12345{'\n'}
                                (555) 123-4567
                            </Text>
                        </View>

                        <Divider style={styles.divider} />

                        <View style={styles.transactionInfo}>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>
                                    Transaction ID:
                                </Text>
                                <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                                    {transaction.id}
                                </Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>
                                    Date & Time:
                                </Text>
                                <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                                    {formatDate(transaction.timestamp)}
                                </Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>
                                    Employee:
                                </Text>
                                <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                                    {transaction.employee?.name}
                                </Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>
                                    Payment Method:
                                </Text>
                                <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                                    {transaction.paymentMethod?.toUpperCase()}
                                </Text>
                            </View>
                        </View>

                        <Divider style={styles.divider} />

                        <View style={styles.amountBreakdown}>
                            <View style={styles.amountRow}>
                                <Text style={[styles.amountLabel, { color: theme.colors.textSecondary }]}>
                                    Subtotal:
                                </Text>
                                <Text style={[styles.amountValue, { color: theme.colors.text }]}>
                                    {formatCurrency(transaction.amount)}
                                </Text>
                            </View>
                            <View style={styles.amountRow}>
                                <Text style={[styles.amountLabel, { color: theme.colors.textSecondary }]}>
                                    Tip:
                                </Text>
                                <Text style={[styles.amountValue, { color: theme.colors.text }]}>
                                    {formatCurrency(transaction.tip)}
                                </Text>
                            </View>
                            <Divider style={styles.divider} />
                            <View style={styles.amountRow}>
                                <Text style={[styles.totalLabel, { color: theme.colors.primary, fontWeight: 'bold' }]}>
                                    TOTAL:
                                </Text>
                                <Text style={[styles.totalValue, { color: theme.colors.primary, fontWeight: 'bold' }]}>
                                    {formatCurrency(transaction.total)}
                                </Text>
                            </View>
                        </View>

                        <Divider style={styles.divider} />

                        <View style={styles.footer}>
                            <Text style={[styles.footerText, { color: theme.colors.textSecondary, textAlign: 'center' }]}>
                                Thank you for your order!{'\n'}
                                Please come again!
                            </Text>
                        </View>
                    </Card.Content>
                </Card>

                {/* Receipt Actions */}
                <Card style={styles.actionsCard}>
                    <Card.Content>
                        <Title style={[styles.sectionTitle, { color: theme.colors.text }]}>
                            Receipt Options
                        </Title>

                        {/* Print Receipt */}
                        <Button
                            mode="outlined"
                            onPress={handlePrintReceipt}
                            style={styles.actionButton}
                            icon="printer"
                        >
                            Print Receipt
                        </Button>

                        {/* Share Receipt */}
                        <Button
                            mode="outlined"
                            onPress={handleShareReceipt}
                            style={styles.actionButton}
                            icon="share"
                        >
                            Share Receipt
                        </Button>

                        {/* SMS Receipt */}
                        <View style={styles.smsSection}>
                            <TextInput
                                label="Customer Phone Number"
                                value={customerPhone}
                                onChangeText={setCustomerPhone}
                                mode="outlined"
                                style={styles.input}
                                keyboardType="phone-pad"
                                placeholder="(555) 123-4567"
                            />
                            <Button
                                mode="outlined"
                                onPress={handleSendSMS}
                                loading={isSending}
                                disabled={isSending}
                                style={styles.actionButton}
                                icon="message"
                            >
                                Send SMS Receipt
                            </Button>
                        </View>

                        {/* Email Receipt */}
                        <View style={styles.emailSection}>
                            <TextInput
                                label="Customer Email"
                                value={customerEmail}
                                onChangeText={setCustomerEmail}
                                mode="outlined"
                                style={styles.input}
                                keyboardType="email-address"
                                placeholder="customer@example.com"
                            />
                            <Button
                                mode="outlined"
                                onPress={handleSendEmail}
                                loading={isSending}
                                disabled={isSending}
                                style={styles.actionButton}
                                icon="email"
                            >
                                Send Email Receipt
                            </Button>
                        </View>
                    </Card.Content>
                </Card>

                {/* Navigation Buttons */}
                <View style={styles.navigationButtons}>
                    <Button
                        mode="contained"
                        onPress={handleNewTransaction}
                        style={styles.navButton}
                        icon="add"
                    >
                        New Transaction
                    </Button>
                    <Button
                        mode="outlined"
                        onPress={handleViewHistory}
                        style={styles.navButton}
                        icon="history"
                    >
                        View History
                    </Button>
                </View>
            </ScrollView>
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
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 16,
    },
    headerSubtitle: {
        fontSize: 16,
        marginTop: 8,
    },
    receiptCard: {
        marginBottom: 24,
        elevation: 4,
    },
    receiptHeader: {
        alignItems: 'center',
        marginBottom: 16,
    },
    storeName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    storeInfo: {
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 18,
    },
    divider: {
        marginVertical: 12,
    },
    transactionInfo: {
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
    },
    infoLabel: {
        fontSize: 12,
    },
    infoValue: {
        fontSize: 12,
        fontWeight: '500',
    },
    amountBreakdown: {
        marginBottom: 16,
    },
    amountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
    },
    amountLabel: {
        fontSize: 14,
    },
    amountValue: {
        fontSize: 14,
    },
    totalLabel: {
        fontSize: 16,
    },
    totalValue: {
        fontSize: 16,
    },
    footer: {
        marginTop: 16,
    },
    footerText: {
        fontSize: 12,
        lineHeight: 18,
    },
    actionsCard: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    actionButton: {
        marginBottom: 12,
    },
    smsSection: {
        marginBottom: 16,
    },
    emailSection: {
        marginBottom: 16,
    },
    input: {
        marginBottom: 8,
    },
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    navButton: {
        flex: 1,
        marginHorizontal: 4,
    },
});

export default ReceiptScreen; 