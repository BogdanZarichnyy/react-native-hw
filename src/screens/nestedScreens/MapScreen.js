import { useState, useEffect } from "react";
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';

const MapScreen = ({ navigation, route }) => {
    const [location, setLocation] = useState(null);

    console.log(route);

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

    useEffect(() => { 
        if (route.params === undefined) {
            return;
        }
        setLocation({ ...route.params.location });
    }, [route.params]);

    return (
        <View style={styles.container}>
            {!location ? null :
                <MapView style={styles.map}
                    initialRegion={{
                        // latitude: 49.56816057570235,
                        // longitude: 25.63322150865692,
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker
                        coordinate={{
                            // latitude: 49.56816057570235,
                            // longitude: 25.63322150865692,
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                    />
                </MapView >
            }
        </View>
    )
}

        // <View style={styles.container}>
        //     <Text>MapScreen</Text>
        //     <Button title="go to post" onPress={() => navigation.navigate("Posts")}>go to post</Button>
        //     <Button title="go to comments" onPress={() => navigation.navigate("Comments")}>go to comments</Button>
        // </View>
        

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // fontFamily: 'Roboto-Medium',
        // justifyContent: "center",
        // alignItems: "center"
    },
    map: {
        width: '100%',
        height: '100%',
    }
});

export default MapScreen;