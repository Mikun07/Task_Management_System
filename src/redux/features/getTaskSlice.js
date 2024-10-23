import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
const initialState = {
    data: [],
    success: false,
    error: null,
    loading: false,
};
export const fetchTask = createAsyncThunk("task/fetchTask", async () => {
    try {
        const response = await axiosInstance.get("/tasks/");
        return response?.data;
    }
    catch (error) {
        return error?.response?.data?.error;
    }
});
const getTaskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchTask.pending, (state) => {
            state.loading = true;
        })
            .addCase(fetchTask.fulfilled, (state, action) => {
            const tasks = action.payload; // Ensure action.payload is of type Task[]
            state.success = true;
            state.data = tasks; // This should work if data is defined as Task[] in TaskState
            state.error = null;
            state.loading = false;
        })
            .addCase(fetchTask.rejected, (state) => {
            state.loading = false;
            state.success = false;
            state.error = "Could not fetch Task";
        });
    },
});
export default getTaskSlice;
