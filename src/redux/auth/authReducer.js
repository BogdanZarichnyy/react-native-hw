import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        userId: null,
        userAvatar: null,
        userLogin: null,
        userEmail: null,
        stateChange: false,
    },
    reducers: {
        updateUserProfile: (state, { payload }) => ({ ...state, userId: payload.userId, userLogin: payload.userLogin, userEmail: payload.userEmail, userAvatar: payload.userAvatar }),

        authStateChange: (state, { payload }) => ({ ...state, stateChange: payload.stateChange }),

        authSignOutUser: (state, actions) => ({
            userId: null,
            userAvatar: null,
            userLogin: null,
            userEmail: null,
            stateChange: false,
        }),
    }
});

// console.log('authSlice', authSlice);