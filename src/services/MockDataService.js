// Mock Data Service for Pizza Barbas POS
// Simulates real Clover-style POS data

export class MockDataService {
    constructor() {
        this.employees = [
            { id: '1234', name: 'Manager', role: 'manager', pin: '1234' },
            { id: '5678', name: 'Caissier', role: 'cashier', pin: '5678' },
            { id: '9999', name: 'Chauffeur', role: 'driver', pin: '9999' },
            { id: '0000', name: 'Admin', role: 'admin', pin: '0000' },
        ];

        this.transactions = [
            {
                id: 'TXN001',
                amount: '23.50',
                amountFormatted: '23,50',
                tip: '2.35',
                tipFormatted: '2,35',
                total: '25.85',
                totalFormatted: '25,85',
                employeeId: 'Caisse',
                timestamp: new Date('2025-06-29T14:30:00'),
                paymentMethod: 'card',
                status: 'completed'
            },
            {
                id: 'TXN002',
                amount: '19.99',
                amountFormatted: '19,99',
                tip: '2.00',
                tipFormatted: '2,00',
                total: '21.99',
                totalFormatted: '21,99',
                employeeId: 'Caisse',
                timestamp: new Date('2025-06-29T15:45:00'),
                paymentMethod: 'card',
                status: 'completed'
            },
            {
                id: 'TXN003',
                amount: '35.89',
                amountFormatted: '35,89',
                tip: '3.59',
                tipFormatted: '3,59',
                total: '39.48',
                totalFormatted: '39,48',
                employeeId: '07',
                timestamp: new Date('2025-06-29T16:20:00'),
                paymentMethod: 'nfc',
                status: 'completed'
            },
            {
                id: 'TXN004',
                amount: '15.99',
                amountFormatted: '15,99',
                tip: '1.60',
                tipFormatted: '1,60',
                total: '17.59',
                totalFormatted: '17,59',
                employeeId: 'Caisse',
                timestamp: new Date('2025-06-29T17:10:00'),
                paymentMethod: 'card',
                status: 'completed'
            }
        ];

        this.currentSession = {
            startTime: new Date('2025-06-29T12:00:00'),
            endTime: new Date('2025-06-29T23:59:59'),
            deviceId: 'C045UO35160275',
            storeInfo: {
                name: 'Pizza Barbas',
                address: '123 Rue de la Pizza, Montréal QC',
                phone: '(514) 123-4567'
            }
        };
    }

    // Authentication methods
    async authenticateEmployee(pin) {
        const employee = this.employees.find(emp => emp.pin === pin);
        if (employee) {
            return {
                success: true,
                employee: {
                    id: employee.id,
                    name: employee.name,
                    role: employee.role
                }
            };
        }
        return { success: false, error: 'PIN invalide' };
    }

    // Transaction methods
    async processPayment(amount, paymentMethod = 'card', employeeId = 'Caisse', tip = '0,00', total = null) {
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 90% success rate
        const isSuccess = Math.random() > 0.1;

        if (isSuccess) {
            const finalTotal = total || amount;
            const transaction = {
                id: `TXN${Date.now()}`,
                amount: amount.replace(',', '.'),
                amountFormatted: amount,
                tip: tip.replace(',', '.'),
                tipFormatted: tip,
                total: finalTotal.replace(',', '.'),
                totalFormatted: finalTotal,
                employeeId,
                timestamp: new Date(),
                paymentMethod,
                status: 'completed'
            };

            this.transactions.push(transaction);

            return {
                success: true,
                transaction
            };
        } else {
            return {
                success: false,
                error: 'Échec du paiement - Veuillez réessayer'
            };
        }
    }

    // Reports methods
    async getSalesOverview(startDate = null, endDate = null) {
        const today = new Date();
        const start = startDate || new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        const end = endDate || new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

        const todayTransactions = this.transactions.filter(txn =>
            txn.timestamp >= start && txn.timestamp <= end
        );

        const totalSales = todayTransactions.reduce((sum, txn) =>
            sum + parseFloat(txn.amount), 0
        );

        const totalTips = todayTransactions.reduce((sum, txn) =>
            sum + parseFloat(txn.tip), 0
        );

        const periodText = `${start.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })} 12 h 00 min 00 s a.m. - ${end.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })} 11 h 59 min 59 s p.m.`;

        return {
            period: periodText,
            summary: todayTransactions.length === 0
                ? 'Aucun paiement effectué pendant cette période'
                : `${todayTransactions.length} paiement(s) effectué(s)`,
            cardSales: {
                totalSales: totalSales.toFixed(2).replace('.', ','),
                discounts: '0,00',
                netSales: totalSales.toFixed(2).replace('.', ','),
                expectedTaxes: '0,00',
                tips: totalTips.toFixed(2).replace('.', ','),
                additionalFees: '0,00',
                totalCollected: (totalSales + totalTips).toFixed(2).replace('.', ','),
                totalPayments: totalSales.toFixed(2).replace('.', ','),
                refunds: '0,00',
                paymentCount: todayTransactions.length
            },
            deviceId: this.currentSession.deviceId
        };
    }

    async getEmployeeSales(startDate = null, endDate = null) {
        const today = new Date();
        const start = startDate || new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        const end = endDate || new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

        const todayTransactions = this.transactions.filter(txn =>
            txn.timestamp >= start && txn.timestamp <= end
        );

        const employeeSalesMap = {};

        todayTransactions.forEach(txn => {
            if (!employeeSalesMap[txn.employeeId]) {
                employeeSalesMap[txn.employeeId] = {
                    transactions: [],
                    totalSales: 0,
                    totalTips: 0
                };
            }

            employeeSalesMap[txn.employeeId].transactions.push(txn);
            employeeSalesMap[txn.employeeId].totalSales += parseFloat(txn.amount);
            employeeSalesMap[txn.employeeId].totalTips += parseFloat(txn.tip);
        });

        const employees = Object.keys(employeeSalesMap).map(employeeId => {
            const data = employeeSalesMap[employeeId];
            return {
                id: employeeId,
                name: employeeId,
                sales: {
                    totalSales: data.totalSales.toFixed(2).replace('.', ','),
                    discounts: '0,00',
                    netSales: data.totalSales.toFixed(2).replace('.', ','),
                    expectedTaxes: '0,00',
                    tips: data.totalTips.toFixed(2).replace('.', ','),
                    additionalFees: '0,00',
                    totalCollected: (data.totalSales + data.totalTips).toFixed(2).replace('.', ','),
                    totalPayments: data.totalSales.toFixed(2).replace('.', ','),
                    refunds: '0,00',
                    transactionCount: data.transactions.length
                }
            };
        });

        const periodText = `${start.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })} 12 h 00 a.m. - ${end.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })} 11 h 59 p.m.`;

        return {
            period: periodText,
            employees
        };
    }

    // Receipt generation
    generateReceipt(transaction) {
        const receiptData = {
            storeInfo: this.currentSession.storeInfo,
            transaction,
            timestamp: transaction.timestamp,
            deviceId: this.currentSession.deviceId,
            receiptNumber: `R${transaction.id}`,
            formattedDate: transaction.timestamp.toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            formattedTime: transaction.timestamp.toLocaleTimeString('fr-FR')
        };

        return receiptData;
    }

    // NFC/Contactless payment simulation
    async processContactlessPayment(amount, employeeId = 'Caisse') {
        // Simulate NFC reading delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        return this.processPayment(amount, 'nfc', employeeId);
    }

    // Get transaction history
    getTransactionHistory(limit = 50) {
        return this.transactions
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, limit)
            .map(txn => ({
                ...txn,
                formattedTimestamp: txn.timestamp.toLocaleString('fr-FR')
            }));
    }

    // Device information
    getDeviceInfo() {
        return {
            deviceId: this.currentSession.deviceId,
            version: '3.0.0',
            model: 'Clover Station',
            lastSync: new Date().toISOString(),
            status: 'online'
        };
    }
}

// Export singleton instance
export const mockDataService = new MockDataService();
export default mockDataService;
