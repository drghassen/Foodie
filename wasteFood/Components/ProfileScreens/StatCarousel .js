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

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth * 0.7; // Largeur de la carte (70% de l'écran)
const cardSpacing = 10; // Espacement entre les cartes
const totalCardWidth = cardWidth + cardSpacing; // Largeur totale d'une carte avec espacement

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const StatCarousel = ({ stats }) => {
    const flatListRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const renderStatCard = ({ item, index }) => {
        const inputRange = [
            (index - 1) * totalCardWidth,
            index * totalCardWidth,
            (index + 1) * totalCardWidth,
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
                    styles.statCard,
                    {
                        opacity,
                        transform: [{ scale }],
                        marginRight: index === stats.length - 1 ? cardSpacing : 0, // Pas d'espace après la dernière carte
                    },
                ]}
            >
                <Text style={styles.statTitle}>{item.title}</Text>
                <Text style={styles.statValue}>{item.value}</Text>
            </Animated.View>
        );
    };

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        {
            useNativeDriver: true,
            listener: (event) => {
                const index = Math.round(
                    event.nativeEvent.contentOffset.x / totalCardWidth
                );
                setActiveIndex(index);
            },
        }
    );

    const scrollToIndex = (index) => {
        flatListRef.current.scrollToIndex({ animated: true, index });
    };

    return (
        <View style={styles.container}>
            <AnimatedFlatList
                ref={flatListRef}
                data={stats}
                renderItem={renderStatCard}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                onScroll={handleScroll}
                contentContainerStyle={{
                    paddingHorizontal: (screenWidth - cardWidth) / 2 - cardSpacing, // Centrage des cartes
                }}
                snapToInterval={totalCardWidth} // Snap sur chaque carte
                decelerationRate="fast"
            />
            <View style={styles.paginationContainer}>
                {stats.map((_, index) => (
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
    container: {
        marginTop: 20,
    },
    statCard: {
        width: cardWidth,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#EEE2DE',
        borderRadius: 15,
        marginRight: cardSpacing,

    },
    statTitle: {
        fontSize: 18,
        color: '#333',
        fontWeight: '600',
        textAlign: 'center',
    },
    statValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#694F8E',
        textAlign: 'center',
        marginTop: 10,
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

export default StatCarousel;