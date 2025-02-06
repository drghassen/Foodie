import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from './GivesStyles';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

const DonationCard = ({ image, title, quantity, location, donor, expirationDate, wasteContext }) => {
    return (
        <View style={styles.donationCard}>
            <Image source={image} style={styles.donationImage} />
            <View style={styles.donationDetailsContainer}>
                <Text style={styles.donationTitle}>{title}</Text>

                {/* Quantité */}
                <View style={styles.donationInfo}>
                    <MaterialIcons name="shopping-basket" size={16} color={COLORS.primary} />
                    <Text style={styles.donationText}>{quantity}</Text>
                </View>

                {/* Emplacement */}
                <View style={styles.donationInfo}>
                    <MaterialIcons name="location-on" size={16} color={COLORS.primary} />
                    <Text style={styles.donationText}>{location}</Text>
                </View>

                {/* Date d'expiration */}
                <View style={styles.donationInfo}>
                    <MaterialIcons name="event" size={16} color={COLORS.primary} />
                    <Text style={styles.donationText}>Expires: {expirationDate}</Text>
                </View>

                {/* Contexte de gaspillage */}
                {wasteContext && (
                    <View style={styles.donationInfo}>
                        <Entypo name="info" size={16} color={COLORS.primary} />
                        <Text style={styles.donationText}>{wasteContext}</Text>
                    </View>
                )}

                {/* Donateur */}
                <View style={styles.donationInfo}>
                    <MaterialIcons name="person" size={16} color={COLORS.primary} />
                    <Text style={styles.donationText}>Donated by: You</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    donationCard: {
        flexDirection: 'row',
        backgroundColor: '#fefefe',
        borderRadius: 8,
        borderColor: '#eee',
        borderWidth: 1,
        overflow: 'hidden',
        marginBottom: 16,
    },
    donationImage: {
        width: 110,
        height: '100%', // Correction : utilisez une chaîne de caractères pour '100%'
    },
    donationDetailsContainer: {
        flex: 1,
        padding: 10,
        left: 10,
    },
    donationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    donationInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    donationText: {
        fontSize: 14,
        color: COLORS.text,
        marginLeft: 8,
    },
});

export default DonationCard;