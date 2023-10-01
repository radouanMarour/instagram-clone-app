import { createSlice } from "@reduxjs/toolkit";

const createPostSlice = createSlice({
    name: "createPost",
    initialState: {
        post: {
            image: "",
            caption: ""
        }
    },
    reducers: {
        addImage: (state, action) => {
            state.post.image = action.payload
        },
        addCaption: (state, action) => {
            state.post.caption = action.payload
        }
    },
})

export const { addImage, addCaption } = createPostSlice.actions;
export default createPostSlice.reducer;