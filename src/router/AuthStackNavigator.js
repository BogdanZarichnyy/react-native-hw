import React, { useState, useEffect } from "react";

import { createStackNavigator } from '@react-navigation/stack';

import RegistrationScreen from '../screens/auth/RegistrationScreen';
import LoginScreen from '../screens/auth/LoginScreen';

const AuthStack = createStackNavigator();

const AuthStackNavigator = () => {

    return (
        <AuthStack.Navigator initialRouteName="Registration">
            <AuthStack.Screen name='Registration' component={RegistrationScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
        </AuthStack.Navigator>
    );
}

export default AuthStackNavigator;