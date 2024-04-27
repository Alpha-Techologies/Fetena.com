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
