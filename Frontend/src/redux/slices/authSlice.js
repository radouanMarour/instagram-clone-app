import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        isLoggedIn: false
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        clearUser: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
        follow: (state, action) => {
            const userId = state.user.followings.find(uId => uId === action.payload);
            if (userId) {
                const newFollowings = state.user.followings.filter(user => user.id !== action.payload)
                state.user = { ...state.user, followings: newFollowings }
            }
            state.user.followings.push(action.payload);
        },
    }
})

export const { setUser, clearUser, updateUser, follow } = authSlice.actions;
export default authSlice.reducer; 