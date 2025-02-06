import React, { useEffect, useState } from 'react';
import { StatusBar, Platform, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import AppNavigator from './AppNavigator';
import { ProfileProvider } from './Components/ProfileScreens/ProfileContext';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'SemiBold': require('./assets/fonts/Inter_28pt-Medium.ttf'),
      'ExtraLight': require('./assets/fonts/Inter_18pt-ExtraLight.ttf'),
      'Light': require('./assets/fonts/Inter_18pt-Light.ttf'),
      'title': require('./assets/fonts/Inter_18pt-BoldItalic.ttf'),
      'Regular': require('./assets/fonts/Inter_24pt-Thin.ttf'),
      'bold': require('./assets/fonts/Inter_24pt-ExtraBold.ttf'),
      'normal': require('./assets/fonts/Inter_24pt-SemiBold.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor={Platform.OS === 'ios' ? '#ffffff' : '#fefefe'}
        translucent={Platform.OS === 'android'}
      />
      <SafeAreaView style={styles.safeArea}>
        <ProfileProvider>
          <AppNavigator />
        </ProfileProvider>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fefefe',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Add padding for Android status bar
  },
});