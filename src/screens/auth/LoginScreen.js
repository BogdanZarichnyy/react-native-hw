import { useState, useEffect } from 'react';
import { ScrollView, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView, Platform, Dimensions, StyleSheet, Text, View, Image, Pressable, TouchableOpacity, TextInput, Keyboard } from 'react-native';

const BgImage = require('../../images/photo_bg.jpg');

const initialState = {
    email: '',
    password: ''
}

export default function LoginScreen({ navigation }) {
    const [dimensions, setDimensions] = useState(Dimensions.get('window').width);
    const [isLandscape, setIsLandscape] = useState(false);

    const [state, setstate] = useState(initialState);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

        // Dimensions.addEventListener('change', onChange);

        const dimensionsHandler = Dimensions.addEventListener('change', onChange);
        
        return () => {
            // Dimensions.removeEventListener('change', onChange);
            dimensionsHandler.remove();
        }
    }, []);

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
    
    const onFocusInputEmail = () => {
        setIsFocusInputEmail(true);
    }
    
    const onBlurInputEmail = (event) => {
        setIsFocusInputEmail(false);

        setEmail(event.nativeEvent.text);
        console.log(event.nativeEvent.text);
    }

    const onFocusInputPassword = () => {
        setIsFocusInputPassword(true);
    }

    const onBlurInputPassword = (event) => {
        setIsFocusInputPassword(false);

        setPassword(event.nativeEvent.text);
        console.log(event.nativeEvent.text);
    }

    const hiddenPassword = () => {
        // setIsFocusInputPassword(true);
        setIsHiddenPassword(!isHiddenPassword);
    }

    const onPressBtnLogin = () => {
        console.log('Login');
        // console.log(login);
        // console.log(email);
        // console.log(password);

        // let formData = new FormData();
        // formData.append(avatar, blob, fileName)
        // formData.append(login, login);
        // formData.append(email, email);
        // formData.append(password, password);
        // console.log(formData.toString());

        // if (!email || !password) {
        //     alert('Enter email and password');
        //     return;
        // }

        // email && console.log(email);
        // password && console.log(password);

        // setEmail('');
        // setPassword('');

        Keyboard.dismiss();
        console.log(state);
        setstate(initialState);
    }

    const onPressLinkRegistration = () => {
        console.log('Go to RegistrationScreen');
        navigation.navigate("Registration")
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>

                <Image source={BgImage} style={!isLandscape ? styles.imgBg : { ...styles.imgBg, width: dimensions }} />
                
                <KeyboardAvoidingView style={styles.wrraper} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                    <ScrollView>
                        <Pressable style={!isLandscape ? styles.login : {...styles.login, marginTop: 80 }}>
                            <Text style={styles.title}>Войти</Text>
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
                            <TouchableOpacity style={styles.loginBtn} onPress={onPressBtnLogin}>
                                <Text style={styles.loginBtnText}>Войти</Text>
                            </TouchableOpacity>
                            <Text style={styles.linkRegistration}>Нет аккаунта? <Text onPress={onPressLinkRegistration}>Зарегистрироваться</Text></Text>
                        </Pressable>
                    </ScrollView>
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
    login: {
        backgroundColor: "#fff",
        position: "relative",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 32,
        paddingBottom: 144,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        // marginTop: 16
        marginTop: 323,
        // marginTop: "auto",
        // position: "absolute",
        // top: 263,
        flex: 1,
        // width: 330,
        // flexShrink: 1,
        // flexBasis: 1,
        // flexGrow: 1
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
    loginBtn: {
        width: "100%",
        maxWidth: 350,
        paddingVertical: 16,
        backgroundColor: "#FF6C00",
        borderRadius: 100,
        marginBottom: 16,
    },
    loginBtnText: {
        fontFamily: 'Roboto-Medium',
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19,
        textAlign: "center",
        color: "#FFFFFF",
    },
    linkRegistration: {
        fontFamily: 'Roboto-Medium',
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19,
        textAlign: "center",
        color: "#1B4371",
        // marginBottom: 78,
    }
});