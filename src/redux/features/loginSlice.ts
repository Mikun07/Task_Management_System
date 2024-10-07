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
  data: null,
  error: null,
  isLoggedIn: false,
  loading: false,
};

export const postLogin = createAsyncThunk(
  "login/postSignUp",
  async (body: loginPayload) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/token`, body, {
        withCredentials: true,
      });
      console.log({ response });
      return response?.data;
    } catch (error) {
      console.log({ error });
    //   console.log(error?.message);
      return error?.message
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
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
      if (payload?.data?.errors) {
        state.success = false;
        state.data = null;
        state.error = payload?.data?.errors;
      } else {
        localStorage.setItem("userToken", JSON.stringify(payload?.data?.token));
        state.success = true;
        state.data = payload?.data?.user;
        state.error = null;
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
