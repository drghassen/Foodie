import React, { useState, useContext, useCallback, useMemo, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    ImageBackground,
    TextInput,
    Linking,
    FlatList,
    Animated,
    Easing,
} from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { FontAwesome, Ionicons, Feather, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import { ProfileContext } from './ProfileContext';
import { lineData, initialUserData, settingsOptions } from '../../const/constProfileScreen';
import { styles } from './StyleProfileScreen';
import StatCarousel from './StatCarousel ';
import AchievementsCarousel from './AchievementsCarousel';
import SettingsPanel from './SettingsPanel';
import Toast from '../Toast';

const ProfileScreen = () => {
    const { profilePicture, setProfilePicture } = useContext(ProfileContext);
    const [user, setUser] = useState({
        ...initialUserData,
        profilePicture: profilePicture,
    });
    const screenWidth = Dimensions.get('window').width;
    const [isEditingAboutMe, setIsEditingAboutMe] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const navigation = useNavigation();

    const handleSave = (updatedUser) => {
        setUser(updatedUser);
        setProfilePicture(updatedUser.profilePicture);
    };

    const stats = useMemo(() => [
        { title: 'Completed Meals', value: user.completedMeals },
        { title: 'Waste Reduced (kg)', value: user.foodWasteReduced },
        { title: 'Calories Burned', value: user.caloriesBurned },
        { title: 'Active Days', value: user.daysActive },
        { title: 'Steps Taken', value: user.stepsTaken },
    ], [user.completedMeals, user.foodWasteReduced, user.caloriesBurned, user.daysActive, user.stepsTaken]);

    const pickImage = useCallback(async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Désolé, nous avons besoin de la permission pour accéder à la galerie !');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const newProfilePicture = { uri: result.assets[0].uri };
            setProfilePicture(newProfilePicture);
            setUser((prevUser) => ({ ...prevUser, profilePicture: newProfilePicture }));
        }
    }, [setProfilePicture]);

    const handleSocialMediaPress = useCallback((url) => {
        if (url) {
            Linking.openURL(url).catch(() => {
                alert("Impossible d'ouvrir le lien. Veuillez vérifier l'URL.");
            });
        } else {
            alert("Aucun lien disponible pour ce réseau social.");
        }
    }, []);

    // Animation pour le panneau des paramètres
    const slideAnim = useRef(new Animated.Value(0)).current;

    // Fonction pour afficher/masquer le panneau des paramètres
    const toggleSettings = useCallback(() => {
        setShowSettings((prev) => !prev);
        Animated.timing(slideAnim, {
            toValue: showSettings ? 0 : 1,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();
    }, [showSettings, slideAnim]);

    // Styles animés pour le panneau des paramètres
    const settingsPanelStyle = {
        transform: [
            {
                translateX: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [screenWidth, 0],
                }),
            },
        ],
    };

    // Render function for settings list
    const renderSettingsItem = useCallback(({ item }) => (
        <TouchableOpacity style={styles.settingsItem} onPress={() => console.log(item.title)}>
            <MaterialIcons name={item.icon} size={24} color="#3C5B6F" />
            <Text style={styles.settingsText}>{item.title}</Text>
        </TouchableOpacity>
    ), []);

    // Memoized render functions for lists
    const renderHistoryCard = useCallback(({ item }) => (
        <View style={styles.historyCard}>
            <FontAwesome name="history" size={20} color="#3C5B6F" />
            <View style={styles.historyTextContainer}>
                <Text style={styles.historyAction}>{item.action}</Text>
                <Text style={styles.historyDate}>{item.date}</Text>
            </View>
        </View>
    ), []);

    const renderNotificationCard = useCallback(({ item }) => (
        <View style={styles.notificationCard}>
            <Feather name="bell" size={20} color="#3C5B6F" />
            <View style={styles.notificationTextContainer}>
                <Text style={styles.notificationMessage}>{item.message}</Text>
                <Text style={styles.notificationDate}>{item.date}</Text>
            </View>
        </View>
    ), []);

    const renderFriendCard = useCallback(({ item }) => {
        const truncatedName = item.name.length > 10 ? `${item.name.substring(0, 10)}...` : item.name;
        return (
            <View style={styles.friendCard}>
                <Image source={item.avatar} style={styles.friendAvatar} />
                <Text style={styles.friendName}>{truncatedName}</Text>
            </View>
        );
    }, []);

    return (
        <View style={styles.container}>
            {/* Back Button and Settings Icon */}
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    <Text style={styles.titleHeader}>Profil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsIcon} onPress={toggleSettings}>
                    <AntDesign name="menuunfold" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            {/* Panneau des paramètres */}
            <SettingsPanel
                settingsOptions={settingsOptions}
                toggleSettings={toggleSettings}
                slideAnim={slideAnim}
                screenWidth={screenWidth}
                user={user}
            />

            {/* Toast */}
            <Toast
                message="Profile updated successfully!"
                visible={toastVisible}
                onHide={() => setToastVisible(false)}
            />

            {/* Utilisation de FlatList pour tout le contenu */}
            <FlatList
                data={[]} // Pas de données car nous utilisons ListHeaderComponent et ListFooterComponent
                keyExtractor={() => 'header'} // Clé unique pour le header
                ListHeaderComponent={
                    <>
                        {/* Cover Image */}
                        <ImageBackground source={require('../../assets/banner2.jpg')} style={styles.coverImage} blurRadius={1}>
                            <View style={styles.coverOverlay}>
                                <Text style={styles.coverText}>Welcome Back, {user.name}!</Text>
                            </View>
                        </ImageBackground>

                        {/* Profile Header */}
                        <View style={styles.profileHeader}>
                            <View style={styles.profileImageContainer}>
                                <Image source={user.profilePicture} style={styles.profileImage} />
                                <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
                                    <FontAwesome name="camera" size={14} color="#FFFFFF" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.profileInfo}>
                                <Text style={styles.profileName}>{user.name}</Text>
                                <Text style={styles.profileEmail}>{user.email}</Text>
                                <View style={styles.locationContainer}>
                                    <Ionicons name="location-sharp" size={16} color="#2F3645" />
                                    <Text style={styles.locationText}>{user.location}</Text>
                                </View>
                                {/* Bouton Edit Profile */}
                                <TouchableOpacity
                                    style={styles.editProfileButton}
                                    onPress={() => navigation.navigate('EditProfile', { user, onSave: handleSave })}
                                >
                                    <FontAwesome name="edit" size={14} color="white" />
                                    <Text style={[styles.editProfileButtonText, { marginLeft: 8 }]}>Edit Profil</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* About Me Section */}
                        <View style={styles.aboutMeContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>About Me</Text>
                                <TouchableOpacity onPress={() => setIsEditingAboutMe((prev) => !prev)}>
                                    <Feather name={isEditingAboutMe ? "check" : "edit"} size={20} color="#3C5B6F" />
                                </TouchableOpacity>
                            </View>
                            {isEditingAboutMe ? (
                                <TextInput
                                    style={styles.aboutMeText}
                                    multiline
                                    value={user.aboutMe}
                                    onChangeText={(text) => setUser((prevUser) => ({ ...prevUser, aboutMe: text }))}
                                    placeholder="Tell us about yourself..."
                                    autoFocus={true}
                                />
                            ) : (
                                <Text style={styles.aboutMeTextReadOnly}>{user.aboutMe}</Text>
                            )}
                        </View>

                        {/* Social Media Links */}
                        <View style={styles.socialMediaContainer}>
                            <Text style={styles.sectionTitle}>Social Media</Text>
                            <View style={styles.socialMediaIcons}>
                                <TouchableOpacity
                                    style={styles.socialMediaIcon}
                                    onPress={() => handleSocialMediaPress(user.socialMedia.facebook)}
                                >
                                    <FontAwesome name="facebook" size={26} color="#3b5998" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.socialMediaIcon}
                                    onPress={() => handleSocialMediaPress(user.socialMedia.twitter)}
                                >
                                    <FontAwesome name="twitter" size={26} color="#1DA1F2" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.socialMediaIcon}
                                    onPress={() => handleSocialMediaPress(user.socialMedia.instagram)}
                                >
                                    <FontAwesome name="instagram" size={26} color="#E1306C" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.socialMediaIcon}
                                    onPress={() => handleSocialMediaPress(user.socialMedia.linkedin)}
                                >
                                    <FontAwesome name="linkedin" size={26} color="#0077B5" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Stats Carousel */}
                        <StatCarousel stats={stats} />

                        {/* Chart */}
                        <View style={styles.chartContainer}>
                            <Text style={styles.sectionTitle}>Waste Reduction Progress</Text>
                            <View style={styles.chartWrapper}>
                                <LineChart
                                    data={lineData}
                                    width={screenWidth - 40}
                                    height={220}
                                    spacing={53}
                                    initialSpacing={1}
                                    textColor1="#4CAF50"
                                    textFontSize={12}
                                    thickness={3}
                                    hideRules
                                    hideYAxisText
                                    textShiftY={8}
                                    textShiftX={10}
                                    yAxisColor="#CBD5E0"
                                    showVerticalLines
                                    verticalLinesColor="rgba(76,81,191,0.2)"
                                    xAxisColor="#CBD5E0"
                                    color="#FFB996"
                                    isAnimated
                                    curved
                                    yAxisLabelWidth={0}
                                    xAxisLabelTextStyle={{ color: '#4CAF50', fontSize: 12 }}
                                    yAxisTextStyle={{ color: '#4CAF50', fontSize: 12 }}
                                    dataPointsColor='#2F3645'
                                />
                            </View>
                        </View>

                        {/* Achievements Carousel */}
                        <AchievementsCarousel achievements={user.achievements} />
                    </>
                }
                ListFooterComponent={
                    <>
                        <View style={styles.friendsContainer}>
                            <Text style={styles.sectionTitle}>Friends</Text>
                            <FlatList
                                data={user.friends} // Utilisez les données des amis de l'utilisateur
                                keyExtractor={(item) => item.id.toString()} // Assurez-vous que la clé est une chaîne
                                renderItem={renderFriendCard} // Utilisez la fonction renderFriendCard
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.friendsList}
                            />
                        </View>
                        {/* Preferences */}
                        <View style={styles.preferencesContainer}>
                            <Text style={styles.sectionTitle}>Preferences</Text>
                            <View style={styles.preferencesList}>
                                <View style={styles.preferenceItem}>
                                    <Text style={styles.preferenceLabel}>Dietary Preference:</Text>
                                    <Text style={styles.preferenceValue}>{user.preferences.dietary}</Text>
                                </View>
                                <View style={styles.preferenceItem}>
                                    <Text style={styles.preferenceLabel}>Notifications:</Text>
                                    <Text style={styles.preferenceValue}>{user.preferences.notifications ? 'Enabled' : 'Disabled'}</Text>
                                </View>
                                <View style={styles.preferenceItem}>
                                    <Text style={styles.preferenceLabel}>Theme:</Text>
                                    <Text style={styles.preferenceValue}>{user.preferences.theme}</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.updateButton}
                            onPress={() => {
                                // Logique pour mettre à jour le profil
                                setToastVisible(true); // Afficher le Toast
                            }}
                        >
                            <Text style={styles.updateButtonText}>Update Your Profile</Text>
                        </TouchableOpacity>
                    </>
                }
                renderItem={() => null} // Pas d'éléments à afficher
            />
        </View>
    );
};

export default React.memo(ProfileScreen);