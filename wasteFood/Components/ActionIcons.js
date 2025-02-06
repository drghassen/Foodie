import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons, FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';
import styles, { COLORS, SIZES } from './HomeStyle';

const ActionIcons = ({ navigation }) => {
    return (
        <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconCard} onPress={() => navigation.navigate('Camera')}>
                <View style={[styles.iconCircle, { backgroundColor: '#FFE1FF' }]}>
                    <MaterialIcons name="qr-code-scanner" size={SIZES.iconSize} color={'#7E60BF'} />
                </View>
                <Text style={styles.iconLabel}>Scan</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconCard} onPress={() => navigation.navigate('Recipe')}>
                <View style={[styles.iconCircle, { backgroundColor: '#EFB6C8' }]}>
                    <FontAwesome name="book" size={SIZES.iconSize} color={COLORS.primary} />
                </View>
                <Text style={styles.iconLabel}>Recipe</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconCard} onPress={() => navigation.navigate('Planning')}>
                <View style={[styles.iconCircle, { backgroundColor: '#A9BFA8' }]}>
                    <Ionicons name="calendar" size={SIZES.iconSize} color={'#500073'} />
                </View>
                <Text style={styles.iconLabel}>Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconCard} onPress={() => navigation.navigate('Gives')}>
                <View style={[styles.iconCircle, { backgroundColor: '#FFE1FF' }]}>
                    <FontAwesome name="handshake-o" size={SIZES.iconSize} color={COLORS.primary} />
                </View>
                <Text style={styles.iconLabel}>Give</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ActionIcons;