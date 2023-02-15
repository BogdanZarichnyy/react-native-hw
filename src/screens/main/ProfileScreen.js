import { useState, useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView, Platform, Dimensions, Keyboard, StyleSheet, Text, View, Image, Pressable, TouchableOpacity, TextInput } from 'react-native';

import AvatarAddIcon from '../../images/add.svg';
import AvatarDeleteIcon from '../../images/close.svg';
import LogOutIcon from '../../images/logout.svg';
import CommentsIconFill from '../../images/message_circle_fill.svg';
import ThumbsUpIcon from '../../images/thumbs_up.svg';
import MapPinIcon from '../../images/map_pin.svg';

const BgImage = require('../../images/photo_bg.jpg');

const avatarPhoto = require('../../images/avatar.jpg');

const initialState = [
    {
        id: '1',
        photo: '../../images/wood.jpg',
        title: 'Лес',
        comments: [1,2,3,4,5,6,7,8,9],
        likes: '153',
        address: 'Ukraine',
        addressMap: '',
        owner: ''
    },
    {
        id: '2',
        photo: '../../images/black_sea.jpg',
        title: 'Закат на Черном море',
        comments: [1,2,3,4,5,6],
        likes: '200',
        address: 'Ukraine',
        addressMap: '',
        owner: ''
    },
    {
        id: '3',
        photo: '../../images/house.jpg',
        title: 'Старый домик в Венеции',
        comments: [1,2,3,4,5,6,7],
        likes: '200',
        address: 'Italy',
        addressMap: '',
        owner: ''
    },
];

const ProfileScreen = ({ navigation }) => { 
    const [dimensions, setDimensions] = useState(Dimensions.get('window').width);
    const [isLandscape, setIsLandscape] = useState(false);

    const [avatarUser, setAvatarUser] = useState('');
    const [isAvatarUser, setIsAvatarUser] = useState(false);

    const [posts, setPosts] = useState(initialState);

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

    const onPressBtnAvatar = async (event) => {
        if (isAvatarUser) {
            console.log('Deleted avatar');

            // formData.delete('avatar');
            // for (let [name, value] of formData) {
            //     name ? console.log(`${name} = ${value}`) : '';
            // }

            setAvatarUser('');
            setIsAvatarUser(false);
        } else {
            console.log('Added avatar');
            // !!avatarPhoto ? formData.set('avatar', avatarPhoto) : '';

            // formData.set('avatar', avatarPhoto);
            // for (let [name, value] of formData) {
            //     name ? console.log(`${name} = ${value}`) : '';
            // }

            // formData.set('avatar', '../images/avatar.jpg')

            setAvatarUser(avatarPhoto);
            setIsAvatarUser(true);
        }
        // setAvatarUser(avatarPhoto);
        // formData.set('avatar', avatarPhoto);
        // setIsAvatarUser(!isAvatarUser);
        // const avatar = await RNFS.readFile(avatarPath, 'utf8');
        // console.log(avatar);
    }

    const logOut = () => {
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
                                {/* <Image source={require('../images/avatar.jpg')} style={styles.avatarImg} /> */}
                                { isAvatarUser ?
                                    <Image source={avatarPhoto} style={styles.avatarImg} />
                                :
                                    <Image source="" style={styles.avatarImg} />
                                }
                                <Pressable style={isAvatarUser ? styles.btnAvatarX : styles.btnAvatar} onPress={onPressBtnAvatar}>
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

                            <Text style={styles.login}>Natali Romanova</Text>

                            <View style={isLandscape ? {...styles.posts, alignItems: "center" } : styles.posts}>

                                {posts.map((item, index) =>
                                    <View key={item.id} style={ item[index] === posts.length - 1 ? { ...styles.post, marginBottom: 0 } : styles.post } >
                                        <Image source={require('../../images/wood.jpg')} style={ isLandscape ? { ...styles.postImage, width: 350 } : styles.postImage } />

                                        <Text style={styles.title}>{item.title}</Text>

                                        <View style={styles.postInfo}>
                                            <View style={styles.postFollowers}>
                                                <Pressable style={styles.comments} onPress={() => navigation.navigate("Comments")}>
                                                    <CommentsIconFill style={styles.commentsIcon} width={24} height={24} />
                                                    <Text style={styles.commentsCount}>{item.comments.length}</Text>
                                                </Pressable>
                                                <Pressable style={styles.likes} onPress={addLike}>
                                                    <ThumbsUpIcon style={styles.likesIcon} width={24} height={24} />
                                                    <Text style={styles.likesCount}>{item.likes}</Text>
                                                </Pressable>
                                            </View>
                                            <Pressable style={styles.addressInfo} onPress={() => navigation.navigate("Map")}>
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
        fontWeight: 500,
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
        borderRadius: 8,
        resizeMode: "cover",
    },
    title: {
        fontFamily: 'Roboto-Medium',
        fontWeight: 500,
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
        fontWeight: 400,
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
        fontWeight: 400,
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
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 19,
        textAlign: "right",
        textDecorationLine: "underline",
        color: "#212121",
        marginLeft: 4,
    },
});

export default ProfileScreen;