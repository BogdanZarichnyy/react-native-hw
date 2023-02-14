import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from 'react-native';

const MapScreen = ({ navigation }) => {

    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: "none"
        }
        });
        return () => navigation.getParent()?.setOptions({
            // tabBarStyle: undefined
            tabBarStyle: {
                height: 58,
                paddingTop: 9,
                paddingBottom: 9,
                // paddingHorizontal: 82,
            },
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text>MapScreen</Text>
            <Button title="go to post" onPress={() => navigation.navigate("Posts")}>go to post</Button>
            <Button title="go to comments" onPress={() => navigation.navigate("Comments")}>go to comments</Button>
        </View>
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

export default MapScreen;