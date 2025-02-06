import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    Animated,
    TextInput,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DonationDetails from "./DonationDetails"; // Import the DonationDetails component
import donationData from "./donationData"; // Import the donation data

const DonationHistoryScreen = () => {
    const [filter, setFilter] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDonation, setSelectedDonation] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        }, 2000);
    }, [fadeAnim]);

    const totalDonations = donationData.length;
    const totalQuantity = donationData.reduce((sum, item) => sum + parseFloat(item.quantity), 0);
    const totalImpact = donationData.reduce((sum, item) => sum + parseFloat(item.price.replace(" €", "")), 0);

    const filteredDonations = donationData.filter(
        (item) =>
            item.type.toLowerCase().includes(filter.toLowerCase()) ||
            item.location.toLowerCase().includes(filter.toLowerCase()) ||
            item.beneficiary.toLowerCase().includes(filter.toLowerCase())
    );

    const clearFilter = () => {
        setFilter("");
    };

    const handleViewDetails = (donation) => {
        setSelectedDonation(donation);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.filterBar}>
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                        <TextInput
                            style={styles.filterInput}
                            placeholder="Filter by type, location, or beneficiary"
                            placeholderTextColor="#999"
                            value={filter}
                            onChangeText={setFilter}
                        />
                        {filter.length > 0 && (
                            <TouchableOpacity onPress={clearFilter} style={styles.clearButton}>
                                <Ionicons name="close-circle" size={20} color="#999" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
                {/* Filter Bar */}
                <View style={styles.impactMessage}>
                    <Text style={styles.impactMessageText}>
                        💚 Thank you! Thanks to you, {totalQuantity} kg of food have been saved from waste.
                    </Text>
                </View>

                {/* Summary statistics */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{totalDonations}</Text>
                        <Text style={styles.statLabel}>Donations</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{totalQuantity} kg</Text>
                        <Text style={styles.statLabel}>Quantity</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{totalImpact} €</Text>
                        <Text style={styles.statLabel}>Impact</Text>
                    </View>
                </View>

                {/* Indicateur de chargement */}
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#9575DE" />
                        <Text style={styles.loadingText}>Loading donations...</Text>
                    </View>
                ) : (
                    filteredDonations.map((item, index) => (
                        <Animated.View key={item.id} style={[styles.card, { opacity: fadeAnim }]}>
                            <Image source={item.image} style={styles.cardImage} />
                            <View style={styles.cardContent}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardTitle}>Donation on {item.date}</Text>
                                    <Text style={styles.cardPrice}>{item.price}</Text>
                                </View>
                                <View style={styles.cardInfo}>
                                    <Ionicons name="location-outline" size={16} color="#666" />
                                    <Text style={styles.cardText}>{item.location}</Text>
                                </View>
                                <View style={styles.cardInfo}>
                                    <Ionicons name="scale-outline" size={16} color="#666" />
                                    <Text style={styles.cardText}>{item.quantity}</Text>
                                </View>
                                <View style={styles.cardInfo}>
                                    <Ionicons name="fast-food-outline" size={16} color="#666" />
                                    <Text style={styles.cardText}>{item.type}</Text>
                                </View>
                                <View style={styles.cardInfo}>
                                    <Ionicons name="people-outline" size={16} color="#666" />
                                    <Text style={styles.cardText}>{item.beneficiary}</Text>
                                </View>
                                <View style={styles.cardInfo}>
                                    <Ionicons name="checkmark-circle-outline" size={16} color="#666" />
                                    <Text style={styles.cardText}>{item.status}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.detailsButton} onPress={() => handleViewDetails(item)}>
                                <Text style={styles.detailsButtonText}>View Details</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    ))
                )}
            </ScrollView>

            {/* Donation Details Modal */}
            <DonationDetails
                donation={selectedDonation}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    header: {
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 10,
    },
    impactMessage: {
        backgroundColor: "#677D6A",
        padding: 15,
        borderRadius: 10,
    },
    impactMessageText: {
        fontSize: 17,
        color: "#eeeeee",
        textAlign: "center",
    },
    filterBar: {
        paddingVertical: 5,
        backgroundColor: "#F8FAFC",
        borderColor: "#EEE",
        borderWidth: 1,
        borderRadius: 5,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F8FAFC",
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    filterInput: {
        flex: 1,
        height: 40,
        color: "#333",
    },
    clearButton: {
        padding: 5,
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 15,
        backgroundColor: "#eee",
        marginHorizontal: 5,
        borderRadius: 10,
        marginVertical: 15,
    },
    statItem: {
        alignItems: "center",
    },
    statValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#9575DE",
    },
    statLabel: {
        fontSize: 14,
        color: "#666666",
    },
    listContainer: {
        padding: 15,
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#666666",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 1,
    },
    cardImage: {
        width: "100%",
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardContent: {
        padding: 15,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333333",
    },
    cardPrice: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#9575DE",
    },
    cardInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    cardText: {
        fontSize: 14,
        color: "#666666",
        marginLeft: 5,
    },
    detailsButton: {
        backgroundColor: "#E6B9A6",
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: "center",
    },
    detailsButtonText: {
        color: "#ffffff",
        fontWeight: "bold",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#9575DE",
    },
});

export default DonationHistoryScreen;