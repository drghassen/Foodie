import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Animated,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Image,
} from 'react-native';
import { FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons';
import { ProfileContext } from '../../Components/ProfileScreens/ProfileContext';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import Toast from 'react-native-toast-message';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './CommunityTipsScreenStyles';

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

const CommunityTipsScreen = () => {
    const [advice, setAdvice] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newAdvice, setNewAdvice] = useState('');
    const [submitAnimation] = useState(new Animated.Value(1));
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [comments, setComments] = useState({});
    const { profilePicture } = useContext(ProfileContext);

    // Dropdown state
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Recent', value: 'recent' },
        { label: 'Most Liked', value: 'likes' },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await import('./Conseils.json');
                const adviceWithState = response.default.map((item) => ({
                    ...item,
                    isLiked: false,
                    isSaved: false,
                    likes: item.likes || 23,
                    scale: new Animated.Value(1),
                }));
                setAdvice(adviceWithState);
            } catch (error) {
                console.error('Error loading the advice:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const animateScale = (animatedValue) => {
        Animated.sequence([
            Animated.timing(animatedValue, {
                toValue: 1.1,
                duration: 15,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleLike = (id) => {
        setAdvice((prevAdvice) =>
            prevAdvice.map((item) => {
                if (item.id === id) {
                    animateScale(item.scale);
                    Toast.show({
                        type: 'success',
                        text1: item.isLiked ? 'Unliked' : 'Liked',
                    });
                    return {
                        ...item,
                        isLiked: !item.isLiked,
                        likes: item.isLiked ? item.likes - 1 : item.likes + 1,
                    };
                }
                return item;
            })
        );
    };

    const handleSave = (id) => {
        setAdvice((prevAdvice) =>
            prevAdvice.map((item) => {
                if (item.id === id) {
                    animateScale(item.scale);
                    Toast.show({
                        type: 'success',
                        text1: item.isSaved ? 'Unsaved' : 'Saved',
                    });
                    return { ...item, isSaved: !item.isSaved };
                }
                return item;
            })
        );
    };

    const handleSubmit = () => {
        if (newAdvice.trim()) {
            const newAdviceItem = {
                id: uuidv4(),
                name: 'You',
                time: 'Just now',
                description: newAdvice,
                isLiked: false,
                isSaved: false,
                likes: 0,
                scale: new Animated.Value(1),
                image: profilePicture, // Utilisez directement profilePicture
            };

            setAdvice((prevAdvice) => [newAdviceItem, ...prevAdvice]);
            setNewAdvice('');

            Animated.sequence([
                Animated.timing(submitAnimation, {
                    toValue: 1.2,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(submitAnimation, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                }),
            ]).start();

            Toast.show({
                type: 'success',
                text1: 'Advice posted',
            });
        }
    };

    const handleComment = (id, comment) => {
        if (comment.trim()) {
            setComments((prevComments) => ({
                ...prevComments,
                [id]: [...(prevComments[id] || []), comment],
            }));
        }
    };

    const loadMoreAdvice = async () => {
        if (!hasMore) return;
        try {
            const response = await import(`./Conseils.json`);
            const newAdvice = response.default.map((item) => ({
                ...item,
                isLiked: false,
                isSaved: false,
                likes: item.likes || 23,
                scale: new Animated.Value(1),
            }));
            setAdvice((prevAdvice) => [...prevAdvice, ...newAdvice]);
            setPage((prevPage) => prevPage + 1);
            if (newAdvice.length === 0) setHasMore(false);
        } catch (error) {
            console.error('Error loading more advice:', error);
        }
    };

    const sortedAdvice = [...advice].sort((a, b) => {
        if (value === 'recent') {
            return new Date(b.time) - new Date(a.time);
        } else if (value === 'likes') {
            return b.likes - a.likes;
        }
        return 0;
    });

    const filteredAdvice = sortedAdvice.filter((item) =>
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = ({ item }) => (
        <Animated.View style={[styles.card, { transform: [{ scale: item.scale }] }]}>
            <View style={styles.header}>
                <View style={styles.ImageContainer}>
                    <Image
                        source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                        style={styles.profileImage}
                        onError={(error) => console.log('Image failed to load:', error.nativeEvent.error)}
                    />
                </View>
                <View style={styles.headerText}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
            </View>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.actionButton}>
                    <FontAwesome
                        name={item.isLiked ? 'heart' : 'heart-o'}
                        size={20}
                        color={item.isLiked ? COLORS.liked : COLORS.text}
                    />
                    <Text style={styles.actionText}>{item.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSave(item.id)} style={styles.actionButton}>
                    <MaterialIcons
                        name={item.isSaved ? 'bookmark' : 'bookmark-outline'}
                        size={20}
                        color={item.isSaved ? COLORS.saved : COLORS.text}
                    />
                </TouchableOpacity>
            </View>
            <CommentSection id={item.id} />
        </Animated.View>
    );

    const CommentSection = ({ id }) => {
        const [newComment, setNewComment] = useState('');

        const handleSubmitComment = () => {
            if (newComment.trim()) {
                handleComment(id, newComment);
                setNewComment(''); // Effacer le champ de saisie après l'ajout
            }
        };

        return (
            <View style={styles.commentSection}>
                {comments[id]?.map((comment, index) => (
                    <View key={index} style={styles.commentBubble}>
                        <Text style={styles.commentText}>{comment}</Text>
                    </View>
                ))}
                <View style={styles.commentInputContainer}>
                    <TextInput
                        style={styles.commentInput}
                        placeholder="Add a comment..."
                        placeholderTextColor={COLORS.secondaryText}
                        value={newComment}
                        onChangeText={setNewComment}
                        onSubmitEditing={handleSubmitComment}
                    />
                    <TouchableOpacity onPress={handleSubmitComment} style={styles.commentButton}>
                        <MaterialIcons name="send" size={20} color={'#7E1891'} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Loading advice...</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            {/* Barre de recherche et filtre */}
            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <Feather name="search" size={20} color={COLORS.secondaryText} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search advice..."
                        placeholderTextColor={COLORS.secondaryText}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <View style={styles.pickerContainer}>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="Sort by"
                        placeholderStyle={{ color: COLORS.secondaryText }}
                        style={styles.dropdown}
                        dropDownContainerStyle={styles.dropdownContainer}
                        textStyle={styles.dropdownText}
                        arrowIconStyle={styles.dropdownArrow}
                        tickIconStyle={styles.dropdownTick}
                    />
                </View>
            </View>

            {/* Zone de post */}
            <View style={styles.statusContainer}>
                <Image
                    source={typeof profilePicture === 'string' ? { uri: profilePicture } : profilePicture}
                    style={styles.profileImage}
                    onError={(error) => console.log('Profile image failed to load:', error.nativeEvent.error)}
                />
                <TextInput
                    style={styles.statusInput}
                    placeholder="What's on your mind?"
                    placeholderTextColor={COLORS.secondaryText}
                    value={newAdvice}
                    onChangeText={setNewAdvice}
                    multiline
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.postButton}>
                    <Animated.Text style={[styles.postButtonText, { transform: [{ scale: submitAnimation }] }]}>
                        Post
                    </Animated.Text>
                </TouchableOpacity>
            </View>

            {/* Liste des conseils */}
            <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredAdvice}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No advice available at the moment.</Text>
                }
                onEndReached={loadMoreAdvice}
                onEndReachedThreshold={0.5}
            />
            <Toast />
        </KeyboardAvoidingView>
    );
};

export default CommunityTipsScreen;