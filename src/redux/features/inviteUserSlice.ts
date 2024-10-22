import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
import { TaskState } from "../root";

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string
}

interface Evite {
  user_email: string | User[]; 
}

const initialState: TaskState = {
  data: null,
  success: false,
  error: null,
  loading: false,
};

export const invitedUser = createAsyncThunk(
  "task/invitedUser",
  async (body: Evite) => {
    try {
      const response = await axiosInstance.post(`/user/invite`, body);
      return response;
    } catch (error) {
      return error?.response?.data?.error;
    }
  }
);

const inviteUserSlice = createSlice({
  name: "sendInvite",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(invitedUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(invitedUser.fulfilled, (state, action) => {
        const { payload } = action;
        if (payload?.status === 200) {
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
      .addCase(invitedUser.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.error = "Could not fetch Task";
      });
  },
});

export default inviteUserSlice;
