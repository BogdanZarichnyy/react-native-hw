
// Import the functions you need from the SDKs you need
// import * as firebase from "firebase";
import { initializeApp, getReactNativePersistence } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-community/async-storage';

import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAnzauegZzGWh12NvXOXleccCmSjv7g3UA",
    authDomain: "react-native-hw-fad6f.firebaseapp.com",
    databaseURL: "https://react-native-hw-fad6f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "react-native-hw-fad6f",
    storageBucket: "react-native-hw-fad6f.appspot.com",
    messagingSenderId: "588449244809",
    appId: "1:588449244809:web:b9a3aecd642d1421950858",
    measurementId: "G-4HTWM3Y2GQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig, {persistence: getReactNativePersistence(AsyncStorage)});

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export const analytics = getAnalytics(app);
// export const todosCol = collection(db, 'todos');
// export const snapshot = await getDocs(todosCol);

// firebase.initializeApp(firebaseConfig);
// export default firebase;

// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }