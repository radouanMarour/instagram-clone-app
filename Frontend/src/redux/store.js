import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import postReducer from './slices/postSlice';
import uiReducer from './slices/uiSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        ui: uiReducer
    }
})

export default store;