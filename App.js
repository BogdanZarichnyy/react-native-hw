import React, { useState, useEffect } from "react";

import { useCallback } from "react";
import { LogBox } from 'react-native';

import { createRoot } from 'react-dom/client';

import { NavigationContainer } from '@react-navigation/native';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// import { useRoute } from './src/router';

// import { navigationRef, isReadyRef } from './src/RootNavigation';

import AuthStackNavigator from './src/router/AuthStackNavigator';
import MainTabNavigator from './src/router/MainTabNavigator';

LogBox.ignoreLogs(['Sending...']);

export default function App() {
    // const routing = useRoute(null);
    // const routing = useRoute(true);

    // useEffect(() => {
    //     return () => {
    //         isReadyRef.current = false
    //     };
    // }, []);

    const [fontsLoaded] = useFonts({
        'Roboto-Regular': require("./src/assets/fonts/Roboto/Roboto-Regular.ttf"),
        'Roboto-Medium': require("./src/assets/fonts/Roboto/Roboto-Medium.ttf"),
        'Roboto-Bold': require("./src/assets/fonts/Roboto/Roboto-Bold.ttf"),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <NavigationContainer
            // ref={navigationRef}
            // onReady={() => {
            //     isReadyRef.current = true;
            // }}
            >
            {/* {routing} */}
            {/* <AuthStackNavigator /> */}
            <MainTabNavigator />
        </NavigationContainer>
    );
}

// const container = document.getElementById('root');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<App />);

// export NODE_OPTIONS=--openssl-legacy-provider
// set NODE_OPTIONS=--openssl-legacy-provider
// EXPO_NO_TYPESCRIPT_SETUP=1