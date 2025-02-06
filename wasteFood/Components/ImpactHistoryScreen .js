import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Share, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PieChart, LineChart } from "react-native-gifted-charts";
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from "react-native-reanimated";
import DropDownPicker from "react-native-dropdown-picker";
import { styles } from "./ImpactHistoryScreenStyle";

const AnimatedStat = ({ value }) => {
    const animatedValue = useSharedValue(0);

    React.useEffect(() => {
        animatedValue.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.ease) });
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: animatedValue.value,
        transform: [{ scale: animatedValue.value }],
    }));

    return (
        <Animated.Text style={[styles.statValue, animatedStyle]}>
            {value}
        </Animated.Text>
    );
};

const ImpactHistoryScreen = () => {
    const [selectedPeriod, setSelectedPeriod] = useState("month");
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: "This Month", value: "month" },
        { label: "This Year", value: "year" },
        { label: "All Time", value: "all" },
    ]);

    // Dynamic data based on selected period
    const [data, setData] = useState({
        foodSaved: "120 kg",
        mealsProvided: "400 meals",
        co2Reduction: "300 kg",
        progress: 0.75,
    });

    const [chartData, setChartData] = useState([
        { value: 30, color: "#FF8383", label: "Food Saved" },
        { value: 40, color: "#3E5879", label: "Meals Provided" },
        { value: 30, color: "#118B50", label: "CO2 Reduced" },
    ]);

    const [contributionData, setContributionData] = useState([
        { value: 10, label: "Jan" },
        { value: 20, label: "Feb" },
        { value: 30, label: "Mar" },
        { value: 40, label: "Apr" },
        { value: 50, label: "May" },
    ]);

    // Update data based on selected period
    const getDataForPeriod = (period) => {
        switch (period) {
            case "month":
                return {
                    data: {
                        foodSaved: "120 kg",
                        mealsProvided: "400 meals",
                        co2Reduction: "300 kg",
                        progress: 0.75,
                    },
                    chartData: [
                        { value: 30, color: "#FF8383", label: "Food Saved" },
                        { value: 40, color: "#3E5879", label: "Meals Provided" },
                        { value: 30, color: "#118B50", label: "CO2 Reduced" },
                    ],
                    contributionData: [
                        { value: 10, label: "Jan" },
                        { value: 20, label: "Feb" },
                        { value: 30, label: "Mar" },
                        { value: 40, label: "Apr" },
                        { value: 50, label: "May" },
                    ],
                };
            case "year":
                return {
                    data: {
                        foodSaved: "1500 kg",
                        mealsProvided: "5000 meals",
                        co2Reduction: "4000 kg",
                        progress: 0.9,
                    },
                    chartData: [
                        { value: 40, color: "#FF8383", label: "Food Saved" },
                        { value: 35, color: "#3E5879", label: "Meals Provided" },
                        { value: 25, color: "#118B50", label: "CO2 Reduced" },
                    ],
                    contributionData: [
                        { value: 100, label: "Jan" },
                        { value: 200, label: "Feb" },
                        { value: 300, label: "Mar" },
                        { value: 400, label: "Apr" },
                        { value: 500, label: "May" },
                    ],
                };
            case "all":
                return {
                    data: {
                        foodSaved: "5000 kg",
                        mealsProvided: "20000 meals",
                        co2Reduction: "15000 kg",
                        progress: 1.0,
                    },
                    chartData: [
                        { value: 50, color: "#FF8383", label: "Food Saved" },
                        { value: 30, color: "#3E5879", label: "Meals Provided" },
                        { value: 20, color: "#118B50", label: "CO2 Reduced" },
                    ],
                    contributionData: [
                        { value: 1000, label: "Jan" },
                        { value: 2000, label: "Feb" },
                        { value: 3000, label: "Mar" },
                        { value: 4000, label: "Apr" },
                        { value: 5000, label: "May" },
                    ],
                };
            default:
                return {
                    data: {},
                    chartData: [],
                    contributionData: [],
                };
        }
    };

    // useEffect to update state based on selected period
    useEffect(() => {
        const { data, chartData, contributionData } = getDataForPeriod(selectedPeriod);
        setData(data);
        setChartData(chartData);
        setContributionData(contributionData);
    }, [selectedPeriod]);

    // Share results
    const shareResults = () => {
        Share.share({
            message: `Check out my impact: ${data.foodSaved} of food saved and ${data.mealsProvided} meals provided!`,
        });
    };

    // Open "Learn More" link
    const openLearnMore = () => {
        Linking.openURL("https://example.com/impact");
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Impact History</Text>
                    <TouchableOpacity style={styles.menuButton}>
                        <Ionicons name="ellipsis-vertical" size={24} color="#2B2730" />
                    </TouchableOpacity>
                </View>

                {/* Period Filter */}
                <View style={styles.filterContainer}>
                    <DropDownPicker
                        open={open}
                        value={selectedPeriod}
                        items={items}
                        setOpen={setOpen}
                        setValue={setSelectedPeriod}
                        setItems={setItems}
                        style={styles.dropdown}
                        dropDownContainerStyle={styles.dropdownContainer}
                        textStyle={styles.dropdownText}
                        placeholder="Select Period"
                        placeholderStyle={styles.dropdownPlaceholder}
                        arrowIconStyle={styles.arrowIcon}
                    />
                </View>

                {/* Impact Message */}
                <View style={styles.impactMessage}>
                    <Text style={styles.impactMessageText}>
                        Thank you for your commitment! Thanks to you, {data.foodSaved} of food have been saved and {data.mealsProvided} have been provided to those in need.
                    </Text>
                </View>

                {/* Statistics Section */}
                <View style={styles.statsContainer}>
                    <StatItem icon="leaf-outline" value={data.foodSaved} label="Food Saved" />
                    <StatItem icon="restaurant-outline" value={data.mealsProvided} label="Meals Provided" />
                    <StatItem icon="earth-outline" value={data.co2Reduction} label="CO2 Reduced" />
                </View>

                {/* Pie Chart Section */}
                <View style={styles.chartContainer}>
                    <PieChart
                        data={chartData}
                        radius={100}
                        innerRadius={60}
                        outerRadius={110}
                        showText
                        textSize={14}
                        textColor="#000"
                        focusOnPress
                        showValuesAsLabels
                        showGradient
                        sectionAutoFocus
                        centerLabelComponent={() => (
                            <View style={styles.centerLabel}>
                                <Text style={styles.centerLabelText}>{data.progress * 100}%</Text>
                                <Text style={styles.centerLabelSubText}>Goal</Text>
                            </View>
                        )}
                    />
                    <Legend data={chartData} />
                    <Text style={styles.chartLabel}>
                        You have reached {data.progress * 100}% of your goal this {selectedPeriod}!
                    </Text>
                </View>

                {/* Line Chart Section */}
                <View style={styles.chartContainer}>
                    <LineChart
                        data={contributionData}
                        width={300}
                        height={180}
                        color="#9575DE"
                        curved
                        thickness={2}
                        hideYAxisText
                        yAxisColor="#CBD5E0"
                        showHorizontalLines
                        horizontalLinesColor="rgba(76,81,191,0.2)"
                        spacing={55}
                        initialSpacing={15}
                        isAnimated
                        yAxisLabelWidth={20}
                        xAxisLabelTextStyle={{ color: '#4CAF50', fontSize: 12 }}
                        yAxisTextStyle={{ color: '#4CAF50', fontSize: 12 }}
                        dataPointsColor='#2F3645'
                    />
                    <Text style={styles.chartLabelLine}>Contributions Over Time</Text>
                </View>

                {/* Share Button */}
                <TouchableOpacity style={styles.exportButton} onPress={shareResults}>
                    <Ionicons name="share-social-outline" size={20} color="#ffffff" />
                    <Text style={styles.exportButtonText}>Share Results</Text>
                </TouchableOpacity>

                {/* Learn More Button */}
                <TouchableOpacity style={styles.learnMoreButton} onPress={openLearnMore}>
                    <Text style={styles.learnMoreText}>Learn More About Your Impact</Text>
                </TouchableOpacity>

                {/* Contributions List */}
                <View style={styles.feedbackContainer}>
                    <Text style={styles.listTitle}>Your Contributions This {selectedPeriod}</Text>
                    <ContributionItem text="5 kg of fruits and vegetables donated" />
                    <ContributionItem text="3 kg of dairy products donated" />
                    <ContributionItem text="10 kg of bread and pastries donated" />
                </View>
            </ScrollView>
        </View>
    );
};

// Reusable Stat Item Component
const StatItem = ({ icon, value, label }) => (
    <View style={styles.statItem}>
        <Ionicons name={icon} size={24} color="#9575DE" />
        <AnimatedStat value={value} />
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

// Reusable Legend Component
const Legend = ({ data }) => (
    <View style={styles.legendContainer}>
        {data.map((item, index) => (
            <View key={index} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                <Text style={styles.legendText}>{item.label}</Text>
            </View>
        ))}
    </View>
);

// Reusable Contribution Item Component
const ContributionItem = ({ text }) => (
    <View style={styles.contributionItem}>
        <Ionicons name="checkmark-circle" size={20} color="#9575DE" />
        <Text style={styles.contributionText}>{text}</Text>
    </View>
);



export default ImpactHistoryScreen;