import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const PinEntryScreen = ({ navigation }) => {
    const [pin, setPin] = useState('');
    const [date] = useState(new Date().toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }));

    const handleNumberPress = (number) => {
        if (pin.length < 4) {
            setPin(pin + number);
        }
    };

    const handleClear = () => {
        setPin('');
    };

    const handleBackspace = () => {
        setPin(pin.slice(0, -1));
    };

    const handleLogin = () => {
        // Mock PIN verification - in real app would check against server
        if (pin.length >= 4) {
            navigation.navigate('Sale');
        }
    };

    const renderKeypadButton = (value, label) => {
        let onPress;
        if (value === 'clear') {
            onPress = handleClear;
        } else if (value === 'backspace') {
            onPress = handleBackspace;
        } else if (value === 'enter') {
            onPress = handleLogin;
        } else {
            onPress = () => handleNumberPress(value);
        }

        return (
            <TouchableOpacity
                key={value}
                style={styles.keypadButton}
                onPress={onPress}
                activeOpacity={0.7}
            >
                <Text style={styles.keypadButtonText}>
                    {label || value}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#1E40AF" barStyle="light-content" />

            {/* Header with time and date */}
            <View style={styles.header}>
                <Text style={styles.timeText}>1h18</Text>
                <Text style={styles.dateText}>{date}</Text>
            </View>

            {/* Business Name */}
            <View style={styles.titleContainer}>
                <Text style={styles.businessName}>PIZZA BARBAS</Text>
            </View>

            {/* PIN Display */}
            <View style={styles.pinContainer}>
                <View style={styles.pinDisplay}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.pinDot,
                                index < pin.length && styles.pinDotFilled
                            ]}
                        />
                    ))}
                </View>
            </View>

            {/* Numeric Keypad */}
            <View style={styles.keypadContainer}>
                <View style={styles.keypadGrid}>
                    <View style={styles.keypadRow}>
                        {renderKeypadButton('1')}
                        {renderKeypadButton('2', '2\nABC')}
                        {renderKeypadButton('3', '3\nDEF')}
                    </View>
                    <View style={styles.keypadRow}>
                        {renderKeypadButton('4', '4\nGHI')}
                        {renderKeypadButton('5', '5\nJKL')}
                        {renderKeypadButton('6', '6\nMNO')}
                    </View>
                    <View style={styles.keypadRow}>
                        {renderKeypadButton('7', '7\nPQRS')}
                        {renderKeypadButton('8', '8\nTUV')}
                        {renderKeypadButton('9', '9\nWXYZ')}
                    </View>
                    <View style={styles.keypadRow}>
                        <View style={styles.keypadButton} />
                        {renderKeypadButton('0', '0\n+')}
                        <TouchableOpacity
                            style={[styles.keypadButton, styles.enterButton]}
                            onPress={handleLogin}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.keypadButtonText, styles.enterButtonText]}>
                                ➤
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E40AF',
    },
    header: {
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    timeText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    dateText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '400',
        marginTop: 5,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    businessName: {
        color: '#FFFFFF',
        fontSize: 42,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 2,
    },
    pinContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    pinDisplay: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
    },
    pinDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        backgroundColor: 'transparent',
    },
    pinDotFilled: {
        backgroundColor: '#FFFFFF',
    },
    keypadContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    keypadGrid: {
        gap: 15,
    },
    keypadRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 15,
    },
    keypadButton: {
        flex: 1,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    keypadButtonText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: 28,
    },
    enterButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    enterButtonText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default PinEntryScreen; 