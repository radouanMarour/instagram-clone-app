import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: []
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        addPost: (state, action) => {
            state.posts.push(action.payload)
        },
        like: (state, action) => {
            const post = state.posts.find(p => p.id === action.payload.postId);
            const userId = post.likes.find(uId => uId === action.payload.userId);
            if (userId) {
                const newLikes = post.likes.filter(uId => uId !== action.payload.userId);
                post.likes = newLikes;
                const newPosts = state.posts.filter(pId => pId !== post.id);
                newPosts.push(post);
                state.posts = newPosts;
            }
            post.likes.push(action.payload.userId);
            const newPosts = state.posts.filter(pId => pId !== post.id);
            newPosts.push(post);
            state.posts = newPosts;
        },
        comment: (state, action) => {
            const post = state.posts.find(p => p.id === action.payload.postId);
            post.comments.push(action.payload.comment);
            const newPosts = state.posts.filter(pId => pId !== post.id);
            newPosts.push(post);
            state.posts = newPosts;
        }
    }
})

export const { setPosts, addPost, like, comment } = postSlice.actions;
export default postSlice.reducer;