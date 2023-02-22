import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux';

import AuthStackNavigator from '../router/AuthStackNavigator';
import MainTabNavigator from '../router/MainTabNavigator';

import { db, auth } from '../firebase/config';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { authStateChangeUser } from '../redux/auth/authOperations';

// import { useRoute } from '../router/router';

const Main = () => {
    // const state = useSelector(state => state);
    const stateChange = useSelector(state => state.authSlice.stateChange);
    const dispatch = useDispatch();

    // console.log(state.authSlice.stateChange);
    // console.log(stateChange);

    // onAuthStateChanged(auth, (user) => console.log('user change', user));

    useEffect(() => {
        dispatch(authStateChangeUser());
    }, [dispatch]);

    return (
        <NavigationContainer
            // ref={navigationRef}
            // onReady={() => {
            //     isReadyRef.current = true;
            // }}
            >
            {/* {routing} */}
            {stateChange ? 
                <MainTabNavigator />
            :
                <AuthStackNavigator />
            }
        </NavigationContainer>
    )
}

export default Main;