import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:8080/api/users';

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (user, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${url}/signup`, user);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const verifyEmail = createAsyncThunk(
    "auth/verifyEmail",
    async (user, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${url}/verify-email`, user);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (user, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${url}/login`, user);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (user, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${url}/forgotpassword`, user);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async ({formData, token}, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`${url}/resetpassword/${token}`, formData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);