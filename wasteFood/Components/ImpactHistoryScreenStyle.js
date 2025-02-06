import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 15,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2B2730",
    },
    menuButton: {
        padding: 5,
    },
    filterContainer: {
        marginBottom: 20,
    },
    dropdown: {
        backgroundColor: "#eeeeee",
        borderWidth: 0,
        borderRadius: 5,
    },
    dropdownContainer: {
        backgroundColor: "#eeeeee",
        borderWidth: 0,
        borderRadius: 5,
    },
    dropdownText: {
        fontSize: 14,
        color: "#2B2730",
    },
    dropdownPlaceholder: {
        color: "#666666",
    },
    arrowIcon: {
        tintColor: "#2B2730",
    },
    impactMessage: {
        backgroundColor: "#677D6A",
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
    },
    impactMessageText: {
        fontSize: 14,
        color: "#eeeeee",
        textAlign: "center",
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        backgroundColor: "#eeeeee",
        padding: 15,
        borderRadius: 5,
    },
    statItem: {
        alignItems: "center",
    },
    statValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2B2730",
        marginTop: 5,
    },
    statLabel: {
        fontSize: 14,
        color: "#666666",
    },
    chartContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    chartLabel: {
        fontSize: 14,
        color: "#2B2730",
        marginTop: 10,
        textAlign: "center",
        marginBottom: 10,
    },
    centerLabel: {
        alignItems: "center",
        justifyContent: "center",
    },
    centerLabelText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2B2730",
    },
    centerLabelSubText: {
        fontSize: 12,
        color: "#666666",
    },
    legendContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 7,
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
    },
    legendColor: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 5,
    },
    legendText: {
        fontSize: 12,
        color: "#2B2730",
    },
    chartLabelLine: {
        fontSize: 16,
        color: "#2B2730",
        marginTop: 10,
        textAlign: "center",
        marginTop: 15,
        fontFamily: "Roboto_400Regular",
    },
    exportButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#677D6A",
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    exportButtonText: {
        fontSize: 16,
        color: "#ffffff",
        marginLeft: 10,
    },
    learnMoreButton: {
        backgroundColor: "#3E5879",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: "center",
    },
    learnMoreText: {
        fontSize: 16,
        color: "#ffffff",
    },
    feedbackContainer: {
        marginBottom: 20,
        marginVertical: 20,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2B2730",
        marginBottom: 10,
    },
    contributionItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    contributionText: {
        fontSize: 14,
        color: "#666666",
        marginLeft: 10,
    },
});