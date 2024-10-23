import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
// Initial state definition for TaskState
const initialState = {
    data: [], // Holds tasks
    success: false,
    error: null,
    loading: false,
};
// Async thunk to fetch invite tasks based on invited_by_id
export const fetchInviteTasks = createAsyncThunk("inviteTask/fetchInviteTasks", async (invited_by_id) => {
    try {
        const response = await axiosInstance.get(`/tasks/user/${invited_by_id}`);
        return response?.data;
    }
    catch (error) {
        throw error?.response?.data?.error;
    }
});
// Redux slice for invite tasks
const getInviteTaskSlice = createSlice({
    name: "inviteTask",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInviteTasks.pending, (state) => {
            state.loading = true;
        })
            .addCase(fetchInviteTasks.fulfilled, (state, action) => {
            const tasks = action.payload; // Ensure action.payload is an array of tasks
            state.data = tasks;
            state.success = true;
            state.loading = false;
            state.error = null;
        })
            .addCase(fetchInviteTasks.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.error.message || "Could not fetch tasks";
        });
    },
});
// Export the reducer to use in the store
export default getInviteTaskSlice;
