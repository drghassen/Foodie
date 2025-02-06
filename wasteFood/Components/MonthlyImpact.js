import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Importez useNavigation
import styles, { COLORS, SIZES } from './HomeStyle';

const MonthlyImpact = () => {
    const navigation = useNavigation(); // Initialisez la navigation

    return (
        <View style={styles.firstSection}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Monthly Impact</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ImpactHistory')}>
                    <AntDesign name="menuunfold" size={SIZES.iconSize} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
            <View style={styles.statsRow}>
                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>Food Saved</Text>
                    <Text style={styles.statValue}>4.2 Kg</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>CO₂ Avoided</Text>
                    <Text style={styles.statValue}>8.5 Kg</Text>
                </View>
            </View>
        </View>
    );
};

export default MonthlyImpact;