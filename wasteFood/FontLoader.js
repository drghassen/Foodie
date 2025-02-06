import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const FontLoader = ({ children }) => {
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

    return children;
};

export default FontLoader;