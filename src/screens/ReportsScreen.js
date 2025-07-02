import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import mockDataService from '../services/MockDataService';

const ReportsScreen = ({ navigation, route }) => {
    const [activeTab, setActiveTab] = useState('APERCU');
    const [reportData, setReportData] = useState({
        salesOverview: null,
        employeeSales: null
    });
    const [loading, setLoading] = useState(true);

    // Load data from mock service
    useEffect(() => {
        loadReportData();
    }, []);

    // Handle new transactions from navigation params
    useEffect(() => {
        if (route.params?.newTransaction) {
            const { amount, timestamp } = route.params.newTransaction;
            console.log('New transaction:', amount, timestamp);
            // Reload data to reflect new transaction
            loadReportData();
        }
    }, [route.params]);

    const loadReportData = async () => {
        try {
            setLoading(true);
            const [salesOverview, employeeSales] = await Promise.all([
                mockDataService.getSalesOverview(),
                mockDataService.getEmployeeSales()
            ]);

            setReportData({
                salesOverview,
                employeeSales
            });
        } catch (error) {
            console.error('Error loading report data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const renderOverviewTab = () => {
        if (loading || !reportData.salesOverview) {
            return (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Chargement des données...</Text>
                </View>
            );
        }

        const { salesOverview } = reportData;

        return (
            <ScrollView style={styles.tabContent}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Aperçu des ventes</Text>
                    <Text style={styles.periodText}>{salesOverview.period}</Text>
                </View>

                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>SYNTHÈSE DES VENTES</Text>
                    <Text style={styles.summaryText}>{salesOverview.summary}</Text>
                </View>

                <View style={styles.separator} />

                <View style={styles.salesSection}>
                    <Text style={styles.salesSectionTitle}>VENTES PAR TYPE DE CARTE</Text>
                    <View style={styles.salesData}>
                        <View style={styles.salesRow}>
                            <Text style={styles.salesLabel}>Vente brute</Text>
                            <Text style={styles.salesValue}>{salesOverview.cardSales.totalSales} $</Text>
                        </View>
                        <View style={styles.salesRow}>
                            <Text style={styles.salesLabel}>Rabais</Text>
                            <Text style={styles.salesValue}>{salesOverview.cardSales.discounts} $</Text>
                        </View>
                        <View style={styles.salesRow}>
                            <Text style={styles.salesLabel}>Ventes nettes</Text>
                            <Text style={styles.salesValue}>{salesOverview.cardSales.netSales} $</Text>
                        </View>
                        <View style={styles.salesRow}>
                            <Text style={styles.salesLabel}>Taxes prévues</Text>
                            <Text style={styles.salesValue}>{salesOverview.cardSales.expectedTaxes} $</Text>
                        </View>
                        <View style={styles.salesRow}>
                            <Text style={styles.salesLabel}>Pourboires</Text>
                            <Text style={styles.salesValue}>{salesOverview.cardSales.tips} $</Text>
                        </View>
                        <View style={styles.salesRow}>
                            <Text style={styles.salesLabel}>Frais supplémentaires</Text>
                            <Text style={styles.salesValue}>{salesOverview.cardSales.additionalFees} $</Text>
                        </View>
                        <View style={styles.salesRow}>
                            <Text style={styles.salesLabel}>Montant collecté</Text>
                            <Text style={styles.salesValue}>{salesOverview.cardSales.totalCollected} $</Text>
                        </View>
                        <View style={styles.salesRow}>
                            <Text style={styles.salesLabel}>Total Payments ({salesOverview.cardSales.paymentCount})</Text>
                            <Text style={styles.salesValue}>{salesOverview.cardSales.totalPayments} $</Text>
                        </View>
                        <View style={styles.salesRow}>
                            <Text style={styles.salesLabel}>Montant remboursé</Text>
                            <Text style={styles.salesValue}>{salesOverview.cardSales.refunds} $</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.separator} />

                <View style={styles.salesSection}>
                    <Text style={styles.salesSectionTitle}>DÉPÔT EN ESPÈCES</Text>
                </View>

                <View style={styles.infoCard}>
                    <MaterialIcons name="info" size={20} color="#64748B" />
                    <Text style={styles.infoText}>
                        Don't pay out tips from your cash drawer at the end of the day? You can hide Tips Payout in reporting settings in Setup on the Web Dashboard.
                    </Text>
                </View>

                <View style={styles.deviceInfo}>
                    <Text style={styles.deviceId}>{salesOverview.deviceId}</Text>
                </View>
            </ScrollView>
        );
    };

    const renderEmployeeSalesTab = () => {
        if (loading || !reportData.employeeSales) {
            return (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Chargement des données...</Text>
                </View>
            );
        }

        const { employeeSales } = reportData;

        return (
            <ScrollView style={styles.tabContent}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Ventes par les employés</Text>
                    <Text style={styles.periodText}>{employeeSales.period}</Text>
                </View>

                {employeeSales.employees.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Aucune vente pour cette période</Text>
                    </View>
                ) : (
                    employeeSales.employees.map((employee) => (
                        <View key={employee.id} style={styles.employeeCard}>
                            <Text style={styles.employeeName}>{employee.name}</Text>
                            <View style={styles.salesData}>
                                <View style={styles.salesRow}>
                                    <Text style={styles.salesLabel}>Vente brute</Text>
                                    <Text style={styles.salesValue}>{employee.sales.totalSales} $</Text>
                                </View>
                                <View style={styles.salesRow}>
                                    <Text style={styles.salesLabel}>Rabais</Text>
                                    <Text style={styles.salesValue}>{employee.sales.discounts} $</Text>
                                </View>
                                <View style={styles.salesRow}>
                                    <Text style={styles.salesLabel}>Ventes nettes</Text>
                                    <Text style={styles.salesValue}>{employee.sales.netSales} $</Text>
                                </View>
                                <View style={styles.salesRow}>
                                    <Text style={styles.salesLabel}>Taxes prévues</Text>
                                    <Text style={styles.salesValue}>{employee.sales.expectedTaxes} $</Text>
                                </View>
                                <View style={styles.salesRow}>
                                    <Text style={styles.salesLabel}>Pourboires</Text>
                                    <Text style={styles.salesValue}>{employee.sales.tips} $</Text>
                                </View>
                                <View style={styles.salesRow}>
                                    <Text style={styles.salesLabel}>Frais supplémentaires</Text>
                                    <Text style={styles.salesValue}>{employee.sales.additionalFees} $</Text>
                                </View>
                                <View style={styles.salesRow}>
                                    <Text style={styles.salesLabel}>Montant collecté</Text>
                                    <Text style={styles.salesValue}>{employee.sales.totalCollected} $</Text>
                                </View>
                                <View style={styles.salesRow}>
                                    <Text style={styles.salesLabel}>Total Payments ({employee.sales.transactionCount || 0})</Text>
                                    <Text style={styles.salesValue}>{employee.sales.totalPayments} $</Text>
                                </View>
                                <View style={styles.salesRow}>
                                    <Text style={styles.salesLabel}>Montant remboursé</Text>
                                    <Text style={styles.salesValue}>{employee.sales.refunds} $</Text>
                                </View>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#E2E8F0" barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <MaterialIcons name="menu" size={24} color="#64748B" />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <MaterialIcons name="assessment" size={20} color="#3B82F6" />
                    <Text style={styles.titleText}>Rapports</Text>
                </View>

                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.headerAction}>
                        <MaterialIcons name="today" size={24} color="#64748B" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerAction}>
                        <MaterialIcons name="print" size={24} color="#64748B" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === 'APERCU' && styles.activeTab
                    ]}
                    onPress={() => setActiveTab('APERCU')}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === 'APERCU' && styles.activeTabText
                    ]}>
                        APERÇU
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === 'VENTES PAR EMPLOYÉ' && styles.activeTab
                    ]}
                    onPress={() => setActiveTab('VENTES PAR EMPLOYÉ')}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === 'VENTES PAR EMPLOYÉ' && styles.activeTabText
                    ]}>
                        VENTES PAR EMPLOYÉ
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Date and Filter Controls */}
            <View style={styles.filtersContainer}>
                <TouchableOpacity style={styles.filterButton}>
                    <MaterialIcons name="today" size={16} color="#64748B" />
                    <Text style={styles.filterText}>Aujourd'hui</Text>
                    <MaterialIcons name="arrow-drop-down" size={16} color="#64748B" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.filterText}>Tous le..</Text>
                    <MaterialIcons name="arrow-drop-down" size={16} color="#64748B" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.filterIcon}>
                    <MaterialIcons name="filter-list" size={20} color="#64748B" />
                </TouchableOpacity>
            </View>

            {/* Tab Content */}
            {activeTab === 'APERCU' ? renderOverviewTab() : renderEmployeeSalesTab()}
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
    backButton: {
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
    headerActions: {
        flexDirection: 'row',
        gap: 10,
    },
    headerAction: {
        padding: 5,
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    tab: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 10,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#3B82F6',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#64748B',
    },
    activeTabText: {
        color: '#3B82F6',
    },
    filtersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        gap: 10,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#F1F5F9',
        borderRadius: 6,
        gap: 5,
    },
    filterText: {
        fontSize: 14,
        color: '#64748B',
    },
    filterIcon: {
        padding: 8,
    },
    tabContent: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    sectionHeader: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1E293B',
        marginBottom: 5,
    },
    periodText: {
        fontSize: 14,
        color: '#64748B',
    },
    summaryCard: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        marginBottom: 10,
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E293B',
        marginBottom: 10,
    },
    summaryText: {
        fontSize: 14,
        color: '#64748B',
    },
    separator: {
        height: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 10,
    },
    salesSection: {
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    salesSectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E293B',
    },
    infoCard: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#F0F9FF',
        borderLeftWidth: 3,
        borderLeftColor: '#3B82F6',
        margin: 20,
        gap: 10,
    },
    infoText: {
        flex: 1,
        fontSize: 14,
        color: '#64748B',
        lineHeight: 20,
    },
    deviceInfo: {
        padding: 20,
        alignItems: 'center',
    },
    deviceId: {
        fontSize: 12,
        color: '#94A3B8',
        fontFamily: 'monospace',
    },
    employeeCard: {
        backgroundColor: '#FFFFFF',
        margin: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    employeeName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1E293B',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    salesData: {
        padding: 15,
    },
    salesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    salesLabel: {
        fontSize: 14,
        color: '#64748B',
        flex: 1,
    },
    salesValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1E293B',
        textAlign: 'right',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    loadingText: {
        fontSize: 16,
        color: '#64748B',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    emptyText: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
    },
});

export default ReportsScreen; 