import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import PhotoUpload from 'react-native-photo-upload';
import * as ImagePicker from 'expo-image-picker';

import { authSignOutUser } from '../../redux/auth/authOperations';

import { ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView, Platform, Dimensions, Keyboard, StyleSheet, Text, View, Image, Pressable, TouchableOpacity, TextInput } from 'react-native';

import AvatarAddIcon from '../../images/add.svg';
import AvatarDeleteIcon from '../../images/close.svg';
import LogOutIcon from '../../images/logout.svg';
import CommentsIconFill from '../../images/message_circle_fill.svg';
import ThumbsUpIcon from '../../images/thumbs_up.svg';
import MapPinIcon from '../../images/map_pin.svg';

import { authSlice } from '../../redux/auth/authReducer';

import { updateProfile } from "firebase/auth";
import { db, storage, auth } from "../../firebase/config";
import { collection, getDocs, doc, onSnapshot, where, query } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

const BgImage = require('../../images/photo_bg.jpg');

const avatarPhoto = require('../../images/avatar.jpg');

const ProfileScreen = ({ navigation, route }) => { 
    const [dimensions, setDimensions] = useState(Dimensions.get('window').width);
    const [isLandscape, setIsLandscape] = useState(false);

    const [avatarUser, setAvatarUser] = useState('');
    const [isAvatarUser, setIsAvatarUser] = useState(false);

    const [posts, setPosts] = useState([]);

    const userLogin = useSelector(state => state.authSlice.userLogin);
    const userId = useSelector((state) => state.authSlice.userId);

    const dispatch = useDispatch();

    useEffect(() => { 
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height;

        width > height ? setDimensions(width) : setDimensions(height);
        width > height ? setIsLandscape(true) : setIsLandscape(false);
    }, []);

    useEffect(() => { 
        const onChange = () => {
            const width = Dimensions.get('window').width;
            const height = Dimensions.get('window').height;

            width > height ? setDimensions(width) : setDimensions(height);
            width > height ? setIsLandscape(true) : setIsLandscape(false);
        }

        const dimensionsHandler = Dimensions.addEventListener('change', onChange);
        
        return () => {
            dimensionsHandler.remove();
        }
    }, []);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        try {
            const posts = await onSnapshot(query(collection(db, "posts"), where('userId', '==', userId)), (post) => {
                // console.log('post', post);
                setPosts(post.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                // setPosts(post.docs.map((doc) => ({ ...doc.data(), id: doc.id, comments: post.doc(collection(db, "posts", doc.id), 'comments').count().get() })));
            });
            // const docRef = doc(db, "posts", userId);
            // const collectionRef = collection(docRef, 'comments');
            // const snapshot = await docRef.count().get();
            // console.log(snapshot.data().count);
        }
        catch (error) {
            console.log(error);
        }
    }

    const uploadPhotoToServer = async (deviceImage) => {
        try {
            console.log('uploadPhotoToServer deviceImage', deviceImage);
            const response = await fetch(deviceImage);
            // console.log("response:", response);
            const file = await response.blob();

            const uniquePostId = Date.now().toString();

            const storageRef = await ref(storage, `postsImages/${uniquePostId}`);
            console.log('storageRef', storageRef);

            await uploadBytes(storageRef, file).then((photo) => console.log("Uploaded a blob photo", photo));

            const downloadedPhoto = await getDownloadURL(storageRef)
                .then(data => data)
                .catch((error) => {
                    console.log(error);
                });
            
            console.log("downloadedPhoto:", downloadedPhoto);
            
            return downloadedPhoto;
        } catch (error) {
            console.error(error);
        }
    }

    const pickImageAsync = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                console.log('result image', result.assets[0].uri);
                setAvatarUser(result.assets[0].uri);
                return result.assets[0].uri;
            } else {
                alert('You did not select any image.');
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const onPressBtnAvatar = async (event) => {
        try {
            if (isAvatarUser) {
                console.log('Deleted avatar');

                // formData.delete('avatar');
                // for (let [name, value] of formData) {
                //     name ? console.log(`${name} = ${value}`) : '';
                // }

                setAvatarUser('');
                setIsAvatarUser(false);
            } else {
                const deviceImage = await pickImageAsync();
                // console.log('deviceImage', deviceImage);
                const avatarPhoto = await uploadPhotoToServer(deviceImage);
                console.log('avatarPhoto', avatarPhoto);

                await updateProfile(auth.currentUser, {
                    // displayName: login,
                    photoURL: avatarPhoto,
                }).then(() => {
                    console.log('Profile updated!');
                }).catch((error) => {
                    console.log('An error occurred');
                });
            
                const user = await auth.currentUser;
                    
                dispatch(authSlice.actions.updateUserProfile({ userId: user.uid, userLogin: user.displayName, userEmail: user.email, userAvatar: user.photoURL }));
                console.log('Added avatar');
                await setIsAvatarUser(true);
                // !!avatarPhoto ? formData.set('avatar', avatarPhoto) : '';

                // formData.set('avatar', avatarPhoto);
                // for (let [name, value] of formData) {
                //     name ? console.log(`${name} = ${value}`) : '';
                // }

                // formData.set('avatar', '../images/avatar.jpg')

                // setAvatarUser(avatarPhoto);
                // setIsAvatarUser(true);
            }
            // setAvatarUser(avatarPhoto);
            // formData.set('avatar', avatarPhoto);
            // setIsAvatarUser(!isAvatarUser);
            // const avatar = await RNFS.readFile(avatarPath, 'utf8');
            // console.log(avatar);
        }
        catch (error) {
            console.log(error);
        }
    }

    const logOut = () => {
        dispatch(authSignOutUser());
        console.log('Logout');
    }
    const addLike = () => {
        console.log('addLike');
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>

                <Image source={BgImage} style={!isLandscape ? styles.imgBg : { ...styles.imgBg, width: dimensions }} />
                
                <KeyboardAvoidingView style={styles.wrraper} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                
                    <ScrollView>
                        <Pressable style={ !isLandscape ? styles.profile : {...styles.profile, marginTop: 80 } }>
                            <View style={styles.avatar}>

                                {/* <PhotoUpload
                                    onPhotoSelect={avatar => {
                                        if (avatar) {
                                            console.log('Image base64 string: ', avatar)
                                        }
                                    }}
                                >
                                    <Image style={styles.avatarImg} source={{ uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg' }} />
                                </PhotoUpload> */}

                                {/* <Image source={require('../images/avatar.jpg')} style={styles.avatarImg} /> */}

                                {   
                                    isAvatarUser && avatarUser ?
                                    // <Image source={avatarPhoto} style={styles.avatarImg} />
                                    <Image source={{ uri: avatarUser }} style={styles.avatarImg} />
                                :
                                    null
                                }

                                <Pressable style={isAvatarUser ? styles.btnAvatarX : styles.btnAvatar} onPress={onPressBtnAvatar}>
                                {/* <Pressable style={isAvatarUser ? styles.btnAvatarX : styles.btnAvatar} onPress={pickImageAsync}> */}
                                        {isAvatarUser ?
                                            <AvatarDeleteIcon width={11} height={11} />
                                            :
                                            <AvatarAddIcon width={13} height={13} />
                                        }
                                </Pressable>
                            </View>

                            <Pressable style={styles.logOut} onPress={logOut}>
                                <LogOutIcon style={{ marginRight: 20 }} />
                            </Pressable>

                            <Text style={styles.login}>{userLogin}</Text>

                            <View style={isLandscape ? { ...styles.posts, alignItems: "center" } : styles.posts}>
                                
                                {console.log('posts',posts)}
                                {posts.map((item, index) =>
                                    <View key={item.id} style={ item[index] === posts.length - 1 ? { ...styles.post, marginBottom: 0 } : styles.post } >
                                        {/* <Image source={require('../../images/wood.jpg')} style={ isLandscape ? { ...styles.postImage, width: 350 } : styles.postImage } /> */}
                                        <Image source={{ uri: item.photo }} style={ isLandscape ? { ...styles.postImage, width: 350 } : styles.postImage } />
                                        <Text style={styles.title}>{item.title}</Text>

                                        <View style={styles.postInfo}>
                                            <View style={styles.postFollowers}>
                                                <Pressable style={styles.comments} onPress={() => navigation.navigate("Comments", { postId: item.id, photo: item.photo })}>
                                                    <CommentsIconFill style={styles.commentsIcon} width={24} height={24} />
                                                    {/* <Text style={styles.commentsCount}>{item.comments.length}</Text> */}
                                                    <Text style={styles.commentsCount}>0</Text>
                                                </Pressable>
                                                <Pressable style={styles.likes} onPress={addLike}>
                                                    <ThumbsUpIcon style={styles.likesIcon} width={24} height={24} />
                                                    {/* <Text style={styles.likesCount}>{item.likes}</Text> */}
                                                    <Text style={styles.likesCount}>{item.likes}</Text>
                                                </Pressable>
                                            </View>
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

                    {/* <StatusBar style="auto" /> */}

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
        // backgroundColor: "red",
                
        // overflow: "scroll"
        // justifyContent: "flex-end",
        // alignContent: "flex-end"

    },
    wrraper: {
        flex: 1,
    },
    imgBg: {
        flex: 1,
        resizeMode: "cover",
        // objectFit:  "cover",
        // objectPosition: "left top",
        // height: windowHeight,

        // justifyContent: "flex-end",
        // alignItems: "space-around",

        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    },
    profile: {
        backgroundColor: "#fff",
        position: "relative",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 92,
        paddingBottom: 78,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        // marginTop: 16
        marginTop: 147,
        // marginTop: "auto",
        // position: "absolute",
        // top: 263,
        flex: 1,
        // width: 330,
        // flexShrink: 1,
        // flexBasis: 1,
        // flexGrow: 1
        justifyContent: "center",
    },
    avatar: {
        height: 120,
        width: 120,
        position: "absolute",
        top: -60,
        backgroundColor: "#F6F6F6",
        borderRadius: 16
    },
    avatarImg: {
        borderRadius: 16,
        height: "100%",
        width: "100%",
    },
    btnAvatar: {
        height: 25,
        width: 25,

        position: "absolute",
        right: -12,
        bottom: 13,

        backgroundColor: "#fff",
        borderWidth: 1,
        // borderRadius: "50%",
        borderRadius: 12.5,
        borderColor: "#FF6C00",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    btnAvatarX: {
        height: 25,
        width: 25,

        position: "absolute",
        right: -12,
        bottom: 13,

        backgroundColor: "#fff",
        borderWidth: 1,
        // borderRadius: "50%",
        borderRadius: 12.5,
        borderColor: "#E8E8E8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    logOut: {
        position: "absolute",
        top: 22,
        right: 0,
    },
    login: {
        fontFamily: 'Roboto-Bold',
        fontWeight: "500",
        fontSize: 30,
        lineHeight: 35,
        textAlign: "center",
        letterSpacing: 0.01,
        color: "#212121",
    },
    posts: {
        // flex: 1,
        marginTop: 32,
        width: "100%"
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
        // alignItems: "baseline",
        // width: "100%",
        marginTop: 11,
    },
    postFollowers: {
        flexDirection: "row",
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
        color: "#212121",
        marginLeft: 6,
    },
    likes: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 24,
    },
    likesIcon: {

    },
    likesCount: {
        fontFamily: 'Roboto-Medium',
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19,
        color: "#212121",
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

export default ProfileScreen;