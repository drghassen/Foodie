import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import styles, { COLORS } from './HomeStyle';

const ChallengeCard = ({ isChallengeAccepted, progress, onAcceptChallenge }) => {
    if (isChallengeAccepted) {
        return (
            <View style={[styles.challengeCard, styles.challengeCardAccepted]}>
                <View style={styles.challengeHeader}>
                    <Text style={styles.challengeTitle}>🎉 Challenge Accepted!</Text>
                    <MaterialCommunityIcons name="party-popper" size={24} color={COLORS.primary} />
                </View>
                <Text style={styles.challengeDescription}>
                    Thank you for accepting the Zero Waste Challenge! Let's make a difference together.
                </Text>
                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{Math.round(progress * 100)}% Completed</Text>
                </View>
                <View style={styles.challengeStats}>
                    <Text style={styles.statText}>Your progress will be tracked here.</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.challengeCard}>
            <View style={styles.challengeHeader}>
                <Text style={styles.challengeTitle}>🎯 Challenge of the Week: Zero Waste</Text>
                <MaterialCommunityIcons name="leaf" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.challengeDescription}>
                Turn your food leftovers into delicious meals and reduce waste. Act for a sustainable future!
            </Text>
            <TouchableOpacity style={styles.challengeButton} onPress={onAcceptChallenge}>
                <Text style={styles.buttonText}>Accept Challenge</Text>
            </TouchableOpacity>
            <View style={styles.challengeStats}>
                {[
                    { icon: <FontAwesome name="cutlery" size={20} color={COLORS.accent} />, text: '20% reduction in leftovers' },
                    { icon: <MaterialIcons name="eco" size={20} color={COLORS.primary} />, text: '+8kg of CO₂ saved' },
                ].map((item, index) => (
                    <View key={index} style={styles.statItem}>
                        {item.icon}
                        <Text style={styles.statText}>{item.text}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default ChallengeCard;