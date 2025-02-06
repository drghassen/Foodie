import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import NotificationItem from './NotificationItem';

const COLORS = {
    primary: '#ADA991',
    background: '#F8F9FA',
    text: '#333333',
    accent: '#FF5252',
    border: '#E0E0E0',
    unreadBackground: '#FFFFFF',
    readBackground: '#F8F9FA',
    gradientStart: '#FFFFFF',
    gradientEnd: '#F8F9FA',
    darkText: '#1A1A1A',
    lightText: '#666666',
};

const SIZES = {
    headerHeight: 60,
    iconSize: 24,
    profileImageSize: 36,
    badgeSize: 18,
};

const NotificationModal = ({ isVisible, onClose, notifications, fadeAnim }) => {
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onSwipeComplete={onClose}
            swipeDirection="down"
            style={styles.modal}
            backdropOpacity={0.5}
            animationIn="fadeIn"
            animationOut="fadeOut"
        >
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Notifications</Text>
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <NotificationItem item={item} fadeAnim={fadeAnim} />}
                    contentContainerStyle={styles.notificationList}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}
                >
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },
    modalContent: {
        width: '90%',
        borderRadius: 12,
        backgroundColor: COLORS.background,
        padding: 20,
        maxHeight: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: COLORS.darkText,
        marginBottom: 20,
        textAlign: 'center',
    },
    notificationList: {
        flexGrow: 1,
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: 10,
    },
    closeButton: {
        backgroundColor: COLORS.primary,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    closeButtonText: {
        color: COLORS.background,
        fontSize: 16,
        fontWeight: '600',
    },
});

export default NotificationModal;