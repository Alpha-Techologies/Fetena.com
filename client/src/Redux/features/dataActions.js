import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "/api/users";

export const updateMe = createAsyncThunk(
    "data/updateMe",
    async (user, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`${url}/updateMe`, user);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const updatePassword = createAsyncThunk(
    "data/updatePassword",
    async (user, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`${url}/updatePassword`, user);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)