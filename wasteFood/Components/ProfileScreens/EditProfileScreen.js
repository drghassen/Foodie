import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ProfileContext } from './ProfileContext';

const EditProfileScreen = ({ route, navigation }) => {


    const { user: initialUser, onSave } = route.params;

    if (!onSave || typeof onSave !== 'function') {
        return null;
    }

    const { setProfilePicture } = useContext(ProfileContext);

    const [user, setUser] = useState(initialUser);
    const [isSaving, setIsSaving] = useState(false);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'We need access to your gallery to change the profile picture.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const newProfilePicture = { uri: result.assets[0].uri };
            setUser({ ...user, profilePicture: newProfilePicture });
            setProfilePicture(newProfilePicture);
        }
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            onSave(user); // Appeler la fonction de rappel
            navigation.goBack();
        }, 1500);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
            {/* Section Photo de profil */}
            <View style={styles.profileImageContainer}>
                <Image source={user.profilePicture} style={styles.profileImage} />
                <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
                    <FontAwesome name="camera" size={16} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            {/* Section Nom */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={user.name}
                    onChangeText={(text) => setUser({ ...user, name: text })}
                    placeholder="Enter your name"
                    placeholderTextColor="#A0AEC0"
                />
            </View>

            {/* Section Email */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={user.email}
                    onChangeText={(text) => setUser({ ...user, email: text })}
                    keyboardType="email-address"
                    placeholder="Enter your email"
                    placeholderTextColor="#A0AEC0"
                />
            </View>

            {/* Section Localisation */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Location</Text>
                <TextInput
                    style={styles.input}
                    value={user.location}
                    onChangeText={(text) => setUser({ ...user, location: text })}
                    placeholder="Enter your location"
                    placeholderTextColor="#A0AEC0"
                />
            </View>

            {/* Section À propos de moi */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>About Me</Text>
                <TextInput
                    style={[styles.input, styles.multilineInput]}
                    value={user.aboutMe}
                    onChangeText={(text) => setUser({ ...user, aboutMe: text })}
                    placeholder="Tell us about yourself..."
                    placeholderTextColor="#A0AEC0"
                    multiline
                />
            </View>

            {/* Bouton Enregistrer */}
            <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
                disabled={isSaving}
            >
                {isSaving ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7FAFC',
    },
    scrollContainer: {
        padding: 20,
    },
    profileImageContainer: {
        alignItems: 'center',
        marginBottom: 30,
        position: 'relative',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 10,
        backgroundColor: '#3C5B6F',
        borderRadius: 20,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#2D3748',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: '#3C5B6F',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default EditProfileScreen;