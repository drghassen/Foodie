import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated, Easing, Platform, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import * as Haptics from 'expo-haptics'; // For haptic feedback
import { LinearGradient } from 'expo-linear-gradient'; // For gradient backgrounds
import { BlurView } from 'expo-blur'; // For blurred backdrop

const CameraScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { onScan } = route.params || { onScan: () => { } }; // Provide a default function

    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [animation] = useState(new Animated.Value(0));
    const [isModalVisible, setModalVisible] = useState(false);
    const [scannedData, setScannedData] = useState(null);

    // Animation for the scan line
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    // Request camera permission
    useEffect(() => {
        (async () => {
            const { status } = await requestPermission();
            if (status !== 'granted') {
                Alert.alert('Permission required', 'Permission to access camera is required to scan QR codes.');
            }
        })();
    }, []);

    // Handle QR code scan
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setScannedData({ type, data });
        setModalVisible(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); // Haptic feedback
    };

    // Close modal and trigger onScan
    const handleModalClose = () => {
        setModalVisible(false);
        onScan(scannedData.data);
        navigation.goBack(); // Navigate back after scanning
    };

    // Scan line animation style
    const scanLineStyle = {
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 300],
                }),
            },
        ],
    };

    if (!permission?.granted) {
        return (
            <LinearGradient colors={['#000', '#111']} style={styles.permissionContainer}>
                <Text style={styles.permissionText}>
                    Permission to access camera is required!
                </Text>
                <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                    <Text style={styles.permissionButtonText}>Grant Permission</Text>
                </TouchableOpacity>
            </LinearGradient>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                }}
            >
                {/* Overlay */}
                <View style={styles.overlay}>
                    <View style={styles.frame}>
                        <Animated.View style={[styles.scanLine, scanLineStyle]} />
                    </View>
                </View>

                {/* Close button */}
                <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="close" size={30} color="#FFF" />
                </TouchableOpacity>
            </CameraView>

            {/* Modern Modal */}
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={handleModalClose}
                onBackButtonPress={handleModalClose}
                backdropOpacity={0.8}
                animationIn="zoomIn"
                animationOut="zoomOut"
                backdropTransitionOutTiming={0}
                style={styles.modal}
            >
                <BlurView intensity={50} tint="dark" style={styles.modalBlur}>
                    <LinearGradient colors={['#4CAF50', '#388E3C']} style={styles.modalContent}>
                        <Ionicons name="checkmark-circle" size={50} color="#FFF" style={styles.modalIcon} />
                        <Text style={styles.modalTitle}>QR Code Scanned</Text>
                        {/* <Text style={styles.modalText}>Type: {scannedData?.type}</Text> */}
                        <Text style={styles.modalText}>Data: {scannedData?.data}</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </BlurView>
            </Modal>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4C585B',
    },
    camera: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    frame: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: '#FFF',
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
    },
    scanLine: {
        width: '100%',
        height: 2,
        backgroundColor: '#4CAF50',
        position: 'absolute',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
        padding: 10,
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    permissionText: {
        color: '#FFF',
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    permissionButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
    },
    permissionButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBlur: {
        width: '90%',
        borderRadius: 8,
        overflow: 'hidden',

    },
    modalContent: {
        padding: 25,
        alignItems: 'center',
    },
    modalIcon: {
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 20,
    },
    modalText: {
        color: '#FFF',
        fontSize: 16,
        marginBottom: 10,
    },
    modalButton: {
        backgroundColor: '#FFF',
        paddingHorizontal: 35,
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 15,
    },
    modalButtonText: {
        color: '#4CAF50',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CameraScreen;