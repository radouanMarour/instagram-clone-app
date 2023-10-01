import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import postReducer, { fetchPosts } from './slices/postSlice';
import userReducer from './slices/userSlice';
import createPostReducer from './slices/createPostSlice';
// import uiReducer from './slices/uiSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        post: postReducer,
        createPost: createPostReducer
        // ui: uiReducer
    }
})

store.dispatch(fetchPosts());

export default store;