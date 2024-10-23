import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";

interface inviteCreateTaskPayload {
  id: number;
  title: string;
  description: string;
  deadline: string;
  priority: string;
  status: string;
  assigned_to: string;
}

const initialState = {
  data: null,
  success: false,
  error: null,
  loading: false,
};

export const inviteMakeTask = createAsyncThunk(
  "user/inviteMakeTask",
  async (body: inviteCreateTaskPayload) => {
    try {
      const response = await axiosInstance.post(`/tasks/${body?.id}`, body);
      return response;
    } catch (error) {
      return error?.response?.data?.error;
    }
  }
);

const inviteCreateTaskSlice = createSlice({
  name: "inviteCreateTask",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(inviteMakeTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(inviteMakeTask.fulfilled, (state, action) => {
        const { payload } = action;
        if (payload?.status === 201) {
          state.success = true;
          state.data = payload?.data;
          state.error = null;
        } else {
          state.success = false;
          state.data = null;
          state.error = payload.data;
        }
        state.loading = false;
      })
      .addCase(inviteMakeTask.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.error = "Could not create task";
      });
  },
});

export default inviteCreateTaskSlice;
