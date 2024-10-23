import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
const initialState = {
    data: [],
    success: false,
    error: null,
    loading: false,
};
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    try {
        const response = await axiosInstance.get("/user/");
        return response?.data;
    }
    catch (error) {
        return error?.response?.data?.error;
    }
});
const getUserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUser.pending, (state) => {
            state.loading = true;
        })
            .addCase(fetchUser.fulfilled, (state, action) => {
            const { payload } = action;
            state.success = true;
            state.data = payload;
            state.error = null;
            state.loading = false;
        })
            .addCase(fetchUser.rejected, (state) => {
            state.loading = false;
            state.success = false;
            state.error = "Could not fetch user";
        });
    },
});
export default getUserSlice;
