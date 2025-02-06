import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    TextInput,
    Animated,
    ScrollView,
} from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

import { COLORS, styles } from './RecipeStyle';
import { categories, recipes } from './RecipesData';





const FavoriteButton = ({ isFavorite, onPress }) => {
    return (
        <TouchableOpacity style={styles.favoriteButton} onPress={onPress}>
            <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite ? COLORS.accent : COLORS.primary}
            />
        </TouchableOpacity>
    );
};

const RecipeScreen = ({ navigation }) => {
    const [favorites, setFavorites] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [animation] = useState(new Animated.Value(0));

    const handleCategoryPress = (category) => {
        setSelectedCategory(category);
        Animated.spring(animation, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start(() => animation.setValue(0));
    };

    const filteredRecipes = recipes.filter((recipe) => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const toggleFavorite = (id) => {
        setFavorites((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const renderRecipe = ({ item }) => {
        const isFavorite = favorites[item.id] || false;

        return (
            <View
                style={styles.recipeCard}
                onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
            >
                <Image source={item.image} style={styles.recipeImage} />
                <View style={styles.recipeContent}>
                    <Text style={styles.recipeTitle}>{item.title}</Text>
                    <Text style={styles.recipeDescription}>{item.description}</Text>
                    <View style={styles.ingredientsContainer}>
                        {item.ingredients.map((ingredient, index) => (
                            <View key={index} style={styles.ingredientBadge}>
                                <Text style={styles.ingredientText}>{ingredient}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.recipeDetails}>
                        <View style={styles.detailItem}>
                            <MaterialIcons name="timer" size={18} color={COLORS.text} />
                            <Text style={styles.detailText}>{item.time}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Ionicons name="star" size={18} color="#FFD700" />
                            <Text style={styles.detailText}>{item.rating}</Text>
                        </View>
                        <FavoriteButton
                            isFavorite={isFavorite}
                            onPress={() => toggleFavorite(item.id)}
                        />
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TextInput
                    placeholder="Search for a recipe..."
                    placeholderTextColor={COLORS.border}
                    style={styles.searchBar}
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
                <TouchableOpacity style={styles.searchButton}>
                    <FontAwesome name="search" size={20} color={COLORS.background} />
                </TouchableOpacity>
            </View>

            {/* Category Filter */}
            <View contentContainerStyle={styles.categoryContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}

                >
                    {categories.map((category) => {
                        const isSelected = selectedCategory === category;
                        const animatedStyle = {
                            transform: [
                                {
                                    scale: animation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [1, 1.1],
                                    }),
                                },
                            ],
                        };

                        return (
                            <TouchableOpacity
                                key={category}
                                style={[
                                    styles.categoryButton,
                                    isSelected && styles.selectedCategoryButton,
                                ]}
                                onPress={() => handleCategoryPress(category)}
                            >
                                <Animated.View style={isSelected ? animatedStyle : null}>
                                    <Text
                                        style={[
                                            styles.categoryText,
                                            isSelected && styles.selectedCategoryText,
                                        ]}
                                    >
                                        {category}
                                    </Text>
                                </Animated.View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>



            {/* Recipe List */}
            <FlatList
                data={filteredRecipes}
                renderItem={renderRecipe}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.recipeList}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No recipes found for this category or search.</Text>
                    </View>
                }
            />
        </View>
    );
};



export default RecipeScreen;