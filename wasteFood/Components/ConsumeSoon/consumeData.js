import React from 'react';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const consumeData = [
    {
        id: '1',
        icon: <MaterialIcons name="local-drink" size={24} color="#4CAF50" />,
        label: 'Apples (4)',
        date: 'Expires in 5 days',
        image: require('../../assets/appels.jpg'),
        category: 'Fruits',
        description: 'Apples are a rich source of fiber and vitamin C. They are perfect for snacks, desserts, or juices.',
        nutrition: {
            calories: '95 kcal',
            protein: '0.5g',
            carbs: '25g',
            fat: '0.3g',
        },
        tips: [
            { icon: 'lightbulb-outline', text: 'Store in a cool, dry place to extend freshness.', color: '#6A549E', iconFamily: 'MaterialIcons' },
            { icon: 'chef-hat', text: 'Use in salads, smoothies, or as a healthy snack.', color: '#4CAF50', iconFamily: 'MaterialCommunityIcons' },
            { icon: 'local-dining', text: 'Pair with peanut butter for a delicious snack.', color: '#9A7E6F', iconFamily: 'MaterialIcons' },
        ],
        recipes: [
            { title: 'Apple Pie', description: 'A classic dessert to use your apples before they expire.' },
            { title: 'Apple Smoothie', description: 'A refreshing drink packed with nutrients.' },
        ],
        storage: [
            { icon: 'kitchen', text: 'Store in the refrigerator for up to 2 weeks.', color: '#6A549E', iconFamily: 'MaterialIcons' },
            { icon: 'fridge-outline', text: 'Keep in a plastic bag to retain moisture.', color: '#4CAF50', iconFamily: 'MaterialCommunityIcons' },
        ],
        funFact: 'Did you know? Apples float in water because 25% of their volume is air!',
        alternatives: [
            { label: 'Apple Sauce', description: 'Make apple sauce with overripe apples.' },
            { label: 'Apple Chips', description: 'Slice and bake apples to make healthy chips.' },
        ],
        whyConsumeSoon: 'Apples lose their crunch and flavor over time. Consume them quickly to enjoy their freshness!',
        wasteStats: 'Did you know? 40% of apples produced are wasted each year.',
    },
    {
        id: '2',
        icon: <MaterialCommunityIcons name="food-variant" size={24} color="#6A549E" />,
        label: 'Cheese',
        date: 'Expires in 6 days',
        image: require('../../assets/cheese.jpg'),
        category: 'Dairy',
        description: 'Cheese is a versatile dairy product rich in calcium and protein. Perfect for snacks, cooking, or garnishing.',
        nutrition: {
            calories: '110 kcal',
            protein: '7g',
            carbs: '1g',
            fat: '9g',
        },
        tips: [
            { icon: 'lightbulb-outline', text: 'Wrap in wax paper to keep it fresh.', color: '#6A549E', iconFamily: 'MaterialIcons' },
            { icon: 'chef-hat', text: 'Use in sandwiches, pasta, or as a snack.', color: '#4CAF50', iconFamily: 'MaterialCommunityIcons' },
        ],
        recipes: [
            { title: 'Cheese Platter', description: 'Create a beautiful cheese platter with your leftover cheese.' },
            { title: 'Mac and Cheese', description: 'A comforting dish to use your cheese.' },
        ],
        storage: [
            { icon: 'kitchen', text: 'Store in the refrigerator at 4°C.', color: '#6A549E', iconFamily: 'MaterialIcons' },
            { icon: 'fridge-outline', text: 'Keep in an airtight container.', color: '#4CAF50', iconFamily: 'MaterialCommunityIcons' },
        ],
        funFact: 'Did you know? Cheese is one of the most stolen foods in the world!',
        alternatives: [
            { label: 'Cheese Fondue', description: 'Melt cheese with wine for a delicious fondue.' },
            { label: 'Cheese Quiche', description: 'Use leftover cheese in a savory quiche.' },
        ],
        whyConsumeSoon: 'Cheese can develop unwanted mold after its expiration date. Consume it quickly!',
        wasteStats: 'Cheese waste contributes to 1.5 million tons of CO₂ emissions annually.',
    },
    {
        id: '3',
        icon: <FontAwesome name="tree" size={24} color="#795548" />,
        label: 'Pine',
        date: 'Expires in 2 days',
        image: require('../../assets/pains.jpg'),
        category: 'Vegetables',
        description: 'Pine is a fresh and nutritious item that should be consumed soon to avoid waste.',
        nutrition: {
            calories: '50 kcal',
            protein: '1g',
            carbs: '12g',
            fat: '0.2g',
        },
        tips: [
            { icon: 'lightbulb-outline', text: 'Store in a cool, dry place.', color: '#6A549E', iconFamily: 'MaterialIcons' },
            { icon: 'chef-hat', text: 'Use in salads or as a garnish.', color: '#4CAF50', iconFamily: 'MaterialCommunityIcons' },
        ],
        recipes: [
            { title: 'Pine Salad', description: 'A fresh salad to use your pine.' },
            { title: 'Pine Smoothie', description: 'A healthy smoothie with pine and other fruits.' },
        ],
        storage: [
            { icon: 'kitchen', text: 'Store in the refrigerator.', color: '#6A549E', iconFamily: 'MaterialIcons' },
            { icon: 'fridge-outline', text: 'Keep in a sealed bag.', color: '#4CAF50', iconFamily: 'MaterialCommunityIcons' },
        ],
        funFact: 'Did you know? Pine is rich in antioxidants and can boost your immune system!',
        alternatives: [
            { label: 'Pine Stir-Fry', description: 'Add pine to a stir-fry for extra flavor.' },
            { label: 'Pine Soup', description: 'Make a creamy soup with pine and potatoes.' },
        ],
        whyConsumeSoon: 'Pine loses its freshness and nutrients quickly. Use it while it\'s still fresh!',
        wasteStats: 'In France, 1 out of 5 vegetables is wasted each year.',
    },
];

export default consumeData;