import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
import { TaskState } from "../root";

interface Task {
  id: number;
  title: string;
  priority: string;
  status: string;
  assigned_to: string;
  deadline: string;
  description: string;
}

const initialState: TaskState = {
  data: null,
  success: false,
  error: null,
  loading: false,
};

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (body: Task) => {
    try {
      const response = await axiosInstance.put(`/tasks/${body?.id}`, body);
      return response;
    } catch (error) {
      return error?.response?.data?.error;
    }
  }
);

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
        } else {
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
