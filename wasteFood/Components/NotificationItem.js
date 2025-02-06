import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
    primary: '#ADA991', // Vert professionnel
    background: '#F8F9FA', // Fond clair et neutre
    text: '#333333', // Texte sombre
    accent: '#FF5252', // Rouge pour les indicateurs
    border: '#E0E0E0', // Bordure légère
    unreadBackground: '#FFFFFF', // Fond des notifications non lues
    readBackground: '#F8F9FA', // Fond des notifications lues
    gradientStart: '#FFFFFF', // Début du dégradé
    gradientEnd: '#F8F9FA', // Fin du dégradé
    darkText: '#1A1A1A', // Texte foncé
    lightText: '#666666', // Texte secondaire
};



const NotificationItem = ({ item, fadeAnim }) => {
    return (
        <TouchableOpacity
            style={[
                styles.notificationItem,
                {
                    backgroundColor: item.isRead ? COLORS.readBackground : COLORS.unreadBackground,
                    transform: [{ scale: fadeAnim }],
                },
            ]}
            activeOpacity={0.7}
        >
            <View style={styles.notificationContent}>
                <MaterialIcons
                    name={item.icon}
                    size={24}
                    color={item.isRead ? COLORS.lightText : COLORS.primary}
                />
                <View style={styles.notificationTextContainer}>
                    <Text style={styles.notificationText}>{item.message}</Text>
                    <Text style={styles.notificationTime}>{item.time}</Text>
                </View>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>{item.action}</Text>
                </TouchableOpacity>
            </View>
            {!item.isRead && <View style={styles.unreadDot} />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    notificationItem: {
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.unreadBackground,
    },
    notificationContent: {
        flexDirection: 'row',

        flex: 1,
    },
    notificationTextContainer: {
        flex: 1,
        marginLeft: 10,
    },
    notificationText: {
        fontSize: 14,
        color: COLORS.darkText,
        fontWeight: '500',
    },
    notificationTime: {
        fontSize: 12,
        color: COLORS.lightText,
        marginTop: 4,
    },
    actionButton: {
        backgroundColor: COLORS.primary,
        padding: 8,
        borderRadius: 6,
        left: 5,
        maxHeight: 35,
    },
    actionButtonText: {
        color: COLORS.background,
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },

});

export default NotificationItem;