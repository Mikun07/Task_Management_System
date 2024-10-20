import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../config/api";
const initialState = {
    success: false,
    data: null,
    error: null,
    isLoggedIn: false,
    loading: false,
};
export const postLogin = createAsyncThunk("login/postLogin", async (body, { rejectWithValue }) => {
    try {
        const params = new URLSearchParams();
        params.append("username", body.username);
        params.append("password", body.password);
        const response = await axios.post(`${BASE_URL}/auth/token`, params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        // Return only serializable parts of the response
        const { data, status } = response;
        return { data, status };
    }
    catch (error) {
        // Check if the error is an AxiosError to provide proper typing
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data || { message: "Login failed" });
        }
        // If the error is not AxiosError, reject with a generic message
        return rejectWithValue({ message: "An unknown error occurred" });
    }
});
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
            if (payload?.status === 200) {
                localStorage.setItem("userToken", JSON.stringify(payload?.data?.access_token));
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