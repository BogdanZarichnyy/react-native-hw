import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView, Platform, Dimensions, Keyboard, ScrollView, Pressable, View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

import VectorIcon from '../../images/vector.svg';

import { db, storage } from '../../firebase/config';
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { collection, doc, addDoc, updateDoc, onSnapshot, where, query } from "firebase/firestore";

const avatarPhoto = require('../../images/avatar.jpg');
const ellipsePhoto = require('../../images/ellipse.jpg');

const postPhoto = require('../../images/black_sea.jpg');

const initialState = [
    {
        id: '1',
        // avatar: '../../images/ellipse.jpg',
        text: 'Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!',
        date: '09 июня, 2020 | 08:40',
        post: '',
        owner: ''
    },
    {
        id: '2',
        // avatar: '../../images/avatar.jpg',
        text: 'A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.',
        date: '09 июня, 2020 | 09:14',
        post: '',
        owner: ''
    },
    {
        id: '3',
        // avatar: '../../images/ellipse.jpg',
        text: 'Thank you! That was very helpful!',
        date: '09 июня, 2020 | 09:20',
        post: '',
        owner: ''
    },
];

const width = Dimensions.get('window').width;

const CommentsScreen = ({ navigation, route }) => {
    const [isLandscape, setIsLandscape] = useState(false);
    const [comments, setComments] = useState([]);
    const [postId, setPostId] = useState('');
    const [comment, setComment] = useState('');

    const [isFocusInputComment, setIsFocusInputComment] = useState(false);

    const userId = useSelector((state) => state.authSlice.userId);

    const onFocus = {
        backgroundColor: "#FFFFFF",
        color: "#212121",
        borderColor: "#FF6C00"
    }

    useEffect(() => { 
        if (route.params === undefined) {
            return;
        }
        const { postId } = route.params;
        setPostId(postId);
    }, [route.params]);

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

    useEffect(() => {
        getComments();
    }, []);

    const getComments = async () => {
        try {
            // const docRef = doc(db, "posts", postId);
            // const commentsRef = collection(docRef, "comments");
            // const comments = await onSnapshot(commentsRef, (data) => {
            //     setComments(data);
            //     // console.log("data.docs: ", data.docs[0].data());
            //     // setComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            // });

            // await onSnapshot(collection(db, "posts"), (data) => {
            //     // console.log('data', data);
            //     setComments(data);
            //     // setPosts(post.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            // });

            // const docRef = doc(db, "posts", postId);
            // const commentsRef = collection(docRef, "comments");
            // console.log(commentsRef);

            // db.firestore().collection('posts').doc(postId).collection('comments').onSnapshot(setComments(data.docs.map((doc) => ({ ...doc.data() }))))ж

            const docRef = doc(db, "posts", route.params.postId);
            const commentsRef = collection(docRef, "comments");
            const newComment = await onSnapshot(commentsRef, (data) => {
                // console.log("data.docs: ============>", data.docs[0].data());
                setComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            });
        }
        catch (error) {
            console.log(error);
        }
    }

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

    const transformMonth = (numberOfMonth) => { 
        const months = [ 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'ноября', 'декабря' ];

        let month;

        switch (numberOfMonth) {
            case 0: month = months[0]; break;
            case 1: month = months[1]; break;
            case 2: month = months[2]; break;
            case 3: month = months[3]; break;
            case 4: month = months[4]; break;
            case 5: month = months[5]; break;
            case 6: month = months[6]; break;
            case 7: month = months[7]; break;
            case 8: month = months[8]; break;
            case 9: month = months[9]; break;
            case 10: month = months[10]; break;
            case 11: month = months[11]; break;
            default: break;
        }

        return month;
    }

    const addCommentHandler = async () => {
        try {
            setIsFocusInputComment(false);

            if (!comment) {
                return;
            }

            // setComment('');
            // setComments([...comments, {
            //     // avatar: '../../images/ellipse.jpg',
            //     text: comment,
            //     date: Date.now().toString(),
            //     postId,
            //     owner: userId
            // }]);

            const nowDate = new Date();
            const day = nowDate.getDate();
            const numberOfMonth = nowDate.getMonth();
            const month = await transformMonth(numberOfMonth);
            const year = nowDate.getFullYear();
            const hours = nowDate.getHours();
            const minutes = nowDate.getMinutes().toString().padStart(2, 0);
            const dateText = `${day} ${month}, ${year} | ${hours}:${minutes}`;

            // console.log(dateText);

            const commentPost = {
                text: comment,
                date: dateText,
                postId,
                owner: userId
            }

            setComment('');

            // const docRef = doc(db, "posts", postId);

            // const addComment = await updateDoc(docRef, commentPost)
            //     .then(docRef => {
            //         console.log("A New Document Field has been added to an existing document", docRef);
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     });

            // console.log(addComment);
            
            const docRef = doc(db, "posts", postId);
            const commentsRef = collection(docRef, "comments");
            const newComment = await addDoc(commentsRef, commentPost);
            
            // const addComment = await updateDoc(query(collection(db, "posts"), where('postId', '==', postId)), {
            //     comments: commentPost,
            // });            
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView style={styles.wrraper} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                    <ScrollView>

                        <Pressable style={isLandscape ? { ...styles.content, alignItems: "center" } : styles.content}>
                            
                            {route.params === undefined ?
                                <Image source={postPhoto} style={isLandscape ? { ...styles.postImage, width: 350 } : styles.postImage} />
                                :
                                <Image source={{ uri: route.params.photo }} style={isLandscape ? { ...styles.postImage, width: 350 } : styles.postImage} />
                            }

                            <View style={styles.comments}>

                                {/* {console.log(comments)} */}
                                
                                {comments.map((item, index) => 
                                    <View key={item.id} style={index % 2 ? { ...styles.commentInfo, flexDirection: "row-reverse", width: isLandscape ? 350 : "100%" } : { ...styles.commentInfo, width: isLandscape ? 350 : "100%" }} >
                                        
                                        {/* <Image source={avatarPhoto} style={styles.avatar} /> */}

                                        {item.avatar === undefined ?
                                            <Image source={ellipsePhoto} style={styles.avatar} />
                                            :
                                            <Image source={{ uri: item.avatar }} style={styles.avatar} />
                                        }

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
                                    // multiline="true"
                                    // rows="5"
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
        height: 240,
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
        borderRadius: 50,
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
        fontWeight: "400",
        fontSize: 13,
        lineHeight: 18,
        color: "#212121"
    },
    date: {
        marginTop: 8,
        fontFamily: 'Roboto-Medium',
        fontWeight: "400",
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
        height: 50,
        backgroundColor: "#F6F6F6",
        fontFamily: 'Roboto-Medium',
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19,
        color: "#BDBDBD",
        padding: 15,
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
        right: 8,
        width: 34,
        height: 34,
        borderRadius: 50,
        backgroundColor: "#FF6C00",
        justifyContent: "center",
        alignItems: "center"
    }
});

export default CommentsScreen;