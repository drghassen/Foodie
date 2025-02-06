import { StyleSheet } from 'react-native';

const COLORS = {
    primary: '#FF6F61',
    secondary: '#6A549E',
    background: '#F7F8FA',
    card: '#FFFFFF',
    text: '#2C2C2C',
    accent: '#FF5252',
    border: '#E5E5E5',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 16,
    },
    searchBar: {
        flex: 1,
        backgroundColor: COLORS.card,
        borderRadius: 5,
        borderColor: COLORS.border,
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: COLORS.text,
        marginRight: 10,
    },
    searchButton: {
        backgroundColor: COLORS.primary,
        padding: 11,
        borderRadius: 5,
    },
    recipeList: {
        paddingBottom: 20,
    },
    recipeCard: {
        backgroundColor: COLORS.card,
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',

    },
    recipeImage: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
    },
    recipeContent: {
        padding: 16,
    },
    recipeTitle: {
        fontSize: 20,
        fontFamily: 'SemiBold',
        color: COLORS.text,
        marginBottom: 8,
    },
    recipeDescription: {
        fontSize: 14,
        fontFamily: 'SemiBold',
        color: '#666',
        marginBottom: 10,
    },
    ingredientsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 12,
    },
    ingredientBadge: {
        backgroundColor: COLORS.background,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginRight: 8,
        marginBottom: 8,
    },
    ingredientText: {
        fontSize: 12,
        color: COLORS.text,
    },
    recipeDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        marginLeft: 5,
        fontSize: 14,
        color: COLORS.text,
    },
    favoriteButton: {
        padding: 8,
    },
    categoryContainer: {
        paddingVertical: 10,
        paddingHorizontal: 16,

    },
    categoryButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        backgroundColor: COLORS.background,
        marginRight: 10,

        borderWidth: 1,
        borderColor: COLORS.border,
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    selectedCategoryButton: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,

    },
    categoryText: {
        fontSize: 14,
        color: COLORS.text,
        fontWeight: '600', // Plus gras pour une meilleure lisibilité
    },
    selectedCategoryText: {
        color: COLORS.background,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    emptyText: {
        fontSize: 16,
        color: COLORS.text,
        textAlign: 'center',
    },
});

export { COLORS, styles };