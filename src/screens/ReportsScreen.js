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
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const ReportsScreen = ({ navigation }) => {
    const [selectedPeriod, setSelectedPeriod] = useState('today');
    const [searchQuery, setSearchQuery] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);
    const [reportData, setReportData] = useState({
        sales: {
            total: 0,
            transactions: 0,
            average: 0,
            tips: 0,
        },
        paymentMethods: [],
        employeePerformance: [],
        hourlyData: [],
    });
    const theme = useTheme();

    useEffect(() => {
        loadReportData();
    }, [selectedPeriod]);

    const loadReportData = () => {
        // Mock data - in real app, this would come from API/database
        setReportData({
            sales: {
                total: 1247.50,
                transactions: 23,
                average: 54.24,
                tips: 186.25,
            },
            paymentMethods: [
                { method: 'Card', count: 12, amount: 647.50, percentage: 52 },
                { method: 'Cash', count: 6, amount: 325.00, percentage: 26 },
                { method: 'NFC/Tap', count: 3, amount: 175.00, percentage: 14 },
                { method: 'Mobile', count: 2, amount: 100.00, percentage: 8 },
            ],
            employeePerformance: [
                { name: 'John Driver', transactions: 8, sales: 432.50, tips: 65.00 },
                { name: 'Sarah Cashier', transactions: 10, sales: 545.75, tips: 78.25 },
                { name: 'Mike Manager', transactions: 5, sales: 269.25, tips: 43.00 },
            ],
            hourlyData: [
                { hour: '10 AM', sales: 125.50, transactions: 2 },
                { hour: '11 AM', sales: 234.75, transactions: 4 },
                { hour: '12 PM', sales: 456.25, transactions: 8 },
                { hour: '1 PM', sales: 321.00, transactions: 6 },
                { hour: '2 PM', sales: 110.00, transactions: 3 },
            ],
        });
    };

    const formatCurrency = (value) => {
        return `$${parseFloat(value || 0).toFixed(2)}`;
    };

    const getPeriodLabel = (period) => {
        switch (period) {
            case 'today':
                return 'Today';
            case 'week':
                return 'This Week';
            case 'month':
                return 'This Month';
            case 'year':
                return 'This Year';
            default:
                return 'Today';
        }
    };

    const handleExport = (format) => {
        Alert.alert(
            'Export Report',
            `Report would be exported as ${format.toUpperCase()} in production.`,
            [{ text: 'OK' }]
        );
        setMenuVisible(false);
    };

    const handleFilter = (period) => {
        setSelectedPeriod(period);
        setMenuVisible(false);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView style={styles.scrollView}>
                {/* Header */}
                <View style={styles.header}>
                    <Title style={[styles.headerTitle, { color: theme.colors.primary }]}>
                        Reports & Analytics
                    </Title>
                    <View style={styles.headerActions}>
                        <Menu
                            visible={menuVisible}
                            onDismiss={() => setMenuVisible(false)}
                            anchor={
                                <Button
                                    mode="outlined"
                                    onPress={() => setMenuVisible(true)}
                                    icon="filter-list"
                                >
                                    {getPeriodLabel(selectedPeriod)}
                                </Button>
                            }
                        >
                            <Menu.Item onPress={() => handleFilter('today')} title="Today" />
                            <Menu.Item onPress={() => handleFilter('week')} title="This Week" />
                            <Menu.Item onPress={() => handleFilter('month')} title="This Month" />
                            <Menu.Item onPress={() => handleFilter('year')} title="This Year" />
                        </Menu>
                    </View>
                </View>

                {/* Search */}
                <Searchbar
                    placeholder="Search transactions..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchbar}
                />

                {/* Sales Summary */}
                <Card style={styles.summaryCard}>
                    <Card.Content>
                        <Title style={[styles.sectionTitle, { color: theme.colors.text }]}>
                            Sales Summary - {getPeriodLabel(selectedPeriod)}
                        </Title>
                        <View style={styles.summaryGrid}>
                            <View style={styles.summaryItem}>
                                <Icon name="attach-money" size={32} color={theme.colors.success} />
                                <Text style={[styles.summaryValue, { color: theme.colors.success }]}>
                                    {formatCurrency(reportData.sales.total)}
                                </Text>
                                <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
                                    Total Sales
                                </Text>
                            </View>
                            <View style={styles.summaryItem}>
                                <Icon name="receipt" size={32} color={theme.colors.info} />
                                <Text style={[styles.summaryValue, { color: theme.colors.info }]}>
                                    {reportData.sales.transactions}
                                </Text>
                                <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
                                    Transactions
                                </Text>
                            </View>
                            <View style={styles.summaryItem}>
                                <Icon name="trending-up" size={32} color={theme.colors.warning} />
                                <Text style={[styles.summaryValue, { color: theme.colors.warning }]}>
                                    {formatCurrency(reportData.sales.average)}
                                </Text>
                                <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
                                    Avg Order
                                </Text>
                            </View>
                            <View style={styles.summaryItem}>
                                <Icon name="thumb-up" size={32} color={theme.colors.accent} />
                                <Text style={[styles.summaryValue, { color: theme.colors.accent }]}>
                                    {formatCurrency(reportData.sales.tips)}
                                </Text>
                                <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
                                    Total Tips
                                </Text>
                            </View>
                        </View>
                    </Card.Content>
                </Card>

                {/* Payment Methods Breakdown */}
                <Card style={styles.paymentMethodsCard}>
                    <Card.Content>
                        <Title style={[styles.sectionTitle, { color: theme.colors.text }]}>
                            Payment Methods
                        </Title>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Method</DataTable.Title>
                                <DataTable.Title numeric>Count</DataTable.Title>
                                <DataTable.Title numeric>Amount</DataTable.Title>
                                <DataTable.Title numeric>%</DataTable.Title>
                            </DataTable.Header>

                            {reportData.paymentMethods.map((item, index) => (
                                <DataTable.Row key={index}>
                                    <DataTable.Cell>{item.method}</DataTable.Cell>
                                    <DataTable.Cell numeric>{item.count}</DataTable.Cell>
                                    <DataTable.Cell numeric>{formatCurrency(item.amount)}</DataTable.Cell>
                                    <DataTable.Cell numeric>{item.percentage}%</DataTable.Cell>
                                </DataTable.Row>
                            ))}
                        </DataTable>
                    </Card.Content>
                </Card>

                {/* Employee Performance */}
                <Card style={styles.employeeCard}>
                    <Card.Content>
                        <Title style={[styles.sectionTitle, { color: theme.colors.text }]}>
                            Employee Performance
                        </Title>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Employee</DataTable.Title>
                                <DataTable.Title numeric>Transactions</DataTable.Title>
                                <DataTable.Title numeric>Sales</DataTable.Title>
                                <DataTable.Title numeric>Tips</DataTable.Title>
                            </DataTable.Header>

                            {reportData.employeePerformance.map((employee, index) => (
                                <DataTable.Row key={index}>
                                    <DataTable.Cell>{employee.name}</DataTable.Cell>
                                    <DataTable.Cell numeric>{employee.transactions}</DataTable.Cell>
                                    <DataTable.Cell numeric>{formatCurrency(employee.sales)}</DataTable.Cell>
                                    <DataTable.Cell numeric>{formatCurrency(employee.tips)}</DataTable.Cell>
                                </DataTable.Row>
                            ))}
                        </DataTable>
                    </Card.Content>
                </Card>

                {/* Hourly Sales */}
                <Card style={styles.hourlyCard}>
                    <Card.Content>
                        <Title style={[styles.sectionTitle, { color: theme.colors.text }]}>
                            Hourly Sales
                        </Title>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Hour</DataTable.Title>
                                <DataTable.Title numeric>Sales</DataTable.Title>
                                <DataTable.Title numeric>Transactions</DataTable.Title>
                            </DataTable.Header>

                            {reportData.hourlyData.map((hour, index) => (
                                <DataTable.Row key={index}>
                                    <DataTable.Cell>{hour.hour}</DataTable.Cell>
                                    <DataTable.Cell numeric>{formatCurrency(hour.sales)}</DataTable.Cell>
                                    <DataTable.Cell numeric>{hour.transactions}</DataTable.Cell>
                                </DataTable.Row>
                            ))}
                        </DataTable>
                    </Card.Content>
                </Card>

                {/* Export Options */}
                <Card style={styles.exportCard}>
                    <Card.Content>
                        <Title style={[styles.sectionTitle, { color: theme.colors.text }]}>
                            Export Report
                        </Title>
                        <View style={styles.exportButtons}>
                            <Button
                                mode="outlined"
                                onPress={() => handleExport('pdf')}
                                style={styles.exportButton}
                                icon="picture-as-pdf"
                            >
                                Export PDF
                            </Button>
                            <Button
                                mode="outlined"
                                onPress={() => handleExport('csv')}
                                style={styles.exportButton}
                                icon="table-chart"
                            >
                                Export CSV
                            </Button>
                            <Button
                                mode="outlined"
                                onPress={() => handleExport('excel')}
                                style={styles.exportButton}
                                icon="grid-on"
                            >
                                Export Excel
                            </Button>
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
    summaryCard: {
        marginBottom: 16,
        elevation: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    summaryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    summaryItem: {
        width: (width - 64) / 2 - 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    summaryValue: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 8,
    },
    summaryLabel: {
        fontSize: 12,
        marginTop: 4,
        textAlign: 'center',
    },
    paymentMethodsCard: {
        marginBottom: 16,
    },
    employeeCard: {
        marginBottom: 16,
    },
    hourlyCard: {
        marginBottom: 16,
    },
    exportCard: {
        marginBottom: 24,
    },
    exportButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    exportButton: {
        flex: 1,
        marginHorizontal: 4,
    },
});

export default ReportsScreen; 