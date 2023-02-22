import React from "react";

import { useCallback } from "react";
import { LogBox } from 'react-native';

// import { createRoot } from 'react-dom/client';

// import { NavigationContainer } from '@react-navigation/native';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { Provider } from 'react-redux';
import { store } from './src/redux/store';

// import { useRoute } from './src/router/router';

// import { navigationRef, isReadyRef } from './src/RootNavigation';

// import AuthStackNavigator from './src/router/AuthStackNavigator';
// import MainTabNavigator from './src/router/MainTabNavigator';

// import { db, auth } from './src/firebase/config';
// import { getAuth, onAuthStateChanged } from "firebase/auth";

import Main from './src/components/Main';

LogBox.ignoreLogs(['Sending...']);
LogBox.ignoreLogs(['Warning: AsyncStorage Storage has been extracted from react-native core']);

export default function App() {
    // const [isLogin, setIsLogin] = useState(false);
    // const state = useSelector(state => state);

    // console.log(state);

    // onAuthStateChanged(auth, (user) => console.log('user change', user));

    // useEffect(() => {

    // }, []);

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
        <Provider store={store}>
            {/* <NavigationContainer
                // ref={navigationRef}
                // onReady={() => {
                //     isReadyRef.current = true;
                // }}
                > */}
                {/* {routing} */}
                {/* {isLogin ? 
                    <MainTabNavigator />
                :
                    <AuthStackNavigator />
                } */}
            {/* </NavigationContainer> */}
            <Main />
        </Provider>
    );
}

// const container = document.getElementById('root');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<App />);

// export NODE_OPTIONS=--openssl-legacy-provider
// set NODE_OPTIONS=--openssl-legacy-provider
// EXPO_NO_TYPESCRIPT_SETUP=1