import { useState, useEffect } from "react";
import { TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView, Platform, Dimensions, Keyboard, ScrollView, Pressable, View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

import VectorIcon from '../../images/vector.svg';

const avatarPhoto = require('../../images/avatar.jpg');
const ellipsePhoto = require('../../images/ellipse.jpg');

const postPhoto = require('../../images/black_sea.jpg');

const initialState = [
    {
        id: '1',
        avatar: '../../images/ellipse.jpg',
        text: 'Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!',
        date: '09 июня, 2020 | 08:40',
        post: '',
        owner: ''
    },
    {
        id: '2',
        avatar: '../../images/avatar.jpg',
        text: 'A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.',
        date: '09 июня, 2020 | 09:14',
        post: '',
        owner: ''
    },
    {
        id: '3',
        avatar: '../../images/ellipse.jpg',
        text: 'Thank you! That was very helpful!',
        date: '09 июня, 2020 | 09:20',
        post: '',
        owner: ''
    },
];

const width = Dimensions.get('window').width;

const CommentsScreen = ({ navigation }) => {
    const [isLandscape, setIsLandscape] = useState(false);
    const [comments, setComments] = useState(initialState);

    const [comment, setComment] = useState('');

    const [isFocusInputComment, setIsFocusInputComment] = useState(false);

    const onFocus = {
        backgroundColor: "#FFFFFF",
        color: "#212121",
        borderColor: "#FF6C00"
    }

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

    const inputHandlerComment = (text) => {
        setComment(text);
        console.log(text);
    }

    const onFocusInputComment = () => {
        setIsFocusInputComment(true);
    }

    const onBlurInputComment = () => {
        setIsFocusInputComment(false);
    }
    const addCommentHandler = () => {
        setIsFocusInputComment(false);
        console.log(comment);
        setComment('');
        setComments([...comments, {
            id: Date.now().toString(),
            avatar: '../../images/ellipse.jpg',
            text: comment,
            date: Date.now().toString(),
            post: '',
            owner: ''
        }]);
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView style={styles.wrraper} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                    <ScrollView>

                        <Pressable style={isLandscape ? { ...styles.content, alignItems: "center" } : styles.content}>

                            <Image source={postPhoto} style={isLandscape ? { ...styles.postImage, width: 350 } : styles.postImage} />

                            <View style={styles.comments}>
                                {comments.map((item, index) => 
                                    // <View key={item.id} style={index % 2 ? { ...styles.commentInfo, flexDirection: "row-reverse" } : styles.commentInfo} > width: `${ isLandscape ? "350": "100%" }`
                                    <View key={item.id} style={index % 2 ? { ...styles.commentInfo, flexDirection: "row-reverse", width: isLandscape ? 350 : "100%" } : { ...styles.commentInfo, width: isLandscape ? 350 : "100%" }} >
                                        <Image source={avatarPhoto} style={styles.avatar} />
                                        {/* <Image source={{ uri: item.avatar }} style={styles.avatar} /> */}
                                        <View style={index % 2 ? { ...styles.comment, marginLeft: 0, marginRight: 16, borderTopRightRadius: 0, borderTopLeftRadius: 6,} : styles.comment}>
                                            <Text style={styles.text}>{item.text}</Text>
                                            <Text style={index % 2 ? { ...styles.date, textAlign: "left" } : styles.date}>{item.date}</Text>
                                        </View>
                                    </View>
                                )}
                            </View>

                            <View style={isLandscape ? { ...styles.addComment, width: 350 } : { ...styles.addComment, width: "100%" }}>
                                <TextInput style={isFocusInputComment ? { ...styles.input, ...onFocus, width: isLandscape ? 350 : "100%" } : { ...styles.input, width: isLandscape ? 350 : "100%" }}
                                    onChangeText={inputHandlerComment}
                                    placeholder="Комментировать..."
                                    textAlign="left"
                                    inputMode="text"
                                    multiline="true"
                                    rows="5"
                                    value={comment}
                                    placeholderTextColor="#BDBDBD"
                                    onFocus={onFocusInputComment}
                                    onBlur={onBlurInputComment}
                                />

                                <TouchableOpacity style={styles.addButton} onPress={addCommentHandler}>
                                    <VectorIcon width={10} height={14} />
                                </TouchableOpacity>
                            </View>

                        </Pressable>
                    
                    </ScrollView>

                    {/* <View style={{ ...styles.addComment, width: isLandscape ? 350 : "100%" }}> */}
                    {/* <View style={isLandscape ? { ...styles.addComment, width: 350, left: width / 2 - 350 / 2 - 16 } : { ...styles.addComment, width: "100%" }}>
                        <TextInput style={isFocusInputComment ? { ...styles.input, ...onFocus, width: isLandscape ? 350 : "100%" } : { ...styles.input, width: isLandscape ? 350 : "100%" }}
                            onChangeText={inputHandlerComment}
                            placeholder="Комментировать..."
                            textAlign="left"
                            inputMode="text"
                            multiline="true"
                            rows="5"
                            value={comment}
                            placeholderTextColor="#BDBDBD"
                            onFocus={onFocusInputComment}
                            onBlur={onBlurInputComment}
                        />

                        <Pressable style={isLandscape ? { ...styles.addButton, right: -6 } : styles.addButton} onPress={addCommentHandler}>
                            <VectorIcon width={10} height={14} />
                        </Pressable>
                    </View> */}

                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    wrraper: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 32,
        // paddingBottom: 73,
        // width: "100%",
    },
    postImage: {
        // flex: 1,
        width: "100%",
        borderRadius: 8,
        resizeMode: "cover",
    },
    comments: {
        marginTop: 32,
        // justifyContent: ""
    },
    commentInfo: {
        flexDirection: "row",
        // width: "100%",
    },
    avatar: {
        width: 28,
        height: 28,
        borderRadius: "50%",
    },
    comment: {
        flex: 1,
        // width: "100%",
        padding: 16,
        marginLeft: 16,
        backgroundColor: "rgba(0, 0, 0, 0.03)",
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        borderBottomLeftRadius: 6,
        marginBottom: 24
    },
    text: {
        fontFamily: 'Roboto-Medium',
        fontWeight: 400,
        fontSize: 13,
        lineHeight: 18,
        color: "#212121"
    },
    date: {
        marginTop: 8,
        fontFamily: 'Roboto-Medium',
        fontWeight: 400,
        fontSize: 10,
        lineHeight: 12,
        textAlign: "right",
        color: "#BDBDBD",
    },
    addComment: {
        marginTop: 7,
        // position: "absolute",
        position: "relative",
        // left: "50%",
        // transform: [{translateX: -50}],
        // right: 0,

        // bottom: 0,
        // paddingHorizontal: 16,
    },
    input: {
        backgroundColor: "#F6F6F6",
        fontFamily: 'Roboto-Medium',
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19,
        color: "#BDBDBD",
        padding: 16,
        paddingRight: 50,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius: 100,
        // width: "100%",
        // maxWidth: 350,

        // marginBottom: 16,
    },
    addButton: {
        position: "absolute",
        top: 8,
        right: 9,
        width: 37,
        height: 37,
        borderRadius: "50%",
        backgroundColor: "#FF6C00",
        justifyContent: "center",
        alignItems: "center"
    }
});

export default CommentsScreen;