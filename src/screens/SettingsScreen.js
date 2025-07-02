import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Alert,
    Switch,
} from 'react-native';
import {
    Text,
    Card,
    Button,
    Title,
    Paragraph,
    useTheme,
    Divider,
    List,
    TextInput,
    Switch as PaperSwitch,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SettingsScreen = ({ navigation }) => {
    const [settings, setSettings] = useState({
        soundEnabled: true,
        hapticFeedback: true,
        autoPrint: false,
        autoSendReceipt: false,
        darkMode: false,
        notifications: true,
        biometricAuth: false,
        offlineMode: true,
    });
    const [storeInfo, setStoreInfo] = useState({
        name: 'Pizza POS',
        address: '123 Pizza Street',
        city: 'City, State 12345',
        phone: '(555) 123-4567',
        email: 'info@pizzapos.com',
    });
    const theme = useTheme();

    const handleSettingChange = (key, value) => {
        setSettings(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleStoreInfoChange = (key, value) => {
        setStoreInfo(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: () => {
                        global.currentEmployee = null;
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });
                    },
                },
            ]
        );
    };

    const handleResetSettings = () => {
        Alert.alert(
            'Reset Settings',
            'Are you sure you want to reset all settings to default?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: () => {
                        setSettings({
                            soundEnabled: true,
                            hapticFeedback: true,
                            autoPrint: false,
                            autoSendReceipt: false,
                            darkMode: false,
                            notifications: true,
                            biometricAuth: false,
                            offlineMode: true,
                        });
                        Alert.alert('Success', 'Settings have been reset to default.');
                    },
                },
            ]
        );
    };

    const handleBackupData = () => {
        Alert.alert(
            'Backup Data',
            'Backup functionality would be integrated with cloud storage in production.',
            [{ text: 'OK' }]
        );
    };

    const handleRestoreData = () => {
        Alert.alert(
            'Restore Data',
            'Restore functionality would be integrated with cloud storage in production.',
            [{ text: 'OK' }]
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView style={styles.scrollView}>
                {/* Header */}
                <View style={styles.header}>
                    <Title style={[styles.headerTitle, { color: theme.colors.primary }]}>
                        Settings
                    </Title>
                    <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
                        Configure your POS system
                    </Text>
                </View>

                {/* Store Information */}
                <Card style={styles.card}>
                    <Card.Content>
                        <Title style={[styles.sectionTitle, { color: theme.colors.text }]}>
                            Store Information
                        </Title>
                        <TextInput
                            label="Store Name"
                            value={storeInfo.name}
                            onChangeText={(text) => handleStoreInfoChange('name', text)}
                            mode="outlined"
                            style={styles.input}
                        />
                        <TextInput
                            label="Address"
                            value={storeInfo.address}
                            onChangeText={(text) => handleStoreInfoChange('address', text)}
                            mode="outlined"
                            style={styles.input}
                        />
                        <TextInput
                            label="City, State, ZIP"
                            value={storeInfo.city}
                            onChangeText={(text) => handleStoreInfoChange('city', text)}
                            mode="outlined"
                            style={styles.input}
                        />
                        <TextInput
                            label="Phone Number"
                            value={storeInfo.phone}
                            onChangeText={(text) => handleStoreInfoChange('phone', text)}
                            mode="outlined"
                            style={styles.input}
                            keyboardType="phone-pad"
                        />
                        <TextInput
                            label="Email"
                            value={storeInfo.email}
                            onChangeText={(text) => handleStoreInfoChange('email', text)}
                            mode="outlined"
                            style={styles.input}
                            keyboardType="email-address"
                        />
                    </Card.Content>
                </Card>

                {/* App Settings */}
                <Card style={styles.card}>
                    <Card.Content>
                        <Title style={[styles.sectionTitle, { color: theme.colors.text }]}>
                            App Settings
                        </Title>

                        <List.Item
                            title="Sound Effects"
                            description="Play sounds for button presses and transactions"
                            left={(props) => <List.Icon {...props} icon="volume-high" />}
                            right={() => (
                                <PaperSwitch
                                    value={settings.soundEnabled}
                                    onValueChange={(value) => handleSettingChange('soundEnabled', value)}
                                />
                            )}
                        />

                        <Divider />

                        <List.Item
                            title="Haptic Feedback"
                            description="Vibrate on button presses"
                            left={(props) => <List.Icon {...props} icon="vibration" />}
                            right={() => (
                                <PaperSwitch
                                    value={settings.hapticFeedback}
                                    onValueChange={(value) => handleSettingChange('hapticFeedback', value)}
                                />
                            )}
                        />

                        <Divider />

                        <List.Item
                            title="Auto Print Receipts"
                            description="Automatically print receipts after transactions"
                            left={(props) => <List.Icon {...props} icon="printer" />}
                            right={() => (
                                <PaperSwitch
                                    value={settings.autoPrint}
                                    onValueChange={(value) => handleSettingChange('autoPrint', value)}
                                />
                            )}
                        />

                        <Divider />

                        <List.Item
                            title="Auto Send Receipts"
                            description="Automatically send digital receipts"
                            left={(props) => <List.Icon {...props} icon="email" />}
                            right={() => (
                                <PaperSwitch
                                    value={settings.autoSendReceipt}
                                    onValueChange={(value) => handleSettingChange('autoSendReceipt', value)}
                                />
                            )}
                        />

                        <Divider />

                        <List.Item
                            title="Dark Mode"
                            description="Use dark theme for the app"
                            left={(props) => <List.Icon {...props} icon="brightness-4" />}
                            right={() => (
                                <PaperSwitch
                                    value={settings.darkMode}
                                    onValueChange={(value) => handleSettingChange('darkMode', value)}
                                />
                            )}
                        />

                        <Divider />

                        <List.Item
                            title="Push Notifications"
                            description="Receive notifications for important events"
                            left={(props) => <List.Icon {...props} icon="notifications" />}
                            right={() => (
                                <PaperSwitch
                                    value={settings.notifications}
                                    onValueChange={(value) => handleSettingChange('notifications', value)}
                                />
                            )}
                        />

                        <Divider />

                        <List.Item
                            title="Biometric Authentication"
                            description="Use fingerprint or face recognition for login"
                            left={(props) => <List.Icon {...props} icon="fingerprint" />}
                            right={() => (
                                <PaperSwitch
                                    value={settings.biometricAuth}
                                    onValueChange={(value) => handleSettingChange('biometricAuth', value)}
                                />
                            )}
                        />

                        <Divider />

                        <List.Item
                            title="Offline Mode"
                            description="Allow transactions without internet connection"
                            left={(props) => <List.Icon {...props} icon="wifi-off" />}
                            right={() => (
                                <PaperSwitch
                                    value={settings.offlineMode}
                                    onValueChange={(value) => handleSettingChange('offlineMode', value)}
                                />
                            )}
                        />
                    </Card.Content>
                </Card>

                {/* Data Management */}
                <Card style={styles.card}>
                    <Card.Content>
                        <Title style={[styles.sectionTitle, { color: theme.colors.text }]}>
                            Data Management
                        </Title>

                        <Button
                            mode="outlined"
                            onPress={handleBackupData}
                            style={styles.actionButton}
                            icon="cloud-upload"
                        >
                            Backup Data
                        </Button>

                        <Button
                            mode="outlined"
                            onPress={handleRestoreData}
                            style={styles.actionButton}
                            icon="cloud-download"
                        >
                            Restore Data
                        </Button>

                        <Button
                            mode="outlined"
                            onPress={handleResetSettings}
                            style={styles.actionButton}
                            icon="restore"
                        >
                            Reset Settings
                        </Button>
                    </Card.Content>
                </Card>

                {/* System Information */}
                <Card style={styles.card}>
                    <Card.Content>
                        <Title style={[styles.sectionTitle, { color: theme.colors.text }]}>
                            System Information
                        </Title>

                        <List.Item
                            title="App Version"
                            description="1.0.0"
                            left={(props) => <List.Icon {...props} icon="info" />}
                        />

                        <Divider />

                        <List.Item
                            title="Device ID"
                            description="POS-001-2024"
                            left={(props) => <List.Icon {...props} icon="devices" />}
                        />

                        <Divider />

                        <List.Item
                            title="Last Sync"
                            description="2 minutes ago"
                            left={(props) => <List.Icon {...props} icon="sync" />}
                        />

                        <Divider />

                        <List.Item
                            title="Storage Used"
                            description="45.2 MB / 1 GB"
                            left={(props) => <List.Icon {...props} icon="storage" />}
                        />
                    </Card.Content>
                </Card>

                {/* Logout */}
                <Card style={styles.card}>
                    <Card.Content>
                        <Button
                            mode="contained"
                            onPress={handleLogout}
                            style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
                            icon="logout"
                        >
                            Logout
                        </Button>
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
        alignItems: 'center',
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        fontSize: 16,
        marginTop: 8,
    },
    card: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    input: {
        marginBottom: 12,
    },
    actionButton: {
        marginBottom: 12,
    },
    logoutButton: {
        marginTop: 8,
    },
});

export default SettingsScreen; 