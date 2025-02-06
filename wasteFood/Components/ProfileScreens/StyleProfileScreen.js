import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20, // Ajustez cette valeur pour éviter la superposition avec d'autres éléments
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Ajoutez un fond semi-transparent pour une meilleure visibilité
        position: 'absolute', // Position absolue pour le placer au-dessus de l'image de couverture
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2, // Assurez-vous que le header est au-dessus des autres éléments
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginLeft: 10, // Ajustez la marge pour un meilleur espacement
    },
    settingsIcon: {
        padding: 10, // Ajoutez un espace autour de l'icône pour un meilleur toucher
    },
    coverImage: {
        width: '100%',
        height: 280,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
    },
    coverOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    coverText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        zIndex: 1,
        marginTop: 170, // Ajustez cette valeur pour positionner le texte correctement
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
    },
    settingsList: {
        paddingVertical: 10,
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    settingsText: {
        fontSize: 16,
        color: '#3C5B6F',
        marginLeft: 10,
    },
    closeButton: {
        marginTop: 20,
        alignSelf: 'center',
    },
    closeButtonText: {
        fontSize: 16,
        color: '#3C5B6F',
        fontWeight: 'bold',
    },
    backButtonContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 5,
        padding: 10,
        borderColor: '#FFFFFF',
        borderWidth: 1,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginLeft: 20,
    },
    coverImage: {
        width: '100%',
        height: 280,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
    },
    coverOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    coverText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        zIndex: 1,
        marginTop: 170,
    },
    profileHeader: {
        backgroundColor: '#fefefe',
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -50,
    },
    profileImageContainer: {
        position: 'relative',
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#eeee',
        marginRight: 15,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#666',
        borderRadius: 15,
        padding: 5,
    },
    profileInfo: {
        flex: 1,
        alignItems: 'flex-end',
        right: 10,
    },
    profileName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2F3645',
    },
    profileEmail: {
        fontSize: 14,
        color: '#2F3645',
        marginTop: 4,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    locationText: {
        fontSize: 14,
        color: '#2F3645',
        marginLeft: 5,
    },
    aboutMeContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 19,
        fontWeight: '600',
        color: '#333',
        marginVertical: 10,
        marginBottom: 10,
    },
    aboutMeText: {
        fontSize: 16,
        color: '#333',
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 4,
        borderColor: '#eee',
    },
    aboutMeTextReadOnly: {
        fontSize: 16,
        color: '#333',
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#eee',
    },
    socialMediaContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    socialMediaIcons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    socialMediaIcon: {
        width: 60,
        height: 60,
        borderRadius: 25,
        backgroundColor: '#fefefe',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        paddingHorizontal: 5,
    },
    statCard: {
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#eeeeee',
        borderRadius: 4,
        width: '30%',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    statIconContainer: {
        backgroundColor: '#4CAF50',
        width: 45,
        height: 45,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statTitle: {
        fontSize: 14,
        color: '#555',
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 8,
    },
    statValue: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginTop: 4,
    },
    chartContainer: {
        marginHorizontal: 20,
    },
    chartWrapper: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
    },
    achievementsContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    achievementCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 4,
        marginBottom: 10,
    },
    achievementText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
    historyContainer: {
        marginHorizontal: 20,
    },
    historyCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 4,
        marginBottom: 10,
    },
    historyTextContainer: {
        marginLeft: 10,
        flex: 1,
    },
    historyAction: {
        fontSize: 16,
        color: '#333',
    },
    historyDate: {
        fontSize: 14,
        color: '#777',
        marginTop: 4,
    },
    notificationsContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    notificationCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 4,
        marginBottom: 10,
    },
    notificationTextContainer: {
        marginLeft: 10,
        flex: 1,
    },
    notificationMessage: {
        fontSize: 16,
        color: '#333',
    },
    notificationDate: {
        fontSize: 14,
        color: '#777',
        marginTop: 4,
    },
    friendsContainer: {

        marginTop: 10,

        paddingHorizontal: 10,
    },

    sectionTitleFriends: {
        fontSize: 19,
        fontWeight: '600',
        color: '#333',
        marginVertical: 10,
        marginLeft: 20,

    },
    friendCard: {
        alignItems: 'center',
        marginRight: 15,
        padding: 5,
        marginHorizontal: 5,

    },
    friendAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    friendName: {
        fontSize: 14,
        color: '#333',
        marginTop: 5,
    },
    preferencesContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    preferenceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 4,
        marginBottom: 10,
    },
    preferenceLabel: {
        fontSize: 16,
        color: '#333',
    },
    preferenceValue: {
        fontSize: 16,
        color: '#777',
    },


    editProfileButton: {
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 14,
        backgroundColor: '#666',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    editProfileButtonText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 8,
    },

    updateButton: {
        marginHorizontal: 20,
        marginVertical: 20,
        backgroundColor: '#3C5B6F',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    updateButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});