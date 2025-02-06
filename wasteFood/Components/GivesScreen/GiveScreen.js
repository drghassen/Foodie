import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, ScrollView, Image, Share, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DonationCard from './DonationCard';
import { styles as customStyles, COLORS } from './GivesStyles';
import NotiemIcon from './NotiemIcon';
import Toast from 'react-native-toast-message';
import * as Notifications from 'expo-notifications';
import DropDownPicker from 'react-native-dropdown-picker';

const GiveScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [foodName, setFoodName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);
    const [donations, setDonations] = useState([]);
    const [expirationDate, setExpirationDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [category, setCategory] = useState('');
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [foodTypeOpen, setFoodTypeOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [foodType, setFoodType] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const mapRef = useRef(null);
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);



    const [region, setRegion] = useState({
        latitude: 35.8288284, // Coordonnées initiales (Sousse, Tunisie)
        longitude: 10.6405254,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const searchLocation = async (query) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
                {
                    headers: {
                        'User-Agent': 'Foodie (dridighassenbac2021@gmail.com)',
                    },
                }
            );
            const data = await response.json();
            if (data.length > 0) {
                const { lat, lon } = data[0];
                return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Location not found',
                    text2: 'Please try another search query.',
                });
                return null;
            }
        } catch (error) {
            console.error('Error fetching location:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Unable to fetch location. Please try again.',
            });
            return null;
        }
    };

    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            Toast.show({
                type: 'info',
                text1: 'Empty search',
                text2: 'Please enter a location to search.',
            });
            return;
        }

        const coordinates = await searchLocation(searchQuery); // Recherche des coordonnées
        if (coordinates) {
            mapRef.current.animateToRegion({
                ...coordinates,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            }, 1000); // Transition fluide

            setSelectedLocation(coordinates); // Positionne le Marker
            Toast.show({
                type: 'success',
                text1: 'Location Found',
                text2: 'The location has been marked on the map.',
            });
        }
    };

    // Fonction pour sélectionner une image
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        } else {
            Toast.show({
                type: 'info',
                text1: 'No image selected',
                text2: 'You can add an image later.',
            });
        }
    };

    // Fonction pour gérer la date d'expiration
    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setExpirationDate(selectedDate);
        }
    };

    // Fonction pour ajouter une donation
    const handleGiveFood = async () => {
        if (!foodName || !quantity || !location || !image) {
            alert('Please fill all fields and select an image');
            return;
        }

        const newDonation = {
            id: Math.random().toString(),
            image: { uri: image },
            title: foodName,
            quantity: quantity,
            location: location,
            expirationDate: expirationDate.toLocaleDateString(),
            category: category,
            description: description,
            foodType: foodType,
        };

        setDonations((prevDonations) => [newDonation, ...prevDonations]);

        setModalVisible(false);
        setFoodName('');
        setQuantity('');
        setLocation('');
        setImage(null);
        setExpirationDate(new Date());
        setCategory('');
        setDescription('');
        setFoodType('');
        setSelectedLocation(null);

        Toast.show({
            type: 'success',
            text1: 'Donation Added',
            text2: 'Your donation has been successfully added!',
            visibilityTime: 3000,
            autoHide: true,
        });

        // Vérifiez les permissions de notification
        const { status } = await Notifications.requestPermissionsAsync();
        if (status === 'granted') {
            // Planifiez une notification
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Donation Added',
                    body: `You have successfully donated ${foodName}. Thank you for your contribution!`,
                },
                trigger: { seconds: 2 }, // Notification déclenchée après 2 secondes
            });
        } else {
            Toast.show({
                type: 'info',
                text1: 'Notifications Disabled',
                text2: 'Please enable notifications to receive updates.',
            });
        }
    };

    // Fonction pour partager une donation
    const shareDonation = async () => {
        try {
            await Share.share({
                message: `I just donated ${foodName} to reduce food waste! Join me in this initiative.`,
            });
        } catch (error) {
            console.error(error);
        }
    };

    // Fonction pour activer les notifications
    const enableNotifications = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status === 'granted') {
            setNotificationsEnabled(true);
        } else {
            Toast.show({
                type: 'info',
                text1: 'Notifications Disabled',
                text2: 'Please enable notifications to receive updates.',
            });
            setNotificationsEnabled(false);
        }
    };



    return (
        <View style={customStyles.container}>
            <View style={customStyles.mapContainer}>
                <MapView
                    ref={mapRef}
                    style={customStyles.map}
                    region={region} // Région de la carte
                    onPress={(e) => setSelectedLocation(e.nativeEvent.coordinate)} // Mettre à jour le marqueur si l'utilisateur appuie sur la carte
                >
                    {selectedLocation && (
                        <Marker
                            coordinate={selectedLocation} // Coordonnées du marqueur
                            title="Selected Location"
                            description="This is the selected location"
                            pinColor="red" // Couleur du marqueur
                        />
                    )}
                </MapView>

                {/* Barre de recherche */}
                <View style={customStyles.searchBarContainer}>
                    <View style={customStyles.searchBarContent}>
                        <TextInput
                            style={customStyles.searchBar}
                            placeholder="Search for a location..."
                            placeholderTextColor={'#888'}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        <TouchableOpacity onPress={handleSearch}>
                            <MaterialIcons name="search" size={24} color="#888" style={customStyles.searchIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={customStyles.contentContainer} showsVerticalScrollIndicator={false}>
                <View style={customStyles.titleContainer}>
                    <Text style={customStyles.screenTitle}>Donate Food</Text>
                    <TouchableOpacity onPress={enableNotifications}>
                        <MaterialIcons
                            name={notificationsEnabled ? "notifications" : "notifications-off"}
                            size={24}
                            color={notificationsEnabled ? COLORS.primary : COLORS.gray}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={customStyles.screenSubtitle}>Help reduce food waste by donating your surplus.</Text>

                <TouchableOpacity
                    style={customStyles.addButton}
                    onPress={() => setModalVisible(true)}
                    activeOpacity={0.8}
                >
                    <View style={customStyles.addButtonContent}>
                        <MaterialIcons name="add-circle" size={24} color="#FFFFFF" />
                        <Text style={customStyles.addButtonText}>Add a Donation</Text>
                    </View>
                </TouchableOpacity>


                <Text style={customStyles.sectionTitle}>Recent Donations</Text>
                {donations.length === 0 ? (
                    <View style={customStyles.noDonationsContainer}>
                        <Text style={customStyles.noDonationsText}>No donations available. Be the first to donate!</Text>
                        <NotiemIcon width={180} height={180} />
                    </View>
                ) : (
                    donations.map((donation) => (
                        <DonationCard
                            key={donation.id}
                            image={donation.image}
                            title={donation.title}
                            quantity={donation.quantity}
                            location={donation.location}
                            expirationDate={donation.expirationDate}
                            category={donation.category}
                            description={donation.description}
                            foodType={donation.foodType}
                            onShare={shareDonation}
                        />
                    ))
                )}
            </ScrollView>

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={customStyles.modalOverlay}>
                    <View style={customStyles.modalContainer}>
                        <ScrollView contentContainerStyle={customStyles.modalContent} showsVerticalScrollIndicator={false}>
                            <Text style={customStyles.modalTitle}>Add a Donation</Text>

                            {/* Champ d'image */}
                            <TouchableOpacity style={customStyles.imagePickerContainer} onPress={pickImage}>
                                {image ? (
                                    <Image source={{ uri: image }} style={customStyles.selectedImage} />
                                ) : (
                                    <View style={customStyles.imagePlaceholder}>
                                        <MaterialIcons name="image" size={40} color="#888" />
                                        <Text style={customStyles.imagePlaceholderText}>Select an Image</Text>
                                    </View>
                                )}
                            </TouchableOpacity>

                            {/* Champ pour le nom de la nourriture */}
                            <TextInput
                                style={customStyles.input}
                                placeholder="Food Name"
                                value={foodName}
                                onChangeText={setFoodName}
                            />

                            {/* Champ pour la quantité */}
                            <TextInput
                                style={customStyles.input}
                                placeholder="Quantity (e.g., 2 kg)"
                                value={quantity}
                                onChangeText={setQuantity}
                            />

                            {/* Champ pour l'emplacement de collecte */}
                            <TextInput
                                style={customStyles.input}
                                placeholder="Collection Location"
                                value={location}
                                onChangeText={setLocation}
                            />

                            {/* Champ pour la date d'expiration */}
                            <TouchableOpacity
                                style={customStyles.input}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Text>
                                    Expiration Date: {expirationDate.toLocaleDateString()}
                                </Text>
                            </TouchableOpacity>

                            {/* Sélecteur de date */}
                            {showDatePicker && (
                                <DateTimePicker
                                    value={expirationDate}
                                    mode="date"
                                    display="default"
                                    onChange={handleDateChange}
                                    style={customStyles.input}
                                />
                            )}

                            {/* Champ pour la catégorie */}
                            <DropDownPicker
                                open={categoryOpen}
                                value={category}
                                items={[
                                    { label: 'Fruits', value: 'Fruits' },
                                    { label: 'Vegetables', value: 'Vegetables' },
                                    { label: 'Dairy', value: 'Dairy' },
                                    { label: 'Cooked Meals', value: 'Cooked Meals' },
                                    { label: 'Bakery', value: 'Bakery' },
                                    { label: 'Other', value: 'Other' },
                                ]}
                                setOpen={(open) => {
                                    setCategoryOpen(open);
                                    if (open) setFoodTypeOpen(false); // Fermer l'autre dropdown
                                }}
                                setValue={setCategory}
                                placeholder="Select a Category"
                                style={[customStyles.input, { backgroundColor: '#F5F5F5' }]} // Background color of the dropdown
                                dropDownContainerStyle={[customStyles.dropDownContainer, { backgroundColor: '#F5F5F5' }]} // Background color of the dropdown list
                                textStyle={{ color: '#333' }} // Text color of the selected item
                                placeholderStyle={{ color: '#888' }} // Placeholder text color
                                selectedItemContainerStyle={{ backgroundColor: '#E0E0E0' }} // Background color of the selected item
                                selectedItemLabelStyle={{ color: '#000' }} // Text color of the selected item
                                listItemContainerStyle={{ backgroundColor: '#F5F5F5' }} // Background color of each item in the list
                                listItemLabelStyle={{ color: '#333' }} // Text color of each item in the list
                            />

                            {/* Champ pour la description détaillée */}
                            <TextInput
                                style={[customStyles.input, { height: 100 }]}
                                placeholder="Detailed Description (optional)"
                                value={description}
                                onChangeText={setDescription}
                                multiline={true}
                            />

                            {/* Champ pour le type de nourriture */}
                            <DropDownPicker
                                open={foodTypeOpen}
                                value={foodType}
                                items={[
                                    { label: 'Fresh', value: 'Fresh' },
                                    { label: 'Frozen', value: 'Frozen' },
                                    { label: 'Canned', value: 'Canned' },
                                ]}
                                setOpen={(open) => {
                                    setFoodTypeOpen(open);
                                    if (open) setCategoryOpen(false); // Fermer l'autre dropdown
                                }}
                                setValue={setFoodType}
                                placeholder="Select Food Type"
                                style={customStyles.input}
                                dropDownContainerStyle={customStyles.dropDownContainer}
                                placeholderStyle={{ color: '#888' }}
                            />

                            {/* Boutons du modal */}
                            <View style={customStyles.modalButtonsContainer}>
                                <TouchableOpacity
                                    style={[customStyles.button, customStyles.cancelButton]}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={customStyles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[customStyles.button, customStyles.saveButton]}
                                    onPress={handleGiveFood}
                                >
                                    <Text style={customStyles.saveButtonText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            <Toast />
        </View>
    );
};

export default GiveScreen;