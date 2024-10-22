import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
import { TaskState } from "../root";

interface AssignedUser {
  task_id: number;
  user_id: number;
  id: number;
}

interface Task {
  id: number;
  title: string;
  priority: string;
  status: string;
  assigned_to: AssignedUser[]; // Updated to reflect the array of assigned users
  created_at: string;
  deadline: string;
  description: string;
  owner_id: number;
}

const initialState: TaskState = {
  data: [],
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
        const tasks = action.payload as Task[]; // Ensure action.payload is of type Task[]
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
