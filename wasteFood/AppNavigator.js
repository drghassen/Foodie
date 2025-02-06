import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './Components/HomeScreen';
import ProfileScreen from './Components/ProfileScreens/ProfileScreen';
import Recette from './Components/Recettes/Recette';
import PlanningScreen from './Components/PlanningScreen/PlanningScreen';
import GiveScreen from './Components/GivesScreen/GiveScreen';
import DonationHistoryScreen from './Components/DonationHistoryScreen ';
import ImpactHistoryScreen from './Components/ImpactHistoryScreen ';
import CommunityTipsScreen from './Components/ComunityScreen/CommunityTipsScreen';
import LoginScreen from './Components/LoginScreen';
import ForgotPasswordScreen from './Components/ForgotPasswordScreen';
import CreateAccountScreen from './Components/CreateAccountScreen';
import OnboardingScreen from './Components/OnboardingScreen';
import CameraScreen from './Components/CameraScreen';
import ConsumeDetailScreen from './Components/ConsumeSoon/ConsumeDetailScreen';
import EditProfileScreen from './Components/ProfileScreens/EditProfileScreen';

// Create Stack and Tab navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'DonationHistory') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    } else if (route.name === 'ImpactHistory') {
                        iconName = focused ? 'analytics' : 'analytics-outline';
                    } else if (route.name === 'CommunityTips') {
                        iconName = focused ? 'people' : 'people-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#6554AF',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    borderTopWidth: 0,
                    height: 70,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                    paddingBottom: 5,
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Home', headerShown: false }}
            />
            <Tab.Screen
                name="CommunityTips"
                component={CommunityTipsScreen}
                options={{ title: 'Community Advice' }}
            />
            <Tab.Screen
                name="DonationHistory"
                component={DonationHistoryScreen}
                options={{ title: 'Donation History' }}
            />
            <Tab.Screen
                name="ImpactHistory"
                component={ImpactHistoryScreen}
                options={{ title: 'Impact History', headerShown: false }}
            />

        </Tab.Navigator>
    );
};

// App Navigator (Stack with Tab Navigator integrated)
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Onboarding">

                <Stack.Screen
                    name="Onboarding"
                    component={OnboardingScreen}
                    options={{ headerShown: false }}
                />
                {/* Login Screen */}
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }} // Masquer le header sur l'écran de connexion
                />
                {/* Tab Navigator */}
                <Stack.Screen
                    name="HomeTab"
                    component={TabNavigator}
                    options={{ headerShown: false }} // Masquer le header sur l'écran d'accueil
                />
                {/* Other Screens */}
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Recipe"
                    component={Recette}
                    options={{ title: 'Recipe' }}
                />
                <Stack.Screen
                    name="Planning"
                    component={PlanningScreen}
                    options={{ title: 'Schedule' }}
                />
                <Stack.Screen
                    name="Gives"
                    component={GiveScreen}
                    options={{ title: 'Gives' }}
                />

                <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />

                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CreateAccount"
                    component={CreateAccountScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ImpactHistory"
                    component={ImpactHistoryScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="ConsumeDetail" component={ConsumeDetailScreen} options={{ title: 'Consume soon' }} />
                <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;