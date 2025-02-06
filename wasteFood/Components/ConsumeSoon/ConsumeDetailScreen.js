import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

const ConsumeDetailScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const [showIcon, setShowIcon] = useState(false); // État pour afficher l'icône

    // Fonction pour afficher l'icône pendant 5 secondes
    const handleMarkAsConsumed = () => {
        setShowIcon(true); // Afficher l'icône
        setTimeout(() => {
            setShowIcon(false); // Masquer l'icône après 5 secondes
        }, 5000); // 5000 ms = 5 secondes
    };

    // Fonction pour obtenir le bon composant d'icône
    const getIconComponent = (iconFamily) => {
        switch (iconFamily) {
            case 'MaterialIcons':
                return MaterialIcons;
            case 'MaterialCommunityIcons':
                return MaterialCommunityIcons;
            default:
                return MaterialIcons; // Par défaut, utilisez MaterialIcons
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header with Solid Background */}
            <View style={styles.header}>
                <Image source={item.image} style={styles.headerImage} />
                <Text style={styles.title}>{item.label}</Text>
                <Text style={styles.subtitle}>Expires in: {item.date}</Text>
            </View>

            {/* Description Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>About {item.label}</Text>
                <Text style={styles.sectionText}>{item.description}</Text>
                <View style={styles.nutritionContainer}>
                    <Text style={styles.nutritionTitle}>Nutritional Information</Text>
                    <View style={styles.nutritionRow}>
                        <Text style={styles.nutritionLabel}>Calories:</Text>
                        <Text style={styles.nutritionValue}>{item.nutrition.calories}</Text>
                    </View>
                    <View style={styles.nutritionRow}>
                        <Text style={styles.nutritionLabel}>Protein:</Text>
                        <Text style={styles.nutritionValue}>{item.nutrition.protein}</Text>
                    </View>
                    <View style={styles.nutritionRow}>
                        <Text style={styles.nutritionLabel}>Carbs:</Text>
                        <Text style={styles.nutritionValue}>{item.nutrition.carbs}</Text>
                    </View>
                    <View style={styles.nutritionRow}>
                        <Text style={styles.nutritionLabel}>Fat:</Text>
                        <Text style={styles.nutritionValue}>{item.nutrition.fat}</Text>
                    </View>
                </View>
            </View>

            {/* Fun Fact Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Fun Fact</Text>
                <Text style={styles.sectionText}>{item.funFact}</Text>
            </View>

            {/* Why Consume Soon Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Why Consume Soon?</Text>
                <Text style={styles.sectionText}>{item.whyConsumeSoon}</Text>
            </View>

            {/* Waste Statistics Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Waste Statistics</Text>
                <Text style={styles.sectionText}>{item.wasteStats}</Text>
            </View>

            {/* Alternatives Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Alternatives</Text>
                {item.alternatives.map((alt, index) => (
                    <View key={index} style={styles.tipContainer}>
                        <Text style={styles.tipText}>
                            <Text style={{ fontWeight: 'bold' }}>{alt.label}:</Text> {alt.description}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Tips Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tips to Use</Text>
                {item.tips.map((tip, index) => {
                    const IconComponent = getIconComponent(tip.iconFamily);
                    return (
                        <View key={index} style={styles.tipContainer}>
                            <IconComponent name={tip.icon} size={24} color={tip.color} />
                            <Text style={styles.tipText}>{tip.text}</Text>
                        </View>
                    );
                })}
            </View>

            {/* Recipes Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Suggested Recipes</Text>
                {item.recipes.map((recipe, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.recipeCard}
                        onPress={() => navigation.navigate('RecipeDetail', { recipe: recipe.title })}
                    >
                        <Text style={styles.recipeTitle}>{recipe.title}</Text>
                        <Text style={styles.recipeText}>{recipe.description}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Storage Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Storage Recommendations</Text>
                {item.storage.map((storage, index) => {
                    const IconComponent = getIconComponent(storage.iconFamily);
                    return (
                        <View key={index} style={styles.tipContainer}>
                            <IconComponent name={storage.icon} size={24} color={storage.color} />
                            <Text style={styles.tipText}>{storage.text}</Text>
                        </View>
                    );
                })}
            </View>

            {/* Action Button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={handleMarkAsConsumed} // Afficher l'icône au clic
                >
                    <Text style={styles.actionButtonText}>Mark as Consumed</Text>
                </TouchableOpacity>

                {/* Icône au-dessus du bouton */}
                {showIcon && (
                    <View style={styles.iconOverlay}>
                        <LottieView
                            source={require('../../assets/annimation.json')}
                            autoPlay
                            loop={false}
                            style={styles.iconImage}
                        />
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    header: {
        alignItems: 'center',
        paddingVertical: 40,
        backgroundColor: '#D3F1DF',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    headerImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    title: {
        fontSize: 32,
        fontFamily: 'SemiBold',
        color: '#525B44',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 15,
        fontFamily: 'SemiBold',
        color: '#525B44',
    },
    section: {
        marginVertical: 10,
        marginHorizontal: 7,
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 22,
        fontFamily: 'SemiBold',
        color: '#333',
        marginBottom: 10,
    },
    sectionText: {
        fontSize: 14,
        fontFamily: 'SemiBold',
        color: '#555',
        lineHeight: 24,
    },
    nutritionContainer: {
        marginTop: 15,
    },
    nutritionTitle: {
        fontSize: 18,
        fontFamily: 'SemiBold',
        color: '#333',
        marginBottom: 10,
    },
    nutritionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    nutritionLabel: {
        fontSize: 16,
        fontFamily: 'SemiBold',
        color: '#666',
    },
    nutritionValue: {
        fontSize: 16,
        fontFamily: 'SemiBold',
        color: '#333',
    },
    tipContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    tipText: {
        fontSize: 14,
        fontFamily: 'SemiBold',
        color: '#555',
        marginLeft: 10,
    },
    recipeCard: {
        paddingHorizontal: 15,
        marginVertical: 10,
    },
    recipeTitle: {
        fontSize: 18,
        fontFamily: 'SemiBold',
        color: '#333',
        marginBottom: 5,
    },
    recipeText: {
        fontSize: 14,
        fontFamily: 'SemiBold',
        color: '#777',
    },
    buttonContainer: {
        position: 'relative', // Conteneur relatif pour positionner l'overlay
        margin: 20,
    },
    actionButton: {
        backgroundColor: '#9A7E6F',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    actionButtonText: {
        fontSize: 18,
        fontFamily: 'SemiBold',
        color: '#FFFFFF',
    },
    iconOverlay: {
        position: 'absolute',
        top: -400, // Ajustez la position verticale
        left: 200,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999, // Assurez-vous que l'overlay est au-dessus du bouton
    },
    iconImage: {
        width: 500,
        height: 500,
    },
});

export default ConsumeDetailScreen;