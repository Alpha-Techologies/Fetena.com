import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "/api";

export const updateMe = createAsyncThunk(
    "data/updateMe",
    async (user, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`${url}/users/updateMe`, user);
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
            const { data } = await axios.patch(`${url}/users/updatePassword`, user);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const createOrganization = createAsyncThunk(
    "data/createOrganization",
    async (organization, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${url}/organizations`, organization);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const getOrganizations = createAsyncThunk(
    "data/getOrganizations",
    async (pageNumber, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${url}/organizations?page=${pageNumber}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)