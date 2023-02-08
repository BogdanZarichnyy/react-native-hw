import { useCallback, useState, useEffect } from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegistrationScreen from './screens/auth/RegistrationScreen';
import LoginScreen from './screens/auth/LoginScreen';
import { createRoot } from 'react-dom/client';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const AuthStack = createStackNavigator();

export default function App() {

    const [fontsLoaded] = useFonts({
        'Roboto-Regular': require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
        'Roboto-Medium': require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
        'Roboto-Bold': require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
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
        <NavigationContainer>
            <AuthStack.Navigator initialRouteName="Registration">
                <AuthStack.Screen name='Registration' component={RegistrationScreen} options={{ headerShown: false }} />
                <AuthStack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
            </AuthStack.Navigator>
        </NavigationContainer>
    );
}

// const container = document.getElementById('root');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<App />);

// export NODE_OPTIONS=--openssl-legacy-provider
// set NODE_OPTIONS=--openssl-legacy-provider