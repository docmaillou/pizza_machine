import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    Alert,
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
    DataTable,
    Searchbar,
    Menu,
    FAB,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const OrderHistoryScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterMenuVisible, setFilterMenuVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        loadTransactionHistory();
    }, []);

    useEffect(() => {
        filterTransactions();
    }, [searchQuery, selectedFilter, transactions]);

    const loadTransactionHistory = () => {
        // Mock data - in real app, this would come from API/database
        const mockTransactions = [
            {
                id: '001',
                amount: 45.99,
                tip: 8.00,
                total: 53.99,
                paymentMethod: 'card',
                employee: 'John Driver',
                customer: 'John Smith',
                phone: '(555) 123-4567',
                timestamp: '2024-01-15T14:30:00Z',
                status: 'completed',
                items: ['Large Pepperoni Pizza', '2L Coke'],
            },
            {
                id: '002',
                amount: 32.50,
                tip: 5.00,
                total: 37.50,
                paymentMethod: 'cash',
                employee: 'Sarah Cashier',
                customer: 'Jane Doe',
                phone: '(555) 987-6543',
                timestamp: '2024-01-15T14:15:00Z',
                status: 'completed',
                items: ['Medium Cheese Pizza', 'Garlic Bread'],
            },
            {
                id: '003',
                amount: 67.25,
                tip: 12.00,
                total: 79.25,
                paymentMethod: 'nfc',
                employee: 'Mike Manager',
                customer: 'Bob Johnson',
                phone: '(555) 456-7890',
                timestamp: '2024-01-15T13:58:00Z',
                status: 'completed',
                items: ['Large Supreme Pizza', 'Wings', '2L Pepsi'],
            },
            {
                id: '004',
                amount: 28.75,
                tip: 0,
                total: 28.75,
                paymentMethod: 'mobile',
                employee: 'John Driver',
                customer: 'Alice Brown',
                phone: '(555) 321-6540',
                timestamp: '2024-01-15T13:45:00Z',
                status: 'completed',
                items: ['Medium Hawaiian Pizza'],
            },
            {
                id: '005',
                amount: 55.00,
                tip: 10.00,
                total: 65.00,
                paymentMethod: 'card',
                employee: 'Sarah Cashier',
                customer: 'Charlie Wilson',
                phone: '(555) 789-0123',
                timestamp: '2024-01-15T13:30:00Z',
                status: 'completed',
                items: ['Large Meat Lovers Pizza', 'Salad'],
            },
        ];

        setTransactions(mockTransactions);
    };

    const filterTransactions = () => {
        let filtered = transactions;

        // Filter by status
        if (selectedFilter !== 'all') {
            filtered = filtered.filter(t => t.status === selectedFilter);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(t =>
                t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.phone.includes(searchQuery) ||
                t.employee.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredTransactions(filtered);
    };

    const formatCurrency = (value) => {
        return `$${parseFloat(value || 0).toFixed(2)}`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
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

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return theme.colors.success;
            case 'pending':
                return theme.colors.warning;
            case 'cancelled':
                return theme.colors.error;
            default:
                return theme.colors.textSecondary;
        }
    };

    const handleTransactionPress = (transaction) => {
        // Navigate to transaction details or receipt
        navigation.navigate('Receipt', { transaction });
    };

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
        setFilterMenuVisible(false);
    };

    const handleNewTransaction = () => {
        navigation.navigate('Payment');
    };

    const getFilterLabel = (filter) => {
        switch (filter) {
            case 'all':
                return 'All Transactions';
            case 'completed':
                return 'Completed';
            case 'pending':
                return 'Pending';
            case 'cancelled':
                return 'Cancelled';
            default:
                return 'All Transactions';
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView style={styles.scrollView}>
                {/* Header */}
                <View style={styles.header}>
                    <Title style={[styles.headerTitle, { color: theme.colors.primary }]}>
                        Order History
                    </Title>
                    <View style={styles.headerActions}>
                        <Menu
                            visible={filterMenuVisible}
                            onDismiss={() => setFilterMenuVisible(false)}
                            anchor={
                                <Button
                                    mode="outlined"
                                    onPress={() => setFilterMenuVisible(true)}
                                    icon="filter-list"
                                >
                                    {getFilterLabel(selectedFilter)}
                                </Button>
                            }
                        >
                            <Menu.Item onPress={() => handleFilterChange('all')} title="All Transactions" />
                            <Menu.Item onPress={() => handleFilterChange('completed')} title="Completed" />
                            <Menu.Item onPress={() => handleFilterChange('pending')} title="Pending" />
                            <Menu.Item onPress={() => handleFilterChange('cancelled')} title="Cancelled" />
                        </Menu>
                    </View>
                </View>

                {/* Search */}
                <Searchbar
                    placeholder="Search by ID, customer, phone, or employee..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchbar}
                />

                {/* Transaction Count */}
                <Card style={styles.countCard}>
                    <Card.Content>
                        <Text style={[styles.countText, { color: theme.colors.textSecondary }]}>
                            Showing {filteredTransactions.length} of {transactions.length} transactions
                        </Text>
                    </Card.Content>
                </Card>

                {/* Transactions List */}
                {filteredTransactions.map((transaction, index) => (
                    <Card
                        key={transaction.id}
                        style={styles.transactionCard}
                        onPress={() => handleTransactionPress(transaction)}
                    >
                        <Card.Content>
                            <View style={styles.transactionHeader}>
                                <View style={styles.transactionLeft}>
                                    <Icon
                                        name={getPaymentMethodIcon(transaction.paymentMethod)}
                                        size={24}
                                        color={getPaymentMethodColor(transaction.paymentMethod)}
                                    />
                                    <View style={styles.transactionInfo}>
                                        <Text style={[styles.transactionId, { color: theme.colors.text }]}>
                                            #{transaction.id}
                                        </Text>
                                        <Text style={[styles.transactionTime, { color: theme.colors.textSecondary }]}>
                                            {formatDate(transaction.timestamp)}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.transactionRight}>
                                    <Text style={[styles.transactionAmount, { color: theme.colors.text }]}>
                                        {formatCurrency(transaction.total)}
                                    </Text>
                                    <Chip
                                        mode="outlined"
                                        textStyle={{ color: getStatusColor(transaction.status) }}
                                        style={{ borderColor: getStatusColor(transaction.status) }}
                                    >
                                        {transaction.status}
                                    </Chip>
                                </View>
                            </View>

                            <Divider style={styles.divider} />

                            <View style={styles.transactionDetails}>
                                <View style={styles.detailRow}>
                                    <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                                        Customer:
                                    </Text>
                                    <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                                        {transaction.customer}
                                    </Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                                        Phone:
                                    </Text>
                                    <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                                        {transaction.phone}
                                    </Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                                        Employee:
                                    </Text>
                                    <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                                        {transaction.employee}
                                    </Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                                        Subtotal:
                                    </Text>
                                    <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                                        {formatCurrency(transaction.amount)}
                                    </Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                                        Tip:
                                    </Text>
                                    <Text style={[styles.detailValue, { color: theme.colors.accent }]}>
                                        {formatCurrency(transaction.tip)}
                                    </Text>
                                </View>
                            </View>

                            <Divider style={styles.divider} />

                            <View style={styles.itemsSection}>
                                <Text style={[styles.itemsTitle, { color: theme.colors.textSecondary }]}>
                                    Items:
                                </Text>
                                {transaction.items.map((item, itemIndex) => (
                                    <Text key={itemIndex} style={[styles.itemText, { color: theme.colors.text }]}>
                                        • {item}
                                    </Text>
                                ))}
                            </View>
                        </Card.Content>
                    </Card>
                ))}

                {/* Empty State */}
                {filteredTransactions.length === 0 && (
                    <Card style={styles.emptyCard}>
                        <Card.Content style={styles.emptyContent}>
                            <Icon name="receipt" size={64} color={theme.colors.textSecondary} />
                            <Title style={[styles.emptyTitle, { color: theme.colors.textSecondary }]}>
                                No transactions found
                            </Title>
                            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
                                Try adjusting your search or filter criteria
                            </Text>
                        </Card.Content>
                    </Card>
                )}
            </ScrollView>

            {/* FAB for New Transaction */}
            <FAB
                style={[styles.fab, { backgroundColor: theme.colors.primary }]}
                icon="add"
                onPress={handleNewTransaction}
            />
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
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerActions: {
        flexDirection: 'row',
    },
    searchbar: {
        marginBottom: 16,
    },
    countCard: {
        marginBottom: 16,
    },
    countText: {
        fontSize: 14,
        textAlign: 'center',
    },
    transactionCard: {
        marginBottom: 16,
        elevation: 2,
    },
    transactionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    transactionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    transactionInfo: {
        marginLeft: 12,
    },
    transactionId: {
        fontSize: 16,
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
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    divider: {
        marginVertical: 12,
    },
    transactionDetails: {
        marginBottom: 12,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 2,
    },
    detailLabel: {
        fontSize: 12,
    },
    detailValue: {
        fontSize: 12,
        fontWeight: '500',
    },
    itemsSection: {
        marginTop: 8,
    },
    itemsTitle: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 4,
    },
    itemText: {
        fontSize: 12,
        marginLeft: 8,
    },
    emptyCard: {
        marginTop: 32,
    },
    emptyContent: {
        alignItems: 'center',
        paddingVertical: 32,
    },
    emptyTitle: {
        fontSize: 18,
        marginTop: 16,
    },
    emptyText: {
        fontSize: 14,
        marginTop: 8,
        textAlign: 'center',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

export default OrderHistoryScreen; 