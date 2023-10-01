import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../client';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await api.get("/posts");
        return response.data.posts;
    } catch (error) {
        console.log(error.message);
    }
})

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default postSlice.reducer;