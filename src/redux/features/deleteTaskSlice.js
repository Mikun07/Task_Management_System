import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
};
export const removeTask = createAsyncThunk("task/removeTask", async (body) => {
    try {
        const response = await axiosInstance.delete(`/tasks/${body?.id}`);
        return response;
    }
    catch (error) {
        console.log(error);
        return error?.response?.data;
    }
});
const deleteTaskSlice = createSlice({
    name: "removeTask",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(removeTask.pending, (state) => {
            state.loading = true;
        })
            .addCase(removeTask.fulfilled, (state, action) => {
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
            .addCase(removeTask.rejected, (state) => {
            state.loading = false;
            state.success = false;
            state.error = "Could not fetch Task";
        });
    },
});
export default deleteTaskSlice;
