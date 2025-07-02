import { DefaultTheme } from 'react-native-paper';

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#FF6B35', // Pizza orange
        accent: '#4ECDC4', // Teal
        background: '#F7F7F7',
        surface: '#FFFFFF',
        text: '#2C3E50',
        textSecondary: '#7F8C8D',
        success: '#27AE60',
        error: '#E74C3C',
        warning: '#F39C12',
        info: '#3498DB',
        disabled: '#BDC3C7',
        border: '#E5E5E5',
        card: '#FFFFFF',
        notification: '#FF6B35',
        // Payment method colors
        cash: '#27AE60',
        card: '#3498DB',
        mobile: '#9B59B6',
        nfc: '#E67E22',
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    },
    borderRadius: {
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
        round: 50,
    },
    typography: {
        h1: {
            fontSize: 32,
            fontWeight: 'bold',
        },
        h2: {
            fontSize: 24,
            fontWeight: 'bold',
        },
        h3: {
            fontSize: 20,
            fontWeight: '600',
        },
        h4: {
            fontSize: 18,
            fontWeight: '600',
        },
        body1: {
            fontSize: 16,
        },
        body2: {
            fontSize: 14,
        },
        caption: {
            fontSize: 12,
        },
        button: {
            fontSize: 16,
            fontWeight: '600',
        },
    },
}; 