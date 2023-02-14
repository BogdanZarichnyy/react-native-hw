import React, { useState, useEffect } from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StyleSheet, View, Pressable } from 'react-native';

import Home from './src/screens/main/Home';
import CreatePostsScreen from './src/screens/main/CreatePostsScreen';
import ProfileScreen from './src/screens/main/ProfileScreen';

import PostsIcon from './src/images/grid.svg';
import CreatePostIcon from './src/images/union.svg';
import ProfileIcon from './src/images/user.svg';
import BackIcon from './src/images/arrow_left.svg';

import { useNavigation } from '@react-navigation/native';

export const navigationRef = React.createRef();

const MainTab = createBottomTabNavigator();

const MainTabNavigator = () => {
    const navigation = useNavigation();

    return (
        <MainTab.Navigator screenOptions={styles.mainTabContainer}>
            <MainTab.Screen name="Home" component={Home} options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => (
                    // <View style={isLandscape ? { ...(focused && styles.button), height: 28 } : focused && styles.button} >
                    <View style={focused && styles.button} >
                        <PostsIcon stroke={focused ? "#fff" : "#212121"}/>
                    </View>
                )
            }} />
            <MainTab.Screen name="Create Post" component={CreatePostsScreen} options={{
                title: "Создать публикацию",
                headerTitleAlign: "center",
                // headerStyle: {
                //     paddingVertical: 11
                // },
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => (
                    <View style={focused && styles.button} >
                        <CreatePostIcon fill={focused ? "#fff" : "#212121"}/>
                    </View>
                ),
                headerLeft: () => (
                    <Pressable onPress={() => navigation.goBack()}>
                        <BackIcon style={{ marginLeft: 20 }} />
                    </Pressable>
                ),
            }} />
            <MainTab.Screen name="Profile" component={ProfileScreen} options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => (
                    <View style={focused && styles.button} >
                        <ProfileIcon stroke={focused ? "#fff" : "#212121"} />
                    </View>
                )
            }} />
        </MainTab.Navigator>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: "center",
        alignItems: "center",
        width: 70,
        height: 40,
        backgroundColor: "#FF6C00",
        borderRadius: 20
    },
    mainTabContainer: {
        tabBarStyle: {
            height: 58,
            paddingTop: 9,
            paddingBottom: 9,
            // paddingHorizontal: 82,
        },
    }
})

export default MainTabNavigator;