import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('authState')) || {
    user: null,
    token: null,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            localStorage.setItem('authState', JSON.stringify(state));
        },
        clearUser: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false
            localStorage.setItem('authState', JSON.stringify(state));
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
        follow: (state, action) => {
            const userId = state.user.followings.find(uId => uId === action.payload);
            if (userId) {
                const newFollowings = state.user.followings.filter(user => user.id !== action.payload)
                state.user = { ...state.user, followings: newFollowings }
                localStorage.setItem('authState', JSON.stringify(state));
            } else {
                state.user.followings.push(action.payload);
                localStorage.setItem('authState', JSON.stringify(state));
            }
        },
    }
})

export const { setUser, clearUser, updateUser, follow } = authSlice.actions;
export default authSlice.reducer; 