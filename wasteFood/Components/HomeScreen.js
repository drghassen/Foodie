import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    FlatList,
    Modal,
    TouchableOpacity,
    Image,
    Animated,
    Easing,
    Text,
    StatusBar,
} from 'react-native';
import Header from './Header';
import ChallengeCard from './ChallengeCard';
import MonthlyImpact from './MonthlyImpact';
import ActionIcons from './ActionIcons';
import ConsumeSoonSection from './ConsumeSoon/ConsumeSoonSection';
import Chatbot from './ChatBoot/Chatbot';
import consumeData from './ConsumeSoon/consumeData';
import styles from './HomeStyle';


const HomeScreen = ({ navigation }) => {
    const [isChallengeAccepted, setIsChallengeAccepted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isChatbotVisible, setIsChatbotVisible] = useState(false);
    const [hasNewMessage, setHasNewMessage] = useState(true);

    const bounceValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(1)).current;
    const modalOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const bounceAndPulse = Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(bounceValue, {
                        toValue: 1,
                        duration: 800,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleValue, {
                        toValue: 1.1,
                        duration: 800,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(bounceValue, {
                        toValue: 0,
                        duration: 800,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleValue, {
                        toValue: 1,
                        duration: 800,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ]),
                Animated.delay(1500),
            ])
        );

        bounceAndPulse.start();

        return () => bounceAndPulse.stop();
    }, []);

    const handleAcceptChallenge = () => {
        setIsChallengeAccepted(true);
        setProgress(0.2);
    };

    const handleConsumeCardPress = (item) => {
        navigation.navigate('ConsumeDetail', { item });
    };

    const handleChatbotPress = () => {
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 1.2,
                duration: 200,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 200,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start(() => {
            Animated.timing(modalOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setIsChatbotVisible(true));
            setHasNewMessage(false); // Hide the badge when the chatbot is opened
        });
    };

    const closeChatbot = () => {
        Animated.timing(modalOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setIsChatbotVisible(false));
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <FlatList
                data={[1]}
                renderItem={() => (
                    <ChallengeCard
                        isChallengeAccepted={isChallengeAccepted}
                        progress={progress}
                        onAcceptChallenge={handleAcceptChallenge}
                    />
                )}
                keyExtractor={(item) => item.toString()}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<Header onProfilePress={() => navigation.navigate('Profile')} />}
                ListFooterComponent={
                    <>
                        <MonthlyImpact />
                        <View style={styles.secondSection}>
                            <ActionIcons navigation={navigation} />
                            <ConsumeSoonSection
                                consumeData={consumeData}
                                onConsumeCardPress={handleConsumeCardPress}
                            />

                        </View>
                    </>
                }
            />

            {/* Chatbot Icon with Badge */}
            <Animated.View
                style={[
                    styles.chatbotIconContainer,
                    {
                        transform: [
                            {
                                translateY: bounceValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, -10], // Move up by 10 pixels
                                }),
                            },
                            { scale: scaleValue },
                        ],
                    },
                ]}
            >
                <TouchableOpacity onPress={handleChatbotPress}>
                    <Image
                        source={require('../assets/chat-bot.png')}
                        style={styles.chatbotIcon}
                    />
                    {/* Badge for new message */}
                    {hasNewMessage && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>1</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </Animated.View>

            {/* Animated Modal for Chatbot */}
            <Modal
                visible={isChatbotVisible}
                animationType="none"
                transparent={true}
                onRequestClose={closeChatbot}
            >
                <Animated.View
                    style={[styles.modalContainer, { opacity: modalOpacity }]}
                >
                    <Chatbot onClose={closeChatbot} />
                </Animated.View>
            </Modal>
        </View>
    );
};

export default HomeScreen;
