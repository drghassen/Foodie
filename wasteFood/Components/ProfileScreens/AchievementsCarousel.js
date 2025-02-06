import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Animated,
    FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');
const achievementCardWidth = screenWidth * 0.6; // Largeur de chaque carte d'achievement
const achievementCardSpacing = 10; // Espacement entre les cartes
const totalAchievementCardWidth = achievementCardWidth + achievementCardSpacing;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const AchievementsCarousel = ({ achievements }) => {
    const flatListRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const renderAchievementCard = ({ item, index }) => {
        const inputRange = [
            (index - 1) * totalAchievementCardWidth,
            index * totalAchievementCardWidth,
            (index + 1) * totalAchievementCardWidth,
        ];

        // Animation de l'opacité
        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
        });

        // Animation de la mise à l'échelle
        const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View
                style={[
                    styles.achievementCard,
                    {
                        opacity,
                        transform: [{ scale }],
                        marginRight: index === achievements.length - 1 ? achievementCardSpacing : 0, // Pas d'espace après la dernière carte
                    },
                ]}
            >
                <MaterialIcons name="emoji-events" size={26} color="#637E76" />
                <Text style={styles.achievementText}>{item}</Text>
            </Animated.View>
        );
    };

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        {
            useNativeDriver: true,
            listener: (event) => {
                const index = Math.round(
                    event.nativeEvent.contentOffset.x / totalAchievementCardWidth
                );
                setActiveIndex(index);
            },
        }
    );

    const scrollToIndex = (index) => {
        flatListRef.current.scrollToIndex({ animated: true, index });
    };

    return (
        <View style={styles.achievementsContainer}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <AnimatedFlatList
                ref={flatListRef}
                data={achievements}
                renderItem={renderAchievementCard}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                onScroll={handleScroll}
                contentContainerStyle={{
                    paddingHorizontal: (screenWidth - achievementCardWidth) / 2 - achievementCardSpacing, // Centrage des cartes
                }}
                snapToInterval={totalAchievementCardWidth} // Snap sur chaque carte
                decelerationRate="fast"
            />
            <View style={styles.paginationContainer}>
                {achievements.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.paginationDot,
                            activeIndex === index && styles.activeDot,
                        ]}
                        onPress={() => scrollToIndex(index)}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    achievementsContainer: {
        marginTop: 30,
    },
    sectionTitle: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        paddingHorizontal: 20,
    },
    achievementCard: {
        width: achievementCardWidth,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#EEE2DE',
        borderRadius: 15,
        marginRight: achievementCardSpacing,
    },
    achievementText: {
        fontSize: 16,
        color: '#333',
        marginTop: 10,
        textAlign: 'center',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    paginationDot: {
        width: 5,
        height: 5,
        borderRadius: 4,
        backgroundColor: '#CBD5E0',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#DFD3C3',
        width: 9,
        height: 9,
    },
});

export default AchievementsCarousel;