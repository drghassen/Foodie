import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from '../HomeStyle';

const ConsumeSoonSection = ({ consumeData, onConsumeCardPress }) => {
    return (
        <View style={styles.consumeSoonSection}>
            <Text style={styles.consumeTitle}>Consume Soon</Text>
            <View style={styles.consumeList}>
                {consumeData.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.consumeCard}
                        onPress={() => onConsumeCardPress(item)}
                    >
                        <View style={styles.cardIcon}>{item.icon}</View>
                        <View style={styles.cardContent}>
                            <Text style={styles.itemLabel}>{item.label}</Text>
                            <Text style={styles.itemDate}>{item.date}</Text>
                        </View>
                        <AntDesign name="arrowright" size={15} color="#A35C7A" />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default ConsumeSoonSection;