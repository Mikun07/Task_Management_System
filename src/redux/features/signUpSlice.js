import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/api";
const initialState = {
    success: false,
    data: [],
    error: null,
    loading: false,
};
export const postSignUp = createAsyncThunk("signUp/postSignUp", async (body) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/`, body, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    }
    catch (error) {
        return error?.response?.data;
    }
});
const signUpSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(postSignUp.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(postSignUp.fulfilled, (state, action) => {
            const { payload } = action;
            if (payload?.status === 201) {
                state.success = true;
                state.data = payload.data;
                state.error = null;
            }
            else {
                state.success = false;
                state.data = null;
                state.error = payload?.message || "Sign-up failed";
            }
            state.loading = false;
        });
        builder.addCase(postSignUp.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = action?.error?.message || "Sign-up failed";
        });
    },
});
export default signUpSlice;
