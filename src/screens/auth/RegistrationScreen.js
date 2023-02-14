import { useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView, Platform, Dimensions, Keyboard, StyleSheet, Text, View, Image, Pressable, TouchableOpacity, TextInput } from 'react-native';

import Svg, { Path } from 'react-native-svg';

import AvatarAddIcon from '../../images/add.svg';
import AvatarDeleteIcon from '../../images/close.svg';

// const avatarPath = path.resolve('../../images/avatar.jpg');
// console.log(avatarPath);

const BgImage = require('../../images/photo_bg.jpg');

const avatarPhoto = require('../../images/avatar.jpg');

const initialState = {
    avatar: null,
    login: '',
    email: '',
    password: ''
}

export default function RegistrationScreen({ navigation }) {
    const [dimensions, setDimensions] = useState(Dimensions.get('window').width);
    const [isLandscape, setIsLandscape] = useState(false);

    const [state, setstate] = useState(initialState);

    const [avatarUser, setAvatarUser] = useState('');
    const [isAvatarUser, setIsAvatarUser] = useState(false);

    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isFocusInputLogin, setIsFocusInputLogin] = useState(false);
    const [isFocusInputEmail, setIsFocusInputEmail] = useState(false);
    const [isFocusInputPassword, setIsFocusInputPassword] = useState(false);

    const [isHiddenPassword, setIsHiddenPassword] = useState(true);

    const onFocus = {
        backgroundColor: "#FFFFFF",
        color: "#212121",
        borderColor: "#FF6C00"
    }

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

    const inputHandlerLogin = (text) => {
        // setLogin(text);
        setstate((prevState) => ({ ...prevState, login: text}));
        console.log(login);
    }

    const inputHandlerEmail = (text) => {
        // setEmail(text);
        setstate((prevState) => ({ ...prevState, email: text}));
        console.log(email);
    }

    const inputHandlerPassword = (text) => {
        // setPassword(text);
        setstate((prevState) => ({ ...prevState, password: text}));
        console.log(password);
    }

    const onFocusInputLogin = () => {
        setIsFocusInputLogin(true);
    }
    
    const onBlurInputLogin = (event) => {
        setIsFocusInputLogin(false);
        // event.nativeEvent.text ? formData.set('login', event.nativeEvent.text) : '';
        setLogin(event.nativeEvent.text)
        console.log(event.nativeEvent.text);
        // console.log(login);
    }
    
    const onFocusInputEmail = () => {
        setIsFocusInputEmail(true);
    }
    
    const onBlurInputEmail = (event) => {
        setIsFocusInputEmail(false);
        // event.nativeEvent.text ? formData.set('email', event.nativeEvent.text) : '';
        setEmail(event.nativeEvent.text);
        console.log(event.nativeEvent.text);
        // console.log(email);
    }

    const onFocusInputPassword = () => {
        setIsFocusInputPassword(true);
    }

    const onBlurInputPassword = (event) => {
        setIsFocusInputPassword(false);
        // event.nativeEvent.text ? formData.set('password', event.nativeEvent.text) : '';
        setPassword(event.nativeEvent.text);
        console.log(event.nativeEvent.text);
        // console.log(password);
    }

    const hiddenPassword = () => {
        // setIsFocusInputPassword(true);
        setIsHiddenPassword(!isHiddenPassword);
    }

    const onPressBtnRegister = () => {
        console.log('Registration');
        // console.log(login);
        // console.log(email);
        // console.log(password);

        // let formData = new FormData();
        // formData.append(avatar, blob, fileName)
        // formData.append(login, login);
        // formData.append(email, email);
        // formData.append(password, password);
        // console.log(formData.toString());

        // if (!login || !email || !password) {
        //     alert('Enter login, email and password');
        //     return;
        // }

        // if (avatarUser !== '' || login !== '' || email !== '' || password !== '') {
        //     for (let [name, value] of formData) {
        //         name ? console.log(`${name} = ${value}`) : '';
        //     }
        // }

        // avatarUser ? formData.delete('avatar') : '';
        // login ? formData.delete('login') : '';
        // email ? formData.delete('email') : '';
        // password ? formData.delete('password') : '';

        // avatarUser && console.log(avatar);
        // login && console.log(login);
        // email && console.log(email);
        // password && console.log(password);

        // setAvatarUser('');
        // setLogin('');
        // setEmail('');
        // setPassword('');

        // if (state.login === '' || state.email === '' || state.password === '') {
        //     alert('Enter login, email and password');
        //     return;
        // }

        Keyboard.dismiss();
        console.log(state);
        setstate(initialState);
    }

    const onPressLinkAuth = () => {
        console.log('Go to LoginScreen');
        navigation.navigate("Login")
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>

                <Image source={BgImage} style={!isLandscape ? styles.imgBg : { ...styles.imgBg, width: dimensions }} />
                
                <KeyboardAvoidingView style={styles.wrraper} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                
                    <ScrollView>
                        <Pressable style={ !isLandscape ? styles.register : {...styles.register, marginTop: 80 } }>
                            <View style={styles.avatar}>
                                {/* <Image source={require('../images/avatar.jpg')} style={styles.avatarImg} /> */}
                                { isAvatarUser ?
                                    <Image source={avatarPhoto} style={styles.avatarImg} />
                                :
                                    <Image source="" style={styles.avatarImg} />
                                }
                                {/* <Image source={{ uri: avatarUser }} style={styles.avatarImg} id="avatar" /> */}
                                {/* <Pressable style={styles.btnAvatarWrraper} onPress={onPressBtnAvatar}>
                                    <View style={styles.btnAvatar}>
                                        <Svg viewBox="0 0 13 13" style={styles.avatarIcon}>
                                            <AvatarAddIcon style={styles.avatarAddIcon}/>
                                        </Svg> */}
                                        {/* <Svg viewBox="0 0 13 13" style={styles.avatarIconX}>
                                            <AvatarAddIcon style={styles.avatarAddIconX}/>
                                        </Svg> */}
                                    {/* </View>
                                </Pressable> */}
                                {/* <Pressable style={styles.btnAvatar} onPress={onPressBtnAvatar}>
                                    <Svg viewBox="0 0 13 13" style={styles.avatarIcon}>
                                        <AvatarAddIcon style={styles.avatarAddIcon}/>
                                    </Svg>
                                </Pressable> */}
                                <Pressable style={isAvatarUser ? styles.btnAvatarX : styles.btnAvatar} onPress={onPressBtnAvatar}>
                                    {/* <View style={styles.avatarIconWrraper}> */}
                                        {/* <Svg style={styles.avatarIcon}>
                                            <AvatarAddIcon style={styles.avatarAddIcon}/>
                                        </Svg> */}
                                        {isAvatarUser ?
                                            // <Svg style={styles.avatarIconX} width="11" height="11" viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
                                            //     <Path style={styles.avatarAddIconX} fillRule="evenodd" clipRule="evenodd" d="M1.25736 0.550253L0.550258 1.25736L4.7929 5.5L0.550258 9.74264L1.25736 10.4497L5.50001 6.20711L9.74265 10.4497L10.4498 9.74264L6.20711 5.5L10.4498 1.25736L9.74265 0.550253L5.50001 4.79289L1.25736 0.550253Z"/>
                                            // </Svg>
                                            <AvatarDeleteIcon width={11} height={11} />
                                            :
                                            // <Svg style={styles.avatarIcon} width="13" height="13" viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg">
                                            //     <Path style={styles.avatarAddIcon} fillRule="evenodd" clipRule="evenodd" d="M7 0H6V6H0V7H6V13H7V7H13V6H7V0Z"/>
                                            // </Svg>
                                            <AvatarAddIcon width={13} height={13} />
                                        }
                                    {/* </View> */}
                                </Pressable>
                            </View>
                            <Text style={styles.title}>Регистрация</Text>
                            <TextInput style={isFocusInputLogin ? { ...styles.input, ...onFocus } : styles.input}
                                onChangeText={inputHandlerLogin}
                                autoFocus={true}
                                placeholder="Логин"
                                textAlign="left"
                                value={state.login}
                                placeholderTextColor="#BDBDBD"
                                textContentType="username"
                                onFocus={onFocusInputLogin}
                                onBlur={onBlurInputLogin}
                            />
                            <TextInput style={isFocusInputEmail ? { ...styles.input, ...onFocus } : styles.input}
                                onChangeText={inputHandlerEmail}
                                placeholder="Адрес электронной почты"
                                textAlign="left"
                                value={state.email}
                                placeholderTextColor="#BDBDBD"
                                textContentType="emailAddress"
                                onFocus={onFocusInputEmail}
                                onBlur={onBlurInputEmail}
                            />
                            <View style={styles.wrraperPassword}>
                                <TextInput style={isFocusInputPassword ? { ...styles.input, ...styles.password, ...onFocus } : { ...styles.input, ...styles.password }}
                                    onChangeText={inputHandlerPassword}
                                    placeholder="Пароль"
                                    textAlign="left"
                                    value={state.password}
                                    placeholderTextColor="#BDBDBD"
                                    textContentType="password"
                                    secureTextEntry={isHiddenPassword}
                                    onFocus={onFocusInputPassword}
                                    onBlur={onBlurInputPassword}
                                />
                                <Text style={styles.hiddenPassword} onPress={hiddenPassword}>{isHiddenPassword ? "Показать" : "Спрятать"}</Text>
                            </View>
                            <TouchableOpacity style={styles.registerBtn} onPress={onPressBtnRegister}>
                                <Text style={styles.registerBtnText}>Зарегистрироваться</Text>
                            </TouchableOpacity >
                            <Text style={styles.linkAuth}>Уже есть аккаунт? <Text onPress={onPressLinkAuth}>Войти</Text></Text>
                        </Pressable>
                    </ScrollView>

                    {/* <StatusBar style="auto" /> */}

                </KeyboardAvoidingView>

            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
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
    register: {
        backgroundColor: "#fff",
        position: "relative",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 92,
        paddingBottom: 78,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        // marginTop: 16
        marginTop: 263,
        // marginTop: "auto",
        // position: "absolute",
        // top: 263,
        flex: 1,
        // width: 330,
        // flexShrink: 1,
        // flexBasis: 1,
        // flexGrow: 1
        justifyContent: "center"
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
    btnAvatarWrraper: {
        position: "absolute",
        right: -37,
        bottom: -12,
        // padding: 25,
        // zIndex: 0.5,
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
    avatarIconWrraper: {
        // height: "100%",
        // width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 100,
        width: 100,
        // opacity: 0,
        backgroundColor: "transparent",
        zIndex: 10
    },
    avatarIcon: {
        // position: "relative",
        // top: 0,
        // left: 0,
        height: 13,
        width: 13,
        // height: "100%",
        // width: "100%",
        // margin: 50
        // zIndex: 20
    },
    avatarAddIcon: {
        fill: "#FF6C00",
        // margin: 50
        // zIndex: -10
    },
    avatarIconX: {
        // position: "relative",
        // top: 0,
        // left: 0,
        height: 13,
        width: 13,
        // height: "100%",
        // width: "100%",
        // margin: 50
        // zIndex: 20
    },
    avatarAddIconX: {
        fill: "#BDBDBD",
        // margin: 50
        // zIndex: -10
    },
    title: {
        fontFamily: 'Roboto-Medium',
        fontWeight: "500",
        fontSize: 30,
        lineHeight: 35,
        textAlign: "center",
        letterSpacing: 0.01,
        color: "#212121",
        // paddingTop: 92,
        paddingBottom: 33
    },
    input: {
        backgroundColor: "#F6F6F6",
        fontFamily: 'Roboto-Medium',
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19,
        color: "#BDBDBD",
        padding: 16,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius: 8,
        width: "100%",
        maxWidth: 350,
        marginBottom: 16,
    },
    wrraperPassword: {
        width: "100%",
        maxWidth: 350,
        position: "relative",
    },
    password: {
        position: "relative",
        paddingRight: 87,
        marginBottom: 43,
    },
    hiddenPassword: {
        position: "absolute",
        padding: 16,
        right: 0,
        // top: 16,
        fontFamily: 'Roboto-Medium',
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19,
        textAlign: "right",
        color: "#1B4371",
    },
    registerBtn: {
        width: "100%",
        maxWidth: 350,
        paddingVertical: 16,
        backgroundColor: "#FF6C00",
        borderRadius: 100,
        marginBottom: 16,
    },
    registerBtnText: {
        fontFamily: 'Roboto-Medium',
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19,
        textAlign: "center",
        color: "#FFFFFF",
    },
    linkAuth: {
        fontFamily: 'Roboto-Medium',
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19,
        textAlign: "center",
        color: "#1B4371",
        // marginBottom: 78,
    }
});