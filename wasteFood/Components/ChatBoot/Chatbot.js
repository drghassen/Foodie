import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Animated,
    Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import data from './data.json';

const Chatbot = ({ onClose }) => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const fadeAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        const greeting = data.greetings[Math.floor(Math.random() * data.greetings.length)];
        setMessages([{ id: 1, text: greeting, isBot: true }]);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleSend = () => {
        if (inputText.trim() === '') return;

        const userMessage = { id: messages.length + 1, text: inputText, isBot: false };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        setIsTyping(true);
        setTimeout(() => {
            const botResponse = generateResponse(inputText);
            const botMessage = { id: messages.length + 2, text: botResponse, isBot: true };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
            setIsTyping(false);
        }, 1000);

        setInputText('');
    };

    const generateResponse = (input) => {
        const lowerInput = input.toLowerCase();
        const keywords = [
            { category: 'food waste', words: ['food waste', 'leftovers', 'compost', 'spoil'] },
            { category: 'recycling', words: ['recycle', 'recycling', 'plastic', 'paper', 'glass'] },
            { category: 'composting', words: ['compost', 'organic waste', 'garden'] },
            { category: 'energy conservation', words: ['energy', 'electricity', 'power', 'lights'] },
            { category: 'water conservation', words: ['water', 'leak', 'shower', 'rainwater'] },
        ];

        for (const { category, words } of keywords) {
            if (words.some((word) => lowerInput.includes(word))) {
                return data.responses[category][Math.floor(Math.random() * data.responses[category].length)];
            }
        }

        return data.responses['default'][Math.floor(Math.random() * data.responses['default'].length)];
    };

    const renderMessage = ({ item }) => (
        <Animated.View
            style={[
                styles.message,
                item.isBot ? styles.botMessage : styles.userMessage,
                { opacity: fadeAnim },
            ]}
        >
            <Text style={styles.messageText}>{item.text}</Text>
        </Animated.View>
    );

    return (
        <View style={styles.container}>
            {/* Header avec bouton de fermeture */}
            <View style={styles.header}>
                <Image source={require('../../assets/happy.png')} style={styles.chatbotIcon} />
                <Text style={styles.headerTitle}>Foodie{' '}
                    <Text style={styles.assistantText}>IA</Text></Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <MaterialIcons name="close" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* Messages du chatbot */}
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderMessage}
                contentContainerStyle={styles.messagesContainer}
                showsVerticalScrollIndicator={false}
            />

            {/* Indicateur de saisie */}
            {isTyping && (
                <View style={styles.typingIndicator}>
                    <View style={styles.dot} />
                    <View style={[styles.dot, styles.dotDelay1]} />
                    <View style={[styles.dot, styles.dotDelay2]} />
                </View>
            )}

            {/* Zone de saisie */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    placeholderTextColor="#999"
                    value={inputText}
                    onChangeText={setInputText}
                />
                <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                    <MaterialIcons name="send" size={24} color="#4CAF50" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBFBFB',
        margin: 25,
        borderWidth: 1,
        borderColor: '#B6CBBD',
        borderTopRightRadius: 11,
        borderTopLeftRadius: 11,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        marginVertical: 100,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#B6CBBD',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,

    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3A3960',
        left: 20,
    },
    assistantText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    closeButton: {
        position: 'absolute',
        right: 20,
        backgroundColor: '#3A3960',
        borderRadius: 5,
        padding: 3,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    messagesContainer: {
        flexGrow: 1,
        paddingHorizontal: 15,
        paddingTop: 20,
    },
    message: {
        maxWidth: '80%',
        padding: 15,
        borderRadius: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#E1F5FE',
        borderBottomLeftRadius: 5,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#C8E6C9',
        borderBottomRightRadius: 5,
    },
    messageText: {
        fontSize: 16,
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    input: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#333',
    },
    chatbotIcon: {
        width: 40,
        height: 50,
    },
    sendButton: {
        marginLeft: 10,
    },
    typingIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    dot: {
        width: 8,
        height: 8,
        marginHorizontal: 5,
        backgroundColor: '#666',
        borderRadius: 4,
        opacity: 0.3,
    },
    dotDelay1: { marginLeft: 5 },
    dotDelay2: { marginLeft: 5 },
});

export default Chatbot;