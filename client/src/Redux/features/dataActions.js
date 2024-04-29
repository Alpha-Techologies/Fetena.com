import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const url = "/api/users";

export const getMe = createAsyncThunk(
    "data/getMe",
    async () => {
        const { data } = await axios.get(`${url}/me`);
        return data;
    }
);
