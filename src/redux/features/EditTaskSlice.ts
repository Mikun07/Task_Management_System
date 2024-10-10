import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";

interface Task {
  id: number;
  title: string;
  priority: string;
  status: string;
  assigned_to: string;
  deadline: string;
  description: string;
}

interface TaskState {
  data: Task[] | null;
  success: boolean;
  error: string | null;
  loading: boolean;
}

const initialState: TaskState = {
  data: null,
  success: false,
  error: null,
  loading: false,
};

export const updateTask = createAsyncThunk("task/updateTask", async (body: Task) => {
  try {
    const response = await axiosInstance.post(`/tasks/?task_id=${body?.id}`);
    return response?.data;
  } catch (error) {
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
        const tasks = action.payload as Task[];
        state.success = true;
        state.data = tasks;
        state.error = null;
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