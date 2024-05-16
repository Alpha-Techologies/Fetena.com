// Importing necessary dependencies
import { createAsyncThunk } from "@reduxjs/toolkit"; // Redux Toolkit function for creating async thunks
import axios from "axios"; // Library for making HTTP requests

// Base URL for API requests
const url = "/api";

// Thunk action creator for updating user profile
export const updateMe = createAsyncThunk(
    "data/updateMe", // Action type
    async (user, { rejectWithValue }) => { // Async function to perform the update
        try {
            // Making a PATCH request to update user profile
            const { data } = await axios.patch(`${url}/users/updateMe`, user);
            return data; // Returning updated user data if successful
        } catch (error) {
            return rejectWithValue(error.response.data); // Handling errors and rejecting with error message
        }
    }
)

// Thunk action creator for updating user password
export const updatePassword = createAsyncThunk(
    "data/updatePassword", // Action type
    async (user, { rejectWithValue }) => { // Async function to perform the update
        try {
            // Making a PATCH request to update user password
            const { data } = await axios.patch(`${url}/users/updatePassword`, user);
            return data; // Returning success message if password is updated successfully
        } catch (error) {
            return rejectWithValue(error.response.data); // Handling errors and rejecting with error message
        }
    }
)

// Thunk action creator for creating a new organization
export const createOrganization = createAsyncThunk(
    "data/createOrganization", // Action type
    async (organization, { rejectWithValue }) => { // Async function to create the organization
        try {
            // Making a POST request to create a new organization
            const { data } = await axios.post(`${url}/organizations`, organization);
            return data; // Returning the created organization data if successful
        } catch (error) {
            return rejectWithValue(error.response.data); // Handling errors and rejecting with error message
        }
    }
)

// Thunk action creator for fetching organizations
export const getOrganizations = createAsyncThunk(
    "data/getOrganizations", // Action type
    async ({page, searchText, sort, sortOption, limit, field}, { rejectWithValue }) => { // Async function to fetch organizations
        try {
            // Constructing the URL with query parameters
            const string = `${url}/organizations?page=${page}&${searchText[0]}=${searchText[1]}&sort=${sort}${sortOption}`;
            // Making a GET request to fetch organizations
            const { data } = await axios.get(`${url}/organizations?page=${page}&${searchText[0]}=${searchText[1]}&sort=${sort}${sortOption}&limit=${limit}&fields=${field}`);
            console.log(string, "string");
            return data; // Returning fetched organizations data if successful
        } catch (error) {
            return rejectWithValue(error.response.data); // Handling errors and rejecting with error message
        }
    }
)


// Thunk action creator for fetching organizations
export const getFilteredOrganizations = createAsyncThunk(
    "data/getOrganizations", // Action type
    async ({page, searchText, sort, sortOption, limit, field,isVerified}, { rejectWithValue }) => { // Async function to fetch organizations
        try {
            // Constructing the URL with query parameters
            const string = `${url}/organizations?page=${page}&${searchText[0]}=${searchText[1]}&sort=${sort}${sortOption}`;
            // Making a GET request to fetch organizations
            const { data } = await axios.get(`${url}/organizations?page=${page}&${searchText[0]}=${searchText[1]}&sort=${sort}${sortOption}&limit=${limit}&fields=${field}&isVerified=${isVerified}`);
            console.log(string, "string");
            return data; // Returning fetched organizations data if successful
        } catch (error) {
            return rejectWithValue(error.response.data); // Handling errors and rejecting with error message
        }
    }
)



// Thunk action creator for following an organization
export const followOrganization = createAsyncThunk(
    "data/followOrganization", // Action type
    async (id, { rejectWithValue }) => { // Async function to follow an organization
        try {
            // Making a POST request to follow an organization
            const { data } = await axios.post(`${url}/users/follow/${id}`);
            return data; // Returning success message if organization is followed successfully
        } catch (error) {
            return rejectWithValue(error.response.data); // Handling errors and rejecting with error message
        }
    }
)

// Thunk action creator for unfollowing an organization
export const unfollowOrganization = createAsyncThunk(
  "data/unfollowOrganization", // Action type
  async (id, { rejectWithValue }) => { // Async function to unfollow an organization
    try {
      // Making a POST request to unfollow an organization
      const { data } = await axios.post(`${url}/users/unfollow/${id}`);
      return data; // Returning success message if organization is unfollowed successfully
    } catch (error) {
      return rejectWithValue(error.response.data); // Handling errors and rejecting with error message
    }
  }
);

// Thunk action creator for fetching a single organization
export const getOneOrganization = createAsyncThunk( 
  "data/getOneOrganization", // Action type
  async ({id, field}, { rejectWithValue }) => { // Async function to fetch a single organization
    try {
      // Making a GET request to fetch a single organization
      const { data } = await axios.get(`${url}/organizations/${id}?fields=${field}`);
      return data; // Returning fetched organization data if successful
    } catch (error) {
      return rejectWithValue(error.response.data); // Handling errors and rejecting with error message
    }
    }
)
