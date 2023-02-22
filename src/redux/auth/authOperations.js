import { db, auth } from '../../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from "firebase/auth";
import { authSlice } from './authReducer';

export const authSignUpUser = ({ avatar, login, email, password }) => async (dispatch, getState) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        
        await updateProfile(auth.currentUser, {
                displayName: login,
                // photoURL: avatar,
            }).then(() => {
                console.log('Profile updated!');
            }).catch((error) => {
                console.log('An error occurred');
            });
        
        const user = await auth.currentUser;
            
        dispatch(authSlice.actions.updateUserProfile({ userId: user.uid, userLogin: user.displayName, userEmail: user.email }));

    } catch (error) {
        console.error(error);
    }
}

export const authSignInUser = ({ email, password }) => async (dispatch, getState) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        if (user) {
            console.log(user);
            dispatch(authSlice.actions.updateUserProfile({ userId: user.user.uid, userLogin: user.user.displayName, userEmail: user.user.email }));
        }
    } catch (error) {
        console.error(error);
    }
}

export const authSignOutUser = () => async (dispatch, getState) => {
    try {
        signOut(auth);
        console.log("Sign-out successful");

        dispatch(authSlice.actions.authSignOutUser());
    } catch (error) {
        console.error(error);
    }
}

export const authStateChangeUser = () => async (dispatch, getState) => {
    try {
        await onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(authSlice.actions.updateUserProfile({ userId: user.uid, userLogin: user.displayName, userEmail: user.email }));

                dispatch(authSlice.actions.authStateChange({ stateChange: true }));
            }
        });
    } catch (error) {
        console.error(error);
    }
}