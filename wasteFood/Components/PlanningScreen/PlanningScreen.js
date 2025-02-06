import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, TextInput, Modal, Image, Alert, Animated } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import styles from './PlanningScreenStyles';
import planningData from './planningData';





const PlanningScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [addMealModalVisible, setAddMealModalVisible] = useState(false); // Nouveau modal pour ajouter un repas
    const [selectedDay, setSelectedDay] = useState(null);
    const [meal, setMeal] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [newMealDay, setNewMealDay] = useState(''); // Jour du nouveau repas
    const [newMealName, setNewMealName] = useState(''); // Nom du nouveau repas
    const [newMealIngredients, setNewMealIngredients] = useState(''); // Ingrédients du nouveau repas
    const [planning, setPlanning] = useState(planningData);
    const fadeAnim = useState(new Animated.Value(0))[0];

    const handleSaveMeal = () => {
        const updatedPlanning = [...planning];
        const dayIndex = updatedPlanning.findIndex(item => item.id === selectedDay.id);
        updatedPlanning[dayIndex].meal = meal;
        updatedPlanning[dayIndex].ingredients = ingredients.split(',');
        setPlanning(updatedPlanning);
        setModalVisible(false);
    };

    const handleDeleteMeal = (id) => {
        Alert.alert(
            "Delete Meal",
            "Are you sure you want to delete this meal?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete", onPress: () => {
                        const updatedPlanning = planning.filter(item => item.id !== id);
                        setPlanning(updatedPlanning);
                    }
                }
            ]
        );
    };

    const handleAddMeal = () => {
        if (!newMealDay || !newMealName || !newMealIngredients) {
            Alert.alert("Error", "Please fill all fields.");
            return;
        }

        const newMeal = {
            id: Date.now().toString(), // ID unique
            day: newMealDay,
            meal: newMealName,
            ingredients: newMealIngredients.split(','),
            image: require('../../assets/plan1.jpg'), // Image par défaut
        };

        setPlanning([...planning, newMeal]);
        setAddMealModalVisible(false); // Fermer le modal
        setNewMealDay(''); // Réinitialiser les champs
        setNewMealName('');
        setNewMealIngredients('');
    };

    const handleSharePlanning = async () => {
        const planningText = planning.map(item => `${item.day}: ${item.meal}\nIngredients: ${item.ingredients.join(', ')}`).join('\n\n');
        const fileUri = FileSystem.documentDirectory + 'planning.txt';
        await FileSystem.writeAsStringAsync(fileUri, planningText);
        Sharing.shareAsync(fileUri);
    };

    const renderPlanningItem = ({ item }) => (
        <Animated.View style={{ opacity: fadeAnim }}>
            <TouchableOpacity
                style={styles.card}
                onPress={() => {
                    setSelectedDay(item);
                    setMeal(item.meal || '');
                    setIngredients(item.ingredients.join(', '));
                    setModalVisible(true);
                }}
            >
                <Image source={item.image} style={styles.cardImage} />
                <View style={styles.cardContent}>
                    <Text style={styles.dayText}>{item.day}</Text>
                    <Text style={styles.mealText}>{item.meal || 'No meal planned'}</Text>
                    <View style={styles.ingredientsContainer}>
                        {item.ingredients.map((ingredient, index) => (
                            <View key={index} style={styles.ingredientBadge}>
                                <Text style={styles.ingredientText}>{ingredient}</Text>
                            </View>
                        ))}
                    </View>
                    <TouchableOpacity style={styles.editButton} onPress={() => handleDeleteMeal(item.id)}>
                        <MaterialIcons name="delete" size={24} color={"#3B6790"} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <View style={styles.container}>
            <FlatList
                data={planning}
                renderItem={renderPlanningItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />

            {/* Floating Action Buttons */}
            <View style={styles.floatingButtonsContainer}>
                <TouchableOpacity style={styles.floatingButton} onPress={handleSharePlanning}>
                    <Ionicons name="share-social" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.floatingButton} onPress={() => setAddMealModalVisible(true)}>
                    <Ionicons name="add" size={30} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            {/* Modal for adding a new meal */}
            <Modal
                visible={addMealModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setAddMealModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add a New Meal</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Day (e.g., Monday)"
                            value={newMealDay}
                            onChangeText={setNewMealDay}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Meal Name"
                            value={newMealName}
                            onChangeText={setNewMealName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Ingredients (separated by commas)"
                            value={newMealIngredients}
                            onChangeText={setNewMealIngredients}
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={handleAddMeal}>
                            <Text style={styles.saveButtonText}>Add Meal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setAddMealModalVisible(false)}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal for editing a meal */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Meal</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter the meal"
                            value={meal}
                            onChangeText={setMeal}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Ingredients separated by commas"
                            value={ingredients}
                            onChangeText={setIngredients}
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={handleSaveMeal}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};




export default PlanningScreen;