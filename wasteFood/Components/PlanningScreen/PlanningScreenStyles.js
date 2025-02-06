import { StyleSheet } from 'react-native';

const COLORS = {
    primary: '#FF6F61',
    secondary: '#6A549E',
    background: '#F7F8FA',
    card: 'rgba(255, 255, 255, 0.9)',
    text: '#2C2C2C',
    accent: '#FF5252',
    border: '#E5E5E5',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    listContainer: {
        paddingBottom: 100, // Add padding to avoid overlap with floating buttons
    },
    card: {
        backgroundColor: COLORS.card,
        borderRadius: 10,
        marginBottom: 16,
        overflow: 'hidden',

    },
    cardImage: {
        width: '100%',
        height: 150,
        resizeMode: "cover",
    },
    cardContent: {
        padding: 16,
    },
    dayText: {
        fontSize: 20,
        fontFamily: 'Montserrat-SemiBold',
        color: COLORS.text,
    },
    mealText: {
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
        color: COLORS.text,
        marginTop: 8,
    },
    ingredientsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    ingredientBadge: {
        backgroundColor: COLORS.background,
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 8,
        marginBottom: 8,
    },
    ingredientText: {
        fontSize: 12,
        fontFamily: 'Montserrat-Regular',
        color: COLORS.text,
    },
    editButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        padding: 8,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: COLORS.card,
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 22,
        fontFamily: 'Montserrat-SemiBold',
        color: COLORS.text,
        marginBottom: 16,
    },
    input: {
        backgroundColor: COLORS.background,
        borderRadius: 5,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
        color: COLORS.text,
    },
    saveButton: {
        backgroundColor: '#9F8383',
        paddingVertical: 14,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
    },
    cancelButton: {
        backgroundColor: '#574964',
        paddingVertical: 14,
        borderRadius: 5,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
    },
    floatingButtonsContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16, // Space between buttons
    },
    floatingButton: {
        backgroundColor: '#3B6790',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default styles;