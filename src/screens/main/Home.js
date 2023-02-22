import React from "react";

import { createStackNavigator } from '@react-navigation/stack';

import { useDispatch } from 'react-redux';
import { authSignOutUser } from '../../redux/auth/authOperations';

import { View, Pressable, Text, StyleSheet } from 'react-native';

import PostsScreen from '../nestedScreens/PostsScreen';
import CommentsScreen from '../nestedScreens/CommentsScreen';
import MapScreen from '../nestedScreens/MapScreen';

import BackIcon from '../../images/arrow_left.svg';
import LogOutIcon from '../../images/logout.svg';

const NestedScreenStack = createStackNavigator();

const Home = (props) => {
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(authSignOutUser());
        console.log('Logout');
    }

    return (
        <NestedScreenStack.Navigator>
            <NestedScreenStack.Screen name='Posts' component={PostsScreen} options={{
                title: "Публикации",
                headerTitleAlign: "center",
                headerBackAccessibilityLabel: false,
                headerRight: () => (
                    <Pressable onPress={logOut}>
                        <LogOutIcon style={{ marginRight: 20 }} />
                    </Pressable>
                ),
            }} />
            <NestedScreenStack.Screen name='Comments' component={CommentsScreen} options={{
                title: "Комментарии",
                tabBarVisible: false,
                headerTitleAlign: "center",
                headerBackTitleVisible: false,
                headerBackImage: () => (
                    <BackIcon style={{ marginLeft: 20 }} />
                ),
            }}/>
            <NestedScreenStack.Screen name='Map' component={MapScreen} options={{
                title: "Карта",
                headerTitleAlign: "center",
                headerBackTitleVisible: false,
                headerBackImage: () => (
                    <BackIcon style={{ marginLeft: 20 }} />
                ),
            }}/>
        </NestedScreenStack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        fontFamily: 'Roboto-Medium',
        justifyContent: "center",
        alignItems: "center"
    },
});

export default Home;