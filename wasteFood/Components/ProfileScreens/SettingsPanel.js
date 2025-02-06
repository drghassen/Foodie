import React, { useCallback } from 'react';
import { View, SectionList, TouchableOpacity, Text, Animated, StyleSheet, Image } from 'react-native';
import { MaterialIcons, Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { settingsOptions } from '../../const/constProfileScreen';

const SettingsPanel = ({ toggleSettings, slideAnim, screenWidth, user = initialUserData }) => {
    // Regrouper les options par section
    const groupedOptions = settingsOptions.reduce((acc, option) => {
        if (!acc[option.section]) {
            acc[option.section] = [];
        }
        acc[option.section].push(option);
        return acc;
    }, {});

    // Convertir en format adapté à SectionList
    const sections = Object.keys(groupedOptions).map((section) => ({
        title: section,
        data: groupedOptions[section],
    }));

    // Render function for settings list
    const renderItem = useCallback(({ item }) => (
        <Animatable.View animation="fadeInRight" duration={500}>
            <TouchableOpacity style={styles.settingsItem} onPress={() => console.log(item.title)}>
                {/* Map icons to their correct libraries */}
                {item.icon === 'message-circle' ? (
                    <Feather name="message-circle" size={24} color="#3C5B6F" />
                ) : item.icon === 'notifications-outline' ? (
                    <Ionicons name="notifications-outline" size={24} color="#3C5B6F" /> // Correct Ionicons usage
                ) : item.icon === 'file-text' ? (
                    <Feather name="file-text" size={24} color="#3C5B6F" />
                ) : (
                    <MaterialIcons name={item.icon} size={24} color="#3C5B6F" />
                )}
                <View style={styles.settingsTextContainer}>
                    <Text style={styles.settingsText}>{item.title}</Text>
                    <Text style={styles.settingsDescription}>{item.description}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.separator} />
        </Animatable.View>
    ), []);

    // Render function for section headers
    const renderSectionHeader = useCallback(({ section }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
        </View>
    ), []);

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

    return (
        <Animated.View style={[styles.settingsPanel, settingsPanelStyle]}>
            {/* Icône de fermeture en haut à droite */}
            <TouchableOpacity style={styles.closeIcon} onPress={toggleSettings}>
                <AntDesign name="arrowright" size={24} color="#3C5B6F" />
            </TouchableOpacity>

            {/* Informations de l'utilisateur */}
            <LinearGradient colors={['#FFFFFF', '#F5F5F5']} style={styles.userInfoContainer}>
                <Image source={user.profilePicture} style={styles.userAvatar} />
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
            </LinearGradient>

            {/* Liste des paramètres */}
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                contentContainerStyle={styles.settingsList}
                showsVerticalScrollIndicator={false} // Active la barre de défilement
                ListFooterComponent={
                    <>
                        <TouchableOpacity style={styles.inviteButton} onPress={() => console.log('Invite Your Friends')}>
                            <MaterialIcons name="person-add" size={24} color="#3C5B6F" />
                            <Text style={styles.inviteButtonText}>Invite Your Friends</Text>
                        </TouchableOpacity>
                        <View style={styles.footerContainer}>
                            {/* Invite Your Friends */}


                            {/* App Version et User ID */}
                            <View style={styles.appInfoContainer}>
                                <Text style={styles.appInfoText}>App Version: 1.0.0</Text>
                                <Text style={styles.appInfoText}>User ID: {user.id}</Text>
                            </View>


                        </View>
                    </>

                }
            />

            {/* Dégradé en bas de la liste */}
            <LinearGradient
                colors={['transparent', 'rgba(255, 255, 255, 0.8)', '#FFFFFF']}
                style={styles.scrollIndicator}
            />
        </Animated.View>
    );
};

export default React.memo(SettingsPanel);

const styles = StyleSheet.create({
    settingsPanel: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '80%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        padding: 20,
        zIndex: 3,
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
    },
    closeIcon: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 4,
    },
    userInfoContainer: {
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 15, // Pour éviter que l'icône de fermeture ne chevauche
        padding: 10,
        borderRadius: 10,
    },
    userAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3C5B6F',
    },
    userEmail: {
        fontSize: 14,
        color: '#888',
    },
    settingsList: {
        paddingVertical: 10,
    },
    sectionHeader: {
        backgroundColor: '#F5F5F5',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 10,
        borderRadius: 10,
    },
    sectionHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3C5B6F',
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    settingsTextContainer: {
        marginLeft: 10,
    },
    settingsText: {
        fontSize: 16,
        color: '#3C5B6F',
        fontWeight: '500',
    },
    settingsDescription: {
        fontSize: 12,
        color: '#888',
    },
    separator: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 5,
    },
    footerContainer: {
        marginTop: 20,
        paddingHorizontal: 15,
    },
    inviteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    inviteButtonText: {
        fontSize: 16,
        color: '#3C5B6F',
        fontWeight: '500',
        marginLeft: 10,
    },
    appInfoContainer: {
        marginTop: 10,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    appInfoText: {
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
    },
    scrollIndicator: {
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        zIndex: 2,
    },
    scrollHint: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    scrollHintText: {
        fontSize: 14,
        color: '#3C5B6F',
        marginTop: 5,
    },
});