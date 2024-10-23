import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
};
export const updateTask = createAsyncThunk("task/updateTask", async (body) => {
    try {
        const response = await axiosInstance.put(`/tasks/${body?.id}`, body);
        return response;
    }
    catch (error) {
        return error?.response?.data?.error;
    }
});
const editTaskSlice = createSlice({
    name: "editTask",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(updateTask.pending, (state) => {
            state.loading = true;
        })
            .addCase(updateTask.fulfilled, (state, action) => {
            const { payload } = action;
            if (payload?.status === 204) {
                state.success = true;
                state.data = payload?.data;
                state.error = null;
            }
            else {
                state.success = false;
                state.data = null;
                state.error = payload.data;
            }
            state.loading = false;
        })
            .addCase(updateTask.rejected, (state) => {
            state.loading = false;
            state.success = false;
            state.error = "Could not fetch Task";
        });
    },
});
export default editTaskSlice;
