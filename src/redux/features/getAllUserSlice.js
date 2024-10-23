import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
const initialState = {
    data: [],
    success: false,
    error: null,
    loading: false,
};
export const fetchAllUser = createAsyncThunk("user/fetchAllUser", async () => {
    try {
        const response = await axiosInstance.get("/user/users");
        return response?.data;
    }
    catch (error) {
        return error?.response?.data?.error;
    }
});
const getAllUserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchAllUser.pending, (state) => {
            state.loading = true;
        })
            .addCase(fetchAllUser.fulfilled, (state, action) => {
            const { payload } = action;
            state.success = true;
            state.data = payload;
            state.error = null;
            state.loading = false;
        })
            .addCase(fetchAllUser.rejected, (state) => {
            state.loading = false;
            state.success = false;
            state.error = "Could not fetch user";
        });
    },
});
export default getAllUserSlice;
