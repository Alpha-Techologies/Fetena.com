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
    async ({page, searchText, sort, sortOption, limit, field}, { rejectWithValue }) => {
        try {
            const string = `${url}/organizations?page=${page}&${searchText[0]}=${searchText[1]}&sort=${sort}${sortOption}`;
            const { data } = await axios.get(`${url}/organizations?page=${page}&${searchText[0]}=${searchText[1]}&sort=${sort}${sortOption}&limit=${limit}&fields=${field}`);
            console.log(string, "string");
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const followOrganization = createAsyncThunk(
    "data/followOrganizaiton",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${url}/users/follow/${id}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const unfollowOrganization = createAsyncThunk(
  "data/unfollowOrganizaiton",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${url}/users/unfollow/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOneOrganization = createAsyncThunk( 
  "data/getOneOrganization",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${url}/organizations/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
    }
)