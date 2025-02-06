export const lineData = [
    { value: 20, label: 'Jan', date: '2023-01-01' },
    { value: 45, label: 'Feb', date: '2023-02-01' },
    { value: 28, label: 'Mar', date: '2023-03-01' },
    { value: 80, label: 'Apr', date: '2023-04-01' },
    { value: 99, label: 'May', date: '2023-05-01' },
    { value: 43, label: 'Jun', date: '2023-06-01' },
    { value: 30, label: 'Jul', date: '2023-07-01' },
];

export const settingsOptions = [
    // Section : About Foodie
    {
        id: 1,
        section: 'About Foodie',
        title: 'Give Feedback',
        icon: 'message-circle', // Utilise Feather
        description: 'Share your feedback with us',
    },
    {
        id: 2,
        section: 'About Foodie',
        title: 'How to Use Foodie',
        icon: 'book', // Utilise MaterialIcons
        description: 'Learn how to use the app',
    },
    {
        id: 3,
        section: 'About Foodie',
        title: 'Connect Your Business',
        icon: 'business', // Utilise MaterialIcons
        description: 'Link your business account',
    },

    // Section : User Settings
    {
        id: 4,
        section: 'User Settings',
        title: 'Edit Profile',
        icon: 'edit', // Utilise MaterialIcons
        description: 'Update your personal information',
    },
    {
        id: 5,
        section: 'User Settings',
        title: 'Payment Methods',
        icon: 'credit-card', // Utilise MaterialIcons
        description: 'Manage your payment options',
    },
    {
        id: 6,
        section: 'User Settings',
        title: 'Notifications',
        icon: 'notifications-outline', // Utilise Ionicons
        description: 'Manage your notification preferences',
    },
    {
        id: 7,
        section: 'User Settings',
        title: 'Unlock Hidden Location',
        icon: 'map', // Utilise MaterialIcons
        description: 'Access hidden location features',
    },
    {
        id: 8,
        section: 'User Settings',
        title: 'Personalisation Settings',
        icon: 'palette', // Utilise MaterialIcons
        description: 'Customize your app experience',
    },
    {
        id: 9,
        section: 'User Settings',
        title: 'Logout',
        icon: 'logout', // Utilise MaterialIcons
        description: 'Logout from your account',
    },

    // Section : Documents
    {
        id: 10,
        section: 'Documents',
        title: 'User Agreement',
        icon: 'file-text', // Utilise Feather
        description: 'Read the user agreement',
    },
    {
        id: 11,
        section: 'Documents',
        title: 'Privacy Policy',
        icon: 'shield', // Utilise MaterialIcons
        description: 'Review our privacy policy',
    },
];

export const initialUserData = {
    name: 'Ghassen Dridi',
    email: 'dridighassenbac2021@gmail.com',
    id: '5A23PD-855DZ-7ROOPV963',
    location: 'Sahline, Monatir, Tunisia',
    profilePicture: require('../assets/pdp1.jpg'),
    completedMeals: 150,
    foodWasteReduced: 120,
    daysActive: 32,
    caloriesBurned: 1500,
    stepsTaken: 20000,
    achievements: ['Eco-Hero', 'Recycling Champion', 'Composting Master'],
    recentActions: [
        { id: 1, action: 'Shared 5 kg of food', date: '12 Oct 2023' },
        { id: 2, action: 'Composted 3 kg of waste', date: '10 Oct 2023' },
        { id: 3, action: 'Saved 10 kg of CO2', date: '8 Oct 2023' },
    ],
    aboutMe: 'Passionate about sustainability and reducing food waste. Love to cook and share meals with friends and family.',
    socialMedia: {
        facebook: 'https://www.facebook.com/ghassendridisousse/',
        twitter: 'https://x.com/DridiGhass18086',
        instagram: 'https://www.instagram.com/drghassen/',
        linkedin: 'https://www.linkedin.com/in/ghassen-dridi-b2bb08284/',
    },
    notifications: [
        { id: 1, message: 'You have a new friend request', date: '12 Oct 2023' },
        { id: 2, message: 'Your post was liked by 10 people', date: '10 Oct 2023' },
        { id: 3, message: 'You have a new message', date: '8 Oct 2023' },
    ],
    friends: [
        { id: 1, name: 'Nousa', avatar: require('../assets/hahah.jpg') },
        { id: 2, name: 'Roz-Roz', avatar: require('../assets/hahah.jpg') },
        { id: 3, name: 'Manena', avatar: require('../assets/hahah.jpg') },
        { id: 4, name: 'GeuzGuez ', avatar: require('../assets/hahah.jpg') },
        { id: 5, name: 'Rayen', avatar: require('../assets/hahah.jpg') },
        { id: 6, name: 'Fadfoud', avatar: require('../assets/hahah.jpg') },

    ],
    preferences: {
        dietary: 'Vegetarian',
        notifications: true,
        theme: 'Light',
    },
};