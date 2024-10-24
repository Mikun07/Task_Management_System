import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { LoginState } from "../root";

interface loginPayload {
  username: string;
  password: string;
}

const initialState: LoginState = {
  success: false,
  data: [],
  error: null,
  isLoggedIn: false,
  loading: false,
};

export const postLogin = createAsyncThunk(
  "login/postLogin",
  async (body: loginPayload) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/token`, body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const data = response?.data;
      const status = response?.status;
      return { data, status };
    } catch (error) {
      return error?.response?.data;
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userToken");
      state.isLoggedIn = false;
      state.data = null;
      location.assign("/login");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postLogin.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload?.status === 200) {
        localStorage.setItem(
          "userToken",
          JSON.stringify(payload?.data?.access_token)
        );
        state.success = true;
        state.data = payload?.data;
        state.error = null;
      } else {
        state.success = false;
        state.data = null;
        state.error = payload.data;
      }
      state.loading = false;
    });
    builder.addCase(postLogin.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = action?.error?.message || "Could not login";
    });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice;
