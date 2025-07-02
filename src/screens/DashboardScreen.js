import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
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

const DashboardScreen = ({ navigation }) => {
    const [todayStats, setTodayStats] = useState({
        totalSales: 0,
        totalTransactions: 0,
        averageOrder: 0,
        totalTips: 0,
    });
    const [recentTransactions, setRecentTransactions] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        // Simulate loading dashboard data
        loadDashboardData();
    }, []);

    const loadDashboardData = () => {
        // Mock data - in real app, this would come from API/database
        setTodayStats({
            totalSales: 1247.50,
            totalTransactions: 23,
            averageOrder: 54.24,
            totalTips: 186.25,
        });

        setRecentTransactions([
            {
                id: '001',
                amount: 45.99,
                tip: 8.00,
                paymentMethod: 'card',
                time: '2:34 PM',
                status: 'completed',
            },
            {
                id: '002',
                amount: 32.50,
                tip: 5.00,
                paymentMethod: 'cash',
                time: '2:15 PM',
                status: 'completed',
            },
            {
                id: '003',
                amount: 67.25,
                tip: 12.00,
                paymentMethod: 'nfc',
                time: '1:58 PM',
                status: 'completed',
            },
        ]);
    };

    const formatCurrency = (value) => {
        return `$${parseFloat(value || 0).toFixed(2)}`;
    };

    const getPaymentMethodIcon = (method) => {
        switch (method) {
            case 'card':
                return 'credit-card';
            case 'cash':
                return 'money';
            case 'nfc':
                return 'nfc';
            case 'mobile':
                return 'smartphone';
            default:
                return 'payment';
        }
    };

    const getPaymentMethodColor = (method) => {
        switch (method) {
            case 'card':
                return theme.colors.card;
            case 'cash':
                return theme.colors.cash;
            case 'nfc':
                return theme.colors.nfc;
            case 'mobile':
                return theme.colors.mobile;
            default:
                return theme.colors.primary;
        }
    };

    const handleQuickAction = (action) => {
        switch (action) {
            case 'newTransaction':
                navigation.navigate('Payment');
                break;
            case 'viewReports':
                navigation.navigate('Reports');
                break;
            case 'viewHistory':
                navigation.navigate('OrderHistory');
                break;
            case 'settings':
                navigation.navigate('Settings');
                break;
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView style={styles.scrollView}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.welcomeSection}>
                        <Title style={[styles.welcomeTitle, { color: theme.colors.primary }]}>
                            Welcome back!
                        </Title>
                        <Text style={[styles.welcomeSubtitle, { color: theme.colors.textSecondary }]}>
                            {global.currentEmployee?.name} - {global.currentEmployee?.role}
                        </Text>
                    </View>
                    <Icon name="local-pizza" size={40} color={theme.colors.primary} />
                </View>

                {/* Today's Stats */}
                <Card style={styles.statsCard}>
                    <Card.Content>
                        <Title style={[styles.sectionTitle, { color: theme.colors.text }]}>
                            Today's Performance
                        </Title>
                        <View style={styles.statsGrid}>
                            <View style={styles.statItem}>
                                <Icon name="attach-money" size={32} color={theme.colors.success} />
                                <Text style={[styles.statValue, { color: theme.colors.success }]}>
                                    {formatCurrency(todayStats.totalSales)}
                                </Text>
                                <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                                    Total Sales
                                </Text>
                            </View>
                            <View style={styles.statItem}>
                                <Icon name="receipt" size={32} color={theme.colors.info} />
                                <Text style={[styles.statValue, { color: theme.colors.info }]}>
                                    {todayStats.totalTransactions}
                                </Text>
                                <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                                    Transactions
                                </Text>
                            </View>
                            <View style={styles.statItem}>
                                <Icon name="trending-up" size={32} color={theme.colors.warning} />
                                <Text style={[styles.statValue, { color: theme.colors.warning }]}>
                                    {formatCurrency(todayStats.averageOrder)}
                                </Text>
                                <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                                    Avg Order
                                </Text>
                            </View>
                            <View style={styles.statItem}>
                                <Icon name="thumb-up" size={32} color={theme.colors.accent} />
                                <Text style={[styles.statValue, { color: theme.colors.accent }]}>
                                    {formatCurrency(todayStats.totalTips)}
                                </Text>
                                <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                                    Total Tips
                                </Text>
                            </View>
                        </View>
                    </Card.Content>
                </Card>

                {/* Quick Actions */}
                <Card style={styles.quickActionsCard}>
                    <Card.Content>
                        <Title style={[styles.sectionTitle, { color: theme.colors.text }]}>
                            Quick Actions
                        </Title>
                        <View style={styles.quickActionsGrid}>
                            <Button
                                mode="contained"
                                onPress={() => handleQuickAction('newTransaction')}
                                style={[styles.quickActionButton, { backgroundColor: theme.colors.primary }]}
                                contentStyle={styles.quickActionContent}
                                icon="add"
                            >
                                New Transaction
                            </Button>
                            <Button
                                mode="outlined"
                                onPress={() => handleQuickAction('viewReports')}
                                style={styles.quickActionButton}
                                contentStyle={styles.quickActionContent}
                                icon="assessment"
                            >
                                View Reports
                            </Button>
                            <Button
                                mode="outlined"
                                onPress={() => handleQuickAction('viewHistory')}
                                style={styles.quickActionButton}
                                contentStyle={styles.quickActionContent}
                                icon="history"
                            >
                                Order History
                            </Button>
                            <Button
                                mode="outlined"
                                onPress={() => handleQuickAction('settings')}
                                style={styles.quickActionButton}
                                contentStyle={styles.quickActionContent}
                                icon="settings"
                            >
                                Settings
                            </Button>
                        </View>
                    </Card.Content>
                </Card>

                {/* Recent Transactions */}
                <Card style={styles.recentTransactionsCard}>
                    <Card.Content>
                        <View style={styles.recentTransactionsHeader}>
                            <Title style={[styles.sectionTitle, { color: theme.colors.text }]}>
                                Recent Transactions
                            </Title>
                            <Button
                                mode="text"
                                onPress={() => handleQuickAction('viewHistory')}
                                compact
                            >
                                View All
                            </Button>
                        </View>

                        {recentTransactions.map((transaction, index) => (
                            <View key={transaction.id}>
                                <View style={styles.transactionItem}>
                                    <View style={styles.transactionLeft}>
                                        <Icon
                                            name={getPaymentMethodIcon(transaction.paymentMethod)}
                                            size={24}
                                            color={getPaymentMethodColor(transaction.paymentMethod)}
                                        />
                                        <View style={styles.transactionDetails}>
                                            <Text style={[styles.transactionId, { color: theme.colors.text }]}>
                                                #{transaction.id}
                                            </Text>
                                            <Text style={[styles.transactionTime, { color: theme.colors.textSecondary }]}>
                                                {transaction.time}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.transactionRight}>
                                        <Text style={[styles.transactionAmount, { color: theme.colors.text }]}>
                                            {formatCurrency(transaction.amount)}
                                        </Text>
                                        <Text style={[styles.transactionTip, { color: theme.colors.accent }]}>
                                            +{formatCurrency(transaction.tip)} tip
                                        </Text>
                                    </View>
                                </View>
                                {index < recentTransactions.length - 1 && (
                                    <Divider style={styles.transactionDivider} />
                                )}
                            </View>
                        ))}
                    </Card.Content>
                </Card>

                {/* System Status */}
                <Card style={styles.systemStatusCard}>
                    <Card.Content>
                        <Title style={[styles.sectionTitle, { color: theme.colors.text }]}>
                            System Status
                        </Title>
                        <View style={styles.statusItems}>
                            <View style={styles.statusItem}>
                                <Icon name="wifi" size={20} color={theme.colors.success} />
                                <Text style={[styles.statusText, { color: theme.colors.text }]}>
                                    Online
                                </Text>
                            </View>
                            <View style={styles.statusItem}>
                                <Icon name="nfc" size={20} color={theme.colors.success} />
                                <Text style={[styles.statusText, { color: theme.colors.text }]}>
                                    NFC Ready
                                </Text>
                            </View>
                            <View style={styles.statusItem}>
                                <Icon name="battery-full" size={20} color={theme.colors.success} />
                                <Text style={[styles.statusText, { color: theme.colors.text }]}>
                                    85% Battery
                                </Text>
                            </View>
                        </View>
                    </Card.Content>
                </Card>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    welcomeSection: {
        flex: 1,
    },
    welcomeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    welcomeSubtitle: {
        fontSize: 14,
        marginTop: 4,
    },
    statsCard: {
        marginBottom: 16,
        elevation: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    statItem: {
        width: (width - 64) / 2 - 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 8,
    },
    statLabel: {
        fontSize: 12,
        marginTop: 4,
        textAlign: 'center',
    },
    quickActionsCard: {
        marginBottom: 16,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    quickActionButton: {
        width: (width - 64) / 2 - 8,
        marginBottom: 12,
    },
    quickActionContent: {
        height: 48,
    },
    recentTransactionsCard: {
        marginBottom: 16,
    },
    recentTransactionsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    transactionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    transactionDetails: {
        marginLeft: 12,
    },
    transactionId: {
        fontSize: 14,
        fontWeight: '600',
    },
    transactionTime: {
        fontSize: 12,
        marginTop: 2,
    },
    transactionRight: {
        alignItems: 'flex-end',
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    transactionTip: {
        fontSize: 12,
        marginTop: 2,
    },
    transactionDivider: {
        marginVertical: 4,
    },
    systemStatusCard: {
        marginBottom: 24,
    },
    statusItems: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statusItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusText: {
        fontSize: 14,
        marginLeft: 8,
    },
});

export default DashboardScreen; 