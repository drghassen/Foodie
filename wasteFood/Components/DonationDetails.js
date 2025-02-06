import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps"; // Pour afficher une carte

const DonationDetails = ({ donation, visible, onClose }) => {
    if (!donation) return null;

    // Fonction pour ouvrir l'email
    const handleContact = () => {
        Linking.openURL(`mailto:${donation.contact}?subject=Regarding Donation ${donation.id}`);
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="close" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Donation Details</Text>

                    {/* Carte interactive */}
                    <View style={styles.mapContainer}>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: 52.52, // Berlin par défaut
                                longitude: 13.405,
                                latitudeDelta: 0.1,
                                longitudeDelta: 0.1,
                            }}
                        >
                            <Marker
                                coordinate={{ latitude: 52.52, longitude: 13.405 }} // Coordonnées de l'emplacement
                                title={donation.location}
                                description={donation.beneficiary}
                            />
                        </MapView>
                    </View>

                    {/* Détails du don */}
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Date:</Text>
                        <Text style={styles.detailValue}>{donation.date}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Quantity:</Text>
                        <Text style={styles.detailValue}>{donation.quantity}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Location:</Text>
                        <Text style={styles.detailValue}>{donation.location}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Type:</Text>
                        <Text style={styles.detailValue}>{donation.type}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Beneficiary:</Text>
                        <Text style={styles.detailValue}>{donation.beneficiary}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Status:</Text>
                        <Text style={styles.detailValue}>{donation.status}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Price:</Text>
                        <Text style={styles.detailValue}>{donation.price}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Delivery Method:</Text>
                        <Text style={styles.detailValue}>{donation.deliveryMethod}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Description:</Text>
                        <Text style={styles.detailValue}>{donation.description}</Text>
                    </View>

                    {/* Bouton de contact */}
                    <TouchableOpacity style={styles.contactButton} onPress={handleContact}>
                        <Text style={styles.contactButtonText}>Contact Beneficiary</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        maxHeight: "80%",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    detailItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    detailLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    detailValue: {
        fontSize: 16,
        color: "#666",
        flexShrink: 1,
        marginLeft: 10,
    },
    closeButton: {
        alignSelf: "flex-end",
    },
    mapContainer: {
        height: 150,
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 15,
    },
    map: {
        flex: 1,
    },
    contactButton: {
        backgroundColor: "#677D6A",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    contactButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default DonationDetails;