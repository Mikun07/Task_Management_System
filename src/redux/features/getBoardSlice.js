import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
const initialState = {
    data: [],
    success: false,
    error: null,
    loading: false,
};
export const fetchBoard = createAsyncThunk("user/fetchBoard", async () => {
    try {
        const response = await axiosInstance.get("/user/board");
        return response?.data;
    }
    catch (error) {
        return error?.response?.data?.error;
    }
});
const getBoardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchBoard.pending, (state) => {
            state.loading = true;
        })
            .addCase(fetchBoard.fulfilled, (state, action) => {
            const { payload } = action;
            state.success = true;
            state.data = payload;
            state.error = null;
            state.loading = false;
        })
            .addCase(fetchBoard.rejected, (state) => {
            state.loading = false;
            state.success = false;
            state.error = "Could not fetch board";
        });
    },
});
export default getBoardSlice;
