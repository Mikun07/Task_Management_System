import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";

interface Task {
  id: number;
  title: string;
  priority: string;
  status: string;
  assigned_to: number;
  created_at: string;
  deadline: string;
  description: string;
  owner_id: number;
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

export const fetchTask = createAsyncThunk("task/fetchTask", async () => {
  try {
    const response = await axiosInstance.get("/tasks/");
    return response?.data;
  } catch (error) {
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
        const tasks = action.payload as Task[];
        state.success = true;
        state.data = tasks;
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
