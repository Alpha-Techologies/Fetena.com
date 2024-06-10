// Importing necessary dependencies
import { createAsyncThunk } from "@reduxjs/toolkit"; // Redux Toolkit function for creating async thunks
import axios from "axios"; // Library for making HTTP requests

// Base URL for API requests
const url = "/api";

// Thunk action creator for updating user profile
export const updateMe = createAsyncThunk(
  "data/updateMe", // Action type
  async (user, { rejectWithValue }) => {
    // Async function to perform the update
    try {
      // Making a PATCH request to update user profile
      const { data } = await axios.patch(`${url}/users/updateMe`, user);
      return data; // Returning updated user data if successful
    } catch (error) {
      return rejectWithValue(error.response.data); // Handling errors and rejecting with error message
    }
  }
);

// Thunk action creator for updating user password
export const updatePassword = createAsyncThunk(
  "data/updatePassword", // Action type
  async (user, { rejectWithValue }) => {
    // Async function to perform the update
    try {
      // Making a PATCH request to update user password
      const { data } = await axios.patch(`${url}/users/updatePassword`, user);
      return data; // Returning success message if password is updated successfully
    } catch (error) {
      return rejectWithValue(error.response.data); // Handling errors and rejecting with error message
    }
  }
);

// Thunk action creator for creating a new organization
export const createOrganization = createAsyncThunk(
  "data/createOrganization", // Action type
  async (organization, { rejectWithValue }) => {
    // Async function to create the organization
    try {
      // Making a POST request to create a new organization
      const { data } = await axios.post(`${url}/organizations`, organization);
      return data; // Returning the created organization data if successful
    } catch (error) {
      return rejectWithValue(error.response.data); // Handling errors and rejecting with error message
    }
  }
);

// Thunk action creator for fetching organizations
export const getOrganizations = createAsyncThunk(
  "data/getOrganizations", // Action type
  async (
    { page, searchText, sort, sortOption, limit, field },
    { rejectWithValue }
  ) => {
    // Async function to fetch organizations
    try {
      // Constructing the URL with query parameters
      const string = `${url}/organizations?page=${page}&${searchText[0]}=${searchText[1]}&sort=${sort}${sortOption}`;
      // Making a GET request to fetch organizations
      const { data } = await axios.get(
        `${url}/organizations?page=${page}&${searchText[0]}=${searchText[1]}&sort=${sort}${sortOption}&limit=${limit}&fields=${field}`
      );
      console.log(string, "string");
      return data; // Returning fetched organizations data if successful
    } catch (error) {
      return rejectWithValue(error.response.data); // Handling errors and rejecting with error message
    }
  }
);

// Thunk action creator for fetching organizations
export const getFilteredOrganizations = createAsyncThunk(
  "data/getOrganizations", // Action type
  async (
    { page, searchText, sort, sortOption, limit, field, isVerified },
    { rejectWithValue }
  ) => {
    // Async function to fetch organizations
    try {
      // Constructing the URL with query parameters
      const string = `${url}/organizations?page=${page}&${searchText[0]}=${searchText[1]}&sort=${sort}${sortOption}`;
      // Making a GET request to fetch organizations
      const { data } = await axios.get(
        `${url}/organizations?page=${page}&${searchText[0]}=${searchText[1]}&sort=${sort}${sortOption}&limit=${limit}&fields=${field}&isVerified=${isVerified}`
      );
      console.log(string, "string");
      return data; // Returning fetched organizations data if successful
    } catch (error) {
      return rejectWithValue(error.response.data); // Handling errors and rejecting with error message
    }
  }
);

// Thunk action creator for following an organization
export const followOrganization = createAsyncThunk(
  "data/followOrganization", // Action type
  async (id, { rejectWithValue }) => {
    // Async function to follow an organization
    try {
      // Making a POST request to follow an organization
      const { data } = await axios.post(`${url}/users/follow/${id}`);
      return data; // Returning success message if organization is followed successfully
    } catch (error) {
      return rejectWithValue(error.response.data); // Handling errors and rejecting with error message
    }
  }
);

// Thunk action creator for unfollowing an organization
export const unfollowOrganization = createAsyncThunk(
  "data/unfollowOrganization", // Action type
  async (id, { rejectWithValue }) => {
    // Async function to unfollow an organization
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
  async ({ id, field }, { rejectWithValue }) => {
    // Async function to fetch a single organization
    try {
      // Making a GET request to fetch a single organization
      const { data } = await axios.get(
        `${url}/organizations/${id}?fields=${field}`
      );
      return data; // Returning fetched organization data if successful
    } catch (error) {
      return rejectWithValue(error.response.data); // Handling errors and rejecting with error message
    }
  }
);

//This data action has the same functionality with getOneOrganization() but this one was used for the state change purpose in the redux store
export const switchWorkspace = createAsyncThunk(
  "data/switchWorkspace",
  async ({ id, field }, { rejectWithValue }) => {
    // Async function to fetch a single organization
    try {
      // Making a GET request to fetch a single organization
      const { data } = await axios.get(
        `${url}/organizations/${id}?fields=${field}`
      );
      return data; // Returning fetched organization data if successful
    } catch (error) {
      return rejectWithValue(error.response.data); // Handling errors and rejecting with error message
    }
  }
);

export const updateOrganizationLogo = createAsyncThunk(
  "data/updateOrganizationLogo",
  async ({ organizationLogo, id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${url}/organizations/updateLogo/${id}`,
        organizationLogo
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrganization = createAsyncThunk(
  "data/updateOrganization",
  async ({ organization, id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${url}/organizations/${id}`,
        organization
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const joinOrganization = createAsyncThunk(
  "data/joinOrganization",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${url}/organizations/join/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const organizationStaff = createAsyncThunk(
  "data/organizationStaff",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${url}/organizations/staff/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const activateStaff = createAsyncThunk(
  "data/activateStaff",
  async ({ id, userId }, { rejectWithValue }) => {
    console.log(id, userId, "id, userId");
    try {
      const { data } = await axios.post(`${url}/organizations/activate/${id}`, {
        userId,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deactivateStaff = createAsyncThunk(
  "data/deactivateStaff",
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${url}/organizations/deactivate/${id}`,
        { userId }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserOrganizations = createAsyncThunk(
  "data/getUserOrganizations",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${url}/users/organizations`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getNotifications = createAsyncThunk(
  "data/getNotifications",
  async (page, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${url}/notifications/?page=${page}&fields=message,createdAt,read`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateNotification = createAsyncThunk(
  "data/updateNotification",
  async ({id, notification}, { rejectWithValue }) => {
    console.log(id, notification);
    try {
      const { data } = await axios.patch(
        `${url}/notifications/${id}`, notification
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const takeExam = createAsyncThunk(
  "data/takeExam",
  async ({id, now}, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${url}/exams/start-exam/${id}`, { startTime: now });
      console.log(now, "now");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const paymentIntent = createAsyncThunk(
  "data/paymentIntent",
  async ({ id, paymentData }, { rejectWithValue }) => {
    // console.log(id, paymentData, 'id, payment data')
    try {
      const { data } = await axios.post(`${url}/payment/initialize?organizationId=${id}`, paymentData);
      // console.log(now, "now");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const paymentVerify = createAsyncThunk(
  "data/paymentVerify",
  async ({ tx_ref }, { rejectWithValue }) => {
    // console.log(id, paymentData, "id, payment data");
    try {
      const { data } = await axios.post(
        `${url}/payment/verify?tx_ref=${tx_ref}`
      );
      // console.log(now, "now");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOneTransaction = createAsyncThunk(
  "data/getOneTransaction",
  async (tx_ref , { rejectWithValue }) => {
    // console.log(id, paymentData, "id, payment data");
    try {
      const { data } = await axios.get(
        `${url}/transactions/${tx_ref}`
      );
      // console.log(now, "now");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrganizationTransactions = createAsyncThunk(
  "data/getOrganizationTransactions",
  async (organizationId, { rejectWithValue }) => {
    // console.log(id, paymentData, "id, payment data");
    try {
      const { data } = await axios.get(`${url}/transactions/organizations/${organizationId}`);
      // console.log(now, "now");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllTransactions = createAsyncThunk(
  "data/getAllTransactions",
  async (_, { rejectWithValue }) => {
    // console.log(id, paymentData, "id, payment data");
    try {
      const { data } = await axios.get(`${url}/transactions`);
      // console.log(now, "now");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "data/getAllUsers",
  async (_, { rejectWithValue }) => {
    // console.log(id, paymentData, "id, payment data");
    try {
      const { data } = await axios.get(`${url}/users/?isSystemAdmin=false`);
      // console.log(now, "now");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllActivities = createAsyncThunk(
  "data/getAllActivities",
  async (_, { rejectWithValue }) => {
    // console.log(id, paymentData, "id, payment data");
    try {
      const { data } = await axios.get(`${url}/log`);
      // console.log(now, "now");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const toggleUserActivation = createAsyncThunk(
  "data/toggleUserActivation",
  async ({activation, id}, { rejectWithValue }) => {
    // console.log(id, paymentData, "id, payment data");
    try {
      const { data } = await axios.patch(`${url}/users/${id}`, activation);
      // console.log(now, "now");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);