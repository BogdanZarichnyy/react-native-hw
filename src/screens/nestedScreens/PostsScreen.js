import { useState, useEffect } from "react";
import { TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView, Platform, Dimensions, Keyboard, ScrollView, Pressable, View, Text, StyleSheet, Image, FlatList } from 'react-native';

import CommentsIcon from '../../images/message_circle.svg';
import MapPinIcon from '../../images/map_pin.svg';

const avatarPhoto = require('../../images/avatar.jpg');

const initialState = [
    // {
    //     id: '1',
    //     photo: '../../images/wood.jpg',
    //     title: 'Лес',
    //     comments: [1,2,3,4,5,6,7,8,9],
    //     likes: '153',
    //     address: 'Ukraine',
    //     addressMap: '',
    //     owner: ''
    // },
    // {
    //     id: '2',
    //     photo: '../../images/black_sea.jpg',
    //     title: 'Закат на Черном море',
    //     comments: [1,2,3,4,5,6],
    //     likes: '200',
    //     address: 'Ukraine',
    //     addressMap: '',
    //     owner: ''
    // },
    // {
    //     id: '3',
    //     photo: '../../images/house.jpg',
    //     title: 'Старый домик в Венеции',
    //     comments: [1,2,3,4,5,6,7],
    //     likes: '200',
    //     address: 'Italy',
    //     addressMap: '',
    //     owner: ''
    // },
];

const PostsScreen = ({ navigation, route }) => {
    const [isLandscape, setIsLandscape] = useState(false);
    const [posts, setPosts] = useState(initialState);

    useEffect(() => { 
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height;

        width > height ? setIsLandscape(true) : setIsLandscape(false);
    }, []);

    useEffect(() => { 
        const onChange = () => {
            const width = Dimensions.get('window').width;
            const height = Dimensions.get('window').height;

            width > height ? setIsLandscape(true) : setIsLandscape(false);
        }

        const dimensionsHandler = Dimensions.addEventListener('change', onChange);
        
        return () => {
            dimensionsHandler.remove();
        }
    }, []);

    useEffect(() => { 
        if (route.params === undefined) {
            return;
        }
        setPosts([...posts, {
            id: Date.now(),
            comments: [],
            likes: '',
            ...route.params,
            addressMap: '',
            owner: ''
        }]);
    }, [route.params]);

    // console.log(route);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView style={styles.wrraper} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                    <ScrollView>

                        <Pressable style={styles.content}>

                            <View style={styles.userInfo}>
                                <Image source={avatarPhoto} style={styles.avatarImage}/>
                                <View style={styles.user}>
                                    <Text style={styles.name}>Natali Romanova</Text>
                                    <Text style={styles.email}>email@example.com</Text>
                                </View>
                            </View>

                            {/* <View style={isLandscape ? { ...styles.posts, alignItems: "center" } : styles.posts}>
                                <FlatList data={posts} keyExtractor={item => item.id.toString()} renderItem={({ item, index }) =>
                                    // <Text>{item.title}</Text>
                                    <View key={item.id} style={item[index] === posts.length - 1 ? { ...styles.post, marginBottom: 0 } : styles.post} >
                                        <Image source={{ uri: item.photo }} style={isLandscape ? { ...styles.postImage, width: 350 } : { ...styles.postImage, height: 200, width: 350 } } />
                                        <Text style={styles.title}>{item.title}</Text>

                                        <View style={styles.postInfo}>
                                            <Pressable style={styles.comments} onPress={() => navigation.navigate("Comments")}>
                                                <CommentsIcon style={styles.commentsIcon} width={24} height={24} />
                                                <Text style={styles.commentsCount}>{item.comments.length}</Text>
                                            </Pressable>
                                            <Pressable style={styles.addressInfo} onPress={() => navigation.navigate("Map")}>
                                                <MapPinIcon style={styles.addressIcon} width={24} height={24} />
                                                <Text style={styles.address}>{item.address}</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                } />
                            </View> */}

                            <View style={isLandscape ? { ...styles.posts, alignItems: "center" } : styles.posts}>

                                {posts.map((item, index) =>
                                    <View key={item.id} style={ item[index] === posts.length - 1 ? { ...styles.post, marginBottom: 0 } : styles.post } >
                                        {/* <Image source={require('../../images/wood.jpg')} style={ isLandscape ? { ...styles.postImage, width: 350 } : styles.postImage } /> */}
                                        <Image source={{ uri: item.photo }} style={ isLandscape ? { ...styles.postImage, width: 350 } : styles.postImage } />
                                        <Text style={styles.title}>{item.title}</Text>

                                        <View style={styles.postInfo}>
                                            <Pressable style={styles.comments} onPress={() => navigation.navigate("Comments")}>
                                                <CommentsIcon style={styles.commentsIcon} width={24} height={24} />
                                                <Text style={styles.commentsCount}>{item.comments.length}</Text>
                                            </Pressable>
                                            <Pressable style={styles.addressInfo} onPress={() => navigation.navigate("Map", { location: item.location })}>
                                                <MapPinIcon style={styles.addressIcon} width={24} height={24} />
                                                <Text style={styles.address}>{item.address}</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                )}

                            </View>
                        </Pressable>

                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        fontFamily: 'Roboto-Medium',

        // justifyContent: "center",
        // alignItems: "center"
    },
    wrraper: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 32,
        // width: "100%",
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center"
    },
    avatarImage: {
        width: 60,
        height: 60,
        borderRadius: 16,
    },
    user: {
        marginLeft: 8
    },
    name: {
        fontFamily: 'Roboto-Bold',
        fontWeight: "700",
        fontSize: 13,
        lineHeight: 15,
        color: "#212121",
    },
    email: {
        fontFamily: 'Roboto-Medium',
        fontWeight: "400",
        fontSize: 11,
        lineHeight: 13,
        color: "rgba(33, 33, 33, 0.8)",
    },
    posts: {
        flex: 1,
        marginTop: 32,
    },
    post: {
        marginBottom: 32,
    },
    postImage: {
        width: "100%",
        height: 240,
        borderRadius: 8,
        resizeMode: "cover",
    },
    title: {
        fontFamily: 'Roboto-Medium',
        fontWeight: "500",
        fontSize: 16,
        lineHeight: 19,
        marginTop: 8
    },
    postInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        // alignItems: "center",
        // width: "100%",
        marginTop: 11,
    },
    comments: {
        flexDirection: "row",
        alignItems: "center",
    },
    commentsCount: {
        fontFamily: 'Roboto-Medium',
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19,
        color: "#BDBDBD",
        marginLeft: 6,
    },
    addressInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    addressIcon: {
        stroke: "#BDBDBD",
    },
    address: {
        fontFamily: 'Roboto-Medium',
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19,
        textAlign: "right",
        textDecorationLine: "underline",
        color: "#212121",
        marginLeft: 4,
    },
});

export default PostsScreen;