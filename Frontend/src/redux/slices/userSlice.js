import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../client';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await api.get("/api/users");
        return response.data.users;
    } catch (error) {
        console.log(error.message);
    }
})

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default userSlice.reducer;