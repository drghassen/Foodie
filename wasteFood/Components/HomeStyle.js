import { StyleSheet } from 'react-native';

// Constants
export const COLORS = {
    primary: '#4CAF50',
    background: '#FFFFFF',
    text: '#333333',
    accent: '#FF5252',
    border: '#E0E0E0',
};

export const SIZES = {
    headerHeight: 60,
    iconSize: 27,
    profileImageSize: 36,
    badgeSize: 18,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F0F6',
    },
    challengeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    challengeStats: {
        flexDirection: 'flex-start',
        justifyContent: 'space-between',
        marginTop: 16,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,

    },
    challengeTitle: {
        fontSize: 15,
        fontFamily: 'SemiBold',
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginVertical: 5,
    },
    statText: {
        fontSize: 14,
        color: COLORS.text,
        fontFamily: 'normal',
    },
    challengeDescription: {
        fontSize: 14,
        fontFamily: 'normal',
        color: '#666',
        marginBottom: 16,
        lineHeight: 22,
    },
    challengeCard: {
        backgroundColor: COLORS.background,
        borderRadius: 8,
        padding: 20,
        marginVertical: 15,
        marginHorizontal: 10,


    },
    challengeCardAccepted: {
        backgroundColor: '#A5BFCC',
    },
    challengeButton: {
        backgroundColor: '#77B254',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        width: 150,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'SemiBold',
        textTransform: 'uppercase',
    },
    progressContainer: {
        marginTop: 16,
    },
    progressBar: {
        height: 10,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 5,
    },
    progressText: {
        marginTop: 8,
        fontSize: 14,
        color: '#fefefe',
        fontFamily: 'SemiBold',
        textAlign: 'center',
    },
    firstSection: {
        backgroundColor: '#FFF0F3',
        margin: 10,
        padding: 15,
        borderRadius: 5,

    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'SemiBold',
        color: COLORS.text,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statCard: {
        backgroundColor: COLORS.background,
        borderRadius: 5,
        padding: 10,
        width: '49%',
        alignItems: 'flex-start',
    },
    statLabel: {
        fontSize: 14,
        color: '#555',
        fontFamily: 'SemiBold',
        marginTop: 8,
    },
    statValue: {
        fontSize: 20,
        fontFamily: 'SemiBold',
        color: COLORS.text,
        marginTop: 4,
    },
    secondSection: {
        margin: 10,
        padding: 15,
        borderRadius: 5,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    iconCard: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconLabel: {
        marginTop: 8,
        fontSize: 15,
        color: COLORS.text,
        fontFamily: 'normal',
    },
    consumeSoonSection: {
        marginVertical: 20,
    },
    consumeTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        top: 20,
    },
    consumeList: {
        marginTop: 15,
        justifyContent: 'center',
    },
    consumeCard: {
        backgroundColor: COLORS.background,
        borderRadius: 4,
        padding: 12,
        top: 20,
        marginBottom: 8,
        flexDirection: 'row',
        alignContent: 'center',

    },
    cardIcon: {
        padding: 10,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'center',
    },
    itemLabel: {
        fontSize: 14,
        fontFamily: 'Extranormal',
        color: COLORS.text,
    },
    itemDate: {
        fontSize: 12,
        color: '#EE6C4D',
        fontFamily: 'semiBold',
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',


    },

    // Chatbot Icon Styles
    chatbotIconContainer: {
        position: 'absolute',
        right: 5,
        bottom: 35,
        zIndex: 1,
        borderRadius: 30,
        padding: 10,

    },

    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    chatbotIcon: {
        width: 60,
        height: 60,
    },


    badge: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#81BFDA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default styles;