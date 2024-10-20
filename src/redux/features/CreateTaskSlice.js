import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
import { BASE_URL } from "@/config/api";
const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
};
export const makeTask = createAsyncThunk("user/makeTask", async (body) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/tasks/`, body);
        console.log(response);
        return response;
    }
    catch (error) {
        console.log(error);
        return error?.response?.data?.error;
    }
});
const createTaskSlice = createSlice({
    name: "createTask",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(makeTask.pending, (state) => {
            state.loading = true;
        })
            .addCase(makeTask.fulfilled, (state, action) => {
            const { payload } = action;
            if (payload?.status === 201) {
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
            .addCase(makeTask.rejected, (state) => {
            state.loading = false;
            state.success = false;
            state.error = "Could not create task";
        });
    },
});
export default createTaskSlice;
