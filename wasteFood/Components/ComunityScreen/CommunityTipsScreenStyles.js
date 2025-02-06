import { StyleSheet } from 'react-native';

const COLORS = {
    primary: '#4CAF50',
    background: '#F5F5F5',
    text: '#333333',
    accent: '#FF5252',
    card: '#FFFFFF',
    secondaryText: '#888888',
    liked: '#FF6B6B',
    saved: '#4CAF50',
    searchBackground: '#EDEDED',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 15,
        paddingTop: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.searchBackground,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginRight: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: COLORS.text,
        paddingVertical: 10,
    },
    pickerContainer: {
        width: 120,
    },
    dropdown: {
        backgroundColor: COLORS.card,
        borderColor: COLORS.searchBackground,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#666'
    },
    dropdownContainer: {
        backgroundColor: COLORS.card,
        borderColor: COLORS.searchBackground,
        borderRadius: 10,
        borderWidth: 0,
        marginTop: 5,
    },
    dropdownText: {
        fontSize: 14,
        color: COLORS.text,
    },
    dropdownArrow: {
        tintColor: COLORS.secondaryText,
    },
    dropdownTick: {
        tintColor: COLORS.primary,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: COLORS.card,
        borderRadius: 10,
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#666'
    },
    ImageContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderColor: '#16404D',
        marginRight: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    statusInput: {
        flex: 1,
        fontSize: 14,
        color: COLORS.text,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    postButton: {
        backgroundColor: '#7E1891',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    postButtonText: {
        color: '#fefefe',
        fontWeight: 'bold',
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: COLORS.card,
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#7E1891',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    headerText: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    time: {
        fontSize: 12,
        color: COLORS.secondaryText,
    },
    description: {
        fontSize: 14,
        color: COLORS.text,
        lineHeight: 20,
        marginBottom: 15,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        fontSize: 14,
        color: COLORS.text,
        marginLeft: 5,
    },
    commentSection: {
        marginTop: 10,
    },
    commentBubble: {
        backgroundColor: COLORS.background,
        borderRadius: 10,
        padding: 10,
        marginBottom: 5,
        alignSelf: 'flex-start',
        maxWidth: '80%',
    },
    commentText: {
        fontSize: 12,
        color: COLORS.text,
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EDEDED',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 5,
    },
    commentInput: {
        flex: 1,
        fontSize: 12,
        color: COLORS.text,
        paddingVertical: 5,
        paddingHorizontal: 7,
    },
    commentButton: {
        marginLeft: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: COLORS.secondaryText,
    },
    emptyText: {
        textAlign: 'center',
        color: COLORS.secondaryText,
        fontSize: 14,
        marginTop: 30,
    },
});

export default styles;